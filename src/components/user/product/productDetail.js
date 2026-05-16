import productService from "@/services/productService";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

export const productDetail = {
  data() {
    return {
      product: {
        id: null,
        name: "",
        description: "",
        price: 0,
        oldPrice: 0,
        rating: 5.0,
        reviews: 0,
        images: [],
        specs: {},
        models: [],
        colors: [],
        variants: []  // Raw variants from API for price/stock lookup
      },

      // UI State
      isLoading: true,
      error: null,
      quantity: 1,
      selectedModel: null,
      selectedColor: null,
      activeTab: "description",
      inWishlist: false,
      showReviewForm: false,
      isLoadingReview: false,

      // Reviews (Static for now as requested)
      reviews: [
        {
          id: 1,
          author: "Oreo Noman",
          date: "Jan 08, 2024",
          rating: 5,
          image: "/src/assets/user/img/review/1.jpg",
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente doloribus debitis corporis, eaque dicta, repellat amet, illum adipisci vel perferendis dolor! quae vero in perferendis provident quis."
        }
      ],

      // New Review Form
      newReview: {
        name: "",
        email: "",
        comment: "",
        rating: 5
      },

      // Popular Products (Static placeholders for now)
      popularProducts: []
    };
  },

  computed: {
    cartStore() {
        return useCartStore();
    },
    
    authStore() {
        return useAuthStore();
    },

    /**
     * Find the variant that matches the current model + color selection.
     * Returns null if no variant is selected or no match found.
     */
    matchedVariant() {
      if (!this.product.variants || this.product.variants.length === 0) return null;
      // Only try to match if user has selected at least one attribute
      if (!this.selectedModel && !this.selectedColor) return null;

      return this.product.variants.find(v => {
        const matchModel = !this.selectedModel || (v.attributes && v.attributes.model === this.selectedModel);
        const matchColor = !this.selectedColor || (v.attributes && v.attributes.color === this.selectedColor);
        return matchModel && matchColor;
      }) || null;
    },

    /**
     * Display price: variant price if a variant is selected, otherwise parent price.
     */
    displayPrice() {
      if (this.matchedVariant && this.matchedVariant.price) {
        return parseFloat(this.matchedVariant.price);
      }
      return this.product.price;
    },

    /**
     * Display old price for discount calculation.
     */
    displayOldPrice() {
      return this.displayPrice * 1.1;
    },

    /**
     * Display stock: variant stock if a variant is selected, otherwise total stock.
     */
    displayStock() {
      if (this.matchedVariant) {
        return this.matchedVariant.stock || 0;
      }
      // Sum all variant stocks as total stock
      if (this.product.variants && this.product.variants.length > 0) {
        return this.product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
      }
      return 0;
    },

    /**
     * Calculate discount percentage based on display prices.
     */
    discountPercentage() {
      if (!this.displayOldPrice || this.displayOldPrice <= this.displayPrice) return 0;
      return Math.round(
        ((this.displayOldPrice - this.displayPrice) /
          this.displayOldPrice) *
          100
      );
    },

    /**
     * Total price with quantity
     */
    totalPrice() {
      return (this.displayPrice * this.quantity).toFixed(2);
    },

    /**
     * Check if product is in stock
     */
    isInStock() {
      return this.displayStock > 0;
    }
  },

  watch: {
    /**
     * Watch for route changes to update product detail 
     * when navigating between related products
     */
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.fetchProductDetail(newId);
          // Scroll to top for better UX
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  },

  methods: {
    async fetchProductDetail(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await productService.getProductById(id);
        const { data } = response;

        // Map API data to component structure
        this.product = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          oldPrice: parseFloat(data.price) * 1.1, // Fake old price
          rating: 4.8,
          reviews: 120,
          images: data.images && data.images.length > 0 ? data.images : [data.primary_image],
          specs: data.attributes ? data.attributes.reduce((acc, curr) => {
            acc[curr.name] = curr.values.join(", ");
            return acc;
          }, {}) : {},
          // Extract unique models and colors from variants
          models: data.variants ? Array.from(new Set(data.variants.map(v => 
            v.attributes ? v.attributes.model : null
          ).filter(Boolean))) : [],
          colors: data.variants ? Array.from(new Set(data.variants.map(v => 
            v.attributes ? v.attributes.color : null
          ).filter(Boolean))) : [],
          // Store raw variants for price/stock lookup
          variants: data.variants || []
        };

        // Default: no variant selected, show parent product price
        this.selectedModel = null;
        this.selectedColor = null;

        this.loadWishlistStatus();
        
        // After loading product, we could fetch related products
        this.fetchRelatedProducts(data.category_id);

      } catch (err) {
        console.error("Failed to fetch product:", err);
        this.error = "Product not found or an error occurred.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchRelatedProducts(categoryId) {
       try {
         // Simply fetch first page of products as "popular/related" for now
         const response = await productService.getProducts(1);
         const { data } = response;
         this.popularProducts = data
            .filter(p => p.id !== this.product.id)
            .slice(0, 5)
            .map(p => ({
                id: p.id,
                title: p.name,
                category: p.category?.name || "General",
                price: parseFloat(p.price),
                oldPrice: parseFloat(p.price) * 1.1,
                rating: 5.0,
                image: p.primary_image
            }));
       } catch (err) {
         console.error("Failed to fetch related products:", err);
       }
    },

    /**
     * Increment quantity
     */
    incrementQuantity() {
      this.quantity++;
    },

    /**
     * Decrement quantity
     */
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    /**
     * Set quantity directly
     */
    setQuantity(value) {
      const num = parseInt(value);
      if (!isNaN(num) && num > 0) {
        this.quantity = num;
      }
    },

    /**
     * Add to cart using Central Store
     */
    async addToCart() {
      if (!this.authStore.accessToken) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
      }

      try {
        let variantId = null;
        const variants = this.product.variants;

        if (variants && variants.length > 0) {
          // If the product has model/color variants, user must select one
          if ((this.product.models.length > 0 || this.product.colors.length > 0) && !this.matchedVariant) {
            alert("Vui lòng chọn phiên bản sản phẩm trước khi thêm vào giỏ hàng.");
            return;
          }

          // Use matched variant if available, otherwise fall back to first variant
          variantId = this.matchedVariant ? this.matchedVariant.id : variants[0].id;
        }

        if (!variantId) {
            alert("Sản phẩm này hiện đang hết hàng hoặc không có phiên bản phù hợp.");
            return;
        }

        // Use cart store - this handles API, local update, notification AND opening sidebar
        await this.cartStore.addToCart(variantId, this.quantity, this.product.name);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert(error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng.");
      }
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist() {
      this.inWishlist = !this.inWishlist;
      let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      
      if (this.inWishlist) {
        wishlist.push({
            id: this.product.id,
            title: this.product.name,
            price: this.product.price,
            image: this.product.images[0]
        });
        this.showSuccessMessage("Added to wishlist!");
      } else {
        wishlist = wishlist.filter(item => item.id !== this.product.id);
        this.showSuccessMessage("Removed from wishlist!");
      }
      
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    },

    /**
     * Switch tab
     */
    switchTab(tabName) {
      this.activeTab = tabName;
    },

    /**
     * Submit review
     */
    async submitReview() {
      if (!this.newReview.name.trim() || !this.newReview.email.trim() || !this.newReview.comment.trim()) {
        this.showErrorMessage("Please fill all required fields");
        return;
      }

      this.isLoadingReview = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const review = {
          id: this.reviews.length + 1,
          author: this.newReview.name,
          email: this.newReview.email,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          rating: this.newReview.rating,
          image: "/src/assets/user/img/review/1.jpg",
          comment: this.newReview.comment
        };
        this.reviews.push(review);
        this.newReview = { name: "", email: "", comment: "", rating: 5 };
        this.showSuccessMessage("Review submitted successfully!");
      } catch (error) {
        this.showErrorMessage("Failed to submit review");
      } finally {
        this.isLoadingReview = false;
      }
    },

    /**
     * Set review rating
     */
    setRating(rating) {
      this.newReview.rating = rating;
    },

    /**
     * Format price
     */
    formatPrice(price) {
      return typeof price === 'number' ? price.toFixed(2) : '0.00';
    },

    /**
     * Show success message
     */
    showSuccessMessage(message) {
      console.log("✅ Success:", message);
    },

    /**
     * Show error message
     */
    showErrorMessage(message) {
      console.log("❌ Error:", message);
    },

    /**
     * Load wishlist status
     */
    loadWishlistStatus() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      this.inWishlist = wishlist.some(item => item.id === this.product.id);
    }
  },

  mounted() {
    const productId = this.$route.params.id;
    if (productId) {
      this.fetchProductDetail(productId);
    }
  }
};

export default productDetail;
