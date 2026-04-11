<template>
  <!-- Checkout section -->
  <section class="cr-checkout-section padding-tb-100">
    <div class="container">
      <div v-if="cartStore.items.length === 0" class="text-center py-5">
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Vui lòng thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán.</p>
        <RouterLink to="/shop" class="cr-button mt-3">Tiếp tục mua sắm</RouterLink>
      </div>

      <div v-else class="row">
        <!-- Sidebar Area Start (Right Side) -->
        <div class="cr-checkout-rightside col-lg-4 col-md-12">
          <div class="cr-sidebar-wrap mb-4">
            <!-- Order Summary Block -->
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Summary</h3>
              </div>
              <div class="cr-sb-block-content">
                <div class="cr-checkout-summary">
                  <div>
                    <span class="text-left">Sub-Total</span>
                    <span class="text-right">${{ cartStore.cartTotal }}</span>
                  </div>
                  <div>
                    <span class="text-left">Delivery Charges</span>
                    <span class="text-right">$0.00</span>
                  </div>
                  <div class="cr-checkout-summary-total">
                    <span class="text-left">Total Amount</span>
                    <span class="text-right">${{ cartStore.cartTotal }}</span>
                  </div>
                </div>

                <div class="cr-checkout-pro scrolling-summary">
                  <div v-for="item in cartStore.items" :key="item.id" class="col-sm-12 mb-3">
                    <div class="cr-product-inner">
                      <div class="cr-pro-image-outer">
                        <div class="cr-pro-image">
                          <RouterLink :to="`/product/${item.product_id}`" class="image">
                            <img class="main-image" :src="item.image" :alt="item.name">
                          </RouterLink>
                        </div>
                      </div>
                      <div class="cr-pro-content cr-product-details">
                        <h5 class="cr-pro-title">
                          <RouterLink :to="`/product/${item.product_id}`">{{ item.name }}</RouterLink>
                        </h5>
                        <p class="cr-price">
                          <span class="new-price">${{ item.price }}</span>
                          <span class="quantity ml-2">x {{ item.quantity }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cr-sidebar-wrap mb-4">
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Delivery Method</h3>
              </div>
              <div class="cr-sb-block-content">
                <div class="cr-checkout-del">
                  <span class="cr-del-option">
                    <span>
                      <span class="cr-del-opt-head">Standard Shipping</span>
                      <input type="radio" id="del1" name="shipping" checked>
                      <label for="del1">Free Shipping ($0.00)</label>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="cr-sidebar-wrap mb-4">
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Payment Method</h3>
              </div>
              <div class="cr-sb-block-content">
                <div class="cr-checkout-pay">
                  <span class="cr-pay-option">
                    <span>
                      <input type="radio" id="pay1" value="cod" v-model="form.payment_method">
                      <label for="pay1">Cash On Delivery (COD)</label>
                    </span>
                  </span>
                  <span class="cr-pay-option">
                    <span>
                      <input type="radio" id="pay2" value="vnpay" v-model="form.payment_method">
                      <label for="pay2">VNPay Online Payment</label>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkout Left Side Start -->
        <div class="cr-checkout-leftside col-lg-8 col-md-12">
          <div class="cr-checkout-content">
            <div class="cr-checkout-inner">
              <!-- Welcome Member Block -->
              <div class="cr-checkout-wrap mb-30">
                <div class="cr-checkout-block p-4 bg-light rounded shadow-sm">
                  <h4 class="mb-2">Chào mừng trở lại, {{ authStore.user?.name }}!</h4>
                  <p class="text-muted mb-0">Hệ thống đã nhận diện tài khoản ({{ authStore.user?.email }}). Hãy chọn địa chỉ giao hàng bên dưới để hoàn tất đơn hàng.</p>
                </div>
              </div>

              <!-- Address Selection Block -->
              <div class="cr-checkout-wrap">
                <div class="cr-checkout-block cr-check-bill mb-4">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="cr-checkout-title mb-0">Địa chỉ giao hàng</h3>
                    <button v-if="!showNewAddressForm" @click="showNewAddressForm = true" class="btn btn-sm btn-outline-success">
                      + Thêm địa chỉ mới
                    </button>
                    <button v-else @click="showNewAddressForm = false" class="btn btn-sm btn-outline-secondary">
                      Hủy thêm mới
                    </button>
                  </div>

                  <div class="cr-bl-block-content">
                    <!-- Loading addresses -->
                    <div v-if="isLoadingAddresses" class="text-center py-4">
                      <div class="spinner-border text-success spinner-border-sm" role="status"></div>
                      <span class="ml-2">Đang tải danh sách địa chỉ...</span>
                    </div>

                    <!-- Existing Addresses Radio List -->
                    <div v-else-if="addresses.length > 0 && !showNewAddressForm" class="row mb-4">
                      <div v-for="addr in addresses" :key="addr.id" class="col-md-6 mb-3">
                        <label 
                          class="address-card p-3 border rounded d-block position-relative"
                          :class="{ 'border-success bg-light': form.address_id === addr.id }"
                        >
                          <input 
                            type="radio" 
                            :value="addr.id" 
                            v-model="form.address_id" 
                            name="address_select"
                            class="position-absolute"
                            style="top: 15px; right: 15px;"
                          >
                          <div class="address-content">
                            <h6 class="mb-1">{{ addr.firstname }} {{ addr.lastname }}</h6>
                            <p class="small text-muted mb-2">{{ addr.phone }}</p>
                            <p class="small mb-0">{{ addr.address }}</p>
                            <p class="small mb-0 text-uppercase">{{ addr.city }}, {{ addr.state }}, {{ addr.country }}</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <!-- Message when no addresses and not adding new -->
                    <div v-else-if="addresses.length === 0 && !showNewAddressForm" class="alert alert-info">
                       Bạn chưa có địa chỉ giao hàng nào. Hãy nhấn "Thêm địa chỉ mới" để tiếp tục.
                    </div>

                    <!-- New Address Form -->
                    <div v-if="showNewAddressForm" class="cr-check-bill-form p-3 border rounded bg-white mt-2">
                        <h5 class="mb-3">Thêm địa chỉ giao hàng mới</h5>
                        <form @submit.prevent="saveNewAddress" class="row g-3">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tên *</label>
                                <input v-model="newAddr.firstname" type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Họ *</label>
                                <input v-model="newAddr.lastname" type="text" class="form-control" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label">Số điện thoại *</label>
                                <input v-model="newAddr.phone" type="text" class="form-control" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label">Địa chỉ chi tiết*</label>
                                <input v-model="newAddr.address" type="text" class="form-control" placeholder="Số nhà, tên đường..." required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Thành phố *</label>
                                <input v-model="newAddr.city" type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tỉnh / Thành *</label>
                                <input v-model="newAddr.state" type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Quốc gia *</label>
                                <input v-model="newAddr.country" type="text" class="form-control" placeholder="Vietnam" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Mã bưu điện</label>
                                <input v-model="newAddr.postalcode" type="text" class="form-control">
                            </div>
                            <div class="col-12 mt-2">
                                <button type="submit" :disabled="isSavingAddress" class="cr-button">
                                    {{ isSavingAddress ? 'Đang lưu...' : 'Lưu địa chỉ' }}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Order Notes -->
                    <div v-if="!showNewAddressForm" class="mt-4">
                        <label class="form-label">Ghi chú đơn hàng (Tùy chọn)</label>
                        <textarea v-model="form.notes" class="form-control" rows="3" placeholder="Ví dụ: Giao vào giờ hành chính..."></textarea>
                    </div>

                  </div>
                </div>
              </div>

              <!-- Action Bar -->
              <div v-if="!showNewAddressForm" class="cr-checkout-wrap text-right mt-4">
                <button 
                  @click="submitOrder" 
                  :disabled="isSubmitting || !form.address_id"
                  class="cr-button px-5 py-3"
                  style="font-size: 1.1rem;"
                >
                  <span v-if="isSubmitting">Đang xử lý...</span>
                  <span v-else>Xác nhận đặt hàng</span>
                </button>
                <p v-if="!form.address_id && addresses.length > 0" class="text-danger small mt-2">
                  Vui lòng chọn địa chỉ giao hàng để đặt hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import addressService from '@/services/addressService';
import orderService from '@/services/orderService';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

// State
const addresses = ref([]);
const isLoadingAddresses = ref(false);
const isSavingAddress = ref(false);
const isSubmitting = ref(false);
const showNewAddressForm = ref(false);

const form = reactive({
  address_id: null,
  payment_method: 'cod',
  notes: ''
});

const newAddr = reactive({
  firstname: '',
  lastname: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: 'Vietnam',
  postalcode: ''
});

// Load resources
const loadAddresses = async () => {
    isLoadingAddresses.value = true;
    try {
        const response = await addressService.getAddresses();
        addresses.value = response.data;
        // Auto-select first address if available
        if (addresses.value.length > 0) {
            form.address_id = addresses.value[0].id;
        }
    } catch (error) {
        console.error('Failed to load addresses:', error);
    } finally {
        isLoadingAddresses.value = false;
    }
};

const saveNewAddress = async () => {
    isSavingAddress.value = true;
    try {
        const response = await addressService.createAddress({ ...newAddr });
        addresses.value.push(response.data);
        form.address_id = response.data.id;
        showNewAddressForm.value = false;
        
        // Reset form
        Object.keys(newAddr).forEach(key => {
            if (key !== 'country') newAddr[key] = '';
        });
    } catch (error) {
        alert('Không thể lưu địa chỉ. Vui lòng kiểm tra lại thông tin.');
        console.error(error);
    } finally {
        isSavingAddress.value = false;
    }
};

const submitOrder = async () => {
    if (!form.address_id) {
        alert('Vui lòng chọn địa chỉ giao hàng.');
        return;
    }

    isSubmitting.value = true;
    try {
        const response = await orderService.placeOrder({ ...form });
        
        // Handle success
        if (form.payment_method === 'vnpay' && response.payment_url) {
            window.location.href = response.payment_url;
        } else {
            // COD success - clear cart and redirect to success page
            cartStore.items = [];
            alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
            router.push('/user/orders'); // Assuming there's an order history page
        }
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng.';
        alert(errorMsg);
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    // Ensure cart is loaded
    if (cartStore.items.length === 0) {
        cartStore.fetchCart();
    }
    loadAddresses();
});
</script>

<style scoped>
.address-card {
    cursor: pointer;
    transition: all 0.2s ease;
}

.address-card:hover {
    border-color: #64b496 !important;
}

.scrolling-summary {
    max-height: 350px;
    overflow-y: auto;
    padding-right: 5px;
}

.scrolling-summary::-webkit-scrollbar {
    width: 4px;
}

.scrolling-summary::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 10px;
}

.cr-product-inner {
    display: flex;
    align-items: center;
    gap: 15px;
}

.cr-pro-image-outer {
    width: 70px;
    height: 70px;
}

.cr-pro-image-outer img {
    border-radius: 8px;
    border: 1px solid #eee;
}

.cr-pro-title {
    font-size: 14px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.new-price {
    font-weight: 600;
    color: #64b496;
}

.quantity {
    color: #999;
    font-size: 13px;
}
</style>
