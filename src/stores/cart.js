import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import cartService from '@/services/cartService';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', () => {
    const items = ref([]);
    const isLoading = ref(false);
    const isCartOpen = ref(false);
    const notification = ref({ show: false, message: '', isError: false });

    const authStore = useAuthStore();
    const isLoggedIn = computed(() => !!authStore.accessToken);

    const cartItemCount = computed(() => {
        return items.value.reduce((count, item) => count + item.quantity, 0);
    });

    const cartTotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    });

    /**
     * Helper to truncate long names
     */
    const truncateName = (name, limit = 40) => {
        if (!name) return 'Unknown';
        return name.length > limit ? name.substring(0, limit) + '...' : name;
    };

    /**
     * Map API data to Store structure
     */
    const mapApiItems = (apiItems) => {
        return apiItems.map(item => {
            const variant = item.variant || {};
            
            // Image hierarchy: Variant Image -> Product Image -> Product Primary Image -> Placeholder
            const imageUrl = variant.image || variant.product_image || variant.product?.primary_image || '';

            return {
                id: item.id,
                variant_id: variant.id,
                product_id: variant.product_id,
                name: truncateName(variant.product_name),
                image: imageUrl,
                price: parseFloat(item.price),
                quantity: item.quantity,
                total: parseFloat(item.subtotal),
                category: variant.product?.category?.name || 'General'
            };
        });
    };

    /**
     * Fetch cart data
     */
    const fetchCart = async () => {
        if (!isLoggedIn.value) return;
        
        isLoading.value = true;
        try {
            const response = await cartService.getCart();
            items.value = mapApiItems(response.data.items || []);
        } catch (error) {
            console.error('Store: Failed to fetch cart:', error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Open/Close sidebar
     */
    const openCart = () => { isCartOpen.value = true; };
    const closeCart = () => { isCartOpen.value = false; };
    const toggleCart = () => { isCartOpen.value = !isCartOpen.value; };

    /**
     * Add to cart
     */
    const addToCart = async (variantId, quantity = 1, productName = '') => {
        if (!isLoggedIn.value) {
            showMsg('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', true);
            return false;
        }

        try {
            const response = await cartService.addToCart(variantId, quantity);
            items.value = mapApiItems(response.data.items || []);
            showMsg(`${productName || 'Sản phẩm'} đã được thêm vào giỏ hàng`);
            
            // Automatically open cart sidebar on success
            openCart();
            return true;
        } catch (error) {
            console.error('Store: Add to cart failed:', error);
            showMsg(error.response?.data?.message || 'Không thể thêm vào giỏ hàng', true);
            return false;
        }
    };

    /**
     * Update quantity
     */
    const updateQuantity = async (itemId, quantity) => {
        if (!isLoggedIn.value) return;
        
        try {
            const response = await cartService.updateQuantity(itemId, quantity);
            items.value = mapApiItems(response.data.items || []);
            return true;
        } catch (error) {
            console.error('Store: Update quantity failed:', error);
            showMsg('Không thể cập nhật số lượng', true);
            return false;
        }
    };

    /**
     * Remove item
     */
    const removeItem = async (itemId) => {
        if (!isLoggedIn.value) return;

        try {
            await cartService.removeItem(itemId);
            items.value = items.value.filter(item => item.id !== itemId);
            showMsg('Đã xóa sản phẩm khỏi giỏ hàng');
            return true;
        } catch (error) {
            console.error('Store: Remove item failed:', error);
            showMsg('Không thể xóa sản phẩm', true);
            return false;
        }
    };

    /**
     * Clear all
     */
    const clearCart = async () => {
        if (!isLoggedIn.value) return;

        if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
            try {
                await cartService.clearCart();
                items.value = [];
                showMsg('Đã làm trống giỏ hàng');
                return true;
            } catch (error) {
                console.error('Store: Clear cart failed:', error);
                return false;
            }
        }
    };

    /**
     * Internal notification helper
     */
    const showMsg = (message, isError = false) => {
        notification.value = { show: true, message, isError };
        setTimeout(() => {
            notification.value.show = false;
        }, 3000);
    };

    return {
        items,
        isLoading,
        isCartOpen,
        notification,
        cartItemCount,
        cartTotal,
        fetchCart,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };
});
