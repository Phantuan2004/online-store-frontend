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
                                        <div class="d-flex justify-content-between align-items-center mb-4">
                                            <h3 class="cr-checkout-title mb-0">Order History</h3>
                                            <div class="d-flex align-items-center">
                                                <span class="me-2 text-muted small">Lọc theo:</span>
                                                <select v-model="filterStatus" @change="handleFilterChange" class="form-select form-select-sm" style="width: auto; min-width: 150px;">
                                                    <option value="all">Tất cả đơn hàng</option>
                                                    <option value="pending">Chờ xử lý</option>
                                                    <option value="paid">Đã thanh toán</option>
                                                    <option value="shipped">Đang giao hàng</option>
                                                    <option value="completed">Đã hoàn thành</option>
                                                    <option value="cancelled">Đã hủy</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div v-if="isLoadingOrders" class="text-center py-5">
                                            <div class="spinner-border text-success" role="status"></div>
                                            <p class="mt-2">Đang tải đơn hàng...</p>
                                        </div>

                                        <div v-else-if="orders.length === 0" class="text-center py-5">
                                            <i class="ri-file-list-3-line display-4 text-muted"></i>
                                            <p class="mt-3">Bạn chưa có đơn hàng nào khớp với bộ lọc.</p>
                                        </div>

                                        <div v-else>
                                            <div class="table-responsive">
                                                <table class="table table-bordered mb-0">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>Mã Đơn</th>
                                                            <th>Ngày Đặt</th>
                                                            <th>Sản Phẩm</th>
                                                            <th>Tổng Tiền</th>
                                                            <th>Trạng Thái</th>
                                                            <th>Hành Động</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="order in orders" :key="order.id">
                                                            <td><strong>#{{ order.id }}</strong></td>
                                                            <td>{{ formatDate(order.created_at) }}</td>
                                                            <td>
                                                                <span class="small text-truncate d-inline-block" style="max-width: 200px;">
                                                                    {{ order.items[0]?.product_name || 'Sản phẩm' }}
                                                                    <span v-if="order.items.length > 1" class="text-muted">
                                                                        (+ {{ order.items.length - 1 }} món)
                                                                    </span>
                                                                </span>
                                                            </td>
                                                            <td class="fw-bold">{{ formatCurrency(order.total_price) }}</td>
                                                            <td>
                                                                <span class="badge" :class="getStatusBadge(order.status)">
                                                                    {{ getStatusLabel(order.status) }}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <RouterLink :to="`/track-order?id=${order.id}`" class="btn btn-sm btn-outline-success">
                                                                    Xem chi tiết
                                                                </RouterLink>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <!-- Pagination -->
                                            <div v-if="pagination.last_page > 1" class="mt-4 d-flex justify-content-center">
                                                <nav aria-label="Page navigation">
                                                    <ul class="pagination pagination-sm">
                                                        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                                                            <a @click.prevent="handlePageChange(pagination.current_page - 1)" class="page-item" href="#">Trước</a>
                                                        </li>
                                                        
                                                        <li v-for="page in pagination.last_page" :key="page" class="page-item" :class="{ active: pagination.current_page === page }">
                                                            <a @click.prevent="handlePageChange(page)" class="page-link" href="#">{{ page }}</a>
                                                        </li>

                                                        <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                                                            <a @click.prevent="handlePageChange(pagination.current_page + 1)" class="page-link" href="#">Sau</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
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
import { formatCurrency } from '@/utils/currency';
import { ref, reactive, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import addressService from '@/services/addressService';
import orderService from '@/services/orderService';

const authStore = useAuthStore();

const addresses = ref([]);
const isLoadingAddresses = ref(false);
const isSavingAddress = ref(false);

const orders = ref([]);
const isLoadingOrders = ref(false);
const filterStatus = ref('all');
const pagination = reactive({
    current_page: 1,
    last_page: 1,
    total: 0
});

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
    fetchOrders();
});


const fetchOrders = async (page = 1) => {
    isLoadingOrders.value = true;
    try {
        const response = await orderService.getOrders(filterStatus.value, page);
        // Note: Laravel pagination returns data in .data, and meta in .meta
        // Or if it's a simple Resource collection with pagination
        orders.value = response.data;
        if (response.meta) {
            pagination.current_page = response.meta.current_page;
            pagination.last_page = response.meta.last_page;
            pagination.total = response.meta.total;
        }
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    } finally {
        isLoadingOrders.value = false;
    }
};

const handleFilterChange = () => {
    fetchOrders(1);
};

const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
        fetchOrders(page);
    }
};

const getStatusBadge = (status) => {
    const badges = {
        'pending': 'bg-warning text-dark',
        'paid': 'bg-primary',
        'shipped': 'bg-info text-white',
        'completed': 'bg-success',
        'cancelled': 'bg-danger'
    };
    return badges[status] || 'bg-secondary';
};

const getStatusLabel = (status) => {
    const labels = {
        'pending': 'Chờ xử lý',
        'paid': 'Đã thanh toán',
        'shipped': 'Đang giao hàng',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return labels[status] || status;
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN');
};

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
