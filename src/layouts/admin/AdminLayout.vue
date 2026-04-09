<script setup>
import { onMounted, onUnmounted } from "vue";
import { loadScripts, unloadScripts } from "../../utils/assetLoader";
import Sidebar from "../../components/admin/Sidebar.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";


	import "@/assets/admin/css/vendor/materialdesignicons.min.css"
	import "@/assets/admin/css/vendor/remixicon.css"
	import "@/assets/admin/css/vendor/owl.carousel.min.css"
	import "@/assets/admin/css/vendor/datatables.bootstrap5.min.css"
	import "@/assets/admin/css/vendor/responsive.datatables.min.css"
	import "@/assets/admin/css/vendor/daterangepicker.css"
	import "@/assets/admin/css/vendor/simplebar.css"
  // Tách riêng phần styles để dễ quản lý và tránh lỗi khi load script trước styles
  const adminStyles = [
    "/src/assets/admin/css/vendor/bootstrap.min.css"
  ]

  onMounted(async () => {
    try {
      await loadScripts(adminStyles);
      console.log("Admin styles loaded successfully");
    } catch (error) {
      console.error("Error loading admin styles:", error);
    }
  })

  onUnmounted(() => {
    unloadScripts(adminStyles);
  })
  
	import "@/assets/admin/css/vendor/apexcharts.css"
	import "@/assets/admin/css/vendor/jquery-jvectormap-1.2.2.css"
  // Đảm bảo style chính được load sau cùng để override các styles của vendor nếu cần
  const adminId = "main-css"

  onMounted(() => {
  const link = document.createElement('link')
  link.id =  adminId
  link.rel = 'stylesheet'
  link.href = '/assets/admin/css/style.css'
  document.head.appendChild(link)
})

  // Danh sách các script cần load cho admin layout, đảm bảo load sau khi styles đã được load 
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
  ]

  onMounted(async () => {
  try {
    await loadScripts(adminScripts);
    console.log("Admin scripts loaded successfully");
  } catch (error) {
    console.error("Error loading admin scripts:", error);
  }
});

onUnmounted(() => {
  unloadScripts(adminScripts);
});
</script>

<template>
  <div class="cr-wrapper">
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
/* Có thể thêm style tùy chỉnh cho layout admin nếu cần */
</style>
