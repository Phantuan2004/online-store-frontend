<template>
  <div class="col-xxl-3 col-xl-4 col-6 cr-product-box mb-24">
    <div class="cr-product-card">
      <!-- Product Image Section -->
      <div class="cr-product-image">
        <div class="cr-image-inner zoom-image-hover">
          <img :src="product.image" :alt="product.title" />
        </div>
        <div class="cr-side-view">
          <a 
            @click.prevent="toggleWishlist" 
            href="#" 
            class="wishlist"
            :class="{ 'active': isInWishlist }"
            :title="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
          >
            <i class="ri-heart-line"></i>
          </a>
          <a
            @click.prevent="openQuickView"
            href="#"
            class="model-oraganic-product"
            title="Quick view"
          >
            <i class="ri-eye-line"></i>
          </a>
        </div>
        <a 
          @click.prevent="addToCart" 
          href="#" 
          class="cr-shopping-bag"
          title="Add to cart"
        >
          <i class="ri-shopping-bag-line"></i>
        </a>
      </div>

      <!-- Product Details Section -->
      <div class="cr-product-details">
        <div class="cr-brand">
          <a href="#" @click.prevent="filterByCategory">{{ product.category }}</a>
          <div class="cr-star">
            <i 
              v-for="i in 5" 
              :key="i"
              :class="i <= Math.round(product.rating) ? 'ri-star-fill' : 'ri-star-line'"
              class="ri-star"
            ></i>
            <p>({{ product.rating }})</p>
          </div>
        </div>
        
        <router-link 
          :to="`/product/${product.id}`" 
          class="title"
        >
          {{ product.title }}
        </router-link>
        
        <p class="text">
          {{ product.description }}
        </p>
        
        <ul class="list">
          <li v-for="(value, key) in product.specs" :key="key">
            <label>{{ key }}:</label>{{ value }}
          </li>
        </ul>
        
        <p class="cr-price">
          <span class="new-price">${{ formatPrice(product.price) }}</span>
          <span class="old-price">${{ formatPrice(product.oldPrice) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        return (
          product.id &&
          product.title &&
          product.category &&
          product.image &&
          product.price !== undefined &&
          product.rating !== undefined
        );
      }
    }
  },
  data() {
    return {
      isInWishlist: false
    };
  },
  methods: {
    toggleWishlist() {
      this.isInWishlist = !this.isInWishlist;
      this.$emit("toggle-wishlist", {
        productId: this.product.id,
        inWishlist: this.isInWishlist
      });
    },
    openQuickView() {
      this.$emit("quick-view", this.product);
    },
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
    filterByCategory() {
      this.$emit("filter-by-category", this.product.category);
    },
    formatPrice(price) {
      return price.toFixed(2);
    }
  }
};
</script>
