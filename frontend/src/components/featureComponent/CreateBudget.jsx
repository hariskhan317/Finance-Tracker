import React from 'react'
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { BiCalculator } from "react-icons/bi"; 

const CreateBudget = () => {
    const finance = useFinance();
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 128); // 0 to 127
        const g = Math.floor(Math.random() * 128); // 0 to 127
        const b = Math.floor(Math.random() * 128); // 0 to 127
        return `${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); 
        const budgetName = formData.get("budgetName");
        const budgetAmount = formData.get("budgetAmount");  
        const color = generateRandomColor();
        try {
            const data = await finance.addBudget(budgetName, budgetAmount, color);
        if (data.status === 200) { 
            return toast.success(`Successfully Added ${budgetName}!`);
        } 
        return toast.error('Cant Add');
        } catch (error) {
            console.log(error);
        }
  
    }
    return (
        <div className='bg-gray-100/50 rounded-lg p-3 shadow-lg'>
            <div className='p-5 h-full w-full border-2 border-dashed border-gray-400/50 rounded-lg'>
                <h1 className='text-xl font-semibold text-center'> Create Budget</h1>
                <form onSubmit={handleSubmit} className='mt-5'> 
                    <div className="w-full mt-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Budget Name</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="budgetName" type="text" placeholder="Budget Name" />
                    </div>
                    <div className="w-full mt-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Amount</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="budgetAmount" type="number" placeholder="Amount" />
                    </div>
                    <div className='flex justify-start mt-5'>
                        <button type="submit" className='flex justify-center gap-2 py-2 px-4 w-auto rounded font-medium bg-black text-white'>
                            <BiCalculator className='mt-0.5 text-lg' />
                            Create Budget
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBudget
