<template>
  <!-- Testimonial -->
  <section class="section-testimonial padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30" data-aos="fade-up" data-aos-duration="2000">
            <div class="cr-banner">
              <h2>Great Words From People</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore lacus vel facilisis. </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-testimonial-slider swiper-container" ref="testimonialSwiper">
            <div class="swiper-wrapper cr-testimonial-pt-50">
              <div v-for="t in testimonials" :key="t.name" class="swiper-slide" data-aos="fade-up" data-aos-duration="2000">
                <div class="cr-testimonial">
                  <div class="cr-testimonial-image">
                    <img :src="t.img" alt="businessman">
                  </div>
                  <div class="cr-testimonial-inner">
                    <span>{{ t.role }}</span>
                    <h4 class="title">{{ t.name }}</h4>
                    <p>“{{ t.content }}”</p>
                    <div class="cr-star">
                      <i v-for="i in 5" :key="i" :class="i <= t.rating ? 'ri-star-fill' : 'ri-star-line'"></i>
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

const testimonialSwiper = ref(null);
const testimonials = [
  { img: '/assets/img/testimonial/1.jpg', name: 'Stephen Smith', role: 'Co Founder', rating: 5, content: 'eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod tem lacus vel facilisis.' },
  { img: '/assets/img/testimonial/2.jpg', name: 'Lorem Robinson', role: 'Manager', rating: 4, content: 'eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod tem lacus vel facilisis.' },
  { img: '/assets/img/testimonial/3.jpg', name: 'Saddika Alard', role: 'Team Leader', rating: 5, content: 'eiusmpsu dolor sit amet, conse cte tur ng elit, sed do eiusmod tem lacus vel facilisis.' }
];

onMounted(() => {
  new Swiper(testimonialSwiper.value, {
    modules: [Autoplay],
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
});
</script>
