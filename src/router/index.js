import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import UserLayout from '../layouts/user/UserLayout.vue'
import AdminLayout from '../layouts/admin/AdminLayout.vue'
import AuthLayout from '../layouts/admin/AuthLayout.vue'

const routes = [
  // Nhóm các trang User sử dụng UserLayout
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/user/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../pages/user/About.vue')
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('../pages/user/Shop.vue')
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../pages/user/Blog.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../pages/user/Cart.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../pages/user/Checkout.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'contact',
        name: 'ContactUs',
        component: () => import('../pages/user/ContactUs.vue')
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('../pages/user/Faq.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../pages/user/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../pages/user/Register.vue')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../pages/user/Product.vue')
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: () => import('../pages/user/Wishlist.vue')
      },
      {
        path: 'track-order',
        name: 'TrackOrder',
        component: () => import('../pages/user/TrackOrder.vue')
      },
      {
        path: 'policy',
        name: 'Policy',
        component: () => import('../pages/user/Policy.vue')
      },
      {
        path: 'terms',
        name: 'Terms',
        component: () => import('../pages/user/Terms.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('../pages/user/ForgotPassword.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../pages/user/Profile.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  // Nhóm các trang Admin
  {
    path: '/admin',
    children: [
      // Nhóm Auth (Sử dụng AuthLayout)
      {
        path: 'login',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminLogin', component: () => import('../pages/admin/Auth/Login.vue') }]
      },
      {
        path: 'register',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminRegister', component: () => import('../pages/admin/Auth/Register.vue') }]
      },
      {
        path: 'forgot-password',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminForgot', component: () => import('../pages/admin/Auth/Forgot.vue') }]
      },
      {
        path: 'reset-password',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminResetPass', component: () => import('../pages/admin/Auth/ResetPass.vue') }]
      },
      {
        path: 'two-factor',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminTwoFactor', component: () => import('../pages/admin/Auth/TwoFactor.vue') }]
      },
      {
        path: 'remember',
        component: AuthLayout,
        children: [{ path: '', name: 'AdminRemember', component: () => import('../pages/admin/Auth/Remember.vue') }]
      },
      
      // Nhóm Dashboard (Sử dụng AdminLayout + Bảo vệ bằng meta)
      {
        path: '',
        component: AdminLayout,
        meta: { requiresAdmin: true },
        children: [
          {
            path: '',
            name: 'AdminHome',
            component: () => import('../pages/admin/Home.vue')
          },
          {
            path: 'products',
            name: 'AdminProducts',
            component: () => import('../pages/admin/Products.vue')
          },
          {
            path: 'add-product',
            name: 'AdminAddProduct',
            component: () => import('../pages/admin/AddProduct.vue')
          },
          {
            path: 'add-category',
            name: 'AdminAddCategory',
            component: () => import('../pages/admin/AddCategory.vue')
          },
          {
            path: 'orders',
            name: 'AdminOrders',
            component: () => import('../pages/admin/Orders.vue')
          },
          {
            path: 'vendor-list',
            name: 'AdminVendorList',
            component: () => import('../pages/admin/VendorList.vue')
          },
          {
            path: 'vendor-profile',
            name: 'AdminVendorProfile',
            component: () => import('../pages/admin/VendorProfile.vue')
          },
          {
            path: 'vendor-update',
            name: 'AdminVendorUpdate',
            component: () => import('../pages/admin/VendorUpdateProfile.vue')
          },
          {
            path: 'invoice',
            name: 'AdminInvoice',
            component: () => import('../pages/admin/Invoice.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation Guard
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  
  // Wait for auth to be ready
  if (!authStore.isAuthReady) {
    await authStore.checkAuthStatus();
  }

  const isAuthenticated = !!authStore.accessToken;
  const userRole = authStore.user?.role;

  // Check if route requires admin
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAuthenticated || userRole !== 'admin') {
      return { name: 'AdminLogin' };
    }
  }

  // Check if route requires generic auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return { name: 'Login' };
    }
  }

  // Redirect if already logged in as admin and trying to access admin auth pages
  const isAdminAuthPage = ['AdminLogin', 'AdminRegister', 'AdminForgot', 'AdminResetPass', 'AdminTwoFactor', 'AdminRemember'].includes(to.name);
  if (isAdminAuthPage && isAuthenticated && userRole === 'admin') {
    return { name: 'AdminHome' };
  }

  return true; // Proceed
});

router.afterEach(() => {
  // Delay to allow components to mount and render DOM
  setTimeout(() => {
    if (typeof window.$ !== 'undefined') {
      const $images = window.$('.zoom-image-hover');
      if ($images.length) {
        $images.zoom();
      }
    }
  }, 500);
});

export default router

