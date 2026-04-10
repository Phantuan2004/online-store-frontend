import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(null);
    const user = ref(null);
    const isAuthReady = ref(false);

    const setToken = (token) => {
        accessToken.value = token;
    };

    const clearToken = () => {
        accessToken.value = null;
    };

    const setUser = (userData) => {
        user.value = userData;
    };

    const clearUser = () => {
        user.value = null;
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
                user.value = data;
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
                accessToken.value = data.access_token;
                user.value = data.user;
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
