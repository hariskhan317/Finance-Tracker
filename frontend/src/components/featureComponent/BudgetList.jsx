import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ProgressBar from '@ramonak/react-progress-bar';
import '../../assets/style.css'
import { MdDeleteForever } from "react-icons/md";

const BudgetList = ({ budget }) => {
  const finance = useFinance();
  const [isComplete, setIsCompleted] = useState(false)

  useEffect(() => {
    setIsCompleted(budget.budgetAmount === budget.expenseAmount)
  }, [budget])
  const handleDelete = async(budgetId) => {
    try {
      const data = await finance.deleteBudget(budgetId);   
      if (data.status === 200) {
          finance.refreshList();
          return toast.success('Successfully Deleted!');
        } 
    } catch (error) {
        console.log(error);
        return toast.error(`Can't Delete!: ${error}`);
    }
  }

  return (
    <div className='relative animate-card rounded-lg p-3 shadow-lg transition-all delay-0 ease-in-out'>
      {console.log({budget})}
      <div className={isComplete ? 'isCompleteCover' : 'coverBg'}></div>
      <button onClick={() => handleDelete(budget._id)} className='delete-btn absolute w-full mt-10'>
        <MdDeleteForever className='mx-auto text-center text-white' size={50} />
      </button>
      <div className={`p-5 h-full w-full border-2 border-dashed rounded-lg`} style={{ borderColor: `#${budget.color}` }}>
        <div className='flex justify-between'>
          <p style={{ color: `#${budget.color}` }} className='text-lg font-semibold text-center capitalize'>
            {budget.budgetName}
          </p>
          <p style={{ color: `#${budget.color}` }} className='text-lg font-semibold text-center'>
            ${budget.budgetAmount}
          </p>
        </div>
        <div className='py-4'>
          <ProgressBar
            completed={(budget.expenseAmount / budget.budgetAmount) * 100}
            bgColor={'#' + budget.color}
            baseBgColor='#e0e0de'
            height='18px'
            width='100%'
            labelColor='white'
            labelSize='0'
            labelAlignment='center'
          />
        </div>
        <div className='flex justify-between'>
          <p style={{ color: `#${budget.color}` }} className='text-sm font-medium'>
            spent ...${budget.expenseAmount}
          </p>
          <p style={{ color: `#${budget.color}` }} className='text-sm font-medium'>
            remaining ...${budget.budgetAmount - budget.expenseAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BudgetList
