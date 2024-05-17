import React from 'react'

const Header = () => {
  return (
    <div className='bg-indigo-500 h-14 w-full flex justify-between py-3 px-6'>
        <div>
            <h1 className='text-white font-medium text-2xl'>Finance Tracker</h1>
        </div>
        <div>
            <button>Dropdown</button>
        </div>  
    </div>
  )
}

export default Header
