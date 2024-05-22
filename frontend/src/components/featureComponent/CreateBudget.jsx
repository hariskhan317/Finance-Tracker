import React from 'react'
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CreateBudget = () => {

    const finance = useFinance();
    const generateRandomColor = () => {
      return  Math.floor(Math.random()*16777215).toString(16);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const budgetName = formData.get("budgetName"); 
        const amount = formData.get("amount");  
        const color = generateRandomColor();
  
        // const id = generateRandomId();
        // console.log(id, description, amount, category, paymentMethod); 
        try {
        const data = await finance.addBudget(budgetName, amount, color);
        if (data.status === 200) {
            finance.refreshList();
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
                <h1 className='text-xl font-semibold text-center'> Create Budget</h1>
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className="w-full mt-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Budget Name</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="budgetName" type="text" placeholder="Budget Name" />
                    </div>
                    <div className="w-full mt-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Amount</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="amount" type="number" placeholder="Amount" />
                    </div>
                    <div className='flex justify-start mt-5'>
                        <button type="submit" className='py-2 w-40 rounded font-medium bg-black text-white'>Create Budget</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default CreateBudget
