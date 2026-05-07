<template>
	<div class="cr-main-content">
		<div class="container-fluid">
			<!-- Page title & breadcrumb -->
			<div class="cr-page-title cr-page-title-2">
				<div class="cr-breadcrumb">
					<h5>Order Management</h5>
					<ul>
						<li><router-link to="/admin">Admin</router-link></li>
						<li>Orders</li>
					</ul>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="cr-card" id="ordertbl">
						<div class="cr-card-header">
							<h4 class="cr-card-title">Recent Orders</h4>
							<div class="header-tools">
								<button class="btn-refresh" @click="fetchOrders" :disabled="loading">
									<i :class="['ri-refresh-line', { 'spin': loading }]"></i>
								</button>
							</div>
						</div>
						<div class="cr-card-content card-default">
							<div class="order-table">
								<div class="table-responsive">
									<table class="table custom-table">
										<thead>
											<tr>
												<th>STT</th>
												<th>Order ID</th>
												<th>Customer</th>
												<th>Total Price</th>
												<th>Status</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr v-if="loading">
												<td colspan="6" class="text-center py-5">
													<div class="loader"></div>
													<p class="mt-2 text-muted">Loading orders...</p>
												</td>
											</tr>
											<tr v-else-if="orders.length === 0">
												<td colspan="6" class="text-center py-5">
													<i class="ri-inbox-line fs-1 text-muted"></i>
													<p class="mt-2 text-muted">No orders found.</p>
												</td>
											</tr>
											<tr v-for="(order, index) in orders" :key="order.id">
												<td>{{ index + 1 }}</td>
												<td class="order-id">#ORD-{{ order.id }}</td>
												<td>
													<div class="customer-info">
														<span class="customer-name">{{ order.user?.name || 'Unknown' }}</span>
														<small class="customer-email d-block text-muted">{{ order.user?.email }}</small>
													</div>
												</td>
												<td class="price">{{ formatPrice(order.total_price) }}</td>
												<td>
													<span :class="['status-badge', getStatusClass(order.status)]">
														{{ order.status }}
													</span>
												</td>
												<td>
													<button class="btn-view" @click="viewOrderDetails(order.id)">
														<i class="ri-eye-line"></i> View
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Order Details Drawer -->
		<div :class="['drawer-overlay', { 'show': showDrawer }]" @click="closeDrawer">
			<div class="order-drawer" @click.stop>
				<div class="drawer-header">
					<div class="header-content">
						<h5>Order Details</h5>
						<span class="order-tag">#ORD-{{ selectedOrder?.id }}</span>
					</div>
					<button class="btn-close-drawer" @click="closeDrawer">
						<i class="ri-close-line"></i>
					</button>
				</div>

				<div class="drawer-body" v-if="drawerLoading">
					<div class="drawer-loader">
						<div class="loader"></div>
						<p>Fetching order details...</p>
					</div>
				</div>

				<div class="drawer-body" v-else-if="selectedOrder">
					<!-- Customer Section -->
					<div class="detail-section">
						<h6 class="section-title"><i class="ri-user-line"></i> Customer Information</h6>
						<div class="info-grid">
							<div class="info-item">
								<label>Full Name</label>
								<span>{{ selectedOrder.user?.name }}</span>
							</div>
							<div class="info-item">
								<label>Email</label>
								<span>{{ selectedOrder.user?.email }}</span>
							</div>
							<div class="info-item full-width">
								<label>Shipping Address</label>
								<span>{{ selectedOrder.address?.address_line || 'No address provided' }}</span>
							</div>
						</div>
					</div>

					<!-- Items Section -->
					<div class="detail-section">
						<h6 class="section-title"><i class="ri-shopping-bag-line"></i> Order Items</h6>
						<div class="order-items">
							<div v-for="item in selectedOrder.items" :key="item.id" class="order-item">
								<div class="item-img" v-if="item.product?.image_url">
									<img :src="item.product.image_url" :alt="item.product.name">
								</div>
								<div class="item-details">
									<span class="item-name">{{ item.product?.name }}</span>
									<span class="item-meta">{{ item.quantity }} x {{ formatPrice(item.price) }}</span>
								</div>
								<div class="item-total">
									{{ formatPrice(item.quantity * item.price) }}
								</div>
							</div>
						</div>
					</div>

					<!-- Payment & Status Section -->
					<div class="detail-section">
						<h6 class="section-title"><i class="ri-bank-card-line"></i> Payment & Status</h6>
						<div class="info-grid">
							<div class="info-item">
								<label>Order Status</label>
								<span :class="['status-badge', getStatusClass(selectedOrder.status)]">
									{{ selectedOrder.status }}
								</span>
							</div>
							<div class="info-item">
								<label>Payment Status</label>
								<span :class="['status-badge', getPaymentStatusClass(selectedOrder.payment?.status)]">
									{{ selectedOrder.payment?.status || 'Unpaid' }}
								</span>
							</div>
							<div class="info-item">
								<label>Payment Method</label>
								<span class="payment-method">
									<i class="ri-wallet-3-line"></i> {{ selectedOrder.payment?.method || 'N/A' }}
								</span>
							</div>
							<div class="info-item">
								<label>Created At</label>
								<span>{{ formatDate(selectedOrder.created_at) }}</span>
							</div>
						</div>
					</div>

					<!-- Summary -->
					<div class="drawer-summary">
						<div class="summary-row total">
							<span>Total Amount</span>
							<span class="total-price">{{ formatPrice(selectedOrder.total_price) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import orderService from '@/services/orderService';

export default {
	name: "Orders",
	data() {
		return {
			orders: [],
			loading: false,
			showDrawer: false,
			drawerLoading: false,
			selectedOrder: null
		};
	},
	methods: {
		async fetchOrders() {
			this.loading = true;
			try {
				const response = await orderService.getAllOrders();
				this.orders = response.data.data || response.data;
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				this.loading = false;
			}
		},
		async viewOrderDetails(id) {
			this.showDrawer = true;
			this.drawerLoading = true;
			this.selectedOrder = null;
			try {
				const response = await orderService.getAdminOrderDetail(id);
				this.selectedOrder = response.data.data || response.data;
			} catch (error) {
				console.error("Error fetching order details:", error);
				this.closeDrawer();
			} finally {
				this.drawerLoading = false;
			}
		},
		closeDrawer() {
			this.showDrawer = false;
		},
		formatPrice(price) {
			return new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND'
			}).format(price);
		},
		formatDate(dateString) {
			if (!dateString) return 'N/A';
			return new Date(dateString).toLocaleString('vi-VN');
		},
		getStatusClass(status) {
			const statusMap = {
				'pending': 'status-pending',
				'processing': 'status-processing',
				'shipped': 'status-shipped',
				'delivered': 'status-delivered',
				'cancelled': 'status-cancelled'
			};
			return statusMap[status?.toLowerCase()] || 'status-default';
		},
		getPaymentStatusClass(status) {
			const statusMap = {
				'paid': 'status-delivered',
				'unpaid': 'status-pending',
				'failed': 'status-cancelled',
				'refunded': 'status-shipped'
			};
			return statusMap[status?.toLowerCase()] || 'status-default';
		}
	},
	mounted() {
		this.fetchOrders();
	}
}
</script>

