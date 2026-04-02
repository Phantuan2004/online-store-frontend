<template>
  <!-- Hero slider -->
  <section class="section-hero padding-b-100 next">
    <div class="cr-slider swiper-container" ref="heroSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="cr-hero-banner cr-banner-image-two">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="cr-left-side-contain slider-animation">
                    <h5><span>100%</span> Organic Fruits</h5>
                    <h1>Explore fresh & juicy fruits.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis beatae consequuntur.</p>
                    <div class="cr-last-buttons">
                      <router-link to="/shop" class="cr-button">shop now</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="cr-hero-banner cr-banner-image-one">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="cr-left-side-contain slider-animation">
                    <h5><span>100%</span> Organic Vegetables</h5>
                    <h1>The best way to stuff your wallet.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis beatae consequuntur.</p>
                    <div class="cr-last-buttons">
                      <router-link to="/shop" class="cr-button">shop now</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const heroSwiper = ref(null);

onMounted(() => {
  new Swiper(heroSwiper.value, {
    modules: [Pagination, Autoplay, Navigation],
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
</script>

<style scoped>
.cr-hero-banner {
  background-size: cover;
  background-position: center;
}
</style>
