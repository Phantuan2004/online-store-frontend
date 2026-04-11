import api from './api';

export const cartService = {
  /**
   * Get current user's cart
   * @returns {Promise}
   */
  getCart() {
    return api.get('/cart');
  },

  /**
   * Add item to cart
   * @param {number} variantId 
   * @param {number} quantity 
   * @returns {Promise}
   */
  addToCart(variantId, quantity = 1) {
    return api.post('/cart', {
      variant_id: variantId,
      quantity: quantity
    });
  },

  /**
   * Update item quantity
   * @param {number} itemId 
   * @param {number} quantity 
   * @returns {Promise}
   */
  updateQuantity(itemId, quantity) {
    return api.put(`/cart/${itemId}`, {
      quantity: quantity
    });
  },

  /**
   * Remove item from cart
   * @param {number} itemId 
   * @returns {Promise}
   */
  removeItem(itemId) {
    return api.delete(`/cart/${itemId}`);
  },

  /**
   * Clear entire cart
   * @returns {Promise}
   */
  clearCart() {
    return api.delete('/cart');
  }
};

export default cartService;
