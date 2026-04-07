<script setup>
import { onMounted, onUnmounted } from "vue";
import Loader from "../../components/user/Loader.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Menu from "../../components/user/Menu.vue";
import Breadcrumb from "../../components/user/Breadcrumb.vue";
import MyCart from "../../components/user/MyCart.vue";
import TabToTop from "../../components/user/TabToTop.vue";
import { RouterView } from "vue-router";
import { loadScripts, unloadScripts } from "../../utils/assetLoader";

// Import User CSS
import "@/assets/user/css/vendor/animate.css";
import "@/assets/user/css/vendor/aos.min.css";
import "@/assets/user/css/vendor/bootstrap.min.css";
import "@/assets/user/css/vendor/flaticons.css";
import "@/assets/user/css/vendor/jquery.slick.css";
import "@/assets/user/css/vendor/materialdesignicons.min.css";
import "@/assets/user/css/vendor/owl.carousel.min.css";
import "@/assets/user/css/vendor/range-slider.css";
import "@/assets/user/css/vendor/remixicon.css";
import "@/assets/user/css/vendor/slick-theme.css";
import "@/assets/user/css/vendor/swiper-bundle.min.css";
import "@/assets/user/css/style.css";

const userScripts = [
  "/src/assets/vendor/js/jquery-3.6.4.min.js",
  "/src/assets/vendor/js/jquery.zoom.min.js",
  "/src/assets/vendor/js/bootstrap.bundle.min.js",
  "/src/assets/vendor/js/mixitup.min.js",
  "/src/assets/vendor/js/range-slider.js",
  "/src/assets/vendor/js/aos.min.js",
  "/src/assets/vendor/js/swiper-bundle.min.js",
  "/src/assets/vendor/js/slick.min.js",
  "/src/assets/user/js/main.js",
];

onMounted(async () => {
  try {
    await loadScripts(userScripts);
    console.log("User scripts loaded successfully");
  } catch (error) {
    console.error("Error loading user scripts:", error);
  }
});

onUnmounted(() => {
  unloadScripts(userScripts);
});
</script>

<template>
  <Loader />
  <Header />
  <Menu />
  <Breadcrumb />
  <TabToTop />
  <router-view />
  <MyCart />
  <Footer />
</template>

<style scoped>
</style>
