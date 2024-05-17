import React, { useContext, createContext, useState } from 'react'; 
import { userApiSignup, userApiLogin } from '../helper/apiCommunicator'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ islogin, setIsLogin ] = useState(false);
    const [ isUser, setIsUser ] = useState('');
  
    const signup = async(name, email, password) => {
        try {
            await userApiSignup(name, email, password);
        } catch (error) {
            console.log(error)
        } 
    }

    const login = async(email, password) => {
        try {
            await userApiLogin(email, password);
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