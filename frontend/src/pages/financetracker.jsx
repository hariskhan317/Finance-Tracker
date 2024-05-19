import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext'
import Table from '../components/Table'
import Model from '../components/Model'

const FinanceTracker = () => {
  const [showModel, setShowModel] = useState(false);
  const auth = useAuth();

  return (
    <div className='px-20 py-10'>
      <div className='flex pt-4 pb-8 justify-between'>
        <h1 className='text-4xl font-medium'>Welcome {auth.isUser.name}! Here are your Finances</h1>
        <button onClick={()=>setShowModel(true)} className='py-2.5 px-4 rounded font-medium bg-indigo-500 text-white'>Add Expence</button>
      </div>
      <div className='bg-gray-100 p-3 rounded-md shadow-md border'>
        <Table />
      </div>
      {showModel && <Model setShowModel={setShowModel} />}
      
    </div>
  )
}

export default FinanceTracker
