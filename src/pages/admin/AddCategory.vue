<template>
  <div class="cr-main-content">
    <div class="container-fluid">
      <!-- Page title & breadcrumb -->
      <div class="cr-page-title cr-page-title-2">
        <div class="cr-breadcrumb">
          <h5>Category Management</h5>
          <ul>
            <li><router-link to="/admin">Admin</router-link></li>
            <li>Categories</li>
          </ul>
        </div>
      </div>

      <div class="row cr-category">
        <!-- LEFT PANEL: Form -->
        <div class="col-xl-4 col-lg-12">
          <div class="team-sticky-bar">
            <div class="col-md-12">
              <div class="cr-cat-list cr-card card-default mb-24px cat-form-card">
                <div class="cr-card-content">
                  <div class="cr-cat-form">
                    <h3 class="cat-form-title">
                      <i :class="isEditing ? 'ri-edit-line' : 'ri-add-circle-line'"></i>
                      {{ isEditing ? 'Edit Category' : 'Add New Category' }}
                    </h3>
                    <p class="cat-form-subtitle" v-if="isEditing">
                      Editing: <strong>{{ form.name }}</strong>
                      <a href="#" class="cat-cancel-edit" @click.prevent="resetForm">Cancel</a>
                    </p>

                    <form @submit.prevent="handleSubmit">
                      <div class="form-group">
                        <label>Name <span class="required">*</span></label>
                        <div class="col-12">
                          <input v-model="form.name" class="form-control here slug-title" type="text"
                            placeholder="Enter category name" required @input="generateSlug" />
                        </div>
                      </div>

                      <div class="form-group">
                        <label>Slug</label>
                        <div class="col-12">
                          <input v-model="form.slug" class="form-control here set-slug" type="text"
                            placeholder="auto-generated-slug" />
                        </div>
                      </div>

                      <div class="form-group">
                        <label>Parent Category</label>
                        <div class="col-12">
                          <select v-model="form.parent_id" class="form-control form-select">
                            <option :value="null">None (Parent Category)</option>
                            <option v-for="cat in parentCategories" :key="cat.id" :value="cat.id">
                              {{ cat.name }}
                            </option>
                          </select>
                          <small class="form-hint">Select "None" to create a parent category</small>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label>Short Description</label>
                        <div class="col-12">
                          <textarea v-model="form.description" cols="40" rows="3" class="form-control"
                            placeholder="Brief description..."></textarea>
                        </div>
                      </div>

                      <div class="row cat-form-actions">
                        <div class="col-12 d-flex">
                          <button type="submit" class="cr-btn-primary" :disabled="submitting">
                            <i :class="submitting ? 'ri-loader-4-line spin' : (isEditing ? 'ri-save-line' : 'ri-add-line')"></i>
                            {{ submitting ? 'Saving...' : (isEditing ? 'Update' : 'Submit') }}
                          </button>
                          <button type="button" class="cr-btn-secondary" @click="resetForm">
                            <i class="ri-refresh-line"></i> Reset
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Category List -->
        <div class="col-xl-8 col-lg-12">
          <div class="cr-cat-list cr-card card-default">
            <div class="cr-card-content">
              <!-- Loading State -->
              <div v-if="loading" class="cat-loading">
                <div class="cat-loading-spinner"></div>
                <p>Loading categories...</p>
              </div>

              <!-- Empty State -->
              <div v-else-if="categories.length === 0" class="cat-empty">
                <i class="ri-folder-add-line"></i>
                <h4>No Categories Yet</h4>
                <p>Create your first category using the form on the left.</p>
              </div>

              <!-- Category List -->
              <div v-else class="cat-hierarchy-list">
                <div class="cat-list-header">
                  <h4><i class="ri-list-check-2"></i> All Categories</h4>
                  <span class="cat-total-badge">{{ totalCount }} total</span>
                </div>

                <div v-for="parent in categories" :key="parent.id" class="cat-parent-block">
                  <!-- Parent Category Row -->
                  <div class="cat-parent-row" :class="{ 'cat-row-editing': editingId === parent.id }">
                    <div class="cat-parent-info">
                      <div class="cat-icon-wrap parent-icon">
                        <i class="ri-folder-3-line"></i>
                      </div>
                      <div class="cat-details">
                        <h5 class="cat-name" @click="editCategory(parent)">{{ parent.name }}</h5>
                        <div class="cat-meta">
                          <span class="cat-slug"><i class="ri-link"></i> {{ parent.slug || '—' }}</span>
                          <span class="cat-child-count">
                            <i class="ri-git-branch-line"></i> {{ (parent.children || []).length }} subcategories
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="cat-actions">
                      <button class="cat-action-btn cat-btn-add" title="Add Subcategory"
                        @click="addSubcategoryFor(parent)">
                        <i class="ri-add-line"></i>
                      </button>
                      <button class="cat-action-btn cat-btn-edit" title="Edit" @click="editCategory(parent)">
                        <i class="ri-pencil-line"></i>
                      </button>
                      <button class="cat-action-btn cat-btn-delete" title="Delete"
                        @click="confirmDelete(parent)">
                        <i class="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Child Categories -->
                  <div v-if="parent.children && parent.children.length" class="cat-children-list">
                    <div v-for="child in parent.children" :key="child.id" class="cat-child-row"
                      :class="{ 'cat-row-editing': editingId === child.id }">
                      <div class="cat-child-info">
                        <div class="cat-child-connector"></div>
                        <div class="cat-icon-wrap child-icon">
                          <i class="ri-file-list-3-line"></i>
                        </div>
                        <div class="cat-details">
                          <span class="cat-name cat-child-name" @click="editCategory(child)">{{ child.name }}</span>
                          <span class="cat-slug"><i class="ri-link"></i> {{ child.slug || '—' }}</span>
                        </div>
                      </div>
                      <div class="cat-actions">
                        <button class="cat-action-btn cat-btn-edit" title="Edit" @click="editCategory(child)">
                          <i class="ri-pencil-line"></i>
                        </button>
                        <button class="cat-action-btn cat-btn-delete" title="Delete"
                          @click="confirmDelete(child)">
                          <i class="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- No children placeholder -->
                  <div v-else class="cat-no-children">
                    <span>No subcategories</span>
                    <a href="#" @click.prevent="addSubcategoryFor(parent)">+ Add one</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="cat-modal-overlay" @click.self="showDeleteModal = false">
        <div class="cat-modal">
          <div class="cat-modal-header">
            <i class="ri-error-warning-line cat-modal-warn-icon"></i>
            <h4>Delete Category</h4>
          </div>
          <div class="cat-modal-body">
            <p>Are you sure you want to delete <strong>"{{ deleteTarget?.name }}"</strong>?</p>
            <div v-if="deleteTarget?.children?.length" class="cat-modal-warning">
              <i class="ri-alert-line"></i>
              <span>This category contains <strong>{{ deleteTarget.children.length }}</strong> subcategories.
                All child categories will also be deleted.</span>
            </div>
          </div>
          <div class="cat-modal-footer">
            <button class="cr-btn-secondary" @click="showDeleteModal = false">Cancel</button>
            <button class="cat-btn-danger" @click="handleDelete" :disabled="deleting">
              <i :class="deleting ? 'ri-loader-4-line spin' : 'ri-delete-bin-line'"></i>
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <transition name="toast-fade">
        <div v-if="toast.show" class="cat-toast" :class="'cat-toast-' + toast.type">
          <i :class="toast.type === 'success' ? 'ri-check-double-line' : 'ri-close-circle-line'"></i>
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import categoryService from '@/services/categoryService';

