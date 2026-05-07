<template>
	<main class="wrapper sb-default">
		<section class="auth-section anim">
			<div class="cr-login-page">
				<div class="container-fluid no-gutters">
					<div class="row">
						<div class="offset-lg-6 col-lg-6">
							<div class="content-detail">
								<div class="main-info">
									<div class="hero-container">
										<!-- Login form -->
										<form class="login-form" @submit.prevent="handleLogin">
											<div class="imgcontainer">
												<router-link to="/admin">
													<img src="@/assets/user/img/logo/logo.png" alt="logo" class="logo">
												</router-link>
											</div>
											<div class="input-control">
												<div v-if="error" class="alert alert-danger mb-3" style="font-size: 13px;">
													{{ error }}
												</div>
												
												<input type="email" placeholder="Enter Email" v-model="form.email" required>
												
												<span class="password-field-show">
													<input :type="showPassword ? 'text' : 'password'" 
														placeholder="Enter Password"
														v-model="form.password" 
														class="password-field" required>
													<span @click="showPassword = !showPassword"
														:class="['fa', 'fa-fw', showPassword ? 'ri-eye-off-line' : 'ri-eye-line', 'field-icon', 'toggle-password']"
														style="cursor: pointer; top: 20px;"></span>
												</span>

												<label class="label-container">Remember me
													<input type="checkbox" v-model="form.remember_me">
													<span class="checkmark"></span>
												</label>

												<span class="psw">
													<router-link to="/admin/forgot-password" class="forgot-btn">
														Forgot password?
													</router-link>
												</span>

												<div class="login-btns">
													<button type="submit" :disabled="loading">
														{{ loading ? 'Authenticating...' : 'Login' }}
													</button>
												</div>

												<div class="division-lines">
													<p>or login with</p>
												</div>

												<div class="login-with-btns">
													<button type="button" class="google">
														<i class="ri-google-fill"></i>
													</button>
													<button type="button" class="facebook">
														<i class="ri-facebook-fill"></i>
													</button>
													<button type="button" class="twitter">
														<i class="ri-twitter-fill"></i>
													</button>
													<button type="button" class="linkedin">
														<i class="ri-linkedin-fill"></i>
													</button>
													<span class="already-acc">Not a member? 
														<router-link to="/admin/register" class="signup-btn">Sign up</router-link>
													</span>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
	email: '',
	password: '',
	remember_me: false
});

const loading = ref(false);
const error = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
	loading.value = true;
	error.value = '';
	
	try {
		// Use api.js which is configured with baseURL and interceptors
		// We explicitly set withCredentials for this request to ensure cookies are handled
		const data = await api.post('/login', form, { withCredentials: true });
		
		// data is the response body due to api.js interceptor
		const user = data.user;
		
		// Admin role check
		if (user && user.role === 'admin') {
			if (data.access_token) {
				authStore.setToken(data.access_token);
			}
			authStore.setUser(user);
			
			// Redirect to admin dashboard
			router.push('/admin');
		} else {
			error.value = 'Access denied. Only administrators can login here.';
			// Optional: logout from backend if needed, or just don't save tokens
		}
	} catch (err) {
		console.error('Admin login error:', err);
		error.value = err.response?.data?.message || 'Login failed. Please check your credentials.';
	} finally {
		loading.value = false;
	}
};
</script>

