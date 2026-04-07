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
											<div class="input-control">
												<div class="imgcontainer user">
													<router-link to="/admin"><img src="@/assets/admin/img/user/1.jpg" alt="user" class="user"></router-link>
												</div>
												<h6>John wilson</h6>
												<p>Enter your password to login.</p>
												<input type="password" placeholder="Enter Password" name="password" required>
												<div class="login-btns">
													<button type="submit">Login</button>
												</div>
												<div class="login-with-btns">
													<span class="already-acc">Not a member? <router-link to="/admin/auth/register"
														class="signup-btn">Sign up</router-link></span>
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
        name: "Remember",
    }
</script>
