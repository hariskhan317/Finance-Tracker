import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    const finance = useFinance();

    const handleDelete = async (recordId) => { 
        try {
            const data = await finance.deleteRecord(recordId);   
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
                <tr className='bg-gray-200'> 
                    <th className='py-2 px-4'>Description</th>
                    <th className='py-2 px-4'>Category</th>
                    <th className='py-2 px-4'>Payment Method</th>
                    <th className='py-2 px-4'>Amount</th>
                    <th className='py-2 px-4'>Date</th>
                    <th className='py-2 px-4'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {finance.records.length > 0 ?
                    (finance?.records.map((record) => (
                        <tr key={record._id}>
                            <td className='py-2 px-4'>{record.description}</td>
                            <td className='py-2 px-4'>{record.category}</td>
                            <td className='py-2 px-4'>{record.paymentMethod}</td>
                            <td className='py-2 px-4'>${record.amount}</td>
                            <td className='py-2 px-4'>{record.date}</td>
                            <td className='py-2 px-4'>
                                <button onClick={() => handleDelete(record._id)} className='bg-red-700 px-3 py-1 text-white rounded text-sm font-medium'>Delete</button>
                            </td>
                        </tr>
                    ))) : ( <p className='font-medium p-5'>No Data to show</p> )}
            </tbody>
        </table>
    )
}

export default Table
