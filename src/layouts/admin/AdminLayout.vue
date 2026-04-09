<script setup>
import Sidebar from "../../components/admin/Sidebar.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { RouterView } from "vue-router";
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
