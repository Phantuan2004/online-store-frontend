<template>
  <div class="cr-cart-summary">
    <div class="row">
      <!-- Coupon Section -->
      <div class="col-lg-6 col-12 mb-30">
        <div class="cr-cart-coupon">
          <h3>Apply Coupon</h3>
          <div class="coupon-input-group">
            <input
              v-model="localCouponCode"
              type="text"
              placeholder="Enter coupon code"
              class="cr-coupon-input"
            >
            <button 
              @click="applyCoupon"
              class="cr-button"
            >
              Apply
            </button>
            <button 
              v-if="appliedCoupon"
              @click="removeCoupon"
              class="cr-button btn-secondary"
            >
              Remove
            </button>
          </div>
          <p v-if="appliedCoupon" class="coupon-message">
            Coupon "{{ appliedCoupon }}" applied
          </p>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-lg-6 col-12 mb-30">
        <div class="cr-order-summary">
          <h3>Order Summary</h3>
          
          <!-- Subtotal -->
          <div class="summary-row">
            <span class="label">Subtotal:</span>
            <span class="value">${{ formatPrice(subtotal) }}</span>
          </div>

          <!-- Shipping -->
          <div class="summary-row">
            <span class="label">Shipping:</span>
            <div class="shipping-options">
              <label v-for="method in shippingMethods" :key="method.id" class="shipping-option">
                <input 
                  type="radio" 
                  :value="method.id"
                  :checked="selectedShipping === method.id"
                  @change="updateShipping(method.id)"
                >
                <span class="method-name">{{ method.name }}</span>
                <span class="method-price">${{ formatPrice(method.price) }}</span>
              </label>
            </div>
            <span v-if="freeShippingEligible" class="free-shipping-badge">FREE</span>
          </div>

          <!-- Tax -->
          <div class="summary-row">
            <span class="label">Tax ({{ taxRate }}%):</span>
            <span class="value">${{ formatPrice(tax) }}</span>
          </div>

          <!-- Discount -->
          <div v-if="discount > 0" class="summary-row discount-row">
            <span class="label">Discount:</span>
            <span class="value discount">-${{ formatPrice(discount) }}</span>
          </div>

          <!-- Total -->
          <div class="summary-row total-row">
            <span class="label">Total:</span>
            <span class="value total">${{ formatPrice(total) }}</span>
          </div>

          <!-- Checkout Button -->
          <button 
            @click="proceedCheckout"
            :disabled="isCartEmpty"
            class="cr-button btn-checkout w-100"
          >
            Proceed to Checkout
          </button>

          <!-- Continue Shopping -->
          <a 
            href="javascript:void(0)"
            @click="continueShopping"
            class="cr-links d-block text-center mt-10"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    appliedCoupon: {
      type: String,
      default: ''
    },
    isCartEmpty: {
      type: Boolean,
      default: false
    },
    shippingMethods: {
      type: Array,
      default: () => [
        { id: 'standard', name: 'Standard Shipping', price: 5.00 },
        { id: 'express', name: 'Express Shipping', price: 12.00 },
        { id: 'free', name: 'Free Shipping', price: 0 }
      ]
    },
    selectedShipping: {
      type: String,
      default: 'standard'
    },
    taxRate: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      localCouponCode: ''
    };
  },

  computed: {
    /**
     * Check if free shipping is eligible
     */
    freeShippingEligible() {
      return this.shipping === 0;
    }
  },

  methods: {
    /**
     * Apply coupon code
     */
    applyCoupon() {
      if (this.localCouponCode.trim()) {
        this.$emit('coupon-applied', this.localCouponCode);
      }
    },

    /**
     * Remove coupon
     */
    removeCoupon() {
      this.localCouponCode = '';
      this.$emit('coupon-removed');
    },

    /**
     * Update shipping method
     */
    updateShipping(method) {
      this.$emit('shipping-changed', method);
    },

    /**
     * Proceed to checkout
     */
    proceedCheckout() {
      this.$emit('checkout-clicked');
    },

    /**
     * Continue shopping
     */
    continueShopping() {
      this.$emit('continue-shopping-clicked');
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
