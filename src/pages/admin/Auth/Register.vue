<template>
	<main class="wrapper sb-default">
		<section class="auth-section anim">
			<div class="cr-login-page">
				<div class="container-fluid">
					<div class="row">
						<div class="offset-lg-6 col-lg-6">
							<div class="content-detail">
								<div class="main-info">
									<div class="hero-container">
										<!-- Signup form -->
										<form class="signup-form" @submit.prevent="handleRegister">
											<div class="imgcontainer">
												<router-link to="/admin">
													<img src="@/assets/user/img/logo/logo.png" alt="logo" class="logo">
												</router-link>
											</div>
											<div class="input-control">
												<div v-if="error" class="alert alert-danger mb-3" style="font-size: 13px;">
													{{ error }}
												</div>
												<div v-if="success" class="alert alert-success mb-3" style="font-size: 13px;">
													Registration successful! <router-link to="/admin/login">Login now</router-link>
												</div>

												<div class="row p-l-5 p-r-5">
													<div class="col-md-6 p-l-10 p-r-10">
														<input type="text" placeholder="Enter Username" v-model="form.name" required>
													</div>
													<div class="col-md-6 p-l-10 p-r-10">
														<input type="email" placeholder="Enter Email" v-model="form.email" required>
													</div>
													<div class="col-md-6 p-l-10 p-r-10">
														<input type="password" placeholder="Enter Password" v-model="form.password"
															class="input-checkmark" required>
													</div>
													<div class="col-md-6 p-l-10 p-r-10">
														<span class="password-field-show">
															<input class="password-field input-checkmark"
																:type="showPassword ? 'text' : 'password'" 
																placeholder="Re-enter Password"
																v-model="form.password_confirmation" required>
															<span @click="showPassword = !showPassword"
																:class="['fa', 'fa-fw', showPassword ? 'ri-eye-off-line' : 'ri-eye-line', 'field-icon', 'toggle-password']"
																style="cursor: pointer; top: 20px;"></span>
														</span>
													</div>
												</div>
												<label class="label-container">I agree with <a href="#"> privacy policy</a>
													<input type="checkbox" v-model="agreed" required>
													<span class="checkmark"></span>
												</label>
												<div class="login-btns">
													<button type="submit" :disabled="loading">
														{{ loading ? 'Creating Account...' : 'Sign up' }}
													</button>
												</div>
												<div class="division-lines">
													<p>or signup with</p>
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
													<span class="already-acc">Already have an account? 
														<router-link to="/admin/login" class="login-btn">Login</router-link>
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
import api from '@/services/api';

const router = useRouter();

const form = reactive({
	name: '',
	email: '',
	password: '',
	password_confirmation: '',
	role: 'admin' // Explicitly set role for admin registration
});

const loading = ref(false);
const error = ref('');
const success = ref(false);
const agreed = ref(false);
const showPassword = ref(false);

const handleRegister = async () => {
	if (!agreed.value) {
		error.value = 'You must agree to the privacy policy.';
		return;
	}

	if (form.password !== form.password_confirmation) {
		error.value = 'Passwords do not match.';
		return;
	}

	loading.value = true;
	error.value = '';
	success.value = false;

	try {
		await api.post('/register', form);
		success.value = true;
		// Reset form
		form.name = '';
		form.email = '';
		form.password = '';
		form.password_confirmation = '';
		
		// Optional: auto login or redirect after delay
		setTimeout(() => {
			router.push('/admin/login');
		}, 3000);
	} catch (err) {
		console.error('Admin register error:', err);
		error.value = err.response?.data?.message || 'Registration failed. Please check your data.';
	} finally {
		loading.value = false;
	}
};
</script>

