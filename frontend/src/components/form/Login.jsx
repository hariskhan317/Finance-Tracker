import React, {useEffect} from 'react'
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

const login = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); 
        const email = formData.get("email");
        const password = formData.get("password");  
        try {
            const data = await auth.login(email, password);
            if (data.status === 200) {
                return toast.success('Sucessfull Login'); 
            }  
            return toast.error('Login failed');
          } catch (error) {
            console.log(error);
            return toast.error('Signup failed');
          }
    }
    useEffect(() => {
        if (auth?.user) {
          return navigate("/financetracker");
        }
      }, [auth]);
    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            {/* Email */}
            <div >
                <label className="block text-sm font-medium leading-6 text-gray-900"> Email address</label>
                <div className="mt-2">
                    <input
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
                        name="password"
                        type="password" 
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> 
                </div>
            </div>

            {/* Forgot password?
            <div className="flex items-center justify-end">
                <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                    </a>
                </div>
            </div> */}
            
            {/* button */}
            <button type="submit" className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in  </button>
        </form>
    )
}

export default login
