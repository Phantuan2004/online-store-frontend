import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    // Khôi phục token từ localStorage khi khởi tạo store
    const accessToken = ref(localStorage.getItem('access_token') || null);
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const isAuthReady = ref(false);

    const setToken = (token) => {
        accessToken.value = token;
        if (token) {
            localStorage.setItem('access_token', token);
        } else {
            localStorage.removeItem('access_token');
        }
    };

    const clearToken = () => {
        accessToken.value = null;
        localStorage.removeItem('access_token');
    };

    const setUser = (userData) => {
        user.value = userData;
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    const clearUser = () => {
        user.value = null;
        localStorage.removeItem('user');
    };

    const fetchUser = async () => {
        if (!accessToken.value) return false;

        try {
            const response = await fetch('http://localhost:8000/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken.value}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                return true;
            } else {
                // Token may be invalid
                return false;
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return false;
        }
    };

    const refreshToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/refresh', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'include' // Important for sending the HttpOnly cookie
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.access_token);
                setUser(data.user);
                return true;
            }
        } catch (error) {
            console.error('Silent refresh failed:', error);
        }

        return false;
    };

    const checkAuthStatus = async () => {
        // Try to fetch user with current token
        let isValid = await fetchUser();

        // If no token or invalid, try to refresh
        if (!isValid) {
            isValid = await refreshToken();
        }

        // Nếu vẫn không hợp lệ, xóa dữ liệu cũ
        if (!isValid) {
            clearToken();
            clearUser();
        }

        isAuthReady.value = true;
        return isValid;
    };

    return {
        accessToken,
        user,
        isAuthReady,
        setToken,
        clearToken,
        setUser,
        clearUser,
        fetchUser,
        refreshToken,
        checkAuthStatus
    };
});
