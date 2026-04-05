<template>
  <section class="section-popular-products padding-tb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30">
            <div class="cr-banner">
              <h2>Popular Products</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et viverra maecenas accumsan
                lacus vel facilisis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-popular-product" ref="popularSlider">
            <div
              v-for="product in products"
              :key="product.id"
              class="slick-slide"
            >
              <div class="cr-product-card">
                <!-- Product Image -->
                <div class="cr-product-image">
                  <div class="cr-image-inner zoom-image-hover">
                    <img
                      :src="product.image"
                      :alt="product.title"
                      @click="viewProduct(product)"
                    />
                  </div>
                  <div class="cr-side-view">
                    <a
                      @click.prevent="toggleWishlist(product)"
                      href="#"
                      class="wishlist"
                      title="Add to wishlist"
                    >
                      <i class="ri-heart-line"></i>
                    </a>
                    <a
                      @click.prevent="quickView(product)"
                      href="#"
                      class="model-oraganic-product"
                      title="Quick view"
                    >
                      <i class="ri-eye-line"></i>
                    </a>
                  </div>
                  <a
                    @click.prevent="addToCart(product)"
                    href="#"
                    class="cr-shopping-bag"
                    title="Add to cart"
                  >
                    <i class="ri-shopping-bag-line"></i>
                  </a>
                </div>

                <!-- Product Details -->
                <div class="cr-product-details">
                  <div class="cr-brand">
                    <RouterLink to="/shop">{{ product.category }}</RouterLink>
                    <div class="cr-star">
                      <i
                        v-for="i in 5"
                        :key="i"
                        :class="
                          i <= Math.round(product.rating)
                            ? 'ri-star-fill'
                            : 'ri-star-line'
                        "
                      ></i>
                      <p>({{ product.rating }})</p>
                    </div>
                  </div>
                  <RouterLink
                    :to="`/product/${product.id}`"
                    class="title"
                  >
                    {{ product.title }}
                  </RouterLink>
                  <p class="cr-price">
                    <span class="new-price">${{ formatPrice(product.price) }}</span>
                    <span class="old-price">${{ formatPrice(product.oldPrice) }}</span>
                  </p>
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
  name: "PopularProducts",
  props: {
    products: {
      type: Array,
      required: true,
      validator(products) {
        return Array.isArray(products) && products.length > 0;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initSlick();
      }, 100);
    });
  },
  unmounted() {
    this.destroySlick();
  },
  watch: {
    products: {
      handler() {
        this.destroySlick();
        this.$nextTick(() => {
          setTimeout(() => {
            this.initSlick();
          }, 100);
        });
      },
      deep: true
    }
  },
  methods: {
    initSlick() {
      if (typeof window.$ !== 'undefined') {
        const $slider = window.$(this.$refs.popularSlider);

        if ($slider.length && !$slider.hasClass('slick-initialized')) {
          $slider.slick({
            infinite: true,
            dots: false,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 4,
                  infinite: true,
                }
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  infinite: true,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  infinite: true,
                }
              },
              {
                breakpoint: 481,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
        }
      }
    },
    destroySlick() {
      if (typeof window.$ !== 'undefined') {
        const $slider = window.$(this.$refs.popularSlider);
        if ($slider && $slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }
      }
    },
    /**
     * View product details
     */
    viewProduct(product) {
      this.$emit("product-clicked", product);
    },

    /**
     * Quick view product
     */
    quickView(product) {
      this.$emit("quick-view", product);
    },

    /**
     * Add product to cart
     */
    addToCart(product) {
      this.$emit("add-to-cart", product);
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist(product) {
      this.$emit("wishlist-toggled", product);
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
