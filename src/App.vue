<script setup>
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
    authStore.checkAuthStatus();
});
</script>

<template>
  <!-- Đây là entry point chính, nội dung thực tế sẽ được điều phối bởi Layouts thông qua RouterView -->
  <router-view />
</template>

<style>
/* CSS toàn cục nếu cần */
</style>
