<template>
  <div class="cr-table-content">
    <!-- Empty Cart Message -->
    <div v-if="items.length === 0" class="text-center py-5">
      <p class="text-muted">Your cart is empty</p>
      <a href="javascript:void(0)" @click="continueShopping" class="cr-button">
        Continue Shopping
      </a>
    </div>

    <!-- Cart Table -->
    <table v-else>
      <thead>
        <tr>
          <th class="cr-cart-col-product">Product</th>
          <th class="cr-cart-col-price">Price</th>
          <th class="cr-cart-col-qty text-center">Quantity</th>
          <th class="cr-cart-col-total">Total</th>
          <th class="cr-cart-col-action">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <!-- Product Name with Image -->
          <td class="cr-cart-name">
            <a href="javascript:void(0)" @click="viewProduct(item)">
              <img :src="item.image" :alt="item.name" class="cr-cart-img">
              {{ item.name }}
            </a>
          </td>

          <!-- Price -->
          <td class="cr-cart-price">
            <span class="amount">${{ formatPrice(item.price) }}</span>
          </td>

          <!-- Quantity -->
          <td class="cr-cart-qty">
            <div class="cart-qty-plus-minus">
              <button type="button" class="plus" @click="incrementQuantity(item.id)">+</button>
              <input
                type="number"
                v-model.number="item.quantity"
                @change="updateQuantity(item.id, item.quantity)"
                min="1"
                class="quantity"
              >
              <button 
                type="button" 
                class="minus" 
                @click="decrementQuantity(item.id)"
                :disabled="item.quantity <= 1"
              >-</button>
            </div>
          </td>

          <!-- Total -->
          <td class="cr-cart-subtotal">
            ${{ formatPrice(getItemTotal(item)) }}
          </td>

          <!-- Remove Button -->
          <td class="cr-cart-remove">
            <button
              type="button"
              @click="removeItem(item.id)"
              class="btn-remove border-0 bg-transparent"
              title="Remove item"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Continue Shopping & Checkout -->
    <div v-if="items.length > 0" class="row mt-30">
      <div class="col-lg-12">
        <div class="cr-cart-update-bottom">
          <div class="d-flex align-items-center">
            <a href="javascript:void(0)" @click="continueShopping" class="cr-links me-4">
              Continue Shopping
            </a>
            <button type="button" @click="$emit('clear-cart')" class="btn text-danger p-0 border-0 bg-transparent">
              <i class="ri-delete-bin-line me-1"></i> Clear Cart
            </button>
          </div>
          <a href="javascript:void(0)" @click="checkout" class="cr-button">
            Check Out
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    /**
     * Increment item quantity
     */
    incrementQuantity(itemId) {
      this.$emit('quantity-incremented', itemId);
    },

    /**
     * Decrement item quantity
     */
    decrementQuantity(itemId) {
      this.$emit('quantity-decremented', itemId);
    },

    /**
     * Update item quantity
     */
    updateQuantity(itemId, newQuantity) {
      this.$emit('quantity-changed', { itemId, newQuantity });
    },

    /**
     * Remove item from cart
     */
    removeItem(itemId) {
      if (confirm('Are you sure you want to remove this item?')) {
        this.$emit('item-removed', itemId);
      }
    },

    /**
     * View product details
     */
    viewProduct(item) {
      this.$emit('product-clicked', item);
    },

    /**
     * Proceed to checkout
     */
    checkout() {
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
    },

    /**
     * Keep template total as a fixed line value
     */
    getItemTotal(item) {
      return item.total ?? item.price;
    }
  }
};
</script>

<style scoped>
.btn-remove:hover {
  color: #ff4d4d;
}
.hover-opacity:hover {
  opacity: 0.8;
}
</style>