<style scoped>
/* Table Styles */
.custom-table {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 8px;
}

.custom-table thead th {
	border: none;
	color: #64748b;
	font-weight: 600;
	text-transform: uppercase;
	font-size: 12px;
	padding: 12px 20px;
}

.custom-table tbody tr {
	background: #fff;
	box-shadow: 0 2px 4px rgba(0,0,0,0.02);
	transition: all 0.3s;
}

.custom-table tbody tr:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.custom-table tbody td {
	padding: 16px 20px;
	border: none;
	vertical-align: middle;
}

.custom-table tbody td:first-child { border-radius: 12px 0 0 12px; }
.custom-table tbody td:last-child { border-radius: 0 12px 12px 0; }

.order-id { font-weight: 700; color: #5c6bc0; }
.customer-name { font-weight: 600; color: #2d3748; }
.price { font-weight: 700; color: #2d3748; }

/* Status Badges */
.status-badge {
	padding: 6px 12px;
	border-radius: 20px;
	font-size: 12px;
	font-weight: 600;
	text-transform: capitalize;
}

.status-pending { background: #fff7ed; color: #c2410c; }
.status-processing { background: #eff6ff; color: #1d4ed8; }
.status-shipped { background: #faf5ff; color: #7e22ce; }
.status-delivered { background: #f0fdf4; color: #15803d; }
.status-cancelled { background: #fef2f2; color: #b91c1c; }
.status-default { background: #f1f5f9; color: #475569; }

/* Buttons */
.btn-view {
	background: #5c6bc0;
	color: #fff;
	border: none;
	padding: 6px 14px;
	border-radius: 8px;
	font-size: 13px;
	font-weight: 500;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	transition: all 0.3s;
}

.btn-view:hover { background: #4a59a7; transform: scale(1.05); }

.btn-refresh {
	background: none;
	border: none;
	font-size: 20px;
	color: #64748b;
	cursor: pointer;
	padding: 4px;
}

/* Drawer Styles */
.drawer-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(15, 23, 42, 0.4);
	backdrop-filter: blur(4px);
	z-index: 1000;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
}

.drawer-overlay.show {
	opacity: 1;
	visibility: visible;
}

.order-drawer {
	position: absolute;
	top: 0;
	right: -450px;
	width: 450px;
	height: 100%;
	background: #fff;
	box-shadow: -10px 0 30px rgba(0,0,0,0.1);
	transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
	display: flex;
	flex-direction: column;
}

.drawer-overlay.show .order-drawer {
	right: 0;
}

.drawer-header {
	padding: 24px;
	border-bottom: 1px solid #f1f5f9;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header-content h5 { margin: 0; font-weight: 700; color: #1e293b; }
.order-tag { font-size: 13px; color: #64748b; font-weight: 500; }

.btn-close-drawer {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: none;
	background: #f1f5f9;
	color: #64748b;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s;
}

.btn-close-drawer:hover { background: #e2e8f0; color: #1e293b; }

.drawer-body {
	flex: 1;
	overflow-y: auto;
	padding: 24px;
}

.detail-section { margin-bottom: 30px; }
.section-title {
	font-size: 14px;
	font-weight: 700;
	color: #475569;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	gap: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.section-title i { color: #5c6bc0; font-size: 18px; }

.info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
}

.info-item { display: flex; flex-direction: column; }
.info-item.full-width { grid-column: span 2; }
.info-item label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
.info-item span { font-size: 14px; color: #334155; font-weight: 500; }

.payment-method { display: inline-flex; align-items: center; gap: 6px; }

/* Order Items in Drawer */
.order-items { display: flex; flex-direction: column; gap: 12px; }
.order-item {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px;
	background: #f8fafc;
	border-radius: 12px;
}

.item-img { width: 50px; height: 50px; border-radius: 8px; overflow: hidden; background: #fff; border: 1px solid #e2e8f0; }
.item-img img { width: 100%; height: 100%; object-fit: cover; }
.item-details { flex: 1; display: flex; flex-direction: column; }
.item-name { font-size: 14px; font-weight: 600; color: #1e293b; }
.item-meta { font-size: 12px; color: #64748b; }
.item-total { font-weight: 700; color: #1e293b; font-size: 14px; }

.drawer-summary {
	padding: 24px;
	background: #fafbff;
	border-top: 1px solid #f1f5f9;
}

.summary-row { display: flex; justify-content: space-between; align-items: center; }
.summary-row.total { font-size: 18px; font-weight: 800; color: #1e293b; }
.total-price { color: #5c6bc0; }

/* Loader */
.loader {
	width: 30px;
	height: 30px;
	border: 3px solid #f3f3f3;
	border-top: 3px solid #5c6bc0;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 0 auto;
}

.drawer-loader {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #94a3b8;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.spin { animation: spin 1s linear infinite; }

@media (max-width: 576px) {
	.order-drawer { width: 100%; right: -100%; }
	.info-grid { grid-template-columns: 1fr; }
	.info-item.full-width { grid-column: span 1; }
}
</style>

