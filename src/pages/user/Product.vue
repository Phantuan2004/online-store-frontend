<template>
    <!-- Product Detail Section -->
    <section class="section-product padding-t-100">
        <div class="container">
            <div class="row">
                <!-- Filter Sidebar -->
                <div class="col-lg-3 col-12 md-30">
                    <FilterSidebar 
                        @filters-changed="onFiltersChanged"
                    />
                </div>
                
                <!-- Product Content -->
                <div class="col-lg-9 col-12 md-30">
                    <!-- Product Images and Details -->
                    <div class="row mb-minus-24">
                        <!-- Product Images -->
                        <div class="col-md-6 col-12 mb-24">
                            <ProductImageSlider 
                                :images="product.images"
                                @image-selected="onImageSelected"
                            />
                        </div>
                        <!-- Product Details -->
                        <div class="col-md-6 col-12 mb-24">
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
                    
                    <!-- Product Tabs -->
                    <div class="cr-paking-delivery">
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
import FilterSidebar from "@/components/user/FilterSidebar.vue";
import ProductImageSlider from "@/components/user/product/ProductImageSlider.vue";
import ProductDetails from "@/components/user/product/ProductDetails.vue";
import ProductReviews from "@/components/user/product/ProductReviews.vue";
import PopularProducts from "@/components/user/product/PopularProducts.vue";
import productDetail from "@/components/user/product/productDetail.js";

export default {
    name: "Product",
    components: {
        FilterSidebar,
        ProductImageSlider,
        ProductDetails,
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
