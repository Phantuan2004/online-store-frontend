<template>
  <!-- Cart -->
  <div class="cr-cart-overlay"></div>
  <div class="cr-cart-view">
    <div class="cr-cart-inner">
      <div class="cr-cart-top">
        <div class="cr-cart-title">
          <h6>My Cart</h6>
          <button type="button" class="close-cart">×</button>
        </div>
        <ul class="crcart-pro-items">
          <li>
            <RouterLink to="/product/4" class="crside_pro_img"
              ><img :src="productImg4" alt="product-1"
            /></RouterLink>
            <div class="cr-pro-content">
              <RouterLink to="/product/4" class="cart_pro_title">Fresh Pomegranate</RouterLink>
              <span class="cart-price"><span>$56.00</span> x 1kg</span>
              <div class="cr-cart-qty">
                <div class="cart-qty-plus-minus">
                  <button type="button" class="plus">+</button>
                  <input
                    type="text"
                    placeholder="."
                    value="1"
                    minlength="1"
                    maxlength="20"
                    class="quantity"
                  />
                  <button type="button" class="minus">-</button>
                </div>
              </div>
              <a href="javascript:void(0)" class="remove">×</a>
            </div>
          </li>
          <li>
            <RouterLink to="/product/2" class="crside_pro_img"
              ><img :src="productImg2" alt="product-2"
            /></RouterLink>
            <div class="cr-pro-content">
              <RouterLink to="/product/2" class="cart_pro_title">Green Apples</RouterLink>
              <span class="cart-price"><span>$75.00</span> x 1kg</span>
              <div class="cr-cart-qty">
                <div class="cart-qty-plus-minus">
                  <button type="button" class="plus">+</button>
                  <input
                    type="text"
                    placeholder="."
                    value="1"
                    minlength="1"
                    maxlength="20"
                    class="quantity"
                  />
                  <button type="button" class="minus">-</button>
                </div>
              </div>
              <a href="javascript:void(0)" class="remove">×</a>
            </div>
          </li>
          <li>
            <RouterLink to="/product/3" class="crside_pro_img"
              ><img :src="productImg3" alt="product-3"
            /></RouterLink>
            <div class="cr-pro-content">
              <RouterLink to="/product/3" class="cart_pro_title">Watermelon - Small</RouterLink>
              <span class="cart-price"><span>$48.00</span> x 5kg</span>
              <div class="cr-cart-qty">
                <div class="cart-qty-plus-minus">
                  <button type="button" class="plus">+</button>
                  <input
                    type="text"
                    placeholder="."
                    value="1"
                    minlength="1"
                    maxlength="20"
                    class="quantity"
                  />
                  <button type="button" class="minus">-</button>
                </div>
              </div>
              <a href="javascript:void(0)" class="remove">×</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="cr-cart-bottom">
        <div class="cart-sub-total">
          <table class="table cart-table">
            <tbody>
              <tr>
                <td class="text-left">Sub-Total :</td>
                <td class="text-right">$300.00</td>
              </tr>
              <tr>
                <td class="text-left">VAT (20%) :</td>
                <td class="text-right">$60.00</td>
              </tr>
              <tr>
                <td class="text-left">Total :</td>
                <td class="text-right primary-color">$360.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cart_btn">
          <RouterLink to="/cart" class="cr-button">View Cart</RouterLink>
          <RouterLink to="/checkout" class="cr-btn-secondary">Checkout</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import productImg2 from '@/assets/user/img/product/2.jpg';
import productImg3 from '@/assets/user/img/product/3.jpg';
import productImg4 from '@/assets/user/img/product/4.jpg';
</script>
