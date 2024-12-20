import React from 'react'
import { RiResetLeftLine } from "react-icons/ri";
const FilterBar = () => {
  return (
    <div>
        <div className='w-full space-y-4'>
            <select name="" id="" className='outline-none w-full border border-gray-200 rounded-md p-2'>
                <option value="" disabled selected>Brand</option>
                <option value="">a</option>
                <option value="">a</option>
                <option value="">a</option>
            </select>
            <select name="" id="" className='outline-none w-full border border-gray-200 rounded-md p-2'>
                <option value="" disabled selected>Category</option>
                <option value="">a</option>
                <option value="">a</option>
                <option value="">a</option>
            </select>
            <button className='primaryButton w-full flex items-center justify-center gap-2'>
            <RiResetLeftLine size={20}/>
                Reset Filter
            </button>
        </div>
    </div>
  )
}

export default FilterBar