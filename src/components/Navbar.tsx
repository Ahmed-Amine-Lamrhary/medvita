'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold text-[#F28C38]">MED</span>
                            <span className="text-xl font-semibold text-[#003087]">Vita</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-[#003087]">Accueil</Link>
                        <div className="relative">
                            <Link href="/products" className="text-gray-700 hover:text-[#003087]">Nos Produits</Link>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F28C38] transition-all duration-300 group-hover:w-full"></span>
                        </div>
                        <Link href="/contact" className="text-gray-700 hover:text-[#003087]">Contact</Link>
                    </div>

                    {/* Search and Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Je Cherche ..."
                                className="border border-gray-300 rounded-full py-2 px-4 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                            />
                            <IoSearchOutline className='absolute top-3 right-2.5' />
                        </div>
                        <Link href="/cart" className="flex items-center space-x-1 bg-[#F28C38] text-white px-3 py-2 rounded-full hover:bg-[#e07b2c]">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7m-8 0h8" />
                            </svg>
                            <span>Mon Devis</span>
                            <span className="bg-white text-[#F28C38] rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
                        </Link>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-700 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Accueil</Link>
                            <Link href="/products" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Nos Produits</Link>
                            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
