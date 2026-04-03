const productImages = import.meta.glob('../../../assets/user/img/product/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const reviewImages = import.meta.glob('../../../assets/user/img/review/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const getProductImage = (filename) => {
  return productImages[`../../../assets/user/img/product/${filename}`] || '';
};

const getReviewImage = (filename) => {
  return reviewImages[`../../../assets/user/img/review/${filename}`] || reviewImages['../../../assets/user/img/review/1.jpg'] || '';
};

export const productDetail = {
  data() {
    return {
      product: {
        id: 1,
        name: "Seeds Of Change Oraganic Quinoa, Brown",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure minus error doloribus saepe natus?",
        price: 120.25,
        oldPrice: 123.25,
        rating: 5.0,
        reviews: 75,
        images: [
          getProductImage("9.jpg"),
          getProductImage("10.jpg"),
          getProductImage("11.jpg"),
          getProductImage("12.jpg"),
          getProductImage("13.jpg"),
          getProductImage("14.jpg"),
          getProductImage("15.jpg"),
          getProductImage("16.jpg")
        ],
        specs: {
          Brand: "ESTA BETTERU CO",
          Flavour: "Super Saver Pack",
          "Diet Type": "Vegetarian",
          Weight: "200 Grams",
          Speciality: "Gluten Free, Sugar Free",
          Info: "Egg Free, Allergen-Free",
          Items: "1"
        },
        sizes: ["50kg", "80kg", "120kg", "200kg"]
      },

      // UI State
      quantity: 1,
      selectedSize: "50kg",
      activeTab: "description",
      inWishlist: false,
      showReviewForm: false,
      isLoadingReview: false,

      // Reviews
      reviews: [
        {
          id: 1,
          author: "Oreo Noman",
          date: "Jan 08, 2024",
          rating: 5,
          image: getReviewImage("1.jpg"),
          comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente doloribus debitis corporis, eaque dicta, repellat amet, illum adipisci vel perferendis dolor! quae vero in perferendis provident quis."
        },
        {
          id: 2,
          author: "Lina Wilson",
          date: "Mar 22, 2024",
          rating: 4,
          image: getReviewImage("2.jpg"),
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

      // Popular Products
      popularProducts: [
        {
          id: 1,
          title: "Best snakes with hazel nut mix pack 200gm",
          category: "Snacks",
          price: 120.25,
          oldPrice: 123.25,
          rating: 4.5,
          image: getProductImage("9.jpg")
        },
        {
          id: 2,
          title: "Sweet snakes crunchy nut mix 250gm pack",
          category: "Snacks",
          price: 100.00,
          oldPrice: 110.00,
          rating: 5.0,
          image: getProductImage("10.jpg")
        },
        {
          id: 3,
          title: "Best snakes with hazel nut mix pack 200gm",
          category: "Snacks",
          price: 120.25,
          oldPrice: 123.25,
          rating: 4.5,
          image: getProductImage("1.jpg")
        },
        {
          id: 4,
          title: "Sweet snakes crunchy nut mix 250gm pack",
          category: "Snacks",
          price: 100.00,
          oldPrice: 110.00,
          rating: 5.0,
          image: getProductImage("2.jpg")
        },
        {
          id: 5,
          title: "Sweet snakes crunchy nut mix 250gm pack",
          category: "Snacks",
          price: 100.00,
          oldPrice: 110.00,
          rating: 5.0,
          image: getProductImage("3.jpg")
        }
      ]
    };
  },

  computed: {
    /**
     * Calculate discount percentage
     */
    discountPercentage() {
      if (!this.product.oldPrice) return 0;
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

  methods: {
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

      // Save to localStorage
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(item => item.id === cartItem.id);
      
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
        wishlist.push(this.product);
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
      // Validate form
      if (!this.newReview.name.trim()) {
        this.showErrorMessage("Please enter your name");
        return;
      }

      if (!this.newReview.email.trim()) {
        this.showErrorMessage("Please enter your email");
        return;
      }

      if (!this.newReview.comment.trim()) {
        this.showErrorMessage("Please enter a comment");
        return;
      }

      this.isLoadingReview = true;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Add review to list
        const review = {
          id: this.reviews.length + 1,
          author: this.newReview.name,
          email: this.newReview.email,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }),
          rating: this.newReview.rating,
          image: getReviewImage("1.jpg"),
          comment: this.newReview.comment
        };

        this.reviews.push(review);

        // Reset form
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
      return price.toFixed(2);
    },

    /**
     * Show success message
     */
    showSuccessMessage(message) {
      console.log("✅ Success:", message);
      // Can integrate with toast notification component
    },

    /**
     * Show error message
     */
    showErrorMessage(message) {
      console.log("❌ Error:", message);
      // Can integrate with toast notification component
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
    this.loadWishlistStatus();
  }
};

export default productDetail;
