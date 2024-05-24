import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
})
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async(values) => {
    const {name, email, password} = values
    try {
      const data = await auth.signup(name, email, password);
      if (data.status === 200) {
        toast.success('Sucessfull Signup');
        return navigate('/financetracker');
      } 
      return toast.error('Signup failed');
    } catch (error) {
      console.log(error);
      toast.error('Signup failed');
    }
  }
  return (
    <Formik
    initialValues={{
      name:'',
      email: '',
      password: '',
  }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
      <Form className="space-y-6 mt-10">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <Field 
              name="name"
              type="name" 
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <ErrorMessage name="name" component="div" className="text-red-600 font-semibold" />
          </div>
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900"> Email address</label>
          <div className="mt-2">
            <Field 
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 font-semibold" />
          </div>
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900"> Password  </label>
          <div className="mt-2">
            <Field 
              name="password"
              type="password" 
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 font-semibold" />
          </div>
        </div> 
        {/* Forgot password?
        <div className="flex items-center justify-end">
            <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
                </a>
            </div>
        </div>  */}
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Sign in
        </button>
      </Form>
    </Formik> 
  )
}

export default Signup;
