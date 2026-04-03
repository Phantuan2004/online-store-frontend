<template>
  <!-- Breadcrumb -->
  <section v-if="showBreadcrumb" class="section-breadcrumb">
    <div class="cr-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="cr-breadcrumb-title">
              <h2>{{ breadcrumbTitle }}</h2>
              <span><RouterLink to="/">Home</RouterLink> - {{ breadcrumbTitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbTitles = {
  About: 'About Us',
  Shop: 'Shop',
  Blog: 'Blog',
  Cart: 'Cart',
  Checkout: 'Checkout',
  ContactUs: 'Contact Us',
  Faq: 'FAQ',
  Login: 'Login',
  Register: 'Register',
  Product: 'Product',
  Wishlist: 'Wishlist',
  TrackOrder: 'Track Order',
  Policy: 'Policy',
  Terms: 'Terms',
  ForgotPassword: 'Forgot Password',
};

const showBreadcrumb = computed(() => route.name !== 'Home');

const breadcrumbTitle = computed(() => {
  const routeName = typeof route.name === 'string' ? route.name : '';

  if (breadcrumbTitles[routeName]) {
    return breadcrumbTitles[routeName];
  }

  return routeName.replace(/([a-z])([A-Z])/g, '$1 $2') || 'Page';
});
</script>
