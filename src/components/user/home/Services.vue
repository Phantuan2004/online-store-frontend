<template>
  <!-- Services -->
  <section class="section-services padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-services-border" data-aos="fade-up" data-aos-duration="2000">
            <div class="cr-service-slider swiper-container" ref="serviceSwiper">
              <div class="swiper-wrapper">
                <div v-for="service in services" :key="service.title" class="swiper-slide">
                  <div class="cr-services">
                    <div class="cr-services-image">
                      <i :class="service.icon"></i>
                    </div>
                    <div class="cr-services-contain">
                      <h4>{{ service.title }}</h4>
                      <p>{{ service.description }}</p>
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

const serviceSwiper = ref(null);
const services = [
  { icon: 'ri-red-packet-line', title: 'Product Packing', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.' },
  { icon: 'ri-customer-service-2-line', title: '24X7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.' },
  { icon: 'ri-truck-line', title: 'Delivery in 5 Days', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.' },
  { icon: 'ri-money-dollar-box-line', title: 'Payment Secure', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.' }
];

onMounted(() => {
  new Swiper(serviceSwiper.value, {
    modules: [Autoplay],
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    }
  });
});
</script>
