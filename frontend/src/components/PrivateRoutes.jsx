import React from 'react';
import { Outlet, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => { 
    const auth = useAuth();
    const navigate = useNavigate();
    return ( auth.islogin ? <Outlet /> : navigate('/'))
}

export default PrivateRoutes;
