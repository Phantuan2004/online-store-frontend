<template>
  <div class="cr-size-and-weight-contain">
    <!-- Title -->
    <h2 class="heading">{{ product.name }}</h2>
    <p class="product-description">{{ product.description }}</p>

    <!-- Rating & Reviews -->
    <div class="cr-size-and-weight">
      <div class="cr-review-star">
        <div class="cr-star">
          <i
            v-for="i in 5"
            :key="i"
            :class="i <= Math.round(product.rating) ? 'ri-star-fill' : 'ri-star-line'"
          ></i>
        </div>
        <p>({{ product.reviews }} Review{{ product.reviews !== 1 ? "s" : "" }})</p>
      </div>

      <!-- Specs List -->
      <div class="list">
        <ul>
          <li v-for="(value, key) in product.specs" :key="key">
            <label>{{ key }}<span>:</span></label>{{ value }}
          </li>
        </ul>
      </div>

      <!-- Price Section -->
      <div class="cr-product-price">
        <span class="new-price">${{ formatPrice(product.price) }}</span>
        <span class="old-price">${{ formatPrice(product.oldPrice) }}</span>
        <span v-if="discountPercentage > 0" class="discount-badge">
          -{{ discountPercentage }}%
        </span>
      </div>

      <!-- Size/Weight Selection -->
      <div v-if="product.sizes && product.sizes.length > 0" class="cr-size-weight">
        <h5><span>Size</span>/<span>Weight</span> :</h5>
        <div class="cr-kg">
          <ul>
            <li
              v-for="size in product.sizes"
              :key="size"
              @click="selectSize(size)"
              :class="{ 'active-color': selectedSize === size }"
            >
              {{ size }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Quantity & Add to Cart -->
      <div class="cr-add-card">
        <!-- Quantity Control -->
        <div class="cr-qty-main">
          <button
            type="button"
            @click="decrementQuantity"
            class="minus"
            :disabled="quantity <= 1"
            title="Decrease quantity"
          >
            −
          </button>
          <input
            :value="quantity"
            type="number"
            placeholder="1"
            min="1"
            class="quantity"
            @input="onQuantityInput"
            @change="sanitizeQuantity"
          />
          <button
            type="button"
            @click="incrementQuantity"
            class="plus"
            title="Increase quantity"
          >
            +
          </button>
        </div>

        <!-- Add to Cart Button -->
        <div class="cr-add-button">
          <button
            type="button"
            class="cr-button cr-shopping-bag"
            @click="addToCart"
            :disabled="!isInStock"
          >
            {{ isInStock ? "Add to cart" : "Out of Stock" }}
          </button>
        </div>

        <!-- Wishlist & Quick View -->
        <div class="cr-card-icon">
          <a
            @click.prevent="toggleWishlist"
            href="#"
            class="wishlist"
            :class="{ active: inWishlist }"
            :title="inWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
          >
            <i class="ri-heart-line"></i>
          </a>
          <a
            href="#"
            class="model-oraganic-product"
            @click.prevent="openQuickView"
            title="Quick view"
          >
            <i class="ri-eye-line"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        return (
          product.id &&
          product.name &&
          product.price !== undefined &&
          product.rating !== undefined
        );
      }
    },
    quantity: {
      type: Number,
      default: 1
    },
    selectedSize: {
      type: String,
      default: ""
    },
    inWishlist: {
      type: Boolean,
      default: false
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    isInStock: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * Increment quantity
     */
    incrementQuantity() {
      this.$emit("quantity-changed", this.quantity + 1);
    },

    /**
     * Decrement quantity
     */
    decrementQuantity() {
      if (this.quantity > 1) {
        this.$emit("quantity-changed", this.quantity - 1);
      }
    },

    /**
     * Sanitize quantity input
     */
    sanitizeQuantity(event) {
      let value = parseInt(event.target.value);
      if (isNaN(value) || value < 1) {
        value = 1;
      }
      this.$emit("quantity-changed", value);
    },

    /**
     * Sync quantity input without mutating the prop directly
     */
    onQuantityInput(event) {
      const value = parseInt(event.target.value);
      this.$emit("quantity-changed", isNaN(value) ? 1 : value);
    },

    /**
     * Select size
     */
    selectSize(size) {
      this.$emit("size-selected", size);
    },

    /**
     * Add to cart
     */
    addToCart() {
      this.$emit("add-to-cart", {
        quantity: this.quantity,
        size: this.selectedSize
      });
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist() {
      this.$emit("wishlist-toggled");
    },

    /**
     * Open quick view
     */
    openQuickView() {
      this.$emit("quick-view");
    },

    /**
     * Format price
     */
    formatPrice(price) {
      return price.toFixed(2);
    }
  }
};
</script>

<style scoped>
/* Using existing CSS classes from assets/user/css/style.css */
</style>
