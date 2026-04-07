import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '../layouts/user/UserLayout.vue'
import AdminLayout from '../layouts/admin/AdminLayout.vue'

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
        component: () => import('../pages/user/Checkout.vue')
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
      }
    ]
  },
  // Nhóm các trang Admin sử dụng AdminLayout
  {
    path: '/admin',
    component: AdminLayout,
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
        path: 'add-sub-category',
        name: 'AdminAddSubCategory',
        component: () => import('../pages/admin/AddSubCategory.vue')
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
  },
  // Nhóm các trang Admin Auth
  {
    path: '/admin/auth',
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('../pages/admin/Auth/Login.vue')
      },
      {
        path: 'register',
        name: 'AdminRegister',
        component: () => import('../pages/admin/Auth/Register.vue')
      },
      {
        path: 'forgot-password',
        name: 'AdminForgot',
        component: () => import('../pages/admin/Auth/Forgot.vue')
      },
      {
        path: 'reset-password',
        name: 'AdminResetPass',
        component: () => import('../pages/admin/Auth/ResetPass.vue')
      },
      {
        path: 'two-factor',
        name: 'AdminTwoFactor',
        component: () => import('../pages/admin/Auth/TwoFactor.vue')
      },
      {
        path: 'remember',
        name: 'AdminRemember',
        component: () => import('../pages/admin/Auth/Remember.vue')
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
