<template>
  <main class="home-page">
    <Hero />
    <Categories />
    <PopularProducts />
    <Banners />
    <Services />
    <Deal />
    <FeaturedProducts />
    <Testimonials />
    <Blog />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import sub-components
import Hero from '@/components/user/home/Hero.vue';
import Categories from '@/components/user/home/Categories.vue';
import PopularProducts from '@/components/user/home/PopularProducts.vue';
import Banners from '@/components/user/home/Banners.vue';
import Services from '@/components/user/home/Services.vue';
import Deal from '@/components/user/home/Deal.vue';
import FeaturedProducts from '@/components/user/home/FeaturedProducts.vue';
import Testimonials from '@/components/user/home/Testimonials.vue';
import Blog from '@/components/user/home/Blog.vue';

onMounted(() => {
  // Initialize AOS globally for all home components
  AOS.init({
    duration: 2000,
    once: true,
  });
});
</script>

<style scoped>
.home-page {
  overflow: hidden;
}
</style>