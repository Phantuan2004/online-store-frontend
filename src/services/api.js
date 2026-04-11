import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request Interceptor: Thêm Token vào Header từ Pinia Store
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      // Hết hạn token hoặc chưa đăng nhập
      const authStore = useAuthStore()
      authStore.clearToken()
      authStore.clearUser()
      
      // Clear localStorage just in case any old logic still uses it
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }

    return Promise.reject(error)
  }
)

export default api
