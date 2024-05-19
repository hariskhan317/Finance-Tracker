import React from 'react'

const Table = () => {
    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr className='bg-gray-200'>
                    <th className='py-2 px-4'>Song</th>
                    <th className='py-2 px-4'>Artist</th>
                    <th className='py-2 px-4'>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='py-2 px-4'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className='py-2 px-4'>Malcolm Lockyer</td>
                    <td className='py-2 px-4'>1961</td>
                </tr> 
            </tbody>
        </table>
    )
}

export default Table
