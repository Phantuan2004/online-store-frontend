import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Cờ chống gọi refresh trùng lặp
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

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

// Response Interceptor: Xử lý lỗi tập trung + Auto Refresh Token
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    const status = error.response ? error.response.status : null

    // Nếu 401 và chưa thử refresh cho request này
    if (status === 401 && !originalRequest._retry) {
      // Nếu request bị 401 là chính request refresh → logout luôn
      if (originalRequest.url?.includes('/refresh')) {
        const authStore = useAuthStore()
        authStore.clearToken()
        authStore.clearUser()
        return Promise.reject(error)
      }

      // Nếu đang refresh rồi → xếp hàng chờ
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Thử refresh token (dùng function trong auth store)
        const authStore = useAuthStore()
        const refreshSuccess = await authStore.refreshToken()

        if (refreshSuccess) {
          const newToken = authStore.accessToken
          processQueue(null, newToken)

          // Retry request gốc với token mới
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        } else {
          // Refresh thất bại → logout
          processQueue(new Error('Refresh failed'), null)
          authStore.clearToken()
          authStore.clearUser()
          return Promise.reject(error)
        }
      } catch (refreshError) {
        processQueue(refreshError, null)
        const authStore = useAuthStore()
        authStore.clearToken()
        authStore.clearUser()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
