<template>
  <!-- Cart Modal -->
  <div class="cr-cart-overlay" @click="closeCart"></div>
  <div class="cr-cart-view">
    <div class="cr-cart-inner">
      <!-- Cart Header -->
      <div class="cr-cart-top">
        <div class="cr-cart-title">
          <h6>My Cart</h6>
          <button 
            type="button" 
            class="close-cart"
            @click="closeCart"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <!-- Cart Items List -->
        <ul class="crcart-pro-items" v-if="cartItems.length > 0">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <!-- Product Image -->
            <router-link :to="`/product/${item.id}`" class="crside_pro_img">
              <img :src="item.image" :alt="item.name">
            </router-link>

            <!-- Product Content -->
            <div class="cr-pro-content">
              <router-link :to="`/product/${item.id}`" class="cart_pro_title">
                {{ item.name }}
              </router-link>
              <span class="cart-price">
                <span>${{ item.price.toFixed(2) }}</span> x {{ item.unit }}
              </span>

              <!-- Quantity Controls -->
              <div class="cr-cart-qty">
                    <div class="cart-qty-plus-minus">
                        <button type="button" class="plus">+</button>
                        <input type="text" placeholder="." value="1" minlength="1" maxlength="20"
                            class="quantity">
                        <button type="button" class="minus">-</button>
                    </div>
                </div>

              <!-- Remove Button -->
              <button
                @click="removeItem(item.id)"
                class="remove"
                :aria-label="`Remove ${item.name} from cart`"
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
      <div class="cr-cart-bottom" v-if="cartItems.length > 0">
        <div class="cart-sub-total">
          <table class="table cart-table">
            <tbody>
              <tr>
                <td class="text-left">Sub-Total :</td>
                <td class="text-right">${{ subTotal.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="text-left">VAT ({{ taxRate }}%) :</td>
                <td class="text-right">${{ taxAmount.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="text-left">Total :</td>
                <td class="text-right primary-color">${{ total.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Action Buttons -->
        <div class="cart_btn">
          <router-link to="/cart" class="cr-button" @click="closeCart">
            View Cart
          </router-link>
          <router-link to="/checkout" class="cr-btn-secondary" @click="closeCart">
            Checkout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img4 from '@/assets/user/img/product/4.jpg';
import img2 from '@/assets/user/img/product/2.jpg';
import img3 from '@/assets/user/img/product/3.jpg';

export default {
  name: 'MyCart',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    taxRate: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: 'Fresh Pomegranate',
          price: 56.00,
          unit: '1kg',
          image: img4,
          quantity: 1,
          maxQuantity: 10
        },
        {
          id: 2,
          name: 'Green Apples',
          price: 75.00,
          unit: '1kg',
          image: img2,
          quantity: 1,
          maxQuantity: 15
        },
        {
          id: 3,
          name: 'Watermelon - Small',
          price: 48.00,
          unit: '5kg',
          image: img3,
          quantity: 1,
          maxQuantity: 8
        }
      ],
      subTotalStatic: 179.00,
      taxAmountStatic: 35.80,
      totalStatic: 214.80
    };
  },
  computed: {
    /**
     * Return static subtotal value
     */
    subTotal() {
      return this.subTotalStatic;
    },

    /**
     * Return static tax amount
     */
    taxAmount() {
      return this.taxAmountStatic;
    },

    /**
     * Return static total amount
     */
    total() {
      return this.totalStatic;
    }
  },
  methods: {
    /**
     * Increase item quantity by 1
     * @param {number} itemId - The product ID
     */
    increaseQuantity(itemId) {
      const item = this.cartItems.find(i => i.id === itemId);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity++;
        this.emitCartUpdate();
      }
    },

    /**
     * Decrease item quantity by 1
     * @param {number} itemId - The product ID
     */
    decreaseQuantity(itemId) {
      const item = this.cartItems.find(i => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.emitCartUpdate();
      }
    },

    /**
     * Update item quantity with user input
     * @param {number} itemId - The product ID
     * @param {string|number} newQuantity - The new quantity value
     */
    updateQuantity(itemId, newQuantity) {
      const item = this.cartItems.find(i => i.id === itemId);
      if (!item) return;

      let qty = parseInt(newQuantity, 10);

      // Validate quantity
      if (isNaN(qty) || qty < 1) {
        qty = 1;
      } else if (qty > item.maxQuantity) {
        qty = item.maxQuantity;
      }

      item.quantity = qty;
      this.emitCartUpdate();
    },

    /**
     * Remove item from cart
     * @param {number} itemId - The product ID
     */
    removeItem(itemId) {
      const index = this.cartItems.findIndex(i => i.id === itemId);
      if (index > -1) {
        const removedItem = this.cartItems[index];
        this.cartItems.splice(index, 1);
        this.$emit('item-removed', removedItem);
        this.emitCartUpdate();
      }
    },

    /**
     * Close the cart modal
     */
    closeCart() {
      this.$emit('close-cart');
    },

    /**
     * Emit cart update event with current cart state
     */
    emitCartUpdate() {
      this.$emit('cart-updated', {
        items: this.cartItems,
        subTotal: this.subTotal,
        taxAmount: this.taxAmount,
        total: this.total
      });
    }
  }
};
</script>

<style scoped>
.empty-cart-message {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.cart-item {
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f5f5f5;
}

.quantity {
  text-align: center;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>