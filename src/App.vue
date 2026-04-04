<script setup>
import Loader from "./components/Loader.vue";
import Header from "./layouts/user/Header.vue";
import Footer from "./layouts/user/Footer.vue";
import Menu from "./components/user/Menu.vue";
import Breadcrumb from "./components/user/Breadcrumb.vue";
import MyCart from "./components/user/MyCart.vue";
import TabToTop from "./components/user/TabToTop.vue";
import { RouterView } from "vue-router";
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
