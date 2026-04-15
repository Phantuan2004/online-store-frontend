<template>
    <!-- Login -->
    <section class="section-login padding-tb-100">
        <div class="container">
            <div class="row d-none">
                <div class="col-lg-12">
                    <div class="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-banner">
                            <h2>Login</h2>
                        </div>
                        <div class="cr-banner-sub-title">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore lacus vel facilisis. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="cr-login" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="form-logo">
                            <img :src="logoImg" alt="logo">
                        </div>
                        <form class="cr-content-form" @submit.prevent="handleLogin">
                            <div v-if="errorMessage" class="error-message" style="color: red; margin-bottom: 15px;">
                                {{ errorMessage }}
                            </div>
                            <div class="form-group">
                                <label>Email Address*</label>
                                <input type="email" placeholder="Enter Your Email" class="cr-form-control" v-model="email" required>
                            </div>
                            <div class="form-group">
                                <label>Password*</label>
                                <input type="password" placeholder="Enter Your password" class="cr-form-control" v-model="password" required>
                            </div>
                            <div class="remember">
                                <span class="form-group custom">
                                    <input type="checkbox" id="html" v-model="rememberMe">
                                    <label for="html">Remember Me</label>
                                </span>
                                <RouterLink class="link" to="/forgot-password">Forgot Password?</RouterLink>
                            </div><br>
                            <div class="login-buttons">
                                <button type="submit" class="cr-button" :disabled="isLoading">
                                    <span v-if="isLoading">Logging in...</span>
                                    <span v-else>Login</span>
                                </button>
                                <RouterLink to="/register" class="link">
                                     Signup?
                                </RouterLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoImg from '@/assets/user/img/logo/logo.png';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                remember_me: rememberMe.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.access_token) {
                authStore.setToken(data.access_token);
            }
            if (data.user) {
                authStore.setUser(data.user);
            }
            // Redirect to homepage or user dashboard
            router.push('/');
        } else {
            errorMessage.value = data.message || 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>

</style>
