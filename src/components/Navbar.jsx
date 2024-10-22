import React from 'react'
import { MdContacts } from "react-icons/md";
function Navbar() {
  return (
    <div className='h-[20%]  p-3 flex justify-center bg-white items-center border-b-2 border-yellow-400 rounded-xl mx-2 mt-2  '  >
        <MdContacts  className='text-2xl' />
        <h1 className='font-bold text-2xl ml-3'>Contact App </h1>
    </div>
  )
}

export default Navbar