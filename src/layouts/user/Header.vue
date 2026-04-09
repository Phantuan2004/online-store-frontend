<template>
  <!-- Header -->
  <header>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="top-header">
            <RouterLink to="/" class="cr-logo">
              <img :src="logoImg" alt="logo" class="logo" />
              <img
                :src="darkLogoImg"
                alt="logo"
                class="dark-logo"
              />
            </RouterLink>
            <form class="cr-search">
              <input
                class="search-input"
                type="text"
                placeholder="Search For items..."
              />
              <select class="form-select" aria-label="Default select example">
                <option selected>All Categories</option>
                <option value="1">Mens</option>
                <option value="2">Womens</option>
                <option value="3">Electronics</option>
              </select>
              <a href="javascript:void(0)" class="search-btn">
                <i class="ri-search-line"></i>
              </a>
            </form>
            <div class="cr-right-bar">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle cr-right-bar-item"
                    href="javascript:void(0)"
                  >
                    <i class="ri-user-3-line"></i>
                    <span>Account</span>
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <RouterLink class="dropdown-item" to="/register">Register</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/checkout">Checkout</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/login">Login</RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
              <RouterLink to="/wishlist" class="cr-right-bar-item">
                <i class="ri-heart-3-line"></i>
                <span>Wishlist</span>
              </RouterLink>
              <a
                href="javascript:void(0)"
                class="cr-right-bar-item Shopping-toggle"
              >
                <i class="ri-shopping-cart-line"></i>
                <span>Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cr-fix" id="cr-main-menu-desk">
      <div class="container">
        <div class="cr-menu-list">
          <div class="cr-category-icon-block">
            <div class="cr-category-menu">
              <div class="cr-category-toggle">
                <i class="ri-menu-2-line"></i>
              </div>
            </div>
            <div class="cr-cat-dropdown">
              <div class="cr-cat-block">
                <div class="cr-cat-tab">
                  <div
                    class="cr-tab-list nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Dairy &amp; Bakery
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      Fruits &amp; Vegetable
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-messages-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      Snack &amp; Spice
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-settings-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-settings"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-settings"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      Juice &amp; Drinks
                    </button>
                    <RouterLink class="nav-link" to="/shop">
                      View All
                    </RouterLink>
                  </div>
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <div class="tab-list row">
                        <div class="col">
                          <h6 class="cr-col-title">Dairy</h6>
                          <ul class="cat-list">
                            <li><RouterLink to="/shop">Milk</RouterLink></li>
                            <li>
                              <RouterLink to="/shop">Ice cream</RouterLink>
                            </li>
                            <li><RouterLink to="/shop">Cheese</RouterLink></li>
                            <li>
                              <RouterLink to="/shop">Frozen custard</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Frozen yogurt</RouterLink>
                            </li>
                          </ul>
                        </div>
                        <div class="col">
                          <h6 class="cr-col-title">Bakery</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Cake and Pastry</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Rusk Toast</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Bread &amp; Buns</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Chocolate Brownie</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Cream Roll</RouterLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <div class="tab-list row">
                        <div class="col">
                          <h6 class="cr-col-title">Fruits</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Cauliflower</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Bell Peppers</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Broccoli</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Cabbage</RouterLink>
                            </li>
                            <li><RouterLink to="/shop">Tomato</RouterLink></li>
                          </ul>
                        </div>
                        <div class="col">
                          <h6 class="cr-col-title">Vegetable</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Cauliflower</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Bell Peppers</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Broccoli</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Cabbage</RouterLink>
                            </li>
                            <li><RouterLink to="/shop">Tomato</RouterLink></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      <div class="tab-list row">
                        <div class="col">
                          <h6 class="cr-col-title">Snacks</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">French fries</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">potato chips</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Biscuits &amp; Cookies</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Popcorn</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Rice Cakes</RouterLink>
                            </li>
                          </ul>
                        </div>
                        <div class="col">
                          <h6 class="cr-col-title">Spice</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Cinnamon Powder</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Cumin Powder</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Fenugreek Powder</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Pepper Powder</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Long Pepper</RouterLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      <div class="tab-list row">
                        <div class="col">
                          <h6 class="cr-col-title">Juice</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Mango Juice</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Coconut Water</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Tetra Pack</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Apple Juices</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Lychee Juice</RouterLink>
                            </li>
                          </ul>
                        </div>
                        <div class="col">
                          <h6 class="cr-col-title">soft drink</h6>
                          <ul class="cat-list">
                            <li>
                              <RouterLink to="/shop">Breizh Cola</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Green Cola</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Jolt Cola</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Mecca Cola</RouterLink>
                            </li>
                            <li>
                              <RouterLink to="/shop">Topsia Cola</RouterLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav class="navbar navbar-expand-lg">
            <a href="javascript:void(0)" class="navbar-toggler shadow-none">
              <i class="ri-menu-3-line"></i>
            </a>
            <div class="cr-header-buttons">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link" href="javascript:void(0)">
                    <i class="ri-user-3-line"></i>
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <RouterLink class="dropdown-item" to="/register">Register</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/checkout">Checkout</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/login">Login</RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
              <RouterLink to="/wishlist" class="cr-right-bar-item">
                <i class="ri-heart-line"></i>
              </RouterLink>
              <a
                href="javascript:void(0)"
                class="cr-right-bar-item Shopping-toggle"
              >
                <i class="ri-shopping-cart-line"></i>
              </a>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/">Home</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/shop">Shop</RouterLink>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="javascript:void(0)">
                    Pages
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <RouterLink class="dropdown-item" to="/about">About Us</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/contact">Contact Us</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/cart">Cart</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/checkout">Checkout</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/track-order">Track Order</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/wishlist">Wishlist</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/faq">Faq</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/login">Login</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/register">Register</RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/policy">Policy</RouterLink>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/blog">Blog</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/admin">Admin</RouterLink>
                </li>
              </ul>
            </div>
          </nav>
          <div class="cr-calling">
            <i class="ri-phone-line"></i>
            <a href="tel:+1234567890">+123 ( 456 ) ( 7890 )</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import logoImg from '@/assets/user/img/logo/logo.png';
import darkLogoImg from '@/assets/user/img/logo/dark-logo.png';
</script>
