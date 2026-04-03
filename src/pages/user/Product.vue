<template>
    <!-- Product Detail Section -->
    <section class="section-product padding-t-100">
        <div class="container">
            <div class="row">
                <!-- Product Images -->
                <div class="col-lg-6 col-12 mb-30">
                    <ProductImageSlider 
                        :images="product.images"
                        @image-selected="onImageSelected"
                    />
                </div>
                <!-- Product Details -->
                <div class="col-lg-6 col-12 mb-30">
                    <ProductDetails
                        :product="product"
                        :quantity="quantity"
                        :selected-size="selectedSize"
                        :in-wishlist="inWishlist"
                        :discount-percentage="discountPercentage"
                        :is-in-stock="isInStock"
                        @quantity-changed="onQuantityChanged"
                        @size-selected="onSizeSelected"
                        @add-to-cart="addToCart"
                        @wishlist-toggled="toggleWishlist"
                        @quick-view="handleQuickView"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Product Tabs - Description, Information, Reviews -->
    <section class="section-tabs padding-t-100 padding-b-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ProductReviews
                        :active-tab="activeTab"
                        :product-description="product.description"
                        :specs="product.specs"
                        :reviews="reviews"
                        :new-review="newReview"
                        :is-loading="false"
                        @tab-changed="switchTab"
                        @update:newReview="onNewReviewUpdate"
                        @review-submitted="submitReview"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Popular Products -->
    <section class="section-popular-products padding-t-100 padding-b-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title text-center mb-30">
                        <h2 class="cr-title">Popular Products</h2>
                        <p>A wide range of quality brands catering to everyone</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <PopularProducts 
                        :products="popularProducts"
                        @product-clicked="viewProduct"
                        @quick-view="handleQuickView"
                        @add-to-cart="handleAddToCart"
                        @wishlist-toggled="handleWishlistToggle"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductImageSlider from "@/components/user/product/ProductImageSlider.vue";
import ProductDetails from "@/components/user/product/ProductDetails.vue";
import ProductReviews from "@/components/user/product/ProductReviews.vue";
import PopularProducts from "@/components/user/product/PopularProducts.vue";
import productDetail from "@/components/user/product/productDetail.js";

export default {
    name: "Product",
    components: {
        ProductImageSlider,
        ProductDetails,
        ProductReviews,
        PopularProducts
    },
    mixins: [productDetail],
    methods: {
        /**
         * Handler for image selection
         */
        onImageSelected(event) {
            // Image selection is handled within ProductImageSlider
            console.log("Image selected:", event);
        },

        /**
         * Handler for quantity change
         */
        onQuantityChanged(newQuantity) {
            this.quantity = newQuantity;
        },

        /**
         * Handler for size selection
         */
        onSizeSelected(newSize) {
            this.selectedSize = newSize;
        },

        /**
         * Handler for new review update
         */
        onNewReviewUpdate(updatedReview) {
            this.newReview = updatedReview;
        },

        /**
         * Handle quick view action
         */
        handleQuickView(product) {
            console.log("Quick view product:", product);
            // Can be enhanced to show modal or navigate
        },

        /**
         * Handle add to cart from popular products
         */
        handleAddToCart(product) {
            // Set the product and add to cart
            this.product = product;
            this.addToCart();
        },

        /**
         * Handle wishlist toggle from popular products
         */
        handleWishlistToggle(product) {
            this.product = product;
            this.toggleWishlist();
        },

        /**
         * View product details
         */
        viewProduct(product) {
            // Navigate to product or update current product
            console.log("Viewing product:", product);
        }
    }
}
</script>
