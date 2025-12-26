import axios from "axios";

// ---------- Token helpers ----------
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// ------------------ REQUEST INTERCEPTOR -----------------
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
},
    (error) => Promise.reject(error),
);

// ------------------ RESPONSE INTERCEPTOR -----------------
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                removeTokens();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                // طلب تجديد التوكن
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/Auth/refresh-token`,
                    { refreshToken }
                );

                const newToken = res.data.data.accessToken;

                localStorage.setItem('accessToken', newToken);

                api.defaults.headers.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // const newAccessToken = res.data.accessToken;
                // setAccessToken(newAccessToken);
                // // كرر الطلب الأصلي بالتوكن الجديد
                // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                // لو فشل التجديد، اعمل logout أو redirect
                removeTokens()
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default api;