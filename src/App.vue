<script setup>
import Header from "./layouts/user/Header.vue";
import Footer from "./layouts/user/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>
