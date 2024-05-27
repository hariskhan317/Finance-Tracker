import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'; 
import { userApiSignup, userApiLogin, checkAuthStatus, userLogout } from '../helper/apiCommunicator'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false); 
    const [isUser, setIsUser] = useState(null);
  
    const signup = useCallback(async (name, email, password) => {
        try {
            const data = await userApiSignup(name, email, password);
            if (data.status === 200) {
                setIsLogin(true);
                setIsUser({ name: data.name, email: data.email }); 
                return data;
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }, [handleAuthStatus]);

    const login = useCallback(async (email, password) => {
        try {
            const data = await userApiLogin(email, password);
            if (data.status === 200) {
                setIsLogin(true);
                setIsUser({ name: data.name, email: data.email }); 
                return data;
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }, [handleAuthStatus]);

    const logout = async () => {
        try {
            console.log('working')
            const data = await userLogout();
            if (data.status === 200) { 
                setIsLogin(false);
                setIsUser(null);
                return window.location.href = '/';
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const handleAuthStatus = async () => {
        try {
            const data = await checkAuthStatus();
            if (data) {
                setIsLogin(true);
                setIsUser({ name: data.name, email: data.email });
            } 
            setIsLogin(false);
            setIsUser(null);
        } catch (error) {
            console.error("Error checking auth status:", error);
        }
    }

    useEffect(() => {
        handleAuthStatus();
    }, [])

    const authValue = {
        login,
        signup,
        logout,
        islogin,
        isUser, 
    }

    return (<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>  )
}
 
export const useAuth = () => useContext(AuthContext);