import React from 'react'
import { CgCloseO } from "react-icons/cg";

const Model = ({setShowModel}) => {
  return (
    <div className='absolute left-0 right-0 mx-auto border-2 bg-gray-50 h-auto p-5 w-1/2 shadow-lg mx-auto z-20'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Finance Model</h1>
        <button onClick={() => setShowModel(false)} className='absolute right-5'> 
          <CgCloseO className='text-3xl font-bold' />
        </button>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-10'>
        {/* Description */}
        <div class="w-full mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2"> Description </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="" type="text" placeholder="Description" />
        </div>
        {/* Category */}
        <div class="w-full mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Select a Category</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        {/* Amount */}
        <div class="w-full mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-sm font-semibold mb-2"> Amount </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="" type="text" placeholder="Amount" />
        </div>
        {/* Payment Method */}
        <div class="w-full mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Payment Method</label>
          <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Payment Method</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-3'>
        <button className='py-2.5 w-40 rounded font-medium bg-indigo-500 text-white'>Add Record</button>
      </div>
    </div>
  )
}

export default Model
