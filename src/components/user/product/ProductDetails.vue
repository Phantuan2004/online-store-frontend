<template>
  <!-- Model -->
    <div class="modal fade quickview-modal" id="quickview" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered cr-modal-dialog">
            <div class="modal-content">
                <button type="button" class="cr-close-model btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-5 col-sm-12 col-xs-12">
                            <div class="zoom-image-hover modal-border-image">
                                <img src="@/assets/user/img/product/tab-1.jpg" alt="product-tab-2" class="product-image">
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-12 col-xs-12">
                            <div class="cr-size-and-weight-contain">
                                <h2 class="heading">Peach Seeds Of Change Oraganic Quinoa, Brown fruit</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                    since the 1900s,</p>
                            </div>
                            <div class="cr-size-and-weight">
                                <div class="cr-review-star">
                                    <div class="cr-star">
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                    </div>
                                    <p>( 75 Review )</p>
                                </div>
                                <div class="cr-product-price">
                                    <span class="new-price">$120.25</span>
                                    <span class="old-price">$123.25</span>
                                </div>
                                <div class="cr-size-weight">
                                    <h5><span>Size</span>/<span>Weight</span> :</h5>
                                    <div class="cr-kg">
                                        <ul>
                                            <li class="active-color">500gm</li>
                                            <li>1kg</li>
                                            <li>2kg</li>
                                            <li>5kg</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="cr-add-card">
                                    <div class="cr-qty-main">
                                        <input type="text" placeholder="." value="1" minlength="1" maxlength="20"
                                            class="quantity">
                                        <button type="button" id="add_model" class="plus">+</button>
                                        <button type="button" id="sub_model" class="minus">-</button>
                                    </div>
                                    <div class="cr-add-button">
                                        <button type="button" class="cr-button cr-shopping-bag">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

      <!-- Price Section -->
      <div class="cr-product-price">
        <span class="new-price">${{ formatPrice(product.price) }}</span>
        <span class="old-price">${{ formatPrice(product.oldPrice) }}</span>
        <span v-if="discountPercentage > 0" class="discount-badge">
          -{{ discountPercentage }}%
        </span>
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

      <!-- Quantity & Add to Cart -->
      <div class="cr-add-card">
        <!-- Quantity Control -->
        <div class="cr-qty-main">
          <button type="button" class="minus">-</button>
          <input
            :value="quantity"
            type="number"
            placeholder="1"
            min="1"
            class="quantity"
          />
          <button type="button" class="plus">+</button>
        </div>

        <!-- Add to Cart Button -->
        <div class="cr-add-button">
          <button
            type="button"
            class="cr-button cr-shopping-bag"
            @click="addToCart"
            :disabled="!isInStock"
          >
            {{ isInStock ? "Add to cart" : "Out of Stock" }}
          </button>
        </div>

        <!-- Wishlist & Quick View -->
        <div class="cr-card-icon">
          <a
            @click.prevent="toggleWishlist"
            href="#"
            class="wishlist"
            :class="{ active: inWishlist }"
            :title="inWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
          >
            <i class="ri-heart-line"></i>
          </a>
          <a class="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
              <i class="ri-eye-line"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "ProductDetails",
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        return (
          product.id &&
          product.name &&
          product.price !== undefined &&
          product.rating !== undefined
        );
      }
    },
    quantity: {
      type: Number,
      default: 1
    },
    selectedSize: {
      type: String,
      default: ""
    },
    inWishlist: {
      type: Boolean,
      default: false
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    isInStock: {
      type: Boolean,
      default: true
    }
  },
  methods: {

    /**
     * Select size
     */
    selectSize(size) {
      this.$emit("size-selected", size);
    },

    /**
     * Add to cart
     */
    addToCart() {
      this.$emit("add-to-cart", {
        quantity: this.quantity,
        size: this.selectedSize
      });
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist() {
      this.$emit("wishlist-toggled");
    },

    /**
     * Open quick view 
     */
    openQuickView() {
      this.$emit("quick-view");
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
