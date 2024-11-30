import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import './Navbar.css';

type HeaderProps = {
  onReset: () => void;
  onSort: () => void;
};

const Header: React.FC<HeaderProps> = ({ onReset, onSort }) => {
  const [isActive, setIsActive] = useState(false);

  //  Toggle the hamburger state when clicked
  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Disclosure as="nav" className="bg-transparent border-b border-gray-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex flex-1 items-center sm:justify-start">
            <div className="flex items-center">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Company Logo"
              />
              <span className="ml-3 text-dark font-bold text-xl">
                TileStacker
              </span>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <Disclosure.Button
              onClick={handleHamburgerClick}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white border-2 border-transparent hover:border-gray-400 active:border-gray-700 transition-all duration-500 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              <div className={`hamburger ${isActive ? 'is-active' : ''}`}>
                <span className="line block h-1 w-6 bg-gray-400 mb-1 transition-all duration-300"></span>
                <span className="line block h-1 w-6 bg-gray-400 mb-1 transition-all duration-300"></span>
                <span className="line block h-1 w-6 bg-gray-400 mb-1 transition-all duration-300"></span>
              </div>
            </Disclosure.Button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <button
                onClick={onReset}
                className="block w-full px-4 py-2 mt-2 bg-red-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-red-600 hover:scale-105"
              >
                Reset
              </button>
              <button
                onClick={onSort}
                className="block w-full px-4 py-2 mt-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-blue-600 hover:scale-105"
              >
                Sort
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <button
            className="block w-full px-4 py-2 mt-2 bg-red-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-red-600 hover:scale-105 focus:scale-100 active:scale-95"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="block w-full px-4 py-2 mt-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-blue-600 hover:scale-105 focus:scale-100 active:scale-95"
            onClick={onSort}
          >
            Sort
          </button>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default Header;
