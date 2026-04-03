<template>
  <section class="section-login padding-tb-100">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="cr-login" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
            <div class="form-logo">
              <img :src="logoImg" alt="logo">
            </div>
            <form class="cr-content-form">
              <div class="form-group">
                <label>Email Address*</label>
                <input type="email" placeholder="Enter Your Email" class="cr-form-control">
              </div>
              <p class="mb-3">
                Enter your email address and we will send instructions to reset your password.
              </p>
              <div class="login-buttons">
                <button type="button" class="cr-button">Send Reset Link</button>
                <RouterLink to="/login" class="link">
                  Back to login
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
import logoImg from '@/assets/user/img/logo/logo.png';
</script>
