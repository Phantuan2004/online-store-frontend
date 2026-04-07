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
										<!-- Forgot form -->
										<form class="forgot-form" method="post">
											<div class="imgcontainer">
												<router-link to="/admin"><img src="@/assets/user/img/logo/logo.png" alt="logo" class="logo"></router-link>
											</div>
											<div class="input-control">
												<h6>Verify Your Email</h6>
												<p>Please enter the 6 digit code sent to. <b>yourmail@example.com</b></p>
												<input type="email" placeholder="Enter code" name="email" required>
												<div class="login-btns">
													<button type="submit">Reset</button>
												</div>
												<div class="login-with-btns">
													<span class="already-acc">Return to <router-link
															to="/admin/auth/login" class="login-btn">Login</router-link></span>
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

<script>
    export default {
        name: "TwoFactor",
    }
</script>
