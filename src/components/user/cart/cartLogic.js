/**
 * Cart Logic Mixin
 * Handles cart management and localStorage persistence
 */

import { cartItemsData, popularProductsData } from './cartData';

export default {
    data() {
        return {
            cartItems: [],
            popularProducts: popularProductsData,
            showNotification: false,
            notificationMessage: ''
        };
    },

    computed: {
        /**
         * Count total items in cart
         */
        cartItemCount() {
            return this.cartItems.reduce((count, item) => count + item.quantity, 0);
        },

        /**
         * Check if cart is empty
         */
        isCartEmpty() {
            return this.cartItems.length === 0;
        }
    },

    methods: {
        normalizeCartItems(items) {
            return items.map((item) => ({
                ...item,
                total: typeof item.total === 'number' ? item.total : item.price
            }));
        },

        /**
         * Initialize cart from localStorage
         */
        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    this.cartItems = this.normalizeCartItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Error loading cart:', error);
                    this.cartItems = this.normalizeCartItems(cartItemsData);
                }
            } else {
                this.cartItems = this.normalizeCartItems(cartItemsData);
            }
        },

        /**
         * Save cart to localStorage
         */
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },

        /**
         * Update item quantity
         */
        updateQuantity(itemId, newQuantity) {
            const quantity = parseInt(newQuantity) || 0;
            
            if (quantity < 1) {
                console.warn('Quantity must be at least 1');
                return;
            }

            const item = this.cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
                this.saveCart();
                this.showMessage(`Updated ${item.name} quantity to ${quantity}`);
            }
        },

        /**
         * Increment item quantity
         */
        incrementQuantity(itemId) {
            const item = this.cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1;
                this.saveCart();
            }
        },

        /**
         * Decrement item quantity
         */
        decrementQuantity(itemId) {
            const item = this.cartItems.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                this.saveCart();
            }
        },

        /**
         * Remove item from cart
         */
        removeFromCart(itemId) {
            const item = this.cartItems.find(item => item.id === itemId);
            if (item) {
                this.cartItems = this.cartItems.filter(item => item.id !== itemId);
                this.saveCart();
                this.showMessage(`${item.name} removed from cart`);
            }
        },

        /**
         * Add item to cart
         */
        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                this.showMessage(`${product.name} quantity updated`);
            } else {
                this.cartItems.push({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    total: product.total ?? product.price,
                    quantity: 1,
                    category: product.category
                });
                this.showMessage(`${product.name} added to cart`);
            }
            
            this.saveCart();
        },

        /**
         * Clear entire cart
         */
        clearCart() {
            if (confirm('Are you sure you want to clear your cart?')) {
                this.cartItems = [];
                this.saveCart();
                this.showMessage('Cart cleared');
            }
        },

        /**
         * Proceed to checkout
         */
        proceedToCheckout() {
            if (this.isCartEmpty) {
                this.showMessage('Your cart is empty');
                return;
            }

            // Store checkout data
            const checkoutData = {
                items: this.cartItems,
                itemCount: this.cartItemCount,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('checkout', JSON.stringify(checkoutData));
            this.$router.push('/checkout');
        },

        /**
         * Continue shopping
         */
        continueShopping() {
            this.$router.push('/shop');
        },

        /**
         * Show notification message
         */
        showMessage(message) {
            this.notificationMessage = message;
            this.showNotification = true;

            // Auto hide after 3 seconds
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },

        /**
         * Format price
         */
        formatPrice(price) {
            return parseFloat(price).toFixed(2);
        }
    },

    mounted() {
        this.loadCart();
    }
};
