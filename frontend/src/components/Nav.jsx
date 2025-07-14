import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from '../assets/dp.webp';

const Nav = () => {
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-[#000000] z-[100]'>

        <div className='text-white w-[25px] h-[25px]'><GoHomeFill /></div>
        <div className='text-white w-[25px] h-[25px]'><FaSearch /></div>
        <div className='text-white w-[25px] h-[25px]'><FiPlusSquare /></div>
        <div className='text-white w-[25px] h-[25px]'><RxVideo /></div>
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
            <img src={dp} alt='' className='w-full object-cover' />
        </div>

    </div>
  )
}

export default Nav