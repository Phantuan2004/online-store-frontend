<template>
  <!-- Shop -->
  <section class="section-shop padding-tb-100">
    <div class="container">
      <div class="row">
        <!-- Sidebar Filters -->
        <div
          class="col-lg-3 col-12 md-30"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="400"
        >
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
                    :id="category.id"
                    :value="category.id"
                    v-model="draftSelectedCategories"
                    type="checkbox"
                  />
                  <label :for="category.id">{{ category.name }}</label>
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

            <!-- Color Filter (Optional) -->
            <div class="cr-shop-color">
              <h4 class="cr-shop-sub-title">Colors</h4>
              <div class="cr-checkbox">
                <div class="checkbox-group">
                  <input type="checkbox" id="blue" />
                  <label for="blue">Blue</label>
                  <span class="blue"></span>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="yellow" />
                  <label for="yellow">Yellow</label>
                  <span class="yellow"></span>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="red" />
                  <label for="red">Red</label>
                  <span class="red"></span>
                </div>
              </div>
            </div>

            <!-- Weight Filter (Optional) -->
            <div class="cr-shop-weight">
              <h4 class="cr-shop-sub-title">Weight</h4>
              <div class="cr-checkbox">
                <div class="checkbox-group">
                  <input type="checkbox" id="2kg" />
                  <label for="2kg">2kg Pack</label>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="20kg" />
                  <label for="20kg">20kg Pack</label>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="30kg" />
                  <label for="30kg">30kg pack</label>
                </div>
              </div>
            </div>

            <!-- Clear Filters Button -->
            <div class="cr-shop-tags">
              <button
                type="button"
                class="cr-button w-100"
                @click="clearFilters"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
        <div
          class="col-lg-9 col-12 md-30"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <div class="row">
            <div class="col-12">
              <div class="cr-shop-bredekamp">
                <!-- View Mode Toggle -->
                <div class="cr-toggle">
                  <a
                    @click.prevent="toggleGridView"
                    href="#"
                    class="gridCol"
                    :class="{ 'active-grid': viewMode === 'grid' }"
                    title="Grid view"
                  >
                    <i class="ri-grid-line"></i>
                  </a>
                  <a
                    @click.prevent="toggleViewMode('list')"
                    href="#"
                    class="gridRow"
                    :class="{ 'active-grid': viewMode === 'list' }"
                    title="List view"
                  >
                    <i class="ri-list-check-2"></i>
                  </a>
                </div>

                <!-- Results Count -->
                <div class="center-content">
                  <span>We found {{ resultCount }} items for you!</span>
                </div>

                <!-- Sort Dropdown -->
                <div class="cr-select">
                  <label>Sort By :</label>
                  <select
                    v-model="selectedSort"
                    class="form-select"
                    @change="onSortChange($event.target.value)"
                  >
                    <option
                      v-for="option in sortOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="row col-100 mb-minus-24">
            <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
              @toggle-wishlist="toggleWishlist"
              @quick-view="openQuickView"
              @add-to-cart="addToCart"
            />
          </div>

          <!-- No Products Message -->
          <div v-if="sortedProducts.length === 0" class="col-12 text-center">
            <p class="text-muted" style="padding: 40px 0">
              No products found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>

          <nav aria-label="..." class="cr-pagination">
              <ul class="pagination">
                  <li class="page-item disabled">
                      <span class="page-link">Previous</span>
                  </li>
                  <li class="page-item active" aria-current="page">
                      <span class="page-link">1</span>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                      <a class="page-link" href="#">Next</a>
                  </li>
              </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/user/shop/ProductCard.vue";
import { shopLogic } from "@/components/user/shop/shopLogic";

export default {
  name: "Shop",
  components: {
    ProductCard
  },
  mixins: [shopLogic],

  head() {
    return {
      title: "Shop - Online Store"
    };
  }
};
</script>
