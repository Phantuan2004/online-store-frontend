<template>
  <div class="vehicle-detail-banner banner-content clearfix">
    <div class="banner-slider">
      <!-- Main Slider -->
      <div class="slider slider-for" ref="sliderFor">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="slider-banner-image"
        >
          <div class="zoom-image-hover">
            <img :src="image" :alt="`product-image-${index + 1}`" class="product-image" />
          </div>
        </div>
      </div>

      <!-- Thumbnail Slider -->
      <div class="slider slider-nav thumb-image" ref="sliderNav">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="thumbnail-image"
          @click="selectImage(index)"
          :class="{ active: selectedIndex === index }"
        >
          <div class="thumbImg">
            <img :src="image" :alt="`thumbnail-${index + 1}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductImageSlider",
  props: {
    images: {
      type: Array,
      required: true,
      validator(images) {
        return Array.isArray(images) && images.length > 0;
      }
    }
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  mounted() {
    // We need a slight delay to ensure DOM is fully rendered with v-for items
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
    images: {
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
        const $sliderFor = window.$(this.$refs.sliderFor);
        const $sliderNav = window.$(this.$refs.sliderNav);

        if ($sliderFor.length && !$sliderFor.hasClass('slick-initialized')) {
          $sliderFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: $sliderNav
          });
        }

        if ($sliderNav.length && !$sliderNav.hasClass('slick-initialized')) {
          $sliderNav.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: $sliderFor,
            focusOnSelect: true,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 5,
                }
              },
              {
                breakpoint: 420,
                settings: {
                  slidesToShow: 4,
                }
              }
            ]
          });
        }
      }
    },
    destroySlick() {
      if (typeof window.$ !== 'undefined') {
        const $sliderFor = window.$(this.$refs.sliderFor);
        const $sliderNav = window.$(this.$refs.sliderNav);
        
        if ($sliderFor && $sliderFor.hasClass('slick-initialized')) {
          $sliderFor.slick('unslick');
        }
        if ($sliderNav && $sliderNav.hasClass('slick-initialized')) {
          $sliderNav.slick('unslick');
        }
      }
    },
    /**
     * Select image by index
     */
    selectImage(index) {
      this.selectedIndex = index;
      this.$emit("image-selected", {
        index,
        image: this.images[index]
      });
    },

    /**
     * Get selected image
     */
    getSelectedImage() {
      return this.images[this.selectedIndex];
    }
  }
};
</script>

<style scoped>
/* Using existing CSS classes from assets/user/css/style.css */
</style>
