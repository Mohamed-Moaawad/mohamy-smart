import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown): string => {
    if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        if (typeof apiMessage === 'string') return apiMessage;
        return error.message;
    } else {
        return 'An unexpected error occurred.';
    };
};

export default axiosErrorHandler;