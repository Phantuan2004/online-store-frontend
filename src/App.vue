<script setup>
import Header from "./layouts/user/Header.vue";
import Footer from "./layouts/user/Footer.vue";
import Menu from "./components/user/Menu.vue";
import Breadcrumb from "./components/user/Breadcrumb.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <Menu />
  <Breadcrumb />
  <router-view />
  <Footer />
</template>
