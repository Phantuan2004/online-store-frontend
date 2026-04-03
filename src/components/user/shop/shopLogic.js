import { productsData, categories, sortOptions } from "./products";

export const shopLogic = {
  data() {
    return {
      products: productsData,
      allProducts: productsData,
      categories,
      sortOptions,
      
      // Filters
      selectedCategories: [],
      priceRange: [0, 200],
      selectedColors: [],
      selectedWeights: [],
      
      // Sort & View
      selectedSort: "featured",
      viewMode: "grid", // 'grid' or 'list'
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 12,
      
      // UI State
      showQuickViewModal: false,
      selectedProduct: null,
      wishlist: [],
      cart: []
    };
  },
  
  computed: {
    /**
     * Filter products based on selected filters
     */
    filteredProducts() {
      return this.allProducts.filter(product => {
        // Category filter
        if (
          this.selectedCategories.length > 0 &&
          !this.selectedCategories.includes(product.category.toLowerCase())
        ) {
          return false;
        }

        // Price filter
        if (
          product.price < this.priceRange[0] ||
          product.price > this.priceRange[1]
        ) {
          return false;
        }

        return true;
      });
    },

    /**
     * Sort filtered products
     */
    sortedProducts() {
      const products = [...this.filteredProducts];

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
     * Paginate sorted products
     */
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedProducts.slice(start, end);
    },

    /**
     * Calculate total pages
     */
    totalPages() {
      return Math.ceil(this.sortedProducts.length / this.itemsPerPage);
    },

    /**
     * Result count text
     */
    resultCount() {
      return this.filteredProducts.length;
    },

    /**
     * Get unique categories from filtered products
     */
    availableCategories() {
      const cats = new Set(this.filteredProducts.map(p => p.category.toLowerCase()));
      return Array.from(cats);
    }
  },

  methods: {
    /**
     * Apply filters and reset pagination
     */
    applyFilters() {
      this.currentPage = 1;
    },

    /**
     * Handle sort change
     */
    onSortChange(sortValue) {
      this.selectedSort = sortValue;
      this.currentPage = 1;
    },

    /**
     * Handle category filter
     */
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category.toLowerCase());
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(category.toLowerCase());
      }
      this.applyFilters();
    },

    /**
     * Handle price range change
     */
    updatePriceRange(min, max) {
      this.priceRange = [min, max];
      this.applyFilters();
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

    /**
     * Handle filter by category from product card
     */
    filterByCategory(category) {
      this.selectedCategories = [category.toLowerCase()];
      this.applyFilters();
    },

    /**
     * Go to page
     */
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.scrollToTop();
      }
    },

    /**
     * Next page
     */
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.scrollToTop();
      }
    },

    /**
     * Previous page
     */
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.scrollToTop();
      }
    },

    /**
     * Scroll to products section
     */
    scrollToTop() {
      window.scrollTo({
        top: document.querySelector(".section-shop")?.offsetTop || 0,
        behavior: "smooth"
      });
    },

    /**
     * Clear all filters
     */
    clearFilters() {
      this.selectedCategories = [];
      this.priceRange = [0, 200];
      this.selectedColors = [];
      this.selectedWeights = [];
      this.currentPage = 1;
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
  }
};
