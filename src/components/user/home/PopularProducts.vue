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
                  <li 
                    v-for="cat in categories" 
                    :key="cat"
                    :class="{ active: currentFilter === cat }" 
                    @click="setFilter(cat)"
                    style="text-transform: capitalize;"
                  >
                    {{ cat }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12 col-sm-6 col-6 cr-product-box banner-480 mb-24">
              <div class="cr-ice-cubes">
                <img :src="productBannerImg" alt="product banner">
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
                      <img :src="product.primary_image || product.img" :alt="product.name || product.title">
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
                      <router-link to="/shop">{{ product.category?.name || product.category }}</router-link>
                      <div class="cr-star">
                        <i v-for="i in 5" :key="i" :class="i <= (product.rating || 5) ? 'ri-star-fill' : 'ri-star-line'"></i>
                        <p>({{ (product.rating || 5).toFixed(1) }})</p>
                      </div>
                    </div>
                    <RouterLink :to="`/product/${product.id}`" class="title">{{ product.name || product.title }}</RouterLink>
                    <p class="cr-price">
                      <span class="new-price">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price || product.newPrice) }}</span>
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
import api from '@/services/api';
import productBannerImg from '@/assets/user/img/product/product-banner.jpg';

const currentFilter = ref('all');
const products = ref([]);
const categories = ref(['all']);

const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    if (response && response.data) {
      products.value = response.data;
      
      const cats = new Set(products.value.map(p => p.category?.name).filter(Boolean));
      categories.value = ['all', ...Array.from(cats)];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const filteredProducts = computed(() => {
  if (currentFilter.value === 'all') return products.value;
  return products.value.filter(p => p.category?.name === currentFilter.value);
});

const setFilter = (filter) => {
  currentFilter.value = filter;
};

onMounted(() => {
  fetchProducts();
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
