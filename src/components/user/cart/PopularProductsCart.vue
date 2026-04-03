<template>
  <section class="section-popular-products padding-t-100 padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title text-center mb-30">
            <h2 class="cr-title">Popular Products</h2>
            <p>A wide range of quality brands catering to everyone</p>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="row">
        <div class="col-lg-12">
          <div class="products-carousel">
            <div class="row">
              <div v-for="product in products" :key="product.id" class="col-xl-3 col-lg-4 col-md-6 col-12 mb-24">
                <div class="cr-product-card">
                  <!-- Product Image -->
                  <div class="cr-product-image">
                    <div class="cr-image-inner zoom-image-hover">
                      <img :src="product.image" :alt="product.name">
                    </div>
                    <div class="cr-side-view">
                      <a href="javascript:void(0)" class="wishlist" @click="toggleWishlist(product)">
                        <i class="ri-heart-line"></i>
                      </a>
                      <a href="javascript:void(0)" @click="quickView(product)">
                        <i class="ri-eye-line"></i>
                      </a>
                    </div>
                    <a href="javascript:void(0)" class="cr-shopping-bag" @click="addToCart(product)">
                      <i class="ri-shopping-bag-line"></i>
                    </a>
                  </div>

                  <!-- Product Details -->
                  <div class="cr-product-details">
                    <!-- Category -->
                    <div class="cr-brand">
                      <a href="javascript:void(0)">{{ product.category }}</a>
                      <!-- Rating -->
                      <div class="cr-star">
                        <i 
                          v-for="star in 5"
                          :key="star"
                          :class="star <= Math.round(product.rating) ? 'ri-star-fill' : 'ri-star-line'"
                          class="ri-star"
                        ></i>
                        <p>({{ product.rating }})</p>
                      </div>
                    </div>

                    <!-- Product Name -->
                    <a href="javascript:void(0)" class="title" @click="viewProduct(product)">
                      {{ product.name }}
                    </a>

                    <!-- Price -->
                    <p class="cr-price">
                      <span class="new-price">${{ formatPrice(product.price) }}</span>
                      <span v-if="product.oldPrice" class="old-price">
                        ${{ formatPrice(product.oldPrice) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopularProductsCart',
  props: {
    products: {
      type: Array,
      required: true,
      validator(products) {
        return products.every(product =>
          product.id &&
          product.name &&
          product.image &&
          product.price &&
          product.category
        );
      }
    }
  },

  methods: {
    /**
     * Add product to cart
     */
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },

    /**
     * View product details
     */
    viewProduct(product) {
      this.$emit('product-clicked', product);
    },

    /**
     * Quick view modal
     */
    quickView(product) {
      this.$emit('quick-view', product);
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist(product) {
      this.$emit('wishlist-toggled', product);
    },

    /**
     * Format price
     */
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    }
  }
};
</script>
