import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'; 
import { userApiSignup, userApiLogin, checkAuthStatus, userLogout } from '../helper/apiCommunicator'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false); 
    const [isUser, setIsUser] = useState(null);
    
    const handleAuthStatus = useCallback(async () => {
        try {
            const data = await checkAuthStatus();
            if (data) {
                setIsLogin(true);
                setIsUser({ name: data.name, email: data.email });
            } else {
                setIsLogin(false);
                setIsUser(null);
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
        }
    }, []);
  
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
                //return window.location.href = '/';
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    useEffect(() => {
        handleAuthStatus();  
    },[])
    
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