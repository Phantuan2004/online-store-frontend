<template>
  <!-- Featured product -->
  <section class="section-popular margin-b-100">
    <div class="container">
      <div class="row">
        <div class="col-xxl-7 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-duration="2000">
          <div class="cr-twocolumns-product-wrapper">
            <div class="cr-twocolumns-product" ref="featuredSlider">
                <div v-for="product in featuredProducts" :key="product.id" class="slick-slide">
                  <div class="cr-product-card">
                    <div class="cr-product-image">
                      <div class="cr-image-inner zoom-image-hover">
                        <img :src="product.img" :alt="product.title">
                      </div>
                      <div class="cr-side-view">
                        <a href="javascript:void(0)" class="wishlist">
                          <i class="ri-heart-line"></i>
                        </a>
                        <a class="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
                          <i class="ri-eye-line"></i>
                        </a>
                      </div>
                      <a class="cr-shopping-bag" href="javascript:void(0)">
                        <i class="ri-shopping-bag-line"></i>
                      </a>
                    </div>
                    <div class="cr-product-details">
                      <div class="cr-brand">
                        <router-link to="/shop">{{ product.category }}</router-link>
                        <div class="cr-star">
                          <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'ri-star-fill' : 'ri-star-line'"></i>
                          <p>({{ product.rating.toFixed(1) }})</p>
                        </div>
                      </div>
                      <RouterLink :to="`/product/${product.id}`" class="title">{{ product.title }}</RouterLink>
                      <p class="cr-price">
                        <span class="new-price">${{ product.newPrice }}</span>
                        <span class="old-price">${{ product.oldPrice }}</span>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-5 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-duration="2000">
          <div class="cr-products-rightbar">
            <img :src="productsRightviewImg" alt="products-rightview">
            <div class="cr-products-rightbar-content">
              <h4>Organic & Healthy <br> Vegetables</h4>
              <div class="cr-off">
                <span>25% <code>OFF</code></span>
              </div>
              <div class="rightbar-buttons">
                <router-link to="/shop" class="cr-button">shop now</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import productImg1 from '@/assets/user/img/product/1.jpg';
import productImg2 from '@/assets/user/img/product/2.jpg';
import productImg3 from '@/assets/user/img/product/3.jpg';
import productImg9 from '@/assets/user/img/product/9.jpg';
import productImg10 from '@/assets/user/img/product/10.jpg';
import productsRightviewImg from '@/assets/user/img/product/products-rightview.jpg';

const featuredSlider = ref(null);
const featuredProducts = [
  { id: 9, category: 'Snacks', rating: 4.5, title: 'Best snakes with hazel nut mix pack 200gm', newPrice: 120.25, oldPrice: 123.25, img: productImg9 },
  { id: 10, category: 'Snacks', rating: 5.0, title: 'Sweet snakes crunchy nut mix 250gm pack', newPrice: 100.0, oldPrice: 110.0, img: productImg10 },
  { id: 1, category: 'Snacks', rating: 4.5, title: 'Best snakes with hazel nut mix pack 200gm', newPrice: 120.25, oldPrice: 123.25, img: productImg1 },
  { id: 2, category: 'Snacks', rating: 5.0, title: 'Sweet snakes crunchy nut mix 250gm pack', newPrice: 100.0, oldPrice: 110.0, img: productImg2 },
  { id: 3, category: 'Snacks', rating: 4.5, title: 'Best snakes with hazel nut mix pack 200gm', newPrice: 120.25, oldPrice: 123.25, img: productImg3 }
];

const initSlick = () => {
  if (typeof window.$ !== 'undefined') {
    const $slider = window.$(featuredSlider.value);
    if ($slider.length && !$slider.hasClass('slick-initialized')) {
      $slider.slick({
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    }
  }
};

const destroySlick = () => {
  if (typeof window.$ !== 'undefined') {
    const $slider = window.$(featuredSlider.value);
    if ($slider && $slider.hasClass('slick-initialized')) {
      $slider.slick('unslick');
    }
  }
};

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initSlick();
    }, 100);
  });
});

onUnmounted(() => {
  destroySlick();
});
</script>
