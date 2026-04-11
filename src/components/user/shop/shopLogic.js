import { nextTick } from "vue";
import { sortOptions } from "./products";
import productService from "@/services/productService";

const getPriceBounds = (products) => {
  const prices = products
    .map(({ price }) => Number(price))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  };
};

export const shopLogic = {
  data() {
    return {
      products: [],
      allProducts: [],
      categories: [],
      sortOptions,
      priceBounds: { min: 0, max: 0 },
      
      // Filters
      draftSelectedCategories: [],
      draftPriceRange: [0, 0],
      selectedColors: [],
      selectedWeights: [],
      
      // Sort & View
      selectedSort: "featured",
      viewMode: "grid", // 'grid' or 'list'

      // Pagination
      currentPage: 1,
      pageSize: 12,
      totalPages: 1,
      totalItems: 0,
      
      // UI State
      isLoading: false,
      error: null,
      showQuickViewModal: false,
      selectedProduct: null,
      wishlist: [],
      cart: []
    };
  },
  
  computed: {
    /**
     * Sort products (Currently handling client-side for available items)
     */
    sortedProducts() {
      const products = [...this.products];

      switch (this.selectedSort) {
        case "newest":
          return products.reverse();
        case "price-low":
          return products.sort((a, b) => a.price - b.price);
        case "price-high":
          return products.sort((a, b) => b.price - a.price);
        case "rating":
          return products.sort((a, b) => b.rating - a.rating);
        case "featured":
        default:
          return products;
      }
    },

    /**
     * Result count text
     */
    resultCount() {
      return this.totalItems;
    }
  },

  watch: {
    draftPriceRange: {
      deep: true,
      handler() {
        this.syncPriceSlider();
      }
    }
  },

  methods: {
    /**
     * Fetch products from API
     */
    async fetchProducts(page = 1) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await productService.getProducts(page);
        const { data, meta } = response;

        // Map API data to component structure
        this.products = data.map(product => ({
          id: product.id,
          title: product.name,
          description: product.description,
          price: parseFloat(product.price),
          oldPrice: product.price * 1.1, // Fake old price as API doesn't have it yet
          category: product.category?.name || "Uncategorized",
          image: product.primary_image || "",
          rating: 5.0, // Default rating
          specs: product.attributes ? product.attributes.reduce((acc, curr) => {
            acc[curr.name] = curr.values.join(", ");
            return acc;
          }, {}) : {}
        }));

        // Pagination metadata
        this.currentPage = meta.current_page;
        this.totalPages = meta.last_page;
        this.totalItems = meta.total;
        this.pageSize = meta.per_page;

        // Recalculate price bounds if it's the first load
        if (this.priceBounds.max === 0 && this.products.length > 0) {
          const bounds = getPriceBounds(this.products);
          this.priceBounds = bounds;
          this.draftPriceRange = [bounds.min, bounds.max];
          nextTick(() => this.initPriceSlider());
        }

      } catch (err) {
        console.error("shopLogic: Fetch error:", err);
        this.error = "Failed to load products. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Fetch categories from API
     */
    async fetchCategories() {
      try {
        const response = await productService.getCategories();
        if (response.success) {
          this.categories = response.data.map(cat => ({
            id: cat.id,
            name: cat.name,
            count: cat.products_count || 0
          }));
        }
      } catch (err) {
        console.error("shopLogic: Categories fetch error:", err);
      }
    },

    /**
     * Apply filters
     */
    applyFilters() {
      // Filtering will be wired to backend API later.
      this.fetchProducts(1);
    },

    /**
     * Handle sort change
     */
    onSortChange(sortValue) {
      this.selectedSort = sortValue;
      this.currentPage = 1; // Reset về trang 1 khi đổi sort
    },

    /**
     * Handle pagination
     */
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.fetchProducts(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /**
     * Handle price range change
     */
    updatePriceRange(min, max) {
      this.draftPriceRange = [min, max];
    },

    getPriceSlider() {
      const $ = window.jQuery || window.$;

      if (!this.$refs.priceSlider || !$ || typeof $.fn?.slider !== "function") {
        return null;
      }

      return $(this.$refs.priceSlider);
    },

    initPriceSlider() {
      const slider = this.getPriceSlider();

      if (!slider?.length) {
        return;
      }

      if (slider.hasClass("ui-slider")) {
        slider.slider("destroy");
      }

      slider.slider({
        range: true,
        min: this.priceBounds.min,
        max: this.priceBounds.max,
        values: [...this.draftPriceRange],
        slide: (_event, ui) => {
          this.updatePriceRange(ui.values[0], ui.values[1]);
        }
      });
    },

    syncPriceSlider() {
      const slider = this.getPriceSlider();

      if (!slider?.length || !slider.hasClass("ui-slider")) {
        return;
      }

      const currentValues = slider.slider("values");

      if (
        currentValues[0] === this.draftPriceRange[0] &&
        currentValues[1] === this.draftPriceRange[1]
      ) {
        return;
      }

      slider.slider("values", [...this.draftPriceRange]);
    },

    destroyPriceSlider() {
      const slider = this.getPriceSlider();

      if (slider?.length && slider.hasClass("ui-slider")) {
        slider.slider("destroy");
      }
    },

    /**
     * Toggle view mode
     */
    toggleViewMode(mode) {
      this.viewMode = mode;
    },

    /**
     * Toggle grid/list view
     */
    toggleGridView() {
      this.viewMode = this.viewMode === "grid" ? "list" : "grid";
    },

    /**
     * Handle quick view
     */
    openQuickView(product) {
      this.selectedProduct = product;
      this.showQuickViewModal = true;
    },

    closeQuickView() {
      this.showQuickViewModal = false;
      this.selectedProduct = null;
    },

    /**
     * Handle wishlist toggle
     */
    toggleWishlist(product) {
      const index = this.wishlist.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.wishlist.splice(index, 1);
      } else {
        this.wishlist.push(product);
      }
      this.saveWishlist();
    },

    isProductInWishlist(productId) {
      return this.wishlist.some(p => p.id === productId);
    },

    /**
     * Handle add to cart
     */
    addToCart(product) {
      const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.cart.push({
          ...product,
          quantity: 1
        });
      }
      this.saveCart();
      this.showSuccessMessage(`${product.title} added to cart!`);
    },

    clearFilters() {
      const defaultPriceRange = [this.priceBounds.min, this.priceBounds.max];

      this.draftSelectedCategories = [];
      this.draftPriceRange = [...defaultPriceRange];
      this.selectedColors = [];
      this.selectedWeights = [];
    },

    /**
     * Show success message
     */
    showSuccessMessage(message) {
      // This can integrate with a toast/notification component
      console.log("Success:", message);
    },

    /**
     * LocalStorage helpers
     */
    saveWishlist() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },

    loadWishlist() {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        this.wishlist = JSON.parse(saved);
      }
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    loadCart() {
      const saved = localStorage.getItem("cart");
      if (saved) {
        this.cart = JSON.parse(saved);
      }
    }
  },

  mounted() {
    this.loadWishlist();
    this.loadCart();
    this.fetchProducts();
    this.fetchCategories();
  },

  beforeUnmount() {
    this.destroyPriceSlider();
  }
};
