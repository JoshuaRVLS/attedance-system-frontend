"use client";

import React from "react";
import Link from "next/link";
import { HiUsers, HiUserPlus } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="z-10 fixed top-0 left-0 right-0 h-16 shadow-lg border border-primary flex items-center p-4 gap-28">
      <div className="flex gap-4 items-center">
        <Image src={"/logo.png"} width={20} height={20} alt="logo" />
        <h1 className="font-bold tracking-wide text-xl font-montserrat">
          Attedance System <sup className="font-extralight">Beta</sup>
        </h1>
      </div>
      <div className="flex gap-4 font-roboto font-light items-center tracking-wide">
        <Link
          className={`flex items-center gap-2 tracking-wider ${
            path === "/dashboard" ? "text-secondary" : ""
          }`}
          href={"/dashboard"}
        >
          <HiUsers size={25} />
          Students
        </Link>
        <Link
          className={`flex items-center gap-2 tracking-wider ${
            path === "/dashboard/new" ? "text-secondary" : ""
          }`}
          href={"/dashboard/new"}
        >
          <HiUserPlus size={25} />
          Add Student
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
