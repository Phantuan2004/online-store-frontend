import productService from "@/services/productService";

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
        sizes: []
      },

      // UI State
      isLoading: true,
      error: null,
      quantity: 1,
      selectedSize: null,
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
    /**
     * Calculate discount percentage
     */
    discountPercentage() {
      if (!this.product.oldPrice || this.product.oldPrice <= this.product.price) return 0;
      return Math.round(
        ((this.product.oldPrice - this.product.price) /
          this.product.oldPrice) *
          100
      );
    },

    /**
     * Total price with quantity
     */
    totalPrice() {
      return (this.product.price * this.quantity).toFixed(2);
    },

    /**
     * Check if product is in stock
     */
    isInStock() {
      return this.product.price > 0;
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
          sizes: data.variants ? Array.from(new Set(data.variants.flatMap(v => 
            v.attributes ? Object.values(v.attributes) : []
          ))) : []
        };

        if (this.product.sizes.length > 0) {
          this.selectedSize = this.product.sizes[0];
        }

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
     * Add to cart
     */
    addToCart() {
      const cartItem = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        size: this.selectedSize,
        image: this.product.images[0]
      };

      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
      
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      this.showSuccessMessage("Added to cart successfully!");
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
