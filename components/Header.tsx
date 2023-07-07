import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex p-5 justify-between items-center sticky top-0 z-50 bg-white shadow-md">
      {/* left */}
      <div className="flex space-x-2 items-center">
        <Link href="/">
          <Image src="/pencil.png" alt="logo" width={50} height={50} />
        </Link>

        <div>
          <Link href="/">
            <h1 className="sm:text-xl lg:text-2xl text-black font-bold">
              Gambar<span className="text-orange-500">.in</span> Gue!
            </h1>
            <h2 className="text-black text-xs lg:text-sm font-light mt-1s">
              Powered by AWS and StableDiffusion 2.1
            </h2>
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="hidden md:flex text-xl sm:text-l divide-x items-center text-gray-500">
        <div className="flex items-center">
          <Link href="/photo" className="px-2 lg:px-4 font-bold text-center text-orange-500 hover:bg-gray-200 rounded-lg p-4">
            Take Photo
          </Link>
          <Link
            href="/my-images"
            className="px-2 lg:px-4 font-bold text-center hover:bg-gray-200 rounded-lg p-4"
          >
            My Images
          </Link>
          <Link
            href="https://github.com/tugusav/gambarin-gue"
            className="px-2 lg:px-4 font-bold text-right hover:bg-gray-200 rounded-lg p-4"
          >
            Github
          </Link>
          <Link href="/profile" className="px-2 lg:px-4 font-bold">
            <Image src="/user.png" alt="profile" width={40} height={40} />
          </Link>
        </div>
      </div>

      {/* mobile menu */}
      <div className="md:hidden">
        <button
          className="flex items-center px-4 py-2 text-gray-500"
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-14 right-3 mt-2 bg-white rounded shadow-md">
            <Link
              href="/photo"
              className="block px-4 py-2 font-bold text-center text-orange-500"
            >
              Take Photo
            </Link>
            <Link
              href="/my-images"
              className="block px-4 py-2 font-bold text-center text-gray-500"
            >
              My Images
            </Link>
            <Link
              href="https://github.com/tugusav/gambarin-gue"
              className="block px-4 py-2 font-bold text-center text-gray-500"
            >
              Github
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 font-bold text-center text-gray-500"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
