<template>
    <!-- sidebar -->
		<div class="cr-sidebar-overlay"></div>
		<div class="cr-sidebar" data-mode="light">
			<div class="cr-sb-logo">
			<a href="index.html" class="sb-full"><img :src="fullLogoImg" alt="logo"></a>
			<a href="index.html" class="sb-collapse"><img :src="collapseLogoImg" alt="logo"></a>
			</div>
			<div class="cr-sb-wrapper">
				<div class="cr-sb-content">
					<ul class="cr-sb-list">
						<li class="cr-sb-item sb-drop-item">
							<a href="javascript:void(0)" class="cr-drop-toggle">
								<i class="ri-dashboard-3-line"></i><span class="condense">Dashboard<i
										class="drop-arrow ri-arrow-down-s-line"></i></span></a>
							<ul class="cr-sb-drop condense">
								<li><router-link to="/admin" class="cr-page-link drop"><i
									class="ri-checkbox-blank-circle-line"></i>ecommerce</router-link></li>
								<li><router-link to="/admin/products" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Product list</router-link></li>
								<li><router-link to="/admin/add-product" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Add Product</router-link></li>
								<li><router-link to="/admin/add-category" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Add Category</router-link></li>
								<li><router-link to="/admin/add-sub-category" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Add Sub Category</router-link></li>
								<li><router-link to="/admin/orders" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Order List</router-link></li>
								<li class="cr-sb-item sb-subdrop-item">
									<a href="javascript:void(0)" class="cr-sub-drop-toggle">
										<i class="ri-shield-user-line"></i><span class="condense">Vendor<i
												class="drop-arrow ri-arrow-down-s-line"></i></span></a>
									<ul class="cr-sb-subdrop condense">
										<li><router-link to="/admin/vendor-profile" class="cr-page-link subdrop"><i
													class="ri-checkbox-blank-circle-line"></i>Profile</router-link></li>
										<li><router-link to="/admin/vendor-update" class="cr-page-link subdrop"><i
													class="ri-checkbox-blank-circle-line"></i>Vendor Update</router-link></li>
										<li><router-link to="/admin/vendor-list" class="cr-page-link subdrop"><i
													class="ri-checkbox-blank-circle-line"></i>Vendor List</router-link></li>
										<li><router-link to="/admin/invoice" class="cr-page-link subdrop"><i
													class="ri-checkbox-blank-circle-line"></i>Invoice</router-link></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="cr-sb-item-separator"></li>
						<li class="cr-sb-title condense">Pages</li>
						<li class="cr-sb-item sb-drop-item">
							<a href="javascript:void(0)" class="cr-drop-toggle">
								<i class="ri-pages-line"></i><span class="condense">Authentication<i
										class="drop-arrow ri-arrow-down-s-line"></i></span></a>
							<ul class="cr-sb-drop condense">
								<li><a href="signin.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Login</a></li>
								<li><a href="signup.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Signup</a></li>
								<li><a href="forgot.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Forgot password</a></li>
								<li><a href="two-factor.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>two factor</a></li>
								<li><a href="reset-password.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Reset password</a></li>
								<li><a href="remember.html" class="cr-page-link drop"><i
											class="ri-checkbox-blank-circle-line"></i>Remember</a></li>
							</ul>
						</li>
						<li class="cr-sb-item-separator"></li>
						<li class="cr-sb-title condense">Elements</li>
						<li class="cr-sb-item">
							<a href="remix-icons.html" class="cr-page-link">
								<i class="ri-remixicon-line"></i><span class="condense"><span class="hover-title">remix
										icons</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="material-icons.html" class="cr-page-link">
								<i class="mdi mdi-material-ui"></i><span class="condense"><span
										class="hover-title">Material icons</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="apexchart.html" class="cr-page-link">
								<i class="ri-bar-chart-grouped-line"></i><span class="condense"><span
										class="hover-title">Apexcharts</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="buttons.html" class="cr-page-link">
								<i class="ri-radio-button-line"></i><span class="condense"><span
										class="hover-title">Buttons</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="accordions.html" class="cr-page-link">
								<i class="ri-play-list-add-line"></i><span class="condense"><span
										class="hover-title">Accordions</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="typography.html" class="cr-page-link">
								<i class="ri-file-text-line"></i><span class="condense"><span
										class="hover-title">Typography</span></span></a>
						</li>
						<li class="cr-sb-item">
							<a href="alert-popup.html" class="cr-page-link">
								<i class="ri-file-warning-line"></i><span class="condense"><span
										class="hover-title">Alert Popup</span></span></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script setup>
import fullLogoImg from '@/assets/user/img/logo/logo.png';
import collapseLogoImg from '@/assets/user/img/logo/favicon.png';
</script>

<style scoped>

</style>
