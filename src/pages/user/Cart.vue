<template>
    <!-- Cart Banner (Optional) -->
    <section class="section-banner padding-t-100 padding-b-50" style="display: none;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="cr-banner text-center">
                        <h2>Shopping Cart</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Cart Section -->
    <section class="section-cart padding-t-100 padding-b-50">
        <div class="container">
            <!-- Auth Notification -->
            <div v-if="!isLoggedIn" class="alert alert-info border-0 shadow-sm mb-4 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <i class="ri-information-line fs-4 me-2"></i>
                    <span>Bạn chưa đăng nhập. Hãy đăng nhập để đồng bộ giỏ hàng của bạn.</span>
                </div>
                <router-link to="/login" class="btn btn-sm btn-primary">Đăng nhập</router-link>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="cr-cart-content">
                        <!-- Loading State -->
                        <div v-if="isLoadingCart" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status"></div>
                            <p class="mt-2 text-muted">Đang tải giỏ hàng...</p>
                        </div>

                        <!-- Cart Table Section -->
                        <CartTable
                            v-else
                            :items="cartItems"
                            @quantity-incremented="incrementQuantity"
                            @quantity-decremented="decrementQuantity"
                            @quantity-changed="(data) => updateQuantity(data.itemId, data.newQuantity)"
                            @item-removed="removeFromCart"
                            @clear-cart="clearCart"
                            @checkout-clicked="proceedToCheckout"
                            @continue-shopping-clicked="continueShopping"
                            @product-clicked="viewProduct"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Notification Toast -->
        <div v-if="showNotification" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1060;">
            <div class="toast show align-items-center text-white border-0" :class="notificationIsError ? 'bg-danger' : 'bg-success'" role="alert">
                <div class="d-flex">
                    <div class="toast-body">{{ notificationMessage }}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="showNotification = false"></button>
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Products Component -->
    <PopularProductsCart
        :products="popularProducts"
        @add-to-cart="addToCart"
        @product-clicked="viewProduct"
        @quick-view="handleQuickView"
        @wishlist-toggled="handleWishlistToggle"
    />
</template>

<script>
import CartTable from '@/components/user/cart/CartTable.vue';
import PopularProductsCart from '@/components/user/cart/PopularProductsCart.vue';
import cartLogic from '@/components/user/cart/cartLogic';

export default {
    name: 'Cart',
    components: {
        CartTable,
        PopularProductsCart
    },
    mixins: [cartLogic],

    methods: {
        /**
         * View product details
         */
        viewProduct(product) {
            this.$router.push(`/product/${product.id}`);
        },

        /**
         * Handle quick view
         */
        handleQuickView(product) {
            console.log('Quick view product:', product);
        },

        /**
         * Handle wishlist toggle from popular products
         */
        handleWishlistToggle(product) {
            console.log('Wishlist toggled:', product);
        }
    }
};
</script>
