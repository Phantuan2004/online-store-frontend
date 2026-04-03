<template>
  <!-- Mobile menu -->
  <div class="cr-sidebar-overlay"></div>
  <div id="cr_mobile_menu" class="cr-side-cart cr-mobile-menu">
    <div class="cr-menu-title">
      <span class="menu-title">My Menu</span>
      <button type="button" class="cr-close">×</button>
    </div>
    <div class="cr-menu-inner">
      <div class="cr-menu-content">
        <ul>
          <li class="dropdown drop-list">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="dropdown drop-list">
            <span class="menu-toggle"></span>
            <a href="javascript:void(0)" class="dropdown-list">Category</a>
            <ul class="sub-menu">
              <li><RouterLink to="/shop">Shop Left sidebar</RouterLink></li>
              <li><RouterLink to="/shop">Shop Right sidebar</RouterLink></li>
              <li><RouterLink to="/shop">Full Width</RouterLink></li>
            </ul>
          </li>
          <li class="dropdown drop-list">
            <span class="menu-toggle"></span>
            <a href="javascript:void(0)" class="dropdown-list">product</a>
            <ul class="sub-menu">
              <li><RouterLink to="/product/1">product Left sidebar</RouterLink></li>
              <li><RouterLink to="/product/1">product Right sidebar</RouterLink></li>
              <li><RouterLink to="/product/1">Product Full Width</RouterLink></li>
            </ul>
          </li>
          <li class="dropdown drop-list">
            <span class="menu-toggle"></span>
            <a href="javascript:void(0)" class="dropdown-list">Pages</a>
            <ul class="sub-menu">
              <li><RouterLink to="/about">About Us</RouterLink></li>
              <li><RouterLink to="/contact">Contact Us</RouterLink></li>
              <li><RouterLink to="/cart">Cart</RouterLink></li>
              <li><RouterLink to="/checkout">Checkout</RouterLink></li>
              <li><RouterLink to="/track-order">Track Order</RouterLink></li>
              <li><RouterLink to="/wishlist">Wishlist</RouterLink></li>
              <li><RouterLink to="/faq">Faq</RouterLink></li>
              <li><RouterLink to="/login">Login</RouterLink></li>
              <li><RouterLink to="/register">Register</RouterLink></li>
              <li><RouterLink to="/policy">Policy</RouterLink></li>
            </ul>
          </li>
          <li class="dropdown drop-list">
            <span class="menu-toggle"></span>
            <a href="javascript:void(0)" class="dropdown-list">Blog</a>
            <ul class="sub-menu">
              <li><RouterLink to="/blog">Left Sidebar</RouterLink></li>
              <li><RouterLink to="/blog">Right Sidebar</RouterLink></li>
              <li><RouterLink to="/blog">Full Width</RouterLink></li>
              <li><RouterLink to="/blog">Detail Left Sidebar</RouterLink></li>
              <li><RouterLink to="/blog">Detail Right Sidebar</RouterLink></li>
              <li><RouterLink to="/blog">Detail Full Width</RouterLink></li>
            </ul>
          </li>
          <li class="dropdown drop-list">
            <span class="menu-toggle"></span>
            <a href="javascript:void(0)">Element</a>
            <ul class="sub-menu">
              <li><RouterLink to="/shop">Products</RouterLink></li>
              <li><RouterLink to="/shop">Typography</RouterLink></li>
              <li><RouterLink to="/shop">Buttons</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>
