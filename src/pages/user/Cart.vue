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
            <div class="row">
                <div class="col-12">
                    <div class="cr-cart-content">
                        <!-- Cart Table Section -->
                        <CartTable
                            :items="cartItems"
                            @quantity-incremented="incrementQuantity"
                            @quantity-decremented="decrementQuantity"
                            @quantity-changed="updateQuantity"
                            @item-removed="removeFromCart"
                            @checkout-clicked="proceedToCheckout"
                            @continue-shopping-clicked="continueShopping"
                            @product-clicked="viewProduct"
                        />
                    </div>
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
            // Can be enhanced to show modal
        },

        /**
         * Handle wishlist toggle from popular products
         */
        handleWishlistToggle(product) {
            console.log('Wishlist toggled:', product);
            // Implement wishlist functionality
        }
    }
};
</script>
