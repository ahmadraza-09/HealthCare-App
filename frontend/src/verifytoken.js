import axios from "axios";

export const verifyToken = async () => {
    const API_URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem("token");

    if (!token) {
        return { valid: false, user: null };
    }

    try {
        const res = await axios.post(
            `${API_URL}/auth/verifytoken`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (res.data.valid) {
            return {
                valid: true,
                user: res.data.user, // { id, name, role }
            };

        } else {
            localStorage.removeItem("token");
            return { valid: false, user: null };
        }
    } catch (error) {
        localStorage.removeItem("token");
        return { valid: false, user: null };
    }
};
