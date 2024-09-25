'use client'

import { useState } from 'react'
import { ShoppingBag, Menu, X, User, Heart, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Cartoops</span>
              <span className="text-2xl font-bold text-indigo-600">Cartoops</span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {['Men', 'Women', 'Kids', 'Sale'].map((item) => (
              <div key={item} className="relative group">
                <button className="text-base font-medium text-gray-500 hover:text-gray-900 inline-flex items-center">
                  {item}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 hidden group-hover:block">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <Link href="#" className="block p-3 rounded-md hover:bg-gray-50">
                        Subcategory 1
                      </Link>
                      <Link href="#" className="block p-3 rounded-md hover:bg-gray-50">
                        Subcategory 2
                      </Link>
                      <Link href="#" className="block p-3 rounded-md hover:bg-gray-50">
                        Subcategory 3
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="#" className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              <User className="h-6 w-6" />
            </Link>
            <Link href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['Men', 'Women', 'Kids', 'Sale'].map((item) => (
            <Link key={item} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              {item}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <User className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">User Name</div>
              <div className="text-sm font-medium text-gray-500">user@example.com</div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Your Profile
            </Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Settings
            </Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}