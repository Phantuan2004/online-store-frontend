/**
 * Cart Logic Mixin
 * Handles cart management, calculations, and localStorage persistence
 */

import { cartItemsData, popularProductsData, TAX_RATE, FREE_SHIPPING_THRESHOLD, shippingRates } from './cartData';

export default {
    data() {
        return {
            cartItems: [],
            popularProducts: popularProductsData,
            shippingMethod: 'standard',
            shippingRates: shippingRates,
            couponCode: '',
            discountAmount: 0,
            showNotification: false,
            notificationMessage: ''
        };
    },

    computed: {
        /**
         * Calculate cart subtotal (sum of all items)
         */
        cartSubtotal() {
            return this.cartItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },

        /**
         * Calculate tax amount
         */
        cartTax() {
            return parseFloat((this.cartSubtotal * (TAX_RATE / 100)).toFixed(2));
        },

        /**
         * Get shipping cost based on method
         */
        shippingCost() {
            // Free shipping if subtotal is above threshold
            if (this.cartSubtotal >= FREE_SHIPPING_THRESHOLD) {
                return 0;
            }
            
            return this.shippingRates[this.shippingMethod] || 0;
        },

        /**
         * Calculate total price
         */
        cartTotal() {
            const subtotal = this.cartSubtotal;
            const tax = this.cartTax;
            const shipping = this.shippingCost;
            const discount = this.discountAmount;
            
            return parseFloat((subtotal + tax + shipping - discount).toFixed(2));
        },

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
        /**
         * Initialize cart from localStorage
         */
        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    this.cartItems = JSON.parse(savedCart);
                } catch (error) {
                    console.error('Error loading cart:', error);
                    this.cartItems = cartItemsData;
                }
            } else {
                this.cartItems = [...cartItemsData];
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
                this.discountAmount = 0;
                this.couponCode = '';
                this.saveCart();
                this.showMessage('Cart cleared');
            }
        },

        /**
         * Apply coupon code
         */
        applyCoupon(code) {
            const couponCodes = {
                'SAVE10': 0.10,  // 10% discount
                'SAVE20': 0.20,  // 20% discount
                'FREESHIP': 'shipping'
            };

            code = code.toUpperCase().trim();
            this.couponCode = code;

            if (couponCodes[code]) {
                const discount = couponCodes[code];
                
                if (discount === 'shipping') {
                    this.shippingMethod = 'free';
                    this.discountAmount = this.shippingCost;
                    this.showMessage('Free shipping applied!');
                } else {
                    this.discountAmount = parseFloat((this.cartSubtotal * discount).toFixed(2));
                    this.showMessage(`Discount of ${(discount * 100).toFixed(0)}% applied!`);
                }
            } else {
                this.discountAmount = 0;
                this.showMessage('Invalid coupon code');
            }
        },

        /**
         * Remove coupon
         */
        removeCoupon() {
            this.couponCode = '';
            this.discountAmount = 0;
            this.shippingMethod = 'standard';
            this.showMessage('Coupon removed');
        },

        /**
         * Update shipping method
         */
        updateShppingMethod(method) {
            if (this.shippingRates.hasOwnProperty(method)) {
                this.shippingMethod = method;
                this.showMessage(`Shipping method updated to ${method}`);
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
                subtotal: this.cartSubtotal,
                tax: this.cartTax,
                shipping: this.shippingCost,
                discount: this.discountAmount,
                total: this.cartTotal,
                shippingMethod: this.shippingMethod,
                coupon: this.couponCode,
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
