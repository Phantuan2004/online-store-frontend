<template>
  <!-- Featured product -->
  <section class="section-popular margin-b-100">
    <div class="container">
      <div class="row">
        <div class="col-xxl-7 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-duration="2000">
          <div class="cr-twocolumns-product-wrapper">
            <div class="cr-twocolumns-product swiper-container" ref="featuredSwiper">
              <div class="swiper-wrapper">
                <div v-for="product in featuredProducts" :key="product.id" class="swiper-slide">
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
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-5 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-duration="2000">
          <div class="cr-products-rightbar">
            <img :src="productsRightviewImg" alt="products-rightview">
            <div class="cr-products-rightbar-content">
              <h4>Organic & Healthy <br> Vegetables</h4>
              <div class="cr-off">
                <span>25% <code>OFF</code></span>
              </div>
              <div class="rightbar-buttons">
                <router-link to="/shop" class="cr-button">shop now</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import productImg1 from '@/assets/user/img/product/1.jpg';
import productImg9 from '@/assets/user/img/product/9.jpg';
import productImg10 from '@/assets/user/img/product/10.jpg';
import productsRightviewImg from '@/assets/user/img/product/products-rightview.jpg';

const featuredSwiper = ref(null);
const featuredProducts = [
  { id: 9, category: 'Snacks', rating: 4.5, title: 'Best snakes with hazel nut mix pack 200gm', newPrice: 120.25, oldPrice: 123.25, img: productImg9 },
  { id: 10, category: 'Snacks', rating: 5.0, title: 'Sweet snakes crunchy nut mix 250gm pack', newPrice: 100.0, oldPrice: 110.0, img: productImg10 },
  { id: 1, category: 'Snacks', rating: 4.5, title: 'Best snakes with hazel nut mix pack 200gm', newPrice: 120.25, oldPrice: 123.25, img: productImg1 }
];

onMounted(() => {
  new Swiper(featuredSwiper.value, {
    modules: [Autoplay],
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 1 },
      1200: { slidesPerView: 2 }
    }
  });
});
</script>
