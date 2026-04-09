<template>
    <!-- sidebar -->
		<div class="cr-sidebar-overlay"></div>
		<div class="cr-sidebar" data-mode="light">
			<div class="cr-sb-logo">
			<router-link to="/admin" class="sb-full"><img :src="fullLogoImg" alt="logo"></router-link>
			<router-link to="/admin" class="sb-collapse"><img :src="collapseLogoImg" alt="logo"></router-link>
			</div>
			<div class="cr-sb-wrapper">
				<div class="cr-sb-content">
					<ul class="cr-sb-list">
						<li class="cr-sb-item sb-drop-item" :class="{ 'load-active': expandedMenu === 'Dashboard' }">
							<a href="javascript:void(0)" class="cr-drop-toggle" @click="toggleMenu('Dashboard')">
								<i class="ri-dashboard-3-line"></i><span class="condense">Dashboard<i
										class="drop-arrow ri-arrow-down-s-line"></i></span></a>
							<ul class="cr-sb-drop condense" v-show="expandedMenu === 'Dashboard'">
								<li><router-link to="/admin" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
									class="ri-checkbox-blank-circle-line"></i>ecommerce</router-link></li>
								<li><router-link to="/admin/products" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Product list</router-link></li>
								<li><router-link to="/admin/add-product" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Add Product</router-link></li>
								<li><router-link to="/admin/add-category" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Add Category</router-link></li>
								<li><router-link to="/admin/add-sub-category" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Add Sub Category</router-link></li>
								<li><router-link to="/admin/orders" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Dashboard', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Order List</router-link></li>

								<li class="cr-sb-item sb-subdrop-item" :class="{ 'load-sub-active': expandedSubMenu === 'Vendor' }">
									<a href="javascript:void(0)" class="cr-sub-drop-toggle" @click="toggleSubMenu('Vendor')">
										<i class="ri-shield-user-line"></i><span class="condense">Vendor<i
												class="drop-arrow ri-arrow-down-s-line"></i></span></a>
									<ul class="cr-sb-subdrop condense" v-show="expandedSubMenu === 'Vendor'">
										<li><router-link to="/admin/vendor-profile" class="cr-page-link subdrop" active-class="active-link" @click="toggleSubMenu('Vendor', true)"><i
													class="ri-checkbox-blank-circle-line"></i>Profile</router-link></li>
										<li><router-link to="/admin/vendor-update" class="cr-page-link subdrop" active-class="active-link" @click="toggleSubMenu('Vendor', true)"><i
													class="ri-checkbox-blank-circle-line"></i>Vendor Update</router-link></li>
										<li><router-link to="/admin/vendor-list" class="cr-page-link subdrop" active-class="active-link" @click="toggleSubMenu('Vendor', true)"><i
													class="ri-checkbox-blank-circle-line"></i>Vendor List</router-link></li>
										<li><router-link to="/admin/invoice" class="cr-page-link subdrop" active-class="active-link" @click="toggleSubMenu('Vendor', true)"><i
													class="ri-checkbox-blank-circle-line"></i>Invoice</router-link></li>
									</ul>

								</li>
							</ul>
						</li>
						<li class="cr-sb-item-separator"></li>
						<li class="cr-sb-title condense">Pages</li>
						<li class="cr-sb-item sb-drop-item" :class="{ 'load-active': expandedMenu === 'Authentication' }">
							<a href="javascript:void(0)" class="cr-drop-toggle" @click="toggleMenu('Authentication')">
								<i class="ri-pages-line"></i><span class="condense">Authentication<i
										class="drop-arrow ri-arrow-down-s-line"></i></span></a>
							<ul class="cr-sb-drop condense" v-show="expandedMenu === 'Authentication'">
								<li><router-link to="/admin/auth/login" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Login</router-link></li>
								<li><router-link to="/admin/auth/register" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Signup</router-link></li>
								<li><router-link to="/admin/auth/forgot-password" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Forgot password</router-link></li>
								<li><router-link to="/admin/auth/two-factor" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>two factor</router-link></li>
								<li><router-link to="/admin/auth/reset-password" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Reset password</router-link></li>
								<li><router-link to="/admin/auth/remember" class="cr-page-link drop" active-class="active-link" @click="toggleMenu('Authentication', true)"><i
											class="ri-checkbox-blank-circle-line"></i>Remember</router-link></li>
							</ul>

						</li>

					</ul>
				</div>
			</div>
		</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import fullLogoImg from '@/assets/user/img/logo/logo.png';
import collapseLogoImg from '@/assets/user/img/logo/favicon.png';

const route = useRoute();
const expandedMenu = ref(localStorage.getItem('currentActiveTab') || '');
const expandedSubMenu = ref(localStorage.getItem('currentActiveSubTab') || '');

const updateStorage = () => {
    localStorage.setItem('currentActiveTab', expandedMenu.value);
    localStorage.setItem('currentActiveSubTab', expandedSubMenu.value);
};

const toggleMenu = (name, force = false) => {
    expandedMenu.value = force ? name : (expandedMenu.value === name ? '' : name);
    updateStorage();
};

const toggleSubMenu = (name, force = false) => {
    expandedSubMenu.value = force ? name : (expandedSubMenu.value === name ? '' : name);
    if (expandedSubMenu.value) expandedMenu.value = 'Dashboard';
    updateStorage();
};

const syncMenu = () => {
    const saved = localStorage.getItem('currentActiveTab');
    if (saved !== null) {
        expandedMenu.value = saved;
        expandedSubMenu.value = localStorage.getItem('currentActiveSubTab') || '';
        return;
    }

    const menus = {
        Dashboard: ['/admin', '/admin/products', '/admin/add-product', '/admin/add-category', '/admin/add-sub-category', '/admin/orders'],
        Authentication: ['/admin/auth/login', '/admin/auth/register', '/admin/auth/forgot-password', '/admin/auth/two-factor', '/admin/auth/reset-password', '/admin/auth/remember'],
        Vendor: ['/admin/vendor-profile', '/admin/vendor-update', '/admin/vendor-list', '/admin/invoice']
    };

    const found = Object.keys(menus).find(m => menus[m].includes(route.path));
    if (found === 'Vendor') {
        expandedMenu.value = 'Dashboard';
        expandedSubMenu.value = 'Vendor';
    } else {
        expandedMenu.value = found || (route.path === '/admin' ? 'Dashboard' : '');
    }
    updateStorage();
};

onMounted(syncMenu);
watch(() => route.path, syncMenu);
</script>


<style scoped>
/* Ensure transition or display consistency if needed */
.cr-sb-drop, .cr-sb-subdrop {
    display: block; /* Vue v-show will handle actual visibility */
}
</style>