export default {
  name: "CategoryManagement",
  data() {
    return {
      categories: [],
      loading: false,
      submitting: false,
      deleting: false,
      isEditing: false,
      editingId: null,
      showDeleteModal: false,
      deleteTarget: null,
      form: {
        name: '',
        slug: '',
        parent_id: null,
        description: ''
      },
      toast: { show: false, message: '', type: 'success' }
    };
  },
  computed: {
    parentCategories() {
      // When editing a parent, exclude it from dropdown to prevent self-referencing
      return this.categories.filter(c => !c.parent_id && c.id !== this.editingId);
    },
    totalCount() {
      let count = this.categories.length;
      this.categories.forEach(c => { count += (c.children || []).length; });
      return count;
    }
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const res = await categoryService.getCategories();
        // Support both flat and nested API responses
        const data = res.data?.data || res.data || [];
        if (data.length && data[0].children !== undefined) {
          this.categories = data;
        } else {
          // Build hierarchy from flat list
          const parents = data.filter(c => !c.parent_id);
          const children = data.filter(c => c.parent_id);
          this.categories = parents.map(p => ({
            ...p,
            children: children.filter(ch => ch.parent_id === p.id)
          }));
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
        this.showToast('Failed to load categories', 'error');
      } finally {
        this.loading = false;
      }
    },

    generateSlug() {
      if (!this.isEditing || !this.form.slug) {
        this.form.slug = this.form.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/-+/g, '-');
      }
    },

    resetForm() {
      this.form = { name: '', slug: '', parent_id: null, description: '' };
      this.isEditing = false;
      this.editingId = null;
    },

    editCategory(cat) {
      this.isEditing = true;
      this.editingId = cat.id;
      this.form = {
        name: cat.name || '',
        slug: cat.slug || '',
        parent_id: cat.parent_id || null,
        description: cat.description || ''
      };
      // Scroll form into view on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    addSubcategoryFor(parent) {
      this.resetForm();
      this.form.parent_id = parent.id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async handleSubmit() {
      if (!this.form.name.trim()) {
        this.showToast('Category name is required', 'error');
        return;
      }
      this.submitting = true;
      try {
        const payload = { ...this.form };
        if (this.isEditing) {
          await categoryService.updateCategory(this.editingId, payload);
          this.showToast('Category updated successfully!', 'success');
        } else {
          await categoryService.createCategory(payload);
          this.showToast('Category created successfully!', 'success');
        }
        this.resetForm();
        await this.fetchCategories();
      } catch (err) {
        const msg = err.response?.data?.message || 'Operation failed';
        this.showToast(msg, 'error');
      } finally {
        this.submitting = false;
      }
    },

    confirmDelete(cat) {
      this.deleteTarget = cat;
      this.showDeleteModal = true;
    },

    async handleDelete() {
      if (!this.deleteTarget) return;
      this.deleting = true;
      try {
        const hasChildren = this.deleteTarget.children?.length > 0;
        await categoryService.deleteCategory(this.deleteTarget.id, hasChildren);
        this.showToast(`"${this.deleteTarget.name}" deleted successfully`, 'success');
        this.showDeleteModal = false;
        this.deleteTarget = null;
        if (this.editingId === this.deleteTarget?.id) this.resetForm();
        await this.fetchCategories();
      } catch (err) {
        const msg = err.response?.data?.message || 'Delete failed';
        this.showToast(msg, 'error');
      } finally {
        this.deleting = false;
      }
    },

    showToast(message, type = 'success') {
      this.toast = { show: true, message, type };
      setTimeout(() => { this.toast.show = false; }, 3500);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
/* ========== FORM CARD ========== */
.cat-form-card { border: none; border-radius: 16px !important; box-shadow: 0 4px 24px rgba(100,100,140,0.08); }
.cat-form-title { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; color: #2d3748; margin-bottom: 4px; }
.cat-form-title i { font-size: 20px; color: #5c6bc0; }
.cat-form-subtitle { font-size: 13px; color: #718096; margin-bottom: 16px; }
.cat-cancel-edit { color: #e53e3e; margin-left: 8px; font-size: 12px; text-decoration: underline; }
.required { color: #e53e3e; }
.form-hint { display: block; font-size: 11px; color: #a0aec0; margin-top: 4px; }

.cat-form-actions { margin-top: 8px; }
.cr-btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border: none; border-radius: 10px; background: linear-gradient(135deg, #5c6bc0 0%, #7c4dff 100%); color: #fff; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.25s; }
.cr-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(92,107,192,0.35); }
.cr-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.cr-btn-secondary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #fff; color: #64748b; font-weight: 600; font-size: 14px; cursor: pointer; margin-left: 10px; transition: all 0.2s; }
.cr-btn-secondary:hover { border-color: #cbd5e1; background: #f8fafc; }

/* ========== CATEGORY LIST ========== */
.cat-list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 2px solid #f1f5f9; }
.cat-list-header h4 { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; color: #2d3748; margin: 0; }
.cat-list-header h4 i { color: #5c6bc0; }
.cat-total-badge { background: linear-gradient(135deg, #5c6bc0, #7c4dff); color: #fff; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 20px; }

/* Parent Block */
.cat-parent-block { margin-bottom: 6px; border-radius: 14px; overflow: hidden; border: 1.5px solid #edf2f7; transition: border-color 0.2s, box-shadow 0.2s; background: #fff; }
.cat-parent-block:hover { border-color: #c7d2fe; box-shadow: 0 2px 12px rgba(92,107,192,0.08); }

.cat-parent-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: linear-gradient(135deg, #fafbff 0%, #f5f7ff 100%); transition: background 0.2s; }
.cat-parent-row.cat-row-editing { background: linear-gradient(135deg, #eef2ff 0%, #e8eaff 100%); border-left: 3px solid #5c6bc0; }

.cat-parent-info { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }
.cat-icon-wrap { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.parent-icon { background: linear-gradient(135deg, #5c6bc0, #7c4dff); color: #fff; }
.child-icon { background: #edf2f7; color: #5c6bc0; width: 32px; height: 32px; border-radius: 8px; font-size: 15px; }

.cat-details { min-width: 0; }
.cat-name { font-size: 15px; font-weight: 600; color: #2d3748; cursor: pointer; transition: color 0.2s; margin: 0; }
.cat-name:hover { color: #5c6bc0; }
.cat-child-name { font-size: 14px; font-weight: 500; }
.cat-meta { display: flex; gap: 16px; margin-top: 3px; flex-wrap: wrap; }
.cat-meta span { font-size: 12px; color: #94a3b8; display: inline-flex; align-items: center; gap: 4px; }
.cat-slug { font-size: 11px !important; color: #a0aec0 !important; display: inline-flex; align-items: center; gap: 3px; }

/* Actions */
.cat-actions { display: flex; gap: 6px; flex-shrink: 0; }
.cat-action-btn { width: 34px; height: 34px; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all 0.2s; }
.cat-btn-add { background: #e8f5e9; color: #2e7d32; }
.cat-btn-add:hover { background: #c8e6c9; transform: scale(1.08); }
.cat-btn-edit { background: #e3f2fd; color: #1565c0; }
.cat-btn-edit:hover { background: #bbdefb; transform: scale(1.08); }
.cat-btn-delete { background: #fce4ec; color: #c62828; }
.cat-btn-delete:hover { background: #f8bbd0; transform: scale(1.08); }

/* Children */
.cat-children-list { padding: 0 18px 10px 18px; }
.cat-child-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; margin-left: 20px; border-left: 2px solid #e2e8f0; transition: all 0.2s; position: relative; }
.cat-child-row:hover { background: #f8fafc; border-radius: 0 10px 10px 0; }
.cat-child-row.cat-row-editing { background: #eef2ff; border-left-color: #5c6bc0; }
.cat-child-info { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.cat-child-connector { width: 16px; height: 2px; background: #e2e8f0; flex-shrink: 0; }

.cat-no-children { padding: 8px 18px 14px 54px; font-size: 13px; color: #b0bec5; display: flex; align-items: center; gap: 10px; }
.cat-no-children a { color: #5c6bc0; text-decoration: none; font-weight: 500; font-size: 12px; }
.cat-no-children a:hover { text-decoration: underline; }

/* ========== STATES ========== */
.cat-loading { text-align: center; padding: 60px 20px; }
.cat-loading-spinner { width: 40px; height: 40px; border: 3px solid #edf2f7; border-top-color: #5c6bc0; border-radius: 50%; animation: cat-spin 0.8s linear infinite; margin: 0 auto 16px; }
@keyframes cat-spin { to { transform: rotate(360deg); } }
.cat-loading p { color: #94a3b8; font-size: 14px; }

.cat-empty { text-align: center; padding: 60px 20px; }
.cat-empty i { font-size: 48px; color: #cbd5e1; margin-bottom: 12px; display: block; }
.cat-empty h4 { color: #64748b; font-size: 18px; margin-bottom: 6px; }
.cat-empty p { color: #94a3b8; font-size: 14px; }

/* ========== MODAL ========== */
.cat-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15,23,42,0.5); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: cat-fade-in 0.2s; }
@keyframes cat-fade-in { from { opacity: 0; } to { opacity: 1; } }
.cat-modal { background: #fff; border-radius: 18px; padding: 28px; width: 440px; max-width: 92vw; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: cat-slide-up 0.25s ease-out; }
@keyframes cat-slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.cat-modal-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.cat-modal-warn-icon { font-size: 28px; color: #f59e0b; }
.cat-modal-header h4 { margin: 0; font-size: 18px; font-weight: 700; color: #1e293b; }
.cat-modal-body p { color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 12px; }
.cat-modal-warning { display: flex; align-items: flex-start; gap: 10px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 10px; padding: 12px; font-size: 13px; color: #92400e; }
.cat-modal-warning i { font-size: 18px; color: #f59e0b; flex-shrink: 0; margin-top: 1px; }
.cat-modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.cat-btn-danger { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; border: none; border-radius: 10px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #fff; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
.cat-btn-danger:hover { box-shadow: 0 4px 16px rgba(239,68,68,0.35); }
.cat-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

/* ========== TOAST ========== */
.cat-toast { position: fixed; bottom: 24px; right: 24px; z-index: 10000; display: flex; align-items: center; gap: 10px; padding: 14px 24px; border-radius: 12px; font-size: 14px; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.12); animation: cat-toast-in 0.3s ease-out; }
.cat-toast-success { background: #065f46; color: #fff; }
.cat-toast-error { background: #991b1b; color: #fff; }
@keyframes cat-toast-in { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.toast-fade-leave-active { transition: all 0.3s; }
.toast-fade-leave-to { transform: translateX(40px); opacity: 0; }

/* ========== SPINNER ========== */
.spin { animation: cat-spin 1s linear infinite; }

/* ========== RESPONSIVE ========== */
@media (max-width: 1199px) {
  .cat-parent-row { flex-wrap: wrap; gap: 10px; }
  .cat-actions { width: 100%; justify-content: flex-end; }
}
</style>
