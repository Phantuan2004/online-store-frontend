<template>
  <div class="cr-shop-sideview">
    <!-- Categories Filter -->
    <div class="cr-shop-categories">
      <h4 class="cr-shop-sub-title">Category</h4>
      <div class="cr-checkbox">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="checkbox-group"
        >
          <input 
            :id="`category-${category.id}`"
            type="checkbox" 
            :checked="selectedCategories.includes(category.id)"
            @change="toggleCategory(category.id)"
          >
          <label :for="`category-${category.id}`">{{ category.name }}</label>
          <span>[{{ category.count }}]</span>
        </div>
      </div>
    </div>

    <!-- Price Filter -->
    <div class="cr-shop-price">
        <h4 class="cr-shop-sub-title">Price</h4>
        <div class="price-range-slider">
        <div id="slider-range" ref="priceSlider" class="range-bar"></div>
        <p class="range-value">
            <label>Price :</label>
            <input
            type="text"
            readonly
            :value="`$${draftPriceRange[0]} - $${draftPriceRange[1]}`"
            />
        </p>
        <button type="button" class="cr-button" @click="applyFilters">
            Filter
        </button>
        </div>
    </div>

    <!-- Colors Filter -->
    <div class="cr-shop-color">
      <h4 class="cr-shop-sub-title">Colors</h4>
      <div class="cr-checkbox">
        <div 
          v-for="color in colors" 
          :key="color.id"
          class="checkbox-group"
        >
          <input 
            :id="`color-${color.id}`"
            type="checkbox" 
            :checked="selectedColors.includes(color.id)"
            @change="toggleColor(color.id)"
          >
          <label :for="`color-${color.id}`">{{ color.name }}</label>
          <span :class="color.class"></span>
        </div>
      </div>
    </div>

    <!-- Weight Filter -->
    <div class="cr-shop-weight">
      <h4 class="cr-shop-sub-title">Weight</h4>
      <div class="cr-checkbox">
        <div 
          v-for="weight in weights" 
          :key="weight.id"
          class="checkbox-group"
        >
          <input 
            :id="`weight-${weight.id}`"
            type="checkbox" 
            :checked="selectedWeights.includes(weight.id)"
            @change="toggleWeight(weight.id)"
          >
          <label :for="`weight-${weight.id}`">{{ weight.name }}</label>
        </div>
      </div>
    </div>

    <!-- Tags Filter -->
    <div class="cr-shop-tags">
      <h4 class="cr-shop-sub-title">Tags</h4>
      <div class="cr-shop-tags-inner">
        <ul class="cr-tags">
          <li 
            v-for="tag in tags" 
            :key="tag.id"
            :class="{ active: selectedTags.includes(tag.id) }"
          >
            <a 
              href="javascript:void(0)"
              @click.prevent="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { shopLogic } from '@/components/user/shop/shopLogic';

export default {
  name: 'FilterSidebar',
  mixins: [shopLogic],
  data() {
    return {
      selectedCategories: [],
      selectedColors: [],
      selectedWeights: [],
      selectedTags: [],
      minPrice: 0,
      maxPrice: 500,
      categories: [
        { id: 1, name: 'Juice & Drinks', count: 20 },
        { id: 2, name: 'Dairy & Milk', count: 54 },
        { id: 3, name: 'Snack & Spice', count: 64 }
      ],
      colors: [
        { id: 1, name: 'Blue', class: 'blue' },
        { id: 2, name: 'Yellow', class: 'yellow' },
        { id: 3, name: 'Red', class: 'red' },
        { id: 4, name: 'Green', class: 'green' }
      ],
      weights: [
        { id: 1, name: '2kg Pack' },
        { id: 2, name: '20kg Pack' },
        { id: 3, name: '30kg Pack' }
      ],
      tags: [
        { id: 1, name: 'Vegetables' },
        { id: 2, name: 'Juice' },
        { id: 3, name: 'Food' },
        { id: 4, name: 'Dry Fruits' }
      ]
    };
  },
  methods: {
    /**
     * Toggle category selection
     */
    toggleCategory(categoryId) {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(categoryId);
      }
      this.emitFilterChange();
    },

    /**
     * Toggle color selection
     */
    toggleColor(colorId) {
      const index = this.selectedColors.indexOf(colorId);
      if (index > -1) {
        this.selectedColors.splice(index, 1);
      } else {
        this.selectedColors.push(colorId);
      }
      this.emitFilterChange();
    },

    /**
     * Toggle weight selection
     */
    toggleWeight(weightId) {
      const index = this.selectedWeights.indexOf(weightId);
      if (index > -1) {
        this.selectedWeights.splice(index, 1);
      } else {
        this.selectedWeights.push(weightId);
      }
      this.emitFilterChange();
    },

    /**
     * Toggle tag selection
     */
    toggleTag(tagId) {
      const index = this.selectedTags.indexOf(tagId);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tagId);
      }
      this.emitFilterChange();
    },

    /**
     * Apply price filter
     */
    applyPriceFilter() {
      this.emitFilterChange();
    },

    /**
     * Emit filter change event
     */
    emitFilterChange() {
      this.$emit('filters-changed', {
        categories: this.selectedCategories,
        colors: this.selectedColors,
        weights: this.selectedWeights,
        tags: this.selectedTags,
        priceRange: {
          min: this.minPrice,
          max: this.maxPrice
        }
      });
    },

    /**
     * Reset all filters
     */
    resetFilters() {
      this.selectedCategories = [];
      this.selectedColors = [];
      this.selectedWeights = [];
      this.selectedTags = [];
      this.minPrice = 0;
      this.maxPrice = 500;
      this.emitFilterChange();
    }
  }
};
</script>

<style scoped>
/* Using existing CSS classes from assets/user/css/style.css */
</style>
