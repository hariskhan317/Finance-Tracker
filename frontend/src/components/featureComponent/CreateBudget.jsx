import React from 'react'
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateBudget = () => {
    const validationSchema = Yup.object({
        budgetName: Yup.string().required('Budget Name is Required').min(4, 'Budget Name must be at least 4 characters long'),
        budgetAmount: Yup.number().required('Budget Amount is Required'),
    })

    const finance = useFinance();
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 128); // 0 to 127
        const g = Math.floor(Math.random() * 128); // 0 to 127
        const b = Math.floor(Math.random() * 128); // 0 to 127
        return `${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    const handleSubmit = async(values) => {
        const { budgetName, budgetAmount } = values;
        const color = generateRandomColor();
        try {
            const data = await finance.addBudget(budgetName, budgetAmount, color);
        if (data.status === 200) {
            finance.refreshList(); 
            event.currentTarget.reset(); // Clear the form inputs
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
                <Formik
                     initialValues={{
                        budgetName: '',
                        budgetAmount: '', 
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit} className='mt-5'>
                    <Form>
                        <div className="w-full mt-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Budget Name</label>
                            <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="budgetName" type="text" placeholder="Budget Name" />
                            <ErrorMessage name="budgetName" component="div" className="text-red-600 font-semibold" />
                        </div>
                        <div className="w-full mt-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2">Amount</label>
                            <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="budgetAmount" type="number" placeholder="Amount" />
                            <ErrorMessage name="budgetAmount" component="div" className="text-red-600 font-semibold" />
                        </div>
                        <div className='flex justify-start mt-5'>
                            <button type="submit" className='py-2 w-40 rounded font-medium bg-black text-white'>Create Budget</button>
                        </div>
                    </Form>
                </Formik> 
            </div>
        </div>
    )
}

export default CreateBudget
