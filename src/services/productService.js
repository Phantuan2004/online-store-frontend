import api from './api'

export const productService = {
  /**
   * Get paginated products
   * @param {number} page 
   * @returns {Promise}
   */
  getProducts(page = 1) {
    return api.get(`/products?page=${page}`)
  },

  /**
   * Get all categories
   * @returns {Promise}
   */
  getCategories() {
    return api.get('/categories')
  },

  /**
   * Get product detail by ID
   * @param {number|string} id 
   * @returns {Promise}
   */
  getProductById(id) {
    return api.get(`/products/${id}`)
  }
}

export default productService
