import axios from "axios";

export const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return { valid: false, user: null };
    }

    try {
        const res = await axios.post(
            "http://localhost:3050/auth/verifytoken",
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
