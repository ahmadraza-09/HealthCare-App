import { createContext, useState, useEffect, useContext } from "react";
import { verifyToken } from "../verifytoken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);
    const checkAuth = async () => {
        const { valid, user } = await verifyToken();
        setIsLoggedIn(valid);
        setUser(user);
    };
    useEffect(() => {

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
