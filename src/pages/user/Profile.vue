<template>
    <section class="cr-profile-section padding-tb-100">
        <div class="container">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="cr-sidebar-wrap cr-check-new">
                        <div class="cr-sidebar-block">
                            <div class="cr-sb-title">
                                <h3 class="cr-sidebar-title">My Account</h3>
                            </div>
                            <div class="cr-sb-block-content mt-3">
                                <div class="nav flex-column nav-pills cr-tab-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true">Account Details</button>
                                    <button class="nav-link" id="v-pills-orders-tab" data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab" aria-controls="v-pills-orders" aria-selected="false">My Orders</button>
                                    <button class="nav-link" id="v-pills-addresses-tab" data-bs-toggle="pill" data-bs-target="#v-pills-addresses" type="button" role="tab" aria-controls="v-pills-addresses" aria-selected="false">Manage Addresses</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="col-lg-9 col-md-8">
                    <div class="tab-content cr-checkout-content" id="v-pills-tabContent">
                        
                        <!-- Account Details Tab -->
                        <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <div class="cr-checkout-inner">
                                <div class="cr-checkout-wrap mb-30">
                                    <div class="cr-checkout-block cr-check-bill">
                                        <h3 class="cr-checkout-title">Account Information</h3>
                                        <div class="cr-bl-block-content">
                                            <div class="cr-check-bill-form">
                                                <form action="#" method="post" @submit.prevent>
                                                    <span class="cr-bill-wrap cr-bill-half">
                                                        <label>Full Name*</label>
                                                        <input type="text" name="name" v-model="accountInfo.name" required>
                                                    </span>
                                                    <span class="cr-bill-wrap cr-bill-half">
                                                        <label>Email Address*</label>
                                                        <input type="email" name="email" v-model="accountInfo.email" required readonly style="background-color: #f8f9fa;">
                                                    </span>
                                                    <span class="cr-bill-wrap cr-bill-half">
                                                        <label>Phone Number</label>
                                                        <input type="text" name="phone" v-model="accountInfo.phone" placeholder="Enter your phone">
                                                    </span>
                                                    <span class="col-12 mb-3 d-flex gap-3" style="margin-left: 14px;">
                                                        <button class="cr-button" type="button">Save Changes</button>
                                                    </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- My Orders Tab -->
                        <div class="tab-pane fade" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
                            <div class="cr-checkout-inner">
                                <div class="cr-checkout-wrap mb-30">
                                    <div class="cr-checkout-block">
                                        <h3 class="cr-checkout-title">Order History</h3>
                                        <div class="table-responsive">
                                            <table class="table table-bordered mb-0">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        <th>Items</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#ORD-12345</td>
                                                        <td>Oct 20, 2026</td>
                                                        <td>3</td>
                                                        <td>$150.00</td>
                                                        <td><span class="badge bg-success">Delivered</span></td>
                                                        <td><a href="#" class="cr-button" style="padding: 5px 15px; border-radius: 5px; min-width: auto; height: auto; line-height: normal;">View</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>#ORD-12344</td>
                                                        <td>Oct 15, 2026</td>
                                                        <td>1</td>
                                                        <td>$45.00</td>
                                                        <td><span class="badge bg-warning text-dark">Processing</span></td>
                                                        <td><a href="#" class="cr-button" style="padding: 5px 15px; border-radius: 5px; min-width: auto; height: auto; line-height: normal;">View</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Manage Addresses Tab -->
                        <div class="tab-pane fade" id="v-pills-addresses" role="tabpanel" aria-labelledby="v-pills-addresses-tab">
                            <div class="cr-checkout-inner">
                                <div class="cr-checkout-wrap mb-30">
                                    <div class="cr-checkout-block cr-check-bill">
                                        <h3 class="cr-checkout-title">Address Book</h3>
                                        
                                        <div v-if="isLoadingAddresses" class="text-center py-5">
                                            <div class="spinner-border text-success" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <p class="mt-2">Đang tải địa chỉ...</p>
                                        </div>

                                        <div v-else-if="addresses.length === 0" class="alert alert-info mt-4 mx-3">
                                            Bạn chưa có địa chỉ nào trong sổ địa chỉ. Hãy thêm địa chỉ mới bên dưới.
                                        </div>

                                        <div v-else class="row pt-4 mb-4" style="border-bottom: 1px solid #eee;">
                                            <div class="col-md-6 mb-3" v-for="(address, index) in addresses" :key="address.id">
                                                <div class="card shadow-sm" style="height: 100%;">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Địa chỉ #{{ index + 1 }}</h5>
                                                        <p class="card-text mt-3">
                                                            <strong>Địa chỉ:</strong> {{ address.address_line }}<br>
                                                            <strong>Quận/Huyện:</strong> {{ address.district }}<br>
                                                            <strong>Thành Phố:</strong> {{ address.city }}
                                                        </p>
                                                        <div class="mt-3">
                                                            <a href="javascript:void(0)" class="text-primary me-3" @click="handleEditAddress(address)">Edit</a>
                                                            <a href="javascript:void(0)" class="text-danger" @click="handleDeleteAddress(address.id)">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 class="cr-checkout-title mt-4">{{ isEditingAddress ? 'Edit Address' : 'Add New Address' }}</h4>
                                        <div class="cr-bl-block-content mt-3">
                                            <div class="cr-check-bill-form mb-minus-24">
                                                <form action="#" method="post" @submit.prevent="saveAddress">
                                                    <span class="cr-bill-wrap">
                                                        <label>Địa chỉ chi tiết*</label>
                                                        <input type="text" v-model="addressForm.address_line" placeholder="Số nhà, tên đường..." required>
                                                    </span>
                                                    <span class="cr-bill-wrap cr-bill-half">
                                                        <label>Quận / Huyện *</label>
                                                        <input type="text" v-model="addressForm.district" placeholder="Quận/Huyện" required>
                                                    </span>
                                                    <span class="cr-bill-wrap cr-bill-half">
                                                        <label>Thành Phố *</label>
                                                        <input type="text" v-model="addressForm.city" placeholder="Thành Phố" required>
                                                    </span>
                                                    <div class="col-12 mb-3 d-flex gap-3" style="margin-left: 14px;">
                                                        <button class="cr-button" type="submit" :disabled="isSavingAddress">
                                                            {{ isSavingAddress ? 'Processing...' : (isEditingAddress ? 'Update Address' : 'Save Address') }}
                                                        </button>
                                                        <button v-if="isEditingAddress" class="cr-button" style="background-color: #6c757d; color: white;" type="button" @click="resetAddressForm">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import addressService from '@/services/addressService';

