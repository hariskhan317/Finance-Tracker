import React from 'react';
import { useAuth } from '../../context/AuthContext' 


const Header = () => {
  const auth = useAuth(); 
  const handleLogout = () => {
    auth.logout();  
  }
  return (
    <div className='h-14 w-full flex justify-between py-3 px-6'>
        <div>
            <h1 className='text-black font-semibold text-3xl tracking-wider '>SpendeX</h1>
      </div>
      {auth.islogin && (
        <div className='text-black font-medium gap-10 flex'> 
          <button onClick={handleLogout}>Logout</button>
        </div>  
      )}
    </div>
  )
}

export default Header
