<template>
  <div class="product-action-box">
    <div class="cr-size-and-weight p-0 m-0 border-0">
      <!-- Price Section -->
      <div class="cr-product-price mb-3 d-flex align-items-center" style="line-height: 1.2;">
        <span class="new-price">${{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="old-price ms-2">${{ formatPrice(product.oldPrice) }}</span>
        <span v-if="discountPercentage > 0" class="discount-badge text-danger fw-bold ms-2" style="font-size: 15px; margin-top: 2px;">
          -{{ discountPercentage }}%
        </span>
      </div>
      
      <!-- Stock Status -->
      <div class="stock-status mb-4">
         <span v-if="isInStock" class="text-success fw-medium"><i class="ri-checkbox-circle-line"></i> In Stock</span>
         <span v-else class="text-danger fw-medium"><i class="ri-close-circle-line"></i> Out of Stock</span>
      </div>

      <div class="cr-add-card flex-column align-items-stretch border-0 p-0 m-0">
        <!-- Quantity Control -->
        <h6 class="mb-2 fs-14 text-muted">Quantity:</h6>
        <div class="action-qty-box mb-3 w-100">
          <button type="button" class="action-minus" @click="decreaseQuantity">-</button>
          <input
            :value="quantity"
            @input="updateQuantity"
            type="number"
            class="action-quantity text-center border-0"
          />
          <button type="button" class="action-plus" @click="increaseQuantity">+</button>
        </div>

        <!-- Add to Cart Button -->
        <div class="mb-3 w-100">
          <button
            type="button"
            class="cr-button w-100 m-0 custom-add-btn"
            @click="addToCart"
            :disabled="!isInStock"
          >
            {{ isInStock ? "Add to cart" : "Out of Stock" }}
          </button>
        </div>

        <!-- Wishlist -->
        <div class="custom-wishlist-box d-flex justify-content-center w-100 mt-2">
          <button
            @click.prevent="toggleWishlist"
            class="btn w-100 rounded-2 d-flex align-items-center justify-content-center gap-2 custom-wishlist-btn"
            :class="{ 'btn-danger text-white': inWishlist, 'btn-outline-secondary': !inWishlist }"
            style="height: 48px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;"
          >
            <i class="fs-5" :class="{'ri-heart-fill text-white': inWishlist, 'ri-heart-line': !inWishlist}"></i> 
            <span>{{ inWishlist ? "Saved to Wishlist" : "Add to Wishlist" }}</span>
          </button>
        </div>
      </div>
      
      <hr class="my-4" style="border-color: #eee;">

      <!-- Trust Badges -->
      <div class="trust-badges">
          <div class="d-flex align-items-center mb-3">
              <div class="icon-box bg-light rounded d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 40px; height: 40px;">
                  <i class="ri-truck-line text-primary fs-4"></i>
              </div>
              <div>
                  <h6 class="mb-0 fs-14 fw-bold">Free Delivery</h6>
                  <small class="text-muted">Enter your Postal code for Delivery Availability</small>
              </div>
          </div>
          <div class="d-flex align-items-center mb-3">
              <div class="icon-box bg-light rounded d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 40px; height: 40px;">
                  <i class="ri-shield-check-line text-success fs-4"></i>
              </div>
              <div>
                   <h6 class="mb-0 fs-14 fw-bold">100% Secure Payment</h6>
                   <small class="text-muted">Return policy within 30 days</small>
              </div>
          </div>
          <div class="d-flex align-items-center">
              <div class="icon-box bg-light rounded d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 40px; height: 40px;">
                  <i class="ri-loop-right-line text-info fs-4"></i>
              </div>
              <div>
                   <h6 class="mb-0 fs-14 fw-bold">30 Days Return</h6>
                   <small class="text-muted">If goods have problems</small>
              </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ProductActionBox",
  props: {
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
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
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.$emit("quantity-changed", this.quantity - 1);
      }
    },
    increaseQuantity() {
      this.$emit("quantity-changed", this.quantity + 1);
    },
    updateQuantity(event) {
      let val = parseInt(event.target.value);
      if (isNaN(val) || val < 1) val = 1;
      this.$emit("quantity-changed", val);
    },
    addToCart() {
      this.$emit("add-to-cart", {
        quantity: this.quantity
      });
    },
    toggleWishlist() {
      this.$emit("wishlist-toggled");
    },
    formatPrice(price) {
      if (!price && price !== 0) return '0.00';
      return price.toFixed(2);
    }
  }
};
</script>

<style scoped>
.product-action-box {
  border: 1px solid #efefef;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 24px;
}

.product-action-box .cr-product-price {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
}

.fs-14 {
    font-size: 14px;
}

.action-qty-box {
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 6px 8px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.action-qty-box button {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #f5f5f5;
    color: #333;
    transition: all 0.2s;
    border: none;
    font-size: 18px;
}

.action-qty-box button:hover {
    background-color: #64b496; /* Primary color */
    color: #fff;
}

.action-qty-box input {
    width: 60px;
    font-weight: 600;
    font-size: 16px;
    color: #444;
}

.action-qty-box input:focus {
    outline: none;
}

/* Hide native number spinner */
.action-qty-box input::-webkit-outer-spin-button,
.action-qty-box input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.action-qty-box input[type=number] {
  -moz-appearance: textfield;
}

.custom-add-btn {
    height: 48px;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.custom-wishlist-btn {
    border-color: #e5e5e5;
    color: #555;
}

.custom-wishlist-btn:hover:not(.btn-danger) {
    background-color: #f8f9fa;
    color: #333;
    border-color: #d5d5d5;
}

.icon-box i {
    line-height: 1;
}

/* Remove default cr-add-card flex row styles for this box */
.product-action-box .cr-add-card {
    display: flex !important;
    flex-direction: column !important;
}
</style>
