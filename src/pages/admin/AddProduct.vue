<template>
    <div class="cr-main-content">
        <div class="container-fluid">
            <!-- Page title & breadcrumb -->
            <div class="cr-page-title cr-page-title-2 mb-4 d-flex justify-content-between align-items-center">
                <div class="cr-breadcrumb">
                    <h5>Add Product</h5>
                    <ul>
                        <li><router-link to="/admin">Admin</router-link></li>
                        <li>Add Product</li>
                    </ul>
                </div>
                <div class="d-none d-lg-flex gap-2">
                    <button class="btn btn-outline-secondary" @click="saveDraft">Save Draft</button>
                    <button class="btn btn-primary" @click="publishProduct">Publish Product</button>
                </div>
            </div>

            <div class="row">
                <!-- LEFT COLUMN: Images -->
                <div class="col-lg-4 mb-4">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                            <h6 class="mb-0 fw-bold">Product Images</h6>
                        </div>
                        <div class="card-body">
                            <!-- Main Image Preview -->
                            <div class="main-image-container bg-light rounded d-flex align-items-center justify-content-center mb-3 position-relative overflow-hidden" style="aspect-ratio: 1; border: 1px dashed #ccc;">
                                <img v-if="primaryImage" :src="primaryImage.preview" class="img-fluid w-100 h-100" style="object-fit: cover;" />
                                <div v-else class="text-muted text-center">
                                    <i class="ri-image-add-line fs-1"></i>
                                    <p class="mb-0 small">No primary image</p>
                                </div>
                            </div>

                            <!-- Thumbnails & Upload -->
                            <div class="d-flex flex-wrap gap-2">
                                <div v-for="(img, index) in images" :key="index" class="thumbnail-item position-relative rounded overflow-hidden" :class="{ 'border-primary border border-2': img.isPrimary }" style="width: 70px; height: 70px; cursor: pointer;" @click="setPrimaryImage(index)">
                                    <img :src="img.preview" class="w-100 h-100" style="object-fit: cover;" />
                                    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0" style="width: 20px; height: 20px; font-size: 10px;" @click.stop="removeImage(index)">
                                        <i class="ri-close-line"></i>
                                    </button>
                                    <div v-if="img.isPrimary" class="position-absolute bottom-0 w-100 text-center bg-primary text-white" style="font-size: 9px; padding: 2px 0;">Primary</div>
                                </div>
                                
                                <label class="upload-btn rounded d-flex align-items-center justify-content-center bg-light" style="width: 70px; height: 70px; border: 1px dashed #ccc; cursor: pointer;">
                                    <i class="ri-add-line fs-4 text-muted"></i>
                                    <input type="file" multiple accept="image/*" class="d-none" @change="handleImageUpload">
                                </label>
                            </div>
                            <small class="text-muted d-block mt-2">Click an image to set as primary.</small>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Details -->
                <div class="col-lg-8">
                    <!-- Section 2: Basic Info -->
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                            <h6 class="mb-0 fw-bold">Basic Information</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <label class="form-label">Product Name *</label>
                                    <input type="text" class="form-control" v-model="form.name" @input="generateSlug" placeholder="Enter product name">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label text-muted small">Slug</label>
                                    <input type="text" class="form-control form-control-sm text-muted bg-light" v-model="form.slug" readonly>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Category *</label>
                                    <select class="form-select" v-model="form.category_id">
                                        <option value="">Select category</option>
                                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Status</label>
                                    <select class="form-select" v-model="form.status">
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Description -->
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                            <h6 class="mb-0 fw-bold">Description</h6>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Short Description</label>
                                <textarea class="form-control" rows="2" v-model="form.short_description" placeholder="Brief summary of the product"></textarea>
                            </div>
                            <div>
                                <label class="form-label">Full Description</label>
                                <textarea class="form-control" rows="6" v-model="form.description" placeholder="Detailed product description..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Variants & Pricing -->
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-bold">Pricing & Variants</h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="hasVariantsToggle" v-model="form.has_variants">
                                <label class="form-check-label" for="hasVariantsToggle">This product has variants</label>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- No Variants View -->
                            <div v-if="!form.has_variants" class="row g-3">
                                <div class="col-md-4">
                                    <label class="form-label">Price ($) *</label>
                                    <input type="number" class="form-control" v-model="form.price" min="0" step="0.01">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Stock *</label>
                                    <input type="number" class="form-control" v-model="form.stock" min="0">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">SKU</label>
                                    <input type="text" class="form-control" v-model="form.sku" placeholder="Optional">
                                </div>
                            </div>

                            <!-- Has Variants View -->
                            <div v-else>
                                <!-- Attribute Builder -->
                                <div class="attributes-builder mb-4 p-3 bg-light rounded border">
                                    <h6 class="mb-3">Attributes (e.g., Color, Size)</h6>
                                    <div v-for="(attr, idx) in attributes" :key="idx" class="row g-2 mb-2 align-items-center">
                                        <div class="col-md-4">
                                            <input type="text" class="form-control form-control-sm" v-model="attr.name" placeholder="Attribute name (e.g. Size)">
                                        </div>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control form-control-sm" v-model="attr.inputValue" @keydown.enter.prevent="addAttrValue(idx)" placeholder="Type value and press Enter (e.g. XL)">
                                            <div class="d-flex flex-wrap gap-1 mt-1">
                                                <span v-for="(val, vIdx) in attr.values" :key="vIdx" class="badge bg-secondary d-flex align-items-center gap-1">
                                                    {{ val }} <i class="ri-close-line cursor-pointer" @click="removeAttrValue(idx, vIdx)"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <button class="btn btn-sm btn-outline-danger w-100" @click="removeAttribute(idx)"><i class="ri-delete-bin-line"></i></button>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <button class="btn btn-sm btn-outline-primary" @click="addAttribute"><i class="ri-add-line"></i> Add Another Attribute</button>
                                        <button class="btn btn-sm btn-success" @click="generateVariants"><i class="ri-magic-line"></i> Generate Variants</button>
                                    </div>
                                </div>

                                <!-- Variants Table -->
                                <div v-if="generatedVariants.length > 0">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h6 class="mb-0">Variant Combinations ({{ generatedVariants.length }})</h6>
                                        <div class="d-flex gap-2">
                                            <input type="number" class="form-control form-control-sm" v-model="bulkPrice" placeholder="Bulk Price" style="width: 100px;">
                                            <input type="number" class="form-control form-control-sm" v-model="bulkStock" placeholder="Bulk Stock" style="width: 100px;">
                                            <button class="btn btn-sm btn-outline-secondary" @click="applyBulk">Apply to all</button>
                                        </div>
                                    </div>
                                    <div class="table-responsive border rounded">
                                        <table class="table table-sm table-hover mb-0 align-middle">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>Variant</th>
                                                    <th style="width: 120px;">Price *</th>
                                                    <th style="width: 100px;">Stock *</th>
                                                    <th style="width: 150px;">SKU</th>
                                                    <th style="width: 50px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(variant, vIdx) in generatedVariants" :key="vIdx">
                                                    <td>
                                                        <span class="badge bg-light text-dark border me-1" v-for="(val, key) in variant.attributes" :key="key">
                                                            {{ key }}: {{ val }}
                                                        </span>
                                                    </td>
                                                    <td><input type="number" class="form-control form-control-sm" v-model="variant.price" min="0" step="0.01"></td>
                                                    <td><input type="number" class="form-control form-control-sm" v-model="variant.stock" min="0"></td>
                                                    <td><input type="text" class="form-control form-control-sm" v-model="variant.sku"></td>
                                                    <td>
                                                        <button class="btn btn-sm text-danger border-0 bg-transparent" @click="removeVariant(vIdx)"><i class="ri-delete-bin-line"></i></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div v-else class="text-center text-muted p-4 border rounded bg-light">
                                    Add attributes and click "Generate Variants" to create combinations.
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 5: SEO / Tags -->
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                            <h6 class="mb-0 fw-bold">Search Engine Optimization (SEO)</h6>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Product Tags</label>
                                <input type="text" class="form-control" v-model="form.tags" placeholder="e.g. fashion, summer, t-shirt (comma separated)">
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Actions (Sticky bottom on mobile) -->
                    <div class="d-flex d-lg-none gap-2 sticky-bottom p-3 bg-white border-top shadow-sm mx-n3 mt-4" style="bottom: 0; z-index: 1020;">
                        <button class="btn btn-outline-secondary w-50" @click="saveDraft">Save Draft</button>
                        <button class="btn btn-primary w-50" @click="publishProduct">Publish</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '@/services/api';
