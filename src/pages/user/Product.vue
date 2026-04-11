<template>
    <!-- Product Detail Section -->
    <section class="section-product padding-t-100">
        <div class="container">
        <!-- Loading State -->
        <div v-if="isLoading" class="row justify-content-center">
            <div class="col-12 text-center" style="padding: 100px 0;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Loading product details...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="row justify-content-center">
            <div class="col-12 text-center" style="padding: 100px 0;">
                <h3 class="text-danger">Oops!</h3>
                <p>{{ error }}</p>
                <router-link to="/shop" class="cr-button">Back to Shop</router-link>
            </div>
        </div>

        <div v-else class="row">
            <div class="col-lg-12 col-12 md-30">
                <div class="row mb-minus-24">
                    <!-- Column 1: Product Images -->
                    <div class="col-lg-4 col-md-5 col-12 mb-24">
                        <ProductImageSlider 
                            :images="product.images"
                            @image-selected="onImageSelected"
                        />
                    </div>
                    
                    <!-- Column 2: Product Info -->
                    <div class="col-lg-5 col-md-7 col-12 mb-24">
                        <ProductInfo
                            :product="product"
                            :selected-size="selectedSize"
                            @size-selected="onSizeSelected"
                        />
                    </div>
                    
                    <!-- Column 3: Action Box -->
                    <div class="col-lg-3 col-md-12 col-12 mb-24">
                        <ProductActionBox
                            :product="product"
                            :quantity="quantity"
                            :in-wishlist="inWishlist"
                            :discount-percentage="discountPercentage"
                            :is-in-stock="isInStock"
                            @quantity-changed="onQuantityChanged"
                            @add-to-cart="addToCart"
                            @wishlist-toggled="toggleWishlist"
                        />
                    </div>
                </div>
                
                <!-- Product Tabs -->
                <div class="cr-paking-delivery mt-4">
                    <ProductReviews
                        :active-tab="activeTab"
                        :product-description="product.description"
                        :specs="product.specs"
                        :reviews="reviews"
                        :new-review="newReview"
                        :is-loading="isLoadingReview"
                        @tab-changed="switchTab"
                        @update:newReview="onNewReviewUpdate"
                        @review-submitted="submitReview"
                    />
                </div>
            </div>
        </div>
        </div>
    </section>

    <!-- Popular Products -->
    <section class="section-popular-products padding-t-100 padding-b-100">
        <div class="container">
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
import ProductInfo from "@/components/user/product/ProductInfo.vue";
import ProductActionBox from "@/components/user/product/ProductActionBox.vue";
import ProductReviews from "@/components/user/product/ProductReviews.vue";
import PopularProducts from "@/components/user/product/PopularProducts.vue";
import productDetail from "@/components/user/product/productDetail.js";

export default {
    name: "Product",
    components: {
        ProductImageSlider,
        ProductInfo,
        ProductActionBox,
        ProductReviews,
        PopularProducts
    },
    mixins: [productDetail],
    data() {
        return {
            activeFilters: {
                categories: [],
                colors: [],
                weights: [],
                tags: [],
                priceRange: { min: 0, max: 500 }
            }
        };
    },
    methods: {
        /**
         * Handler for image selection
         */
        onImageSelected(event) {
            // Image selection is handled within ProductImageSlider
            console.log("Image selected:", event);
        },

        /**
         * Handler for filter changes from sidebar
         */
        onFiltersChanged(filters) {
            this.activeFilters = filters;
            console.log("Filters changed:", filters);
            // Can be enhanced to filter products based on selected filters
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
            this.$router.push(`/product/${product.id}`);
        }
    }
}
</script>
