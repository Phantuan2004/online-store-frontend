<template>
    <!-- Register -->
    <section class="section-register padding-tb-100">
        <div class="container">
            <div class="row d-none">
                <div class="col-lg-12">
                    <div class="mb-30" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-banner">
                            <h2>Register</h2>
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
                    <div class="cr-register" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="form-logo">
                            <img :src="logoImg" alt="logo">
                        </div>
                        <form class="cr-content-form" @submit.prevent="handleRegister">
                            <div v-if="errorMessage" class="error-message" style="color: red; margin-bottom: 15px;">
                                {{ errorMessage }}
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Full Name*</label>
                                        <input type="text" placeholder="Enter Your Full Name" class="cr-form-control" v-model="name" required>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Email*</label>
                                        <input type="email" placeholder="Enter Your email" class="cr-form-control" v-model="email" required>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Password*</label>
                                        <input type="password" placeholder="Enter Your password" class="cr-form-control" v-model="password" required>
                                    </div>
                                </div>
                                <div class="cr-register-buttons">
                                    <button type="submit" class="cr-button" :disabled="isLoading">
                                        <span v-if="isLoading">Signing up...</span>
                                        <span v-else>Signup</span>
                                    </button>
                                    <RouterLink to="/login" class="link">
                                        Have an account?
                                    </RouterLink>
                                </div>
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

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const handleRegister = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            router.push('/login');
        } else {
            errorMessage.value = data.message || 'Registration failed. Please check your inputs.';
        }
    } catch (error) {
        console.error('Registration error:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>

</style>
