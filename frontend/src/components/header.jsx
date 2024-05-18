import React from 'react';
import { useAuth } from '../context/AuthContext' 


const Header = () => {
  const auth = useAuth(); 
  const handleLogout = () => {
    auth.logout();  
  }
  return (
    <div className='bg-indigo-500 h-14 w-full flex justify-between py-3 px-6'>
        <div>
            <h1 className='text-white font-medium text-2xl'>Finance Tracker</h1>
      </div>
      {auth.islogin && (
                <div className='text-white font-medium gap-10 flex'>
                <button>Dropdown</button>
                <button onClick={handleLogout}>Logout</button>
              </div>  
      )}
    </div>
  )
}

export default Header
