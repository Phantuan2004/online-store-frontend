<template>
  <!-- Blog -->
  <section class="section-blog padding-b-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30" data-aos="fade-up" data-aos-duration="2000">
            <div class="cr-banner">
              <h2>Latest News</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore lacus vel facilisis. </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-blog-slider swiper-container" ref="blogSwiper">
            <div class="swiper-wrapper">
              <div v-for="b in blogs" :key="b.title" class="swiper-slide" data-aos="fade-up" data-aos-duration="2000">
                <div class="cr-blog">
                  <div class="cr-blog-content">
                    <span><code>By {{ b.author }}</code> | <router-link to="/blog">{{ b.category }}</router-link></span>
                    <h5>{{ b.title }}</h5>
                    <RouterLink class="read" to="/blog">Read More</RouterLink>
                  </div>
                  <div class="cr-blog-image">
                    <img :src="b.img" :alt="b.title">
                    <div class="cr-blog-date">
                      <span>{{ b.day }}<code>{{ b.month }}</code></span>
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
import blogImg1 from '@/assets/user/img/blog/1.jpg';
import blogImg2 from '@/assets/user/img/blog/2.jpg';
import blogImg3 from '@/assets/user/img/blog/3.jpg';

const blogSwiper = ref(null);
const blogs = [
  { img: blogImg2, title: 'Urna pretium elit mauris cursus at elit Vestibulum.', author: 'Admin', category: 'Snacks', day: '10', month: 'oct' },
  { img: blogImg1, title: 'Best guide to Shopping for organic ingredients.', author: 'Admin', category: 'Food', day: '09', month: 'sep' },
  { img: blogImg3, title: 'Cursus at elit vestibulum urna pretium elit mauris.', author: 'Admin', category: 'Snacks', day: '12', month: 'oct' },
  { img: blogImg2, title: 'Condimentum Nam enim bestMorbi odio sodales.', author: 'Admin', category: 'Vegetable', day: '22', month: 'jan' }
];

onMounted(() => {
  new Swiper(blogSwiper.value, {
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
