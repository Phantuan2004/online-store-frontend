<template>
  <section class="section-popular-products padding-t-50 padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30">
            <div class="cr-banner">
              <h2>Popular Products</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et viverra maecenas accumsan lacus vel facilisis.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div ref="slider" class="cr-popular-product">
            <div
              v-for="product in products"
              :key="product.id"
              class="slick-slide"
            >
              <div class="cr-product-card">
                <div class="cr-product-image">
                  <div class="cr-image-inner zoom-image-hover">
                    <img :src="product.image" :alt="product.name">
                  </div>
                  <div class="cr-side-view">
                    <a href="#" class="wishlist" @click.prevent="toggleWishlist(product)">
                      <i class="ri-heart-line"></i>
                    </a>
                    <a href="#" class="model-oraganic-product" @click.prevent="quickView(product)">
                      <i class="ri-eye-line"></i>
                    </a>
                  </div>
                  <a href="#" class="cr-shopping-bag" @click.prevent="addToCart(product)">
                    <i class="ri-shopping-bag-line"></i>
                  </a>
                </div>
                <div class="cr-product-details">
                  <div class="cr-brand">
                    <a href="#" @click.prevent="viewProduct(product)">{{ product.category }}</a>
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
                  <a href="#" class="title" @click.prevent="viewProduct(product)">
                    {{ product.name }}
                  </a>
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

  mounted() {
    this.$nextTick(() => {
      this.initSlider();
    });
  },

  beforeUnmount() {
    this.destroyZoom();
    this.destroySlider();
  },

  methods: {
    getSlider() {
      const $ = window.jQuery || window.$;

      if (!this.$refs.slider || !$ || typeof $.fn?.slick !== 'function') {
        return null;
      }

      return $(this.$refs.slider);
    },

    getZoomTargets() {
      const $ = window.jQuery || window.$;

      if (!$ || typeof $.fn?.zoom !== 'function') {
        return null;
      }

      return $(this.$el).find('.zoom-image-hover');
    },

    initSlider() {
      const slider = this.getSlider();

      if (!slider?.length) {
        this.initZoom();
        return;
      }

      if (slider.hasClass('slick-initialized')) {
        this.initZoom();
        return;
      }

      slider.on('init.popularProducts reInit.popularProducts', () => {
        this.initZoom();
      });

      slider.slick({
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
    },

    destroySlider() {
      const slider = this.getSlider();

      if (!slider?.length) {
        return;
      }

      slider.off('.popularProducts');

      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
    },

    initZoom() {
      const $ = window.jQuery || window.$;
      const zoomTargets = this.getZoomTargets();

      if (!zoomTargets?.length || !$) {
        return;
      }

      zoomTargets.each((_index, element) => {
        const $element = $(element);
        $element.trigger('zoom.destroy');
        $element.zoom();
      });
    },

    destroyZoom() {
      const zoomTargets = this.getZoomTargets();

      if (zoomTargets?.length) {
        zoomTargets.trigger('zoom.destroy');
      }
    },

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
