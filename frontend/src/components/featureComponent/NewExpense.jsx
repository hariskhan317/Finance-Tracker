import React from 'react' 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { MdOutlineAttachMoney } from "react-icons/md";

const NewExpense = ({ finance }) => { 
    const handleSubmit = async (event) => { 
        event.preventDefault();
        const formData = new FormData(event.currentTarget); 
        const expenseName = formData.get("expenseName");
        const budgetName = formData.get("budgetName");
        const expenseAmount = formData.get("expenseAmount");
        const now = new Date();
        const date = now.toLocaleDateString();   
        const activeColor = finance.budgets
        .filter((item) => item.budgetName === budgetName)
            .map((item) => item.color);
        const color = activeColor[0];
   
        try {
        const data = await finance.addExpense(expenseName, budgetName, expenseAmount, date, color);
        if (data.status === 200) { 
            return toast.success('Successfully Added!');
        } 
        return toast.error('Cant Add');
        } catch (error) {
        console.log(error);
        }
  
    }
    return (
        <div className='bg-gray-100/50 rounded-lg p-3 shadow-lg'>
            <div className='p-5 h-full w-full border-2 border-dashed border-gray-400/50 rounded-lg'>
                <h1 className='text-xl font-semibold text-center'> Add New Expense</h1>
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className="w-full mt-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Expense Name</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="expenseName" type="text" placeholder="Expense Name" />
                        </div>
                        <div className="w-full mt-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2"> Amount </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="expenseAmount" type="number" placeholder="Amount" />
                        </div>
                    </div>
                    <div className="w-full mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Budget Category</label>
                        <div className="relative">
                            <select name="budgetName" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="" label="Select Budget Category" />
                                {finance?.budgets?.map((budget) => (
                                    <option key={budget._id} value={budget.budgetName}>{budget.budgetName}</option>                                    
                                ))}
                            </select> 
                            <div className="pointer-events-n one absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start mt-5'>
                        <button type="submit" className='flex justify-center gap-2 py-2 px-4 w-auto rounded font-medium bg-black text-white'>
                            <MdOutlineAttachMoney className='mt-0.5 text-lg' />
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewExpense
