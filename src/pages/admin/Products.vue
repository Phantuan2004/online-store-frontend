<template>
    <div>
        <!-- main content -->
        <div class="cr-main-content">
            <div class="container-fluid">
                <!-- Page title & breadcrumb -->
                <div class="cr-page-title cr-page-title-2">
                    <div class="cr-breadcrumb">
                        <h5>Product List</h5>
                        <ul>
                            <li><router-link to="/admin">Admin</router-link></li>
                            <li>Product List</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="cr-card card-default product-list">
                            <div class="cr-card-content ">
                                <div v-if="isLoading" class="text-center py-5">
                                    <div class="spinner-border text-success" role="status"></div>
                                    <p class="mt-2">Đang tải dữ liệu...</p>
                                </div>
                                <div class="table-responsive" v-else>
                                    <table id="product_list" class="table" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Total Stock</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="product in products" :key="product.id">
                                                <td>
                                                    <img class="tbl-thumb" :src="product.images?.[0]?.url || product.image?.url || 'https://via.placeholder.com/50'" alt="Product Image" style="object-fit: cover;">
                                                </td>
                                                <td>{{ product.name }}</td>
                                                <td>{{ product.category?.name || 'N/A' }}</td>
                                                <td>{{ formatCurrency(product.price) }}</td>
                                                <td>{{ getTotalStock(product) }}</td>
                                                <td>{{ formatDate(product.created_at) }}</td>
                                                <td>
                                                    <div class="dropdown d-flex justify-content-center">
                                                        <button class="btn btn-sm btn-link text-dark text-decoration-none dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="box-shadow: none;">
                                                            <i class="ri-more-2-fill fs-5"></i>
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                                                            <li><a class="dropdown-item" href="#" @click.prevent="openView(product)"><i class="ri-eye-line me-2"></i> View</a></li>
                                                            <li><a class="dropdown-item" href="#" @click.prevent="openEdit(product)"><i class="ri-edit-line me-2"></i> Edit</a></li>
                                                            <li><hr class="dropdown-divider"></li>
                                                            <li><a class="dropdown-item text-danger" href="#" @click.prevent="confirmDelete(product)"><i class="ri-delete-bin-line me-2"></i> Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="products.length === 0">
                                                <td colspan="7" class="text-center py-4">Không có sản phẩm nào.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Pagination -->
                                <div v-if="pagination.last_page > 1" class="mt-4 d-flex justify-content-center">
                                    <nav aria-label="Page navigation">
                                        <ul class="pagination pagination-sm">
                                            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                                                <a @click.prevent="handlePageChange(pagination.current_page - 1)" class="page-link" href="#">Trước</a>
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
        </div>

        <!-- Right Drawer for View/Edit -->
        <div class="offcanvas offcanvas-end" :class="{ show: isDrawerOpen }" tabindex="-1" :style="{ visibility: isDrawerOpen ? 'visible' : 'hidden' }" style="width: 450px; z-index: 1050;">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">{{ isEditing ? 'Edit Product' : 'Product Details' }}</h5>
                <button type="button" class="btn-close" @click="closeDrawer"></button>
            </div>
            <div class="offcanvas-body" v-if="selectedProduct">
                <form @submit.prevent="saveProduct">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Name</label>
                        <input type="text" class="form-control" v-model="selectedProduct.name" :readonly="!isEditing" :class="{'bg-light': !isEditing}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Price</label>
                        <input type="number" class="form-control" v-model="selectedProduct.price" :readonly="!isEditing" :class="{'bg-light': !isEditing}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Category ID</label>
                        <input type="number" class="form-control" v-model="selectedProduct.category_id" :readonly="!isEditing" :class="{'bg-light': !isEditing}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Description</label>
                        <textarea class="form-control" v-model="selectedProduct.description" rows="4" :readonly="!isEditing" :class="{'bg-light': !isEditing}"></textarea>
                    </div>

                    <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                        <template v-if="!isEditing">
                            <button type="button" class="btn btn-primary px-4" @click="isEditing = true">Edit</button>
                        </template>
                        <template v-else>
                            <button type="button" class="btn btn-secondary px-4" @click="cancelEdit">Cancel</button>
                            <button type="submit" class="btn btn-success px-4" :disabled="isSaving">
                                {{ isSaving ? 'Saving...' : 'Save' }}
                            </button>
                        </template>
                    </div>
                </form>
            </div>
        </div>
        <div class="offcanvas-backdrop fade show" v-if="isDrawerOpen" @click="closeDrawer" style="z-index: 1040;"></div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade show" tabindex="-1" :style="{ display: showDeleteModal ? 'block' : 'none' }" style="background: rgba(0,0,0,0.5); z-index: 1060;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Are you sure?</h5>
                        <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <p class="fs-6 mb-0">Bạn có chắc muốn xóa sản phẩm này?</p>
                        <p class="text-muted small mt-1" v-if="productToDelete">Sản phẩm: {{ productToDelete.name }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="deleteProduct" :disabled="isDeleting">
                            {{ isDeleting ? 'Deleting...' : 'Delete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/services/api';
import { formatCurrency } from '@/utils/currency';

const products = ref([]);
const isLoading = ref(false);
const pagination = reactive({
    current_page: 1,
    last_page: 1,
    total: 0
});

const fetchProducts = async (page = 1) => {
    isLoading.value = true;
    try {
        const response = await api.get(`/products?page=${page}`);
        products.value = response.data;
        if (response.meta) {
            pagination.current_page = response.meta.current_page;
            pagination.last_page = response.meta.last_page;
            pagination.total = response.meta.total;
        }
    } catch (error) {
        console.error('Failed to fetch products:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchProducts();
});

const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
        fetchProducts(page);
    }
};

const getTotalStock = (product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN');
};

// --- Drawer Logic ---
const isDrawerOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const selectedProduct = ref(null);
let originalProductData = null;

const openView = (product) => {
    selectedProduct.value = { ...product };
    originalProductData = { ...product };
    isEditing.value = false;
    isDrawerOpen.value = true;
};

const openEdit = (product) => {
    selectedProduct.value = { ...product };
    originalProductData = { ...product };
    isEditing.value = true;
    isDrawerOpen.value = true;
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
    setTimeout(() => {
        selectedProduct.value = null;
        originalProductData = null;
        isEditing.value = false;
    }, 300); // Wait for transition
};

const cancelEdit = () => {
    selectedProduct.value = { ...originalProductData };
    isEditing.value = false;
};

const saveProduct = async () => {
    isSaving.value = true;
    try {
        const payload = {
            name: selectedProduct.value.name,
            price: selectedProduct.value.price,
            category_id: selectedProduct.value.category_id,
            description: selectedProduct.value.description
        };
        await api.put(`/admin/products/${selectedProduct.value.id}`, payload);
        
        alert('Cập nhật sản phẩm thành công!');
        fetchProducts(pagination.current_page); // Reload list
        isEditing.value = false;
        originalProductData = { ...selectedProduct.value }; // Update original data
    } catch (error) {
        console.error('Failed to update product:', error);
        alert(error.response?.data?.message || 'Có lỗi xảy ra khi lưu sản phẩm.');
    } finally {
        isSaving.value = false;
    }
};

// --- Delete Logic ---
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const productToDelete = ref(null);

const confirmDelete = (product) => {
    productToDelete.value = product;
    showDeleteModal.value = true;
};

const deleteProduct = async () => {
    if (!productToDelete.value) return;
    
    isDeleting.value = true;
    try {
        await api.delete(`/admin/products/${productToDelete.value.id}`);
        alert('Xóa sản phẩm thành công!');
        showDeleteModal.value = false;
        fetchProducts(pagination.current_page);
    } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Không thể xóa sản phẩm.');
    } finally {
        isDeleting.value = false;
        productToDelete.value = null;
    }
};

</script>

<style scoped>
.tbl-thumb {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}
.dropdown-toggle::after {
    display: none; /* Hide the default caret */
}
.offcanvas {
    transition: transform 0.3s ease-in-out;
}
</style>
