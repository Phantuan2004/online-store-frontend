<template>
  <!-- Product banner -->
  <section class="section-product-banner padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-banner-slider swiper-container" ref="bannerSwiper">
            <div class="swiper-wrapper">
              <div
                v-for="(banner, index) in banners"
                :key="index"
                class="swiper-slide"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div class="cr-product-banner-image">
                  <img :src="banner.img" alt="product-banner">
                  <div class="cr-product-banner-contain">
                    <h5 v-html="banner.title"></h5>
                    <p>
                      <span class="percent">{{ banner.off }}%</span> Off
                      <span class="text">on first order</span>
                    </p>
                    <div class="cr-product-banner-buttons">
                      <router-link to="/shop" class="cr-button">shop now</router-link>
                    </div>
                  </div>
                </div>
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
import bannerImg1 from '@/assets/user/img/product-banner/1.jpg';
import bannerImg2 from '@/assets/user/img/product-banner/2.jpg';
import bannerImg3 from '@/assets/user/img/product-banner/3.jpg';

const bannerSwiper = ref(null);
const banners = [
  { img: bannerImg1, title: 'Healthy <br> Bakery Products', off: 30 },
  { img: bannerImg2, title: 'Fresh <br>Snacks & Sweets', off: 20 },
  { img: bannerImg3, title: 'Fresh & healthy <br> Organic Fruits', off: 35 }
];

onMounted(() => {
  new Swiper(bannerSwiper.value, {
    modules: [Autoplay],
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
});
</script>
