<script setup>
import { onMounted, onUnmounted } from "vue";
import { loadScripts, unloadScripts, loadStyles, unloadStyles } from "../../utils/assetLoader";
import Sidebar from "../../components/admin/Sidebar.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

/** 
 * IMPORT CSS STATICALLY 
 * Vite handles these correctly, ensuring they are bundled and applied.
 * We keep common icons and minor vendor styles static for immediate loading.
 */
import "@/assets/admin/css/vendor/materialdesignicons.min.css";
import "@/assets/admin/css/vendor/remixicon.css";
import "@/assets/admin/css/vendor/owl.carousel.min.css";
import "@/assets/admin/css/vendor/datatables.bootstrap5.min.css";
import "@/assets/admin/css/vendor/responsive.datatables.min.css";
import "@/assets/admin/css/vendor/daterangepicker.css";
import "@/assets/admin/css/vendor/simplebar.css";
import "@/assets/admin/css/vendor/apexcharts.css";
import "@/assets/admin/css/vendor/jquery-jvectormap-1.2.2.css";

/**
 * CSS DYNAMIC LOADING
 * These are loaded separately as requested, with style.css having a specific ID.
 */
const adminStyles = [
  "/src/assets/admin/css/vendor/bootstrap.min.css",
  { src: "/src/assets/admin/css/style.css", id: "main-css" }
];

/**
 * JS VENDOR SCRIPTS
 * These depend on global window variables (jQuery, etc.) 
 * so we load them dynamically in sequence.
 */
const adminScripts = [
  "/src/assets/admin/js/vendor/jquery-3.6.4.min.js",
  "/src/assets/admin/js/vendor/simplebar.min.js",
  "/src/assets/admin/js/vendor/bootstrap.bundle.min.js",
  "/src/assets/admin/js/vendor/apexcharts.min.js",
  "/src/assets/admin/js/vendor/jquery-jvectormap-1.2.2.min.js",
  "/src/assets/admin/js/vendor/jquery-jvectormap-world-mill-en.js",
  "/src/assets/admin/js/vendor/owl.carousel.min.js",
  "/src/assets/admin/js/vendor/jquery.datatables.min.js",
  "/src/assets/admin/js/vendor/datatables.bootstrap5.min.js",
  "/src/assets/admin/js/vendor/datatables.responsive.min.js",
  "/src/assets/admin/js/vendor/jquery.simple-calendar.js",
  "/src/assets/admin/js/vendor/moment.min.js",
  "/src/assets/admin/js/vendor/daterangepicker.js",
  "/src/assets/admin/js/vendor/date-range.js",
  "/src/assets/admin/js/main.js",
  "/src/assets/admin/js/data/ecommerce-chart-data.js"
];

onMounted(async () => {
  try {
    // Load Styles first to ensure layout is ready
    await loadStyles(adminStyles);
    console.log("Admin styles loaded successfully");

    // Then load Scripts
    await loadScripts(adminScripts);
    console.log("Admin scripts loaded successfully");
  } catch (error) {
    console.error("Critical error loading Admin assets:", error);
  }
});

onUnmounted(() => {
  unloadScripts(adminScripts);
  unloadStyles(adminStyles);
});
</script>

<template>
  <!-- Root Classes: wrapper sb-collapse are ESSENTIAL for the legacy sidebar JS to function -->
  <div class="cr-wrapper wrapper sb-default">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Header & Main Content -->
    <div class="cr-main-wrapper">
      <Header />
      
      <!-- Content Area -->
      <router-view />

      <Footer />
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for AdminLayout if needed */
</style>
