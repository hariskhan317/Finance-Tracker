import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = ({children}) => { 
    const auth = useAuth();
    const navigate = useNavigate();
    console.log({auth})
    useEffect(() => {
        // Check if user is logged in
        if (!auth.isUser) {
            // If not logged in, navigate to the login page
            return navigate('/');
        }
    }, [auth.isUser, navigate]);

    // Render the outlet if logged in, otherwise, navigation will happen automatically
    return auth.isUser ? children : navigate('/');
}

export default PrivateRoutes;
