import React from 'react'

const BudgetList = ({budget}) => {
  return (
    <div className='bg-gray-100/50 rounded-lg p-3 shadow-lg'> 
        <div className={`p-5 h-full w-full border-2 border-dashed rounded-lg`} style={{ borderColor: `#${budget.color}` }}>
          <div className='flex justify-between'>
            <p style={{ color: `#${budget.color}` }} className='text-lg font-semibold text-center capitalize'>{budget.budgetName}</p>
            <p style={{ color: `#${budget.color}` }} className='text-lg font-semibold text-center'>${budget.amount}</p>
          </div>
          <div className='py-6'>
            <div className='w-full h-3 bg-gray-300/50 rounded-full'>
              <div style={{ background: `#${budget.color}` }} className='w-[60%] h-3 rounded-full'></div>
            </div>
          </div>
          <div className='flex justify-between'>
            <p style={{ color: `#${budget.color}` }} className='text-base font-semibold'>spent</p>
            <p style={{ color: `#${budget.color}` }} className='text-base font-semibold'>remaining</p>
          </div>
        </div>
    </div>
  )
}

export default BudgetList
