/**
 * Cart Logic Mixin
 * Refactored to use Pinia Cart Store
 */

import { popularProductsData } from './cartData';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import productService from '@/services/productService';

export default {
    computed: {
        cartStore() {
            return useCartStore();
        },
        
        authStore() {
            return useAuthStore();
        },

        isLoggedIn() {
            return !!this.authStore.accessToken;
        },

        cartItems() {
            return this.cartStore.items;
        },

        cartItemCount() {
            return this.cartStore.cartItemCount;
        },

        isCartEmpty() {
            return this.cartStore.items.length === 0;
        },

        cartTotal() {
            return this.cartStore.cartTotal;
        },

        isLoadingCart() {
            return this.cartStore.isLoading;
        },

        showNotification() {
            return this.cartStore.notification.show;
        },

        notificationMessage() {
            return this.cartStore.notification.message;
        },

        notificationIsError() {
            return this.cartStore.notification.isError;
        }
    },

    methods: {
        async loadCart() {
            await this.cartStore.fetchCart();
        },

        async updateQuantity(itemId, newQuantity) {
            await this.cartStore.updateQuantity(itemId, newQuantity);
        },

        async incrementQuantity(itemId) {
            const item = this.cartItems.find(i => i.id === itemId);
            if (item) {
                await this.cartStore.updateQuantity(itemId, item.quantity + 1);
            }
        },

        async decrementQuantity(itemId) {
            const item = this.cartItems.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                await this.cartStore.updateQuantity(itemId, item.quantity - 1);
            }
        },

        async removeFromCart(itemId) {
            await this.cartStore.removeItem(itemId);
        },

        async addToCart(product, quantity = 1) {
            // Find variant ID if not present
            let variantId = product.variant_id;
            if (!variantId && product.id) {
                const response = await productService.getProductById(product.id);
                if (response.data.variants && response.data.variants.length > 0) {
                    variantId = response.data.variants[0].id;
                }
            }
            
            if (variantId) {
                await this.cartStore.addToCart(variantId, quantity, product.name || product.title);
            } else {
                alert('Không tìm thấy phiên bản sản phẩm phù hợp.');
            }
        },

        async clearCart() {
            await this.cartStore.clearCart();
        },

        proceedToCheckout() {
            if (this.isCartEmpty) {
                this.cartStore.openCart(); // Open sidebar to show empty message
                return;
            }

            if (!this.isLoggedIn) {
                alert('Vui lòng đăng nhập để tiếp tục thanh toán');
                this.$router.push('/login');
                return;
            }

            this.$router.push('/checkout');
        },

        continueShopping() {
            this.$router.push('/shop');
        },

        formatPrice(price) {
            return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
        }
    },

    mounted() {
        // Only fetch if data is empty to avoid redundant calls
        if (this.cartItems.length === 0) {
            this.loadCart();
        }
    }
};
