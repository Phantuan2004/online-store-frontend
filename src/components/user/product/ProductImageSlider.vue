<template>
  <div class="vehicle-detail-banner banner-content clearfix">
    <div class="banner-slider">
      <!-- Main Slider -->
      <div class="slider slider-for">
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
      <div class="slider slider-nav thumb-image">
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
      selectedIndex: 0,
      sliderSettings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: ".slider-nav"
      }
    };
  },
  methods: {
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
