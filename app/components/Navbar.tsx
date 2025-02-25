'use client';

import React from 'react';
import Link from 'next/link';
import { HiUsers, HiUserPlus } from 'react-icons/hi2'
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const Navbar = () => {

  const path = usePathname();

  return (
    <nav className='z-10 fixed top-0 left-0 right-0 h-16 bg-secondary shadow-lg border border-black flex items-center p-4 gap-28'>
      <h1 className='font-light tracking-wide text-xl font-montserrat'>Attedance System<sup>v1.1</sup></h1>
      <div className='flex gap-4 font-roboto font-light items-center tracking-wide'>
        <Link className={`flex items-center gap-2 tracking-wider ${path === '/dashboard' ? 'text-primary' : ''}`} href={'/dashboard'}><HiUsers size={25}/>Students</Link>
        <Link className={`flex items-center gap-2 tracking-wider ${path === '/dashboard/new' ? 'text-primary' : ''}`} href={'/dashboard/new'}><HiUserPlus size={25}/>Add Student</Link>
      </div>
    </nav>
  )
}

export default Navbar;