import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request Interceptor: Thêm Token vào Header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
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
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      // redirect to login if needed
    }

    return Promise.reject(error)
  }
)

export default api