import { uploadImage } from '@/services/cloudinary';

// --- State ---
const form = reactive({
    name: '',
    slug: '',
    category_id: '',
    status: 'active',
    short_description: '',
    description: '',
    has_variants: false,
    price: 0,
    stock: 0,
    sku: '',
    tags: '',
});

const isLoading = ref(false);
const categories = ref([]);

// Images
const images = ref([]); // array of { file, preview, isPrimary }
const primaryImage = computed(() => images.value.find(img => img.isPrimary) || images.value[0]);

// Variants
const attributes = ref([{ name: '', values: [], inputValue: '' }]);
const generatedVariants = ref([]);
const bulkPrice = ref('');
const bulkStock = ref('');

// --- Methods ---

// Initialization
onMounted(async () => {
    try {
        const res = await api.get('/categories');
        // Handle both possible wrapper structures for categories
        categories.value = res.data?.data || res.data || []; 
    } catch (error) {
        console.error("Failed to load categories", error);
    }
});

// Basic Info
const generateSlug = () => {
    form.slug = form.name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Images
const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const preview = URL.createObjectURL(file);
        images.value.push({
            file,
            preview,
            isPrimary: images.value.length === 0 // First image is primary by default
        });
    });
    e.target.value = ''; // reset input
};

const removeImage = (index) => {
    const wasPrimary = images.value[index].isPrimary;
    images.value.splice(index, 1);
    if (wasPrimary && images.value.length > 0) {
        images.value[0].isPrimary = true;
    }
};

