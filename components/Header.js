'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Uncivilized Games
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-white hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-white hover:text-blue-400 transition">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/apps" className="text-white hover:text-blue-400 transition">
                  Apps
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="block text-white hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/games" 
                  className="block text-white hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="block text-white hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/apps" 
                  className="block text-white hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apps
                </Link>
              </li>
              <li>
                <Link 
                  href="/guestbook" 
                  className="block text-white hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guestbook
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}