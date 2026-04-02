<template>
  <!-- Popular product -->
  <section class="section-popular-product-shape padding-b-100">
    <div class="container" ref="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30">
            <div class="cr-banner">
              <h2>Popular Products</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore lacus vel facilisis.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-content row mb-minus-24">
        <div class="col-xl-3 col-lg-4 col-12 mb-24">
          <div class="row mb-minus-24 sticky">
            <div class="col-lg-12 col-sm-6 col-6 cr-product-box mb-24">
              <div class="cr-product-tabs">
                <ul>
                  <li :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">All</li>
                  <li :class="{ active: currentFilter === 'snack' }" @click="setFilter('snack')">Snack</li>
                  <li :class="{ active: currentFilter === 'vegetable' }" @click="setFilter('vegetable')">Vegetable</li>
                  <li :class="{ active: currentFilter === 'fruit' }" @click="setFilter('fruit')">Fruit</li>
                  <li :class="{ active: currentFilter === 'bakery' }" @click="setFilter('bakery')">Bakery</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12 col-sm-6 col-6 cr-product-box banner-480 mb-24">
              <div class="cr-ice-cubes">
                <img src="/assets/img/product/product-banner.jpg" alt="product banner">
                <div class="cr-ice-cubes-contain">
                  <h4 class="title">Juicy</h4>
                  <h5 class="sub-title">Fruits</h5>
                  <span>100% Natural</span>
                  <router-link to="/shop" class="cr-button">Shop Now</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 col-12 mb-24">
          <div class="row mb-minus-24">
            <TransitionGroup name="fade">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="col-xxl-3 col-xl-4 col-6 cr-product-box mb-24"
              >
                <div class="cr-product-card">
                  <div class="cr-product-image">
                    <div class="cr-image-inner zoom-image-hover">
                      <img :src="product.img" :alt="product.title">
                    </div>
                    <div class="cr-side-view">
                      <a href="javascript:void(0)" class="wishlist">
                        <i class="ri-heart-line"></i>
                      </a>
                      <a class="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
                        <i class="ri-eye-line"></i>
                      </a>
                    </div>
                    <a class="cr-shopping-bag" href="javascript:void(0)">
                      <i class="ri-shopping-bag-line"></i>
                    </a>
                  </div>
                  <div class="cr-product-details">
                    <div class="cr-brand">
                      <router-link to="/shop">{{ product.category }}</router-link>
                      <div class="cr-star">
                        <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'ri-star-fill' : 'ri-star-line'"></i>
                        <p>({{ product.rating.toFixed(1) }})</p>
                      </div>
                    </div>
                    <router-link to="/product-details" class="title">{{ product.title }}</router-link>
                    <p class="cr-price">
                      <span class="new-price">${{ product.newPrice }}</span>
                      <span class="old-price">${{ product.oldPrice }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const currentFilter = ref('all');

const products = [
  { id: 1, category: 'Vegetables', rating: 4.5, title: 'Fresh organic villa farm lomon 500gm pack', newPrice: 120.25, oldPrice: 123.25, img: '/assets/img/product/1.jpg', type: 'vegetable' },
  { id: 2, category: 'Snacks', rating: 5.0, title: 'Best snakes with hazel nut pack 200gm', newPrice: 145, oldPrice: 150, img: '/assets/img/product/9.jpg', type: 'snack' },
  { id: 3, category: 'Fruits', rating: 4.5, title: 'Fresh organic apple 1kg simla marming', newPrice: 120.25, oldPrice: 123.25, img: '/assets/img/product/2.jpg', type: 'fruit' },
  { id: 4, category: 'Bakery', rating: 5.0, title: 'Delicious white baked fresh bread and toast', newPrice: 20, oldPrice: 22.10, img: '/assets/img/product/17.jpg', type: 'bakery' },
  { id: 5, category: 'Snacks', rating: 5.0, title: 'Sweet crunchy nut mix 250gm pack', newPrice: 120.25, oldPrice: 123.25, img: '/assets/img/product/11.jpg', type: 'snack' },
  { id: 6, category: 'Fruits', rating: 3.2, title: 'Organic fresh venila farm watermelon 5kg', newPrice: 50.3, oldPrice: 72.6, img: '/assets/img/product/3.jpg', type: 'fruit' },
  { id: 7, category: 'Snacks', rating: 5.0, title: 'Sweet crunchy nut mix 250gm pack', newPrice: 120.25, oldPrice: 123.25, img: '/assets/img/product/10.jpg', type: 'snack' },
  { id: 8, category: 'Bakery', rating: 5.0, title: 'Delicious white baked fresh bread and toast', newPrice: 20, oldPrice: 22.10, img: '/assets/img/product/17.jpg', type: 'bakery' }
];

const filteredProducts = computed(() => {
  if (currentFilter.value === 'all') return products;
  return products.filter(p => p.type === currentFilter.value);
});

const setFilter = (filter) => {
  currentFilter.value = filter;
};

onMounted(() => {
  AOS.init({
    duration: 2000,
  });
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
