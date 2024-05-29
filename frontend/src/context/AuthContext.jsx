import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'; 
import { userApiSignup, userApiLogin, checkAuthStatus, userLogout } from '../helper/apiCommunicator'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false); 
    const [isUser, setIsUser] = useState(null);

    const handleAuthStatus = async () => {
        try {
            const data = await checkAuthStatus();
            if (data) {
                setIsLogin(true);
                setIsUser({ name: data.name, email: data.email });
            }  
        } catch (error) {
            console.error("Error checking auth status:", error);
        }
    }
  
    const signup = async (name, email, password) => {
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
    } 

    const login = async (email, password) => {
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
    }

    const logout = async() => {
        await userLogout();  
        setIsLogin(false);
        setIsUser(null); 
        window.location.href = '/';
    }

    useEffect(() => {
        if (islogin && isUser) {
            handleAuthStatus();
        }
       
    }, [islogin, isUser])

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