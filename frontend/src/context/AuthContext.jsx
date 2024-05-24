import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { userApiSignup, userApiLogin, checkAuthStatus, userLogout } from '../helper/apiCommunicator'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false); 
    const [ isUser, setIsUser ] = useState({});
    
    useEffect(() => {
        const handleAuthStatus = async() => {
            const data = await checkAuthStatus(); 
            if (data) {
                setIsLogin(true); 
                setIsUser({ name: data.name, email: data.email });
            }
        }
        handleAuthStatus();
    },[islogin])
  
    const signup = async(name, email, password) => {
        try {
            const data = await userApiSignup(name, email, password);
            if (data.status === 200) {
                setIsLogin(true)
              } 
            return data;
        } catch (error) {
            console.log(error)
        } 
    }

    const login = async(email, password) => {
        try {
            const data = await userApiLogin(email, password);
            setIsLogin(true)
            return data;
        } catch (error) {
            console.log(error)
        } 
    }

    const logout = async() => {
        const data = await userLogout(); 
        setIsLogin(false);
        setIsUser(null);
        window.location.href = '/';
        return data;
    }
    
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