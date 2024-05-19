import React from 'react'
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const data = await auth.signup(name, email, password);
      if (data.status === 200) {
        toast.success('Sucessfull Signup');
        navigate('/financetracker');
      } else {
        return toast.error('Signup failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Signup failed');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="name" 
            required
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900"> Email address</label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* Password */}
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900"> Password  </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password" 
            required
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div> 
      {/* Forgot password? */}
      <div className="flex items-center justify-end">
          <div className="text-sm leading-6">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
              </a>
          </div>
      </div> 
      <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Sign in
      </button>
    </form>
  )
}

export default Signup;
