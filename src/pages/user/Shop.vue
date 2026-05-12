<template>
  <!-- Shop -->
  <section class="section-shop padding-tb-100">
    <div class="container">
      <div class="row">
        <!-- Sidebar Filters -->
        <div
          class="col-lg-3 col-12 md-30"
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
              <h4 class="cr-shop-sub-title">Price Range</h4>
              <div class="price-range-slider">
                <div class="d-flex align-items-center mb-3">
                  <div class="flex-grow-1">
                    <label class="small text-muted mb-1">Min ($)</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      v-model.number="draftPriceRange[0]"
                      :min="priceBounds.min"
                      :max="draftPriceRange[1]"
                    />
                  </div>
                  <div class="mx-2 mt-3 text-muted">-</div>
                  <div class="flex-grow-1">
                    <label class="small text-muted mb-1">Max ($)</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      v-model.number="draftPriceRange[1]"
                      :min="draftPriceRange[0]"
                      :max="priceBounds.max"
                    />
                  </div>
                </div>
                <button type="button" class="cr-button w-100" @click="applyFilters">
                  Filter
                </button>
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

          <!-- Loading State -->
          <div v-if="isLoading" class="row col-100 mb-minus-24 justify-content-center" style="padding: 100px 0;">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="sortedProducts.length > 0" class="row col-100 mb-minus-24">
            <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
              @toggle-wishlist="toggleWishlist"
              @quick-view="openQuickView"
              @add-to-cart="addToCart"
            />
          </div>

          <!-- Error Message -->
          <div v-else-if="error" class="col-12 text-center">
            <p class="text-danger" style="padding: 40px 0">
              {{ error }}
            </p>
          </div>

          <!-- No Products Message -->
          <div v-else class="col-12 text-center">
            <p class="text-muted" style="padding: 40px 0">
              No products found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>

          <nav aria-label="Shop pagination" class="cr-pagination cr-pagination-custom">
              <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                  </li>
                  <li
                      v-for="page in totalPages"
                      :key="page"
                      class="page-item"
                      :class="{ active: currentPage === page }"
                      :aria-current="currentPage === page ? 'page' : undefined"
                  >
                      <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
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
<style scoped>
/* ===== PAGINATION ===== */
.cr-pagination-custom .pagination {
    gap: 4px;
    justify-content: center;
    margin: 0;
}

.cr-pagination-custom .page-link {
    font-size: 13px;
    padding: 5px 11px;
    border-radius: 6px !important;
    border-color: #eee;
    color: #555;
    transition: all 0.2s;
}

.cr-pagination-custom .page-link:hover {
    background-color: #f5f5f5;
    border-color: #ddd;
    color: #333;
}

.cr-pagination-custom .page-item.active .page-link {
    background-color: #64b496;
    border-color: #64b496;
    color: #fff;
}

.cr-pagination-custom .page-item.disabled .page-link {
    color: #ccc;
    border-color: #eee;
    background-color: #fafafa;
}
</style>
