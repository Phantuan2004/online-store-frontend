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
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        return (
          product.id &&
          product.name &&
          product.rating !== undefined
        );
      }
    },
    selectedSize: {
      type: String,
      default: ""
    }
  },
  methods: {
    /**
     * Select size
     */
    selectSize(size) {
      this.$emit("size-selected", size);
    }
  }
};
</script>

<style scoped>
/* Không cần thêm CSS vì đã dùng chung class của theme Carrot (assets/user/css/style.css) */
</style>
