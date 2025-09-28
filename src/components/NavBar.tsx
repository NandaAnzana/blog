import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex flex-row px-10 py-5 md:px-40 md:py-10 justify-between sticky top-0">
      <Link className="relative w-fit h-fit cursor-pointer" href="/">
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-gray-900 border-4 border-black rounded-xl"></div>

        <div className="relative w-full h-full py-4 px-6 transition-transform duration-200 bg-yellow-300 border-4 border-black rounded-xl hover:-translate-x-1 hover:-translate-y-1 active:translate-y-1 active:translate-x-1">
          <p className="font-sans text-lg font-bold text-gray-900">Home</p>
        </div>
      </Link>
      <Link className="relative w-fit h-fit cursor-pointer" href="/">
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-gray-900 border-4 border-black rounded-xl"></div>

        <div className="relative w-full h-full py-4 px-6 transition-transform duration-200 bg-green-400 border-4 border-black rounded-xl hover:-translate-x-1 hover:-translate-y-1 active:translate-y-1 active:translate-x-1">
          <p className="font-sans text-lg font-bold text-gray-900">Search</p>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
