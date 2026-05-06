import api from './api'

export const categoryService = {
  /**
   * Get all categories with children (hierarchical)
   * Backend returns: [{ id, name, slug, parent_id: null, children: [...] }]
   * @returns {Promise}
   */
  getCategories() {
    return api.get('/categories')
  },

  /**
   * Create a new category (parent or child)
   * @param {Object} data - { name, slug, parent_id, description }
   * @returns {Promise}
   */
  createCategory(data) {
    return api.post('/categories', data)
  },

  /**
   * Update an existing category
   * @param {number|string} id 
   * @param {Object} data - { name, slug, parent_id, description }
   * @returns {Promise}
   */
  updateCategory(id, data) {
    return api.put(`/categories/${id}`, data)
  },

  /**
   * Delete a category by ID
   * @param {number|string} id
   * @param {boolean} deleteChildren - if true, also delete child categories
   * @returns {Promise}
   */
  deleteCategory(id, deleteChildren = false) {
    return api.delete(`/categories/${id}`, {
      params: { delete_children: deleteChildren }
    })
  }
}

export default categoryService
