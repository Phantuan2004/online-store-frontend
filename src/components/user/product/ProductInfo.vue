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

      <!-- Model Selection -->
      <div v-if="product.models && product.models.length > 0" class="cr-size-weight mb-3">
        <h5><span>Model</span> :</h5>
        <div class="cr-kg">
          <ul>
            <li
              v-for="model in product.models"
              :key="model"
              @click="selectModel(model)"
              :class="{ 'active-color': selectedModel === model }"
            >
              {{ model }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Color Selection -->
      <div v-if="product.colors && product.colors.length > 0" class="cr-size-weight">
        <h5><span>Color</span> :</h5>
        <div class="cr-kg">
          <ul>
            <li
              v-for="color in product.colors"
              :key="color"
              @click="selectColor(color)"
              :class="{ 'active-color': selectedColor === color }"
            >
              {{ color }}
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
    selectedModel: {
      type: String,
      default: ""
    },
    selectedColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    /**
     * Select model
     */
    selectModel(model) {
      this.$emit("model-selected", model);
    },
    /**
     * Select color
     */
    selectColor(color) {
      this.$emit("color-selected", color);
    }
  }
};
</script>

<style scoped>
/* Không cần thêm CSS vì đã dùng chung class của theme Carrot (assets/user/css/style.css) */
</style>