const authStore = useAuthStore();

const addresses = ref([]);
const isLoadingAddresses = ref(false);
const isSavingAddress = ref(false);

const accountInfo = reactive({
    name: '',
    email: '',
    phone: ''
});

const populateUserData = () => {
    if (authStore.user) {
        accountInfo.name = authStore.user.name || '';
        accountInfo.email = authStore.user.email || '';
        accountInfo.phone = authStore.user.phone || '';
    }
};

onMounted(() => {
    populateUserData();
    loadAddresses();
});

const loadAddresses = async () => {
    isLoadingAddresses.value = true;
    try {
        const response = await addressService.getAddresses();
        addresses.value = response.data;
    } catch (error) {
        console.error('Failed to load addresses:', error);
    } finally {
        isLoadingAddresses.value = false;
    }
};

watch(() => authStore.user, () => {
    populateUserData();
}, { deep: true });

// Removed static addresses

const isEditingAddress = ref(false);
const editingAddressId = ref(null);

const defaultFormState = {
    address_line: '',
    city: '',
    district: ''
};

const addressForm = reactive({ ...defaultFormState });

const handleEditAddress = (address) => {
    isEditingAddress.value = true;
    editingAddressId.value = address.id;
    // Populate form
    Object.assign(addressForm, {
        address_line: address.address_line,
        city: address.city,
        district: address.district
    });

    // Scroll to form
    const formElement = document.querySelector('.cr-check-bill-form');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};

const resetAddressForm = () => {
    isEditingAddress.value = false;
    editingAddressId.value = null;
    Object.assign(addressForm, { ...defaultFormState });
};

const saveAddress = async () => {
    isSavingAddress.value = true;
    try {
        if (isEditingAddress.value) {
            const response = await addressService.updateAddress(editingAddressId.value, { ...addressForm });
            const index = addresses.value.findIndex(a => a.id === editingAddressId.value);
            if (index !== -1) {
                addresses.value[index] = response.data;
            }
            alert('Cập nhật địa chỉ thành công!');
        } else {
            const response = await addressService.createAddress({ ...addressForm });
            addresses.value.push(response.data);
            alert('Thêm địa chỉ mới thành công!');
        }
        resetAddressForm();
    } catch (error) {
        alert('Có lỗi xảy ra khi lưu địa chỉ. Vui lòng kiểm tra lại.');
        console.error(error);
    } finally {
        isSavingAddress.value = false;
    }
};

const handleDeleteAddress = async (id) => {
    if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
        try {
            await addressService.deleteAddress(id);
            addresses.value = addresses.value.filter(a => a.id !== id);
        } catch (error) {
            alert('Không thể xóa địa chỉ này.');
        }
    }
};
</script>

<style scoped>
.cr-tab-list .nav-link {
    color: #444;
    font-weight: 600;
    text-align: left;
    padding: 12px 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 0.3s ease;
}
.cr-tab-list .nav-link.active, .cr-tab-list .nav-link:hover {
    background-color: var(--cr-primary-color, #64b496);
    color: #fff;
}
.table td, .table th {
    vertical-align: middle;
}
</style>
