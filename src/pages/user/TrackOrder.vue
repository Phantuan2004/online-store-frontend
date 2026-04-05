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
                            <span class="order-count-badge">{{ orders.length }}</span>
                        </div>

                        <ul class="order-list">
                            <li
                                v-for="order in pagedOrders"
                                :key="order.id"
                                class="order-list-item"
                                :class="{ 'active': selectedOrder && selectedOrder.id === order.id }"
                                @click="selectOrder(order)"
                            >
                                <div class="order-item-top">
                                    <span class="order-item-id">#{{ order.id }}</span>
                                    <span class="order-status-badge" :class="getStatusClass(order.status)">
                                        {{ order.status }}
                                    </span>
                                </div>
                                <div class="order-item-bottom">
                                    <span class="order-item-date">
                                        <i class="ri-calendar-line me-1"></i>{{ order.date }}
                                    </span>
                                    <span class="order-item-total">${{ order.total }}</span>
                                </div>
                                <div class="order-item-shipper text-muted small mt-1">
                                    <i class="ri-truck-line me-1"></i>{{ order.shipper }}
                                </div>
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
                                    :aria-current="currentPage === page ? 'page' : undefined"
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
                    <!-- No Order Selected -->
                    <div v-if="!selectedOrder" class="order-empty-state">
                        <i class="ri-inbox-2-line"></i>
                        <p>Select an order from the list to view details</p>
                    </div>

                    <!-- Order Detail Box -->
                    <div v-else class="cr-track-box order-detail-card">
                        <!-- Card Header -->
                        <div class="order-detail-header">
                            <div>
                                <h5 class="mb-1">Order <strong>#{{ selectedOrder.id }}</strong></h5>
                                <small class="text-muted">Placed on {{ selectedOrder.date }}</small>
                            </div>
                            <span class="order-status-badge lg" :class="getStatusClass(selectedOrder.status)">
                                {{ selectedOrder.status }}
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
                                    <span class="cr-track-title">Shipper</span>
                                    <span>{{ selectedOrder.shipper }}</span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-12">
                                <div class="cr-track-card">
                                    <span class="cr-track-title">Expected Date</span>
                                    <span>{{ selectedOrder.expectedDate }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Progress Steps -->
                        <div class="cr-steps">
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

                        <!-- Order Items Table -->
                        <div class="order-items-table mt-4" v-if="selectedOrder.items && selectedOrder.items.length">
                            <h6 class="order-section-title">Items Ordered</h6>
                            <table class="table table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-end">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in selectedOrder.items" :key="item.name">
                                        <td>{{ item.name }}</td>
                                        <td class="text-center">{{ item.qty }}</td>
                                        <td class="text-end">${{ item.price }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" class="fw-bold">Total</td>
                                        <td class="text-end fw-bold text-primary">${{ selectedOrder.total }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- Track Order section End -->
</template>

<script>
export default {
    name: "TrackOrder",

    data() {
        return {
            selectedOrder: null,
            currentPage: 1,
            pageSize: 6,

            trackingSteps: [
                { key: 'confirmed', icon: 'ri-shield-check-line', label1: 'Order', label2: 'confirmed' },
                { key: 'processing', icon: 'ri-settings-4-line', label1: 'Processing', label2: 'order' },
                { key: 'quality', icon: 'ri-gift-line', label1: 'Quality', label2: 'check' },
                { key: 'dispatched', icon: 'ri-truck-line', label1: 'Product', label2: 'dispatched' },
                { key: 'delivered', icon: 'ri-home-5-line', label1: 'Product', label2: 'delivered' },
            ],

            stepMap: {
                'Pending':    0,
                'Processing': 1,
                'Packing':    2,
                'Dispatched': 3,
                'Delivered':  4,
                'Cancelled':  -1,
            },

            orders: [
                {
                    id: '9857', shipper: 'Grasshoppers', trackingCode: 'M254HT',
                    status: 'Packing', date: 'Feb 10, 2025', expectedDate: 'Feb 17, 2025', total: '84.50',
                    items: [
                        { name: 'Organic Quinoa 500g', qty: 2, price: '24.00' },
                        { name: 'Fresh Orange Juice 1L', qty: 1, price: '12.50' },
                        { name: 'Almond Nuts 1kg', qty: 1, price: '24.00' },
                    ]
                },
                {
                    id: '9820', shipper: 'BlueDart', trackingCode: 'BD88923',
                    status: 'Delivered', date: 'Jan 25, 2025', expectedDate: 'Feb 01, 2025', total: '56.00',
                    items: [
                        { name: 'Basmati Rice 5kg', qty: 1, price: '32.00' },
                        { name: 'Honey 500g', qty: 2, price: '12.00' },
                    ]
                },
                {
                    id: '9790', shipper: 'FedEx', trackingCode: 'FX120045',
                    status: 'Cancelled', date: 'Jan 10, 2025', expectedDate: 'Jan 18, 2025', total: '39.00',
                    items: [
                        { name: 'Coconut Oil 1L', qty: 1, price: '18.00' },
                        { name: 'Green Tea 100g', qty: 3, price: '7.00' },
                    ]
                },
                {
                    id: '9750', shipper: 'DHL', trackingCode: 'DH99011',
                    status: 'Dispatched', date: 'Jan 01, 2025', expectedDate: 'Jan 08, 2025', total: '110.00',
                    items: [
                        { name: 'Mixed Nuts 2kg', qty: 2, price: '45.00' },
                        { name: 'Olive Oil 750ml', qty: 1, price: '20.00' },
                    ]
                },
                {
                    id: '9710', shipper: 'Grasshoppers', trackingCode: 'M100XZ',
                    status: 'Processing', date: 'Dec 20, 2024', expectedDate: 'Dec 28, 2024', total: '67.00',
                    items: [
                        { name: 'Whole Wheat Bread', qty: 3, price: '9.00' },
                        { name: 'Greek Yogurt 500g', qty: 2, price: '15.00' },
                        { name: 'Avocado x5', qty: 1, price: '19.00' },
                    ]
                },
                {
                    id: '9685', shipper: 'BlueDart', trackingCode: 'BD44512',
                    status: 'Pending', date: 'Dec 12, 2024', expectedDate: 'Dec 20, 2024', total: '45.00',
                    items: [
                        { name: 'Cashew Nuts 500g', qty: 1, price: '22.00' },
                        { name: 'Oat Milk 1L', qty: 2, price: '11.50' },
                    ]
                },
                {
                    id: '9650', shipper: 'FedEx', trackingCode: 'FX009821',
                    status: 'Delivered', date: 'Dec 01, 2024', expectedDate: 'Dec 09, 2024', total: '92.00',
                    items: [
                        { name: 'Flaxseed Oil 500ml', qty: 2, price: '18.00' },
                        { name: 'Brown Rice 2kg', qty: 1, price: '28.00' },
                        { name: 'Chia Seeds 250g', qty: 2, price: '14.00' },
                    ]
                },
                {
                    id: '9620', shipper: 'DHL', trackingCode: 'DH77342',
                    status: 'Delivered', date: 'Nov 15, 2024', expectedDate: 'Nov 22, 2024', total: '33.50',
                    items: [
                        { name: 'Peanut Butter 400g', qty: 1, price: '14.00' },
                        { name: 'Dark Chocolate 200g', qty: 2, price: '9.75' },
                    ]
                },
            ]
        };
    },

    computed: {
        pagedOrders() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.orders.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.orders.length / this.pageSize);
        }
    },

    mounted() {
        // Auto-select the first order on load
        if (this.orders.length > 0) {
            this.selectedOrder = this.orders[0];
        }
    },

    methods: {
        selectOrder(order) {
            this.selectedOrder = order;
        },

        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            // Auto-select first order of new page if current selected not in view
            const onPage = this.pagedOrders.find(o => this.selectedOrder && o.id === this.selectedOrder.id);
            if (!onPage && this.pagedOrders.length > 0) {
                this.selectedOrder = this.pagedOrders[0];
            }
        },

        getStatusClass(status) {
            const map = {
                'Delivered':  'status-delivered',
                'Dispatched': 'status-dispatched',
                'Packing':    'status-packing',
                'Processing': 'status-processing',
                'Pending':    'status-pending',
                'Cancelled':  'status-cancelled',
            };
            return map[status] || 'status-pending';
        },

        getStepIndex(status) {
            return this.stepMap[status] ?? 0;
        }
    }
};
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
