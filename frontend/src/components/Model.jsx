import React from 'react'
import { CgCloseO } from "react-icons/cg";
import { useFinance } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Model = ({ setShowModel }) => {
  const finance = useFinance();
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
}
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get("description"); 
    const category = formData.get("category");
    const amount = formData.get("amount");
    const paymentMethod = formData.get("paymentMethod");
    const id = generateRandomId();
    console.log(); 
    try {
      const data = await finance.addRecord(description, amount, category, paymentMethod);
      console.log({data});
      
    } catch (error) {
      console.log(error);
      toast.error('failed');
    }

  }

  return (
    <div className='absolute left-0 right-0 mx-auto border-2 bg-gray-50 h-auto p-5 w-1/2 shadow-lg mx-auto z-20'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Add Expence</h1>
        <button onClick={() => setShowModel(false)} className='absolute right-5'> 
          <CgCloseO className='text-3xl font-bold' />
        </button>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-5 mt-10'>
          {/* Description */}
          <div className="w-full mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2"> Description </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="description" type="text" placeholder="Description" />
          </div>
          {/* Category */}
          <div className="w-full mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Category</label>
            <div className="relative">
              <select name="category" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Select a Category</option> 
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option> 
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          {/* Amount */}
          <div className="w-full mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2"> Amount </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="amount" type="number" placeholder="Amount" />
          </div>
          {/* Payment Method */}
          <div className="w-full mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Payment Method</label>
            <div className="relative">
              <select name="paymentMethod" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cash">Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className='flex justify-end mt-3'>
          <button type="submit" className='py-2.5 w-40 rounded font-medium bg-indigo-500 text-white'>Add Record</button>
        </div>
      </form>
    </div>
  )
}

export default Model
