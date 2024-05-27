import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = ({children}) => { 
    const auth = useAuth();
    const navigate = useNavigate(); 
 
    return auth.isUser ? children : navigate('/');
}

export default PrivateRoutes;
