<template>
  <!-- Cart Modal -->
  <div 
    class="cr-cart-overlay" 
    :class="{ 'active': cartStore.isCartOpen }" 
    @click="cartStore.closeCart()"
  ></div>
  <div class="cr-cart-view" :class="{ 'active': cartStore.isCartOpen }">
    <div class="cr-cart-inner">
      <!-- Cart Header -->
      <div class="cr-cart-top">
        <div class="cr-cart-title">
          <h6>My Cart</h6>
          <button 
            type="button" 
            class="close-cart"
            @click="cartStore.closeCart()"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="cartStore.isLoading" class="text-center p-4">
          <div class="spinner-border text-primary spinner-border-sm" role="status"></div>
          <span class="ms-2">Loading...</span>
        </div>

        <!-- Cart Items List -->
        <ul v-else-if="cartStore.items.length > 0" class="crcart-pro-items">
          <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <!-- Product Image -->
            <router-link :to="`/product/${item.product_id}`" class="crside_pro_img" @click="cartStore.closeCart()">
              <img :src="item.image" :alt="item.name">
            </router-link>

            <!-- Product Content -->
            <div class="cr-pro-content">
              <router-link :to="`/product/${item.product_id}`" class="cart_pro_title" @click="cartStore.closeCart()">
                {{ item.name }}
              </router-link>
              <span class="cart-price">
                <span>{{ formatPrice(item.price) }}</span> x {{ item.quantity }}
              </span>

              <!-- Quantity Controls -->
              <div class="cr-cart-qty">
                    <div class="cart-qty-plus-minus">
                        <button type="button" class="minus" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
                        <input type="text" :value="item.quantity" readonly class="quantity">
                        <button type="button" class="plus" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                </div>

              <!-- Remove Button -->
              <button  
                type="button"
                @click="cartStore.removeItem(item.id)"
                class="remove-item-btn"
                title="Remove item"
              >
                ×
              </button>
            </div>
          </li>
        </ul>

        <!-- Empty Cart Message -->
        <div v-else class="empty-cart-message">
          <p>Your cart is empty</p>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cr-cart-bottom" v-if="cartStore.items.length > 0">
        <div class="cart-sub-total">
          <table class="table cart-table">
            <tbody>
              <tr>
                <td class="text-left">Total :</td>
                <td class="text-right primary-color">{{ formatCurrency(cartStore.cartTotal) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Action Buttons -->
        <div class="cart_btn">
          <div class="d-flex justify-content-between mb-2">
              <router-link to="/cart" class="cr-button" @click="cartStore.closeCart()" style="flex: 1; margin-right: 5px; text-align: center;">
                View Cart
              </router-link>
              <button 
                type="button" 
                @click="cartStore.clearCart()" 
                class="btn-clear-all"
              >
                Clear All
              </button>
          </div>
          <button @click="handleCheckout" class="cr-btn-secondary w-100">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '@/utils/currency';
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

onMounted(() => {
    cartStore.fetchCart();
});

const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
};

const handleCheckout = () => {
    cartStore.closeCart();
    // Use window location or router if available, but here we emit/router
    // Since this is a setup script, we'd need useRouter
};
</script>

<script>
// Keep name for debugging/devtools
export default {
    name: 'MyCart'
};
</script>

<style scoped>
/* Ensure active state works with Vue :class */
.cr-cart-overlay.active {
    display: block;
    opacity: 1;
    visibility: visible;
}

.cr-cart-view.active {
    right: 0;
}

.empty-cart-message {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.cart-item {
  position: relative;
  transition: background-color 0.2s ease;
  padding-right: 30px !important;
}

.cart-item:hover {
  background-color: #f9f9f9;
}

.remove-item-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #f0f0f0;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #999;
    cursor: pointer;
    z-index: 10;
    line-height: 1;
}

.remove-item-btn:hover {
    background: #ff4d4d;
    color: #fff;
}

.btn-clear-all {
    flex: 1;
    margin-left: 5px;
    border: 1px solid #ff4d4d;
    background: transparent;
    color: #ff4d4d;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-clear-all:hover {
    background: #ff4d4d;
    color: #fff;
}

.quantity {
  text-align: center;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cr-cart-qty {
    margin-top: 10px;
}

.cart-qty-plus-minus {
    display: flex;
    align-items: center;
    border: 1px solid #eeeeee;
    width: fit-content;
    border-radius: 5px;
}

.cart-qty-plus-minus button {
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    cursor: pointer;
}

.cart-qty-plus-minus input {
    width: 30px;
    border: none;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    text-align: center;
    font-size: 12px;
}
</style>