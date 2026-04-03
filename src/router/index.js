import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/user/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/user/About.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../pages/user/Shop.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/user/Blog.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../pages/user/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../pages/user/Checkout.vue')
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: () => import('../pages/user/ContactUs.vue')
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('../pages/user/Faq.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/user/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/user/Register.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../pages/user/Product.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../pages/user/Wishlist.vue')
  },
  {
    path: '/track-order',
    name: 'TrackOrder',
    component: () => import('../pages/user/TrackOrder.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('../pages/user/Policy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../pages/user/Terms.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../pages/user/ForgotPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