const setPrimaryImage = (index) => {
    images.value.forEach((img, i) => {
        img.isPrimary = i === index;
    });
};

// Attributes Builder
const addAttribute = () => {
    attributes.value.push({ name: '', values: [], inputValue: '' });
};

const removeAttribute = (idx) => {
    attributes.value.splice(idx, 1);
};

const addAttrValue = (idx) => {
    const val = attributes.value[idx].inputValue.trim();
    if (val && !attributes.value[idx].values.includes(val)) {
        attributes.value[idx].values.push(val);
    }
    attributes.value[idx].inputValue = '';
};

const removeAttrValue = (attrIdx, valIdx) => {
    attributes.value[attrIdx].values.splice(valIdx, 1);
};

// Variant Generator
const generateCombinations = (attrs, index = 0, currentCombo = {}) => {
    if (index === attrs.length) return [currentCombo];
    const attr = attrs[index];
    let results = [];
    for (let val of attr.values) {
        results = results.concat(generateCombinations(attrs, index + 1, { ...currentCombo, [attr.name]: val }));
    }
    return results;
};

const generateVariants = () => {
    const validAttrs = attributes.value.filter(a => a.name.trim() && a.values.length > 0);
    if (validAttrs.length === 0) {
        alert("Please add at least one attribute with values.");
        return;
    }

    const combinations = generateCombinations(validAttrs);
    
    // Preserve existing variants if attributes match
    const newVariants = combinations.map(combo => {
        const existing = generatedVariants.value.find(v => JSON.stringify(v.attributes) === JSON.stringify(combo));
        if (existing) return existing;

        const nameSuffix = Object.values(combo).join('-');
        return {
            attributes: combo,
            price: form.price || 0,
            stock: form.stock || 0,
            sku: `${form.slug ? form.slug + '-' : 'PROD-'}${nameSuffix}`.toUpperCase()
        };
    });

    generatedVariants.value = newVariants;
};

const removeVariant = (idx) => {
    generatedVariants.value.splice(idx, 1);
};

const applyBulk = () => {
    generatedVariants.value.forEach(v => {
        if (bulkPrice.value !== '') v.price = parseFloat(bulkPrice.value);
        if (bulkStock.value !== '') v.stock = parseInt(bulkStock.value);
    });
    bulkPrice.value = '';
    bulkStock.value = '';
};

// Submit Logic
const validateForm = () => {
    if (!form.name || !form.category_id) {
        alert("Please fill in all required fields (Name, Category).");
        return false;
    }

    if (form.has_variants) {
        if (generatedVariants.value.length === 0) {
            alert("Please generate variants or disable the variants toggle.");
            return false;
        }
        const invalidVariant = generatedVariants.value.find(v => v.price < 0 || v.stock < 0);
        if (invalidVariant) {
            alert("Variant prices and stock must be 0 or greater.");
            return false;
        }
    } else {
        if (form.price < 0 || form.stock < 0) {
            alert("Price and stock must be 0 or greater.");
            return false;
        }
    }
    return true;
};

const buildPayload = (uploadedUrls = []) => {
    // Backend StoreProductRequest expects:
    // name, description, price, category_id, images (array of URLs), 
    // variants (array of {sku, price, stock, attribute_value_ids})

    const payload = {
        name: form.name,
        description: form.description || '',
        price: form.price,
        category_id: form.category_id,
        images: uploadedUrls, 
        variants: []
    };

    if (!form.has_variants) {
        payload.variants.push({
            sku: form.sku || `PROD-${Date.now()}`,
            price: form.price,
            stock: form.stock
        });
    } else {
        payload.variants = generatedVariants.value.map(v => ({
            sku: v.sku,
            price: v.price,
            stock: v.stock
        }));
    }

    return payload;
};

const publishProduct = async () => {
    if (!validateForm()) return;
    
    isLoading.value = true;
    try {
        // 1. Upload images to Cloudinary
        // Ensure primary image is at the first index
        const sortedImages = [...images.value].sort((a, b) => b.isPrimary - a.isPrimary);
        
        let uploadedUrls = [];
        if (sortedImages.length > 0) {
            const uploadPromises = sortedImages.map(img => uploadImage(img.file));
            uploadedUrls = await Promise.all(uploadPromises);
        }

        // 2. Build payload with real Cloudinary URLs
        const payload = buildPayload(uploadedUrls);
        const response = await api.post('/admin/products', payload);
        
        alert("Sản phẩm đã được đăng thành công!");
        window.location.href = '/admin/products'; 
    } catch (error) {
        console.error("Publish error:", error);
        const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra khi đăng sản phẩm.";
        alert(errorMsg);
    } finally {
        isLoading.value = false;
    }
};

const saveDraft = () => {
    form.status = 'draft';
    publishProduct();
};

</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
.card {
    border-radius: 10px;
}
</style>
