import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    const finance = useFinance();

    const handleDelete = async (expenseId) => { 
        console.log(expenseId)
        try {
            const data = await finance.deleteExpense(expenseId);   
            if (data.status === 200) {
                finance.refreshList();
                return toast.success('Successfully Deleted!');
            } 
            return toast.error("Can't Delete!");
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr className=''> 
                    <th className='py-2 px-4 uppercase'>expense name</th>
                    <th className='py-2 px-4 uppercase'>Amount</th>
                    <th className='py-2 px-4 uppercase'>category</th>
                    <th className='py-2 px-4 uppercase'>Date</th>
                    <th className='py-2 px-4 uppercase'>
                        <span className='px-3 py-2 max-w-auto'>delete</span> 
                    </th>
                </tr>
            </thead>
            <tbody>
                {finance?.expenses?.length > 0 ?
                    (finance?.expenses?.map((expense, index) => (
                        <tr className={` ${index % 2 === 0 ? 'bg-gray-200/75' : ''}`} key={expense._id}>
                            <td className='py-2 pl-7 capitalize'>
                                <p>{expense.expenseName}</p>
                            </td> 
                            <td className='py-2 pl-7'>
                                <p>${expense.expenseAmount}</p>
                            </td>
                            <td className='pl-7'>
                                <span className='py-2 px-5 text-white rounded capitalize' style={{ background: `#${expense.color}` }}>
                                    {expense.budgetName}
                                </span>
                            </td>
                            <td className='py-2 pl-7'>{expense.date}</td>
                            <td className='py-2 pl-7'>
                                <button onClick={() => handleDelete(expense._id)} className='bg-red-700 px-3 py-1 text-white rounded text-sm font-medium'>Delete</button>
                            </td>
                        </tr>
                    ))) : ( <p className='font-medium p-5'>No Data to show</p> )}
            </tbody>
        </table>
    )
}

export default Table
