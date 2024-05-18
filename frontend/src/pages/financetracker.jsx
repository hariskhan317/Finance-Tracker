import React from 'react'
import { useAuth } from '../context/AuthContext'

const FinanceTracker = () => {
  const {isUser} = useAuth();
  return (
    <div className='p-40'>
     Heydsad {isUser.name}
    </div>
  )
}

export default FinanceTracker
