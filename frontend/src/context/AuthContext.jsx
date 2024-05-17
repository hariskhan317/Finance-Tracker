import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { userApiSignup, userApiLogin, checkAuthStatus } from '../helper/apiCommunicator'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false);
    const [isUser, setIsUser] = useState('');
    
    useEffect(() => {
        const handleAuthStatus = async() => {
            const data = await checkAuthStatus();
            console.log('handleAuthStatus', data);
            if (data) {
                
            }
        }
        handleAuthStatus();
    },[])
  
    const signup = async(name, email, password) => {
        try {
            const data = await userApiSignup(name, email, password);
            setIsLogin(true)
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
    
    const value = {
        login,
        signup,
        islogin,
        isUser
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>  )
}
 
export const useAuth = () => useContext(AuthContext);