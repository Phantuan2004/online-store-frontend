<template>
    <!-- Track Order section -->
    <section class="cr-track padding-tb-100">
        <div class="container">
            <div class="row g-4">

                <!-- LEFT: Order List Sidebar -->
                <div class="col-lg-4 col-12">
                    <div class="order-list-sidebar">
                        <div class="order-list-header">
                            <h5 class="mb-0"><i class="ri-file-list-3-line me-2"></i>My Orders</h5>
                            <span v-if="orders.length" class="order-count-badge">{{ orders.length }}</span>
                        </div>

                        <div v-if="isLoadingList" class="text-center py-4">
                            <div class="spinner-border text-success spinner-border-sm" role="status"></div>
                        </div>

                        <ul v-else class="order-list">
                            <li
                                v-for="order in orders"
                                :key="order.id"
                                class="order-list-item"
                                :class="{ 'active': selectedOrder && selectedOrder.id === order.id }"
                                @click="selectOrder(order)"
                            >
                                <div class="order-item-top">
                                    <span class="order-item-id">#{{ order.id }}</span>
                                    <span class="order-status-badge" :class="getStatusClass(order.status)">
                                        {{ getStatusLabel(order.status) }}
                                    </span>
                                </div>
                                <div class="order-item-bottom">
                                    <span class="order-item-date">
                                        <i class="ri-calendar-line me-1"></i>{{ formatDate(order.created_at) }}
                                    </span>
                                    <span class="order-item-total">{{ formatCurrency(order.total_price) }}</span>
                                </div>
                            </li>
                            <li v-if="orders.length === 0" class="p-4 text-center text-muted small">
                                No orders found
                            </li>
                        </ul>

                        <!-- Pagination -->
                        <nav v-if="totalPages > 1" aria-label="Orders pagination" class="cr-pagination order-pagination">
                            <ul class="pagination">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                                </li>
                                <li
                                    v-for="page in totalPages"
                                    :key="page"
                                    class="page-item"
                                    :class="{ active: currentPage === page }"
                                >
                                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <!-- RIGHT: Order Detail Card -->
                <div class="col-lg-8 col-12">
                    <!-- Loading Detail -->
                    <div v-if="isLoading" class="order-empty-state">
                        <div class="spinner-border text-success" role="status"></div>
                        <p class="mt-3">Loading order details...</p>
                    </div>

                    <!-- No Order Selected -->
                    <div v-else-if="!selectedOrder" class="order-empty-state">
                        <i class="ri-inbox-2-line"></i>
                        <p>Select an order from the list to view details</p>
                    </div>

                    <!-- Order Detail Box -->
                    <div v-else class="cr-track-box order-detail-card">
                        <!-- Card Header -->
                        <div class="order-detail-header">
                            <div>
                                <h5 class="mb-1">Order <strong>#{{ selectedOrder.id }}</strong></h5>
                                <small class="text-muted">Placed on {{ formatDate(selectedOrder.created_at) }}</small>
                            </div>
                            <span class="order-status-badge lg" :class="getStatusClass(selectedOrder.status)">
                                {{ getStatusLabel(selectedOrder.status) }}
                            </span>
                        </div>

                        <!-- Details Row -->
                        <div class="row g-3 mb-4">
                            <div class="col-sm-4 col-6">
                                <div class="cr-track-card">
                                    <span class="cr-track-title">Order ID</span>
                                    <span>#{{ selectedOrder.id }}</span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="cr-track-card">
                                    <span class="cr-track-title">Payment</span>
                                    <span class="text-uppercase">{{ selectedOrder.payment?.method || 'N/A' }}</span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-12">
                                <div class="cr-track-card">
                                    <span class="cr-track-title">Shipping Address</span>
                                    <span class="small text-truncate d-block" :title="selectedOrder.address?.address_line">
                                        {{ selectedOrder.address?.address_line || 'No address' }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Progress Steps (Only for valid status) -->
                        <div v-if="selectedOrder.status !== 'cancelled'" class="cr-steps">
                            <div class="cr-steps-body">
                                <div
                                    v-for="(step, index) in trackingSteps"
                                    :key="step.key"
                                    class="cr-step"
                                    :class="{
                                        'cr-step-completed': getStepIndex(selectedOrder.status) > index,
                                        'cr-step-active': getStepIndex(selectedOrder.status) === index
                                    }"
                                >
                                    <span
                                        v-if="getStepIndex(selectedOrder.status) > index"
                                        class="cr-step-indicator"
                                    >
                                        <i class="ri-check-line"></i>
                                    </span>
                                    <span class="cr-step-icon">
                                        <i :class="step.icon"></i>
                                    </span>
                                    {{ step.label1 }}<br>{{ step.label2 }}
                                </div>
                            </div>
                        </div>

                        <!-- Cancelled Message -->
                        <div v-else class="alert alert-danger text-center">
                            <i class="ri-error-warning-line me-2"></i>
                            Đơn hàng này đã bị hủy.
                        </div>

                        <!-- Order Items Table -->
                        <div class="order-items-table mt-4" v-if="selectedOrder.items && selectedOrder.items.length">
                            <h6 class="order-section-title">Items Ordered</h6>
                            <div class="table-responsive">
                                <table class="table table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Product</th>
                                            <th class="text-center">Qty</th>
                                            <th class="text-end">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in selectedOrder.items" :key="item.id">
                                            <td>
                                                <img :src="item.product_image || '/assets/img/product/1.jpg'" :alt="item.product_name" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;">
                                            </td>
                                            <td>{{ item.product_name }}</td>
                                            <td class="text-center">{{ item.quantity }}</td>
                                            <td class="text-end">{{ formatCurrency(item.price) }}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" class="fw-bold">Total</td>
                                            <td class="text-end fw-bold text-primary">{{ formatCurrency(selectedOrder.total_price) }}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- Track Order section End -->
</template>

<script setup>
import { formatCurrency } from '@/utils/currency';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import orderService from '@/services/orderService';

const route = useRoute();
const router = useRouter();

// State
const orders = ref([]);
const selectedOrder = ref(null);
const isLoading = ref(false);
const isLoadingList = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = ref(6);

const trackingSteps = [
    { key: 'confirmed', icon: 'ri-shield-check-line', label1: 'Order', label2: 'confirmed' },
    { key: 'processing', icon: 'ri-settings-4-line', label1: 'Processing', label2: 'order' },
    { key: 'quality', icon: 'ri-gift-line', label1: 'Quality', label2: 'check' },
    { key: 'dispatched', icon: 'ri-truck-line', label1: 'Product', label2: 'dispatched' },
    { key: 'delivered', icon: 'ri-home-5-line', label1: 'Product', label2: 'delivered' },
];

const stepMap = {
    'pending':   0,
    'paid':      1,
    'shipped':   3,
    'completed': 4,
    'cancelled': -1,
};

// Actions
const fetchOrderList = async (page = 1) => {
    isLoadingList.value = true;
    try {
        const response = await orderService.getOrders(null, page);
        orders.value = response.data;
        if (response.meta) {
            currentPage.value = response.meta.current_page;
            totalPages.value = response.meta.last_page;
        }
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    } finally {
        isLoadingList.value = false;
    }
};

const fetchOrderDetail = async (id) => {
    isLoading.value = true;
    try {
        const response = await orderService.getOrder(id);
        selectedOrder.value = response.data;
    } catch (error) {
        console.error('Failed to fetch order details:', error);
        selectedOrder.value = null;
    } finally {
        isLoading.value = false;
    }
};

const selectOrder = (order) => {
    // Navigate to update URL which will trigger watch/mount detail fetch
    router.push({ query: { id: order.id } });
};

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    fetchOrderList(page);
};

const getStatusClass = (status) => {
    const map = {
        'pending':   'status-pending',
        'paid':      'status-processing',
        'shipped':   'status-dispatched',
        'completed': 'status-delivered',
        'cancelled': 'status-cancelled',
    };
    return map[status] || 'status-pending';
};

const getStatusLabel = (status) => {
    const labels = {
        'pending':   'Chờ xử lý',
        'paid':      'Đã thanh toán',
        'shipped':   'Đang giao hàng',
        'completed': 'Đã hoàn thành',
        'cancelled': 'Đã hủy',
    };
    return labels[status] || status;
};

const getStepIndex = (status) => {
    return stepMap[status] ?? 0;
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Watch query ID change
watch(() => route.query.id, (newId) => {
    if (newId) {
        fetchOrderDetail(newId);
    }
}, { immediate: true });

onMounted(() => {
    fetchOrderList();
    if (route.query.id) {
        fetchOrderDetail(route.query.id);
    }
});
</script>

<style scoped>
/* ===== ORDER LIST SIDEBAR ===== */
.order-list-sidebar {
    background: #fff;
    border: 1px solid #efefef;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    position: sticky;
    top: 24px;
}

.order-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid #f2f2f2;
    background: #fafafa;
}

.order-list-header h5 {
    font-size: 15px;
    font-weight: 700;
    color: #333;
}

.order-count-badge {
    background: #64b496;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 20px;
}

.order-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.order-list-item {
    padding: 16px 20px;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    transition: background 0.2s, border-left 0.2s;
    border-left: 3px solid transparent;
}

.order-list-item:hover {
    background: #f9f9f9;
}

.order-list-item.active {
    background: #f0faf6;
    border-left-color: #64b496;
}

.order-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}

.order-item-id {
    font-size: 14px;
    font-weight: 700;
    color: #222;
}

.order-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-item-date {
    font-size: 12px;
    color: #888;
}

.order-item-total {
    font-size: 13px;
    font-weight: 600;
    color: #64b496;
}

.order-item-shipper {
    font-size: 12px;
    color: #aaa;
}

/* ===== STATUS BADGES ===== */
.order-status-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

.order-status-badge.lg {
    font-size: 13px;
    padding: 5px 14px;
}

.status-delivered  { background: #e8f9f0; color: #1e9e5c; }
.status-dispatched { background: #e8f0fc; color: #1e5dbf; }
.status-packing    { background: #fff8e8; color: #c98a00; }
.status-processing { background: #fff0e8; color: #bf5e1e; }
.status-pending    { background: #f0f0f0; color: #666; }
.status-cancelled  { background: #fdecea; color: #c0392b; }

/* ===== ORDER DETAIL CARD ===== */
.order-detail-card {
    border-radius: 12px;
    border: 1px solid #efefef;
    padding: 28px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.order-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid #f2f2f2;
}

.order-detail-header h5 {
    font-size: 18px;
    color: #333;
}

/* ===== EMPTY STATE ===== */
.order-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: #aaa;
    border: 2px dashed #efefef;
    border-radius: 12px;
    background: #fafafa;
}

.order-empty-state i {
    font-size: 52px;
    margin-bottom: 16px;
    color: #ddd;
}

.order-empty-state p {
    font-size: 15px;
    margin: 0;
}

/* ===== ITEMS TABLE ===== */
.order-items-table {
    border-top: 1px solid #f2f2f2;
    padding-top: 20px;
}

.order-section-title {
    font-size: 14px;
    font-weight: 700;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 12px;
}

.table thead th {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #efefef;
    padding-bottom: 8px;
}

.table tbody td {
    font-size: 14px;
    color: #444;
    padding: 10px 0;
    border-bottom: 1px solid #f7f7f7;
}

.table tfoot td {
    font-size: 14px;
    padding-top: 12px;
    border: none;
}

/* ===== PAGINATION ===== */
.order-pagination {
    padding: 12px 16px;
    border-top: 1px solid #f2f2f2;
    background: #fafafa;
}

.order-pagination .pagination {
    margin: 0;
    justify-content: center;
    gap: 4px;
}

.order-pagination .page-link {
    font-size: 13px;
    padding: 5px 10px;
    border-radius: 6px !important;
    border-color: #eee;
    color: #555;
}

.order-pagination .page-item.active .page-link {
    background-color: #64b496;
    border-color: #64b496;
    color: #fff;
}

.order-pagination .page-item.disabled .page-link {
    color: #ccc;
}

/* ===== SCROLLBAR STYLE ===== */
.order-list::-webkit-scrollbar {
    width: 4px;
}
.order-list::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;
}
</style>
