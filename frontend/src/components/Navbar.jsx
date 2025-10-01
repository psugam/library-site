import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='min-h-[15vh] w-[100%] text-white bg-blue-400 flex justify-between align-middle p-5 text-xl'>
      <div className='w-[25%]'>
        <h1 className='text-3xl'>SLIBRARY</h1>
      </div>
      <div className='w-[60%]'>
        <nav className='flex justify-around align-middle'>
          <Link
            to="/home"
            className="relative group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/about" className='relative group'>
          About
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to='/stats' className='relative group'>
          Stats
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to='/addbook' className='relative group'>
          Add Book
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to='/profile' className='relative group'>
          Profile
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to='/' onClick={() => {
            localStorage.removeItem("token");
          }} className='relative group' >
            Logout
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
        </nav>
      </div>

    </div>
  )


}

export default Navbar