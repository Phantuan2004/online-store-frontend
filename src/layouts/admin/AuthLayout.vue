<script setup>
import { onMounted, onUnmounted } from "vue";
import { loadScripts, unloadScripts, loadStyles, unloadStyles } from "../../utils/assetLoader";

/** 
 * IMPORT CSS STATICALLY 
 * Vite handles these correctly, ensuring they are bundled and applied.
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
 * Ensures style.css has the specific ID for legacy theme/script support.
 */
const adminStyles = [
  "/src/assets/admin/css/vendor/bootstrap.min.css",
  { src: "/src/assets/admin/css/style.css", id: "main-css" }
];

/**
 * JS VENDOR SCRIPTS
 * Required for components on Auth pages (e.g., eye icons, ripple buttons).
 */
const adminScripts = [
  "/src/assets/admin/js/vendor/jquery-3.6.4.min.js",
  "/src/assets/admin/js/vendor/simplebar.min.js",
  "/src/assets/admin/js/vendor/bootstrap.bundle.min.js",
  "/src/assets/admin/js/main.js"
];

onMounted(async () => {
  try {
    await loadStyles(adminStyles);
    await loadScripts(adminScripts);
    console.log("Admin Auth assets loaded successfully");
  } catch (error) {
    console.error("Critical error loading Admin Auth assets:", error);
  }
});

onUnmounted(() => {
  unloadScripts(adminScripts);
  unloadStyles(adminStyles);
});
</script>

<template>
  <!-- Simple wrapper for auth pages -->
  <router-view />
</template>

<style scoped>
/* Scoped styles for AuthLayout if needed */
</style>
