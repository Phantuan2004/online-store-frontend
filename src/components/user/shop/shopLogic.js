import { nextTick } from "vue";
import { sortOptions } from "./products";
import productService from "@/services/productService";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

const getPriceBounds = (products) => {
  const prices = products
    .flatMap((product) => [product.price])
    .filter((price) => price != null);
  return {
    min: Math.floor(Math.min(...prices)) || 0,
    max: Math.ceil(Math.max(...prices)) || 1000,
  };
};

export const shopLogic = {
  data() {
    const minPrice = 0;
    const maxPrice = 1000;
    return {
      products: [],
      filteredProducts: [],
      categories: [],
      selectedCategory: "All",
      
      // Filter states
      priceRange: [minPrice, maxPrice],
      priceBounds: { min: minPrice, max: maxPrice },
      
      // Draft states for sidebar filters (Applied on "Filter" click)
      draftPriceRange: [minPrice, maxPrice],
      draftSelectedCategories: [],
      
      searchQuery: "",
      selectedSort: sortOptions[0].value,
      sortOptions,
      isSidebarOpen: false,
      viewMode: "grid", // 'grid' or 'list'
      currentPage: 1,
      itemsPerPage: 12,
      totalItems: 0,
      isLoading: true,
      error: null,
    };
  },

  computed: {
    cartStore() {
        return useCartStore();
    },
    
    authStore() {
        return useAuthStore();
    },

    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    sortedProducts() {
      return this.filteredProducts;
    },

    resultCount() {
        return this.filteredProducts.length;
    },

    activeFiltersCount() {
      let count = 0;
      if (this.selectedCategory !== "All") count++;
      if (
        this.priceRange[0] !== this.priceBounds.min ||
        this.priceRange[1] !== this.priceBounds.max
      )
        count++;
      if (this.searchQuery) count++;
      return count;
    },
  },

  watch: {
    selectedCategory() {
      this.applyFilters();
    },
  },

  methods: {
    async fetchProducts(page = 1) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await productService.getProducts(page);
        const { data, meta } = response;

        this.products = data.map((p) => ({
          id: p.id,
          title: p.name,
          category: p.category?.name || "General",
          price: parseFloat(p.price),
          oldPrice: parseFloat(p.price) * 1.1,
          rating: 4.5,
          image: p.primary_image,
          description: p.description,
          variant_id: p.variants && p.variants.length > 0 ? p.variants[0].id : null
        }));

        this.totalItems = meta.total;
        this.currentPage = meta.current_page;

        // Build categories with counts
        const categoryMap = this.products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});

        this.categories = Object.entries(categoryMap).map(([name, count], index) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
            count
        }));

        // Dynamic price bounds
        const bounds = getPriceBounds(this.products);
        this.priceBounds = bounds;
        
        // Initial sync of drafts
        if (this.currentPage === 1 && this.products.length > 0) {
            this.priceRange = [bounds.min, bounds.max];
            this.draftPriceRange = [bounds.min, bounds.max];
        }

        this.applyFilters();
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.error = "Failed to load products. Please check your connection.";
      } finally {
        this.isLoading = false;
      }
    },

    applyFilters() {
      let result = [...this.products];

      // Use draft selected categories if any (supporting the checkbox style)
      if (this.draftSelectedCategories.length > 0) {
          // Find original names of categories from IDs
          const selectedNames = this.categories
            .filter(c => this.draftSelectedCategories.includes(c.id))
            .map(c => c.name);
          
          if (selectedNames.length > 0) {
            result = result.filter((p) => selectedNames.includes(p.category));
          }
      }

      // Apply applied price range
      result = result.filter(
        (p) => p.price >= this.priceRange[0] && p.price <= this.priceRange[1]
      );

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query)
        );
      }

      this.filteredProducts = result;
      this.applySort();
    },

    /**
     * Triggered by "Filter" button in Sidebar
     */
    applySidebarFilters() {
        this.priceRange = [...this.draftPriceRange];
        this.applyFilters();
    },

    // Alias for template compat
    applyFilters() {
        // Here we can actually just call the main logic
        // But if user clicked "Filter" button, we sync drafts first
        this.priceRange = [...this.draftPriceRange];
        
        let result = [...this.products];

        if (this.selectedCategory !== "All") {
            result = result.filter((p) => p.category === this.selectedCategory);
        }

        result = result.filter(
            (p) => p.price >= this.priceRange[0] && p.price <= this.priceRange[1]
        );

        this.filteredProducts = result;
        this.applySort();
    },

    onSortChange(value) {
        this.selectedSort = value;
        this.applySort();
    },

    applySort() {
      const value = this.selectedSort;

      this.filteredProducts.sort((a, b) => {
        switch (value) {
          case "price-low-high":
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return b.id - a.id;
          default:
            return 0;
        }
      });
    },

    /**
     * Handle add to cart using Central Store
     */
    async addToCart(product) {
      if (!this.authStore.accessToken) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
      }

      try {
        let variantId = product.variant_id;
        
        if (!variantId) {
            const response = await productService.getProductById(product.id);
            const fullProduct = response.data;
            if (fullProduct.variants && fullProduct.variants.length > 0) {
                variantId = fullProduct.variants[0].id;
            }
        }

        if (!variantId) {
            alert("Sản phẩm này hiện đang hết hàng.");
            return;
        }

        await this.cartStore.addToCart(variantId, 1, product.title);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert(error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng.");
      }
    },

    clearFilters() {
      this.selectedCategory = "All";
      this.draftPriceRange = [this.priceBounds.min, this.priceBounds.max];
      this.priceRange = [this.priceBounds.min, this.priceBounds.max];
      this.draftSelectedCategories = [];
      this.searchQuery = "";
      this.selectedSort = sortOptions[0].value;
      this.applyFilters();
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchProducts(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    toggleGridView() {
        this.viewMode = 'grid';
    },

    toggleViewMode(mode) {
      this.viewMode = mode;
    },

    formatPrice(price) {
      return typeof price === 'number' ? price.toFixed(2) : '0.00';
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
