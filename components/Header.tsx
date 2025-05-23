"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, X, ChevronDown, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
            Cartoops
          </Link>
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <Link
              href="/"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium flex items-center">
                Categories
                <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
                      role="menuitem"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/products"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 font-medium"
            >
              All Products
            </Link>
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {session.data?.user ? (
              <>
                <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link href="/favorite" className="text-gray-700 hover:text-blue-600">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base">{session.data.user.name}</span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
                        >
                          Your Orders
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/auth"
                className="text-sm sm:text-base text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
            )}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <div className="py-2">
              <button
                className="text-sm text-gray-700 hover:text-blue-600 font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/products"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              All Products
            </Link>
            <Link
              href="/profile"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Your Profile
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Your Orders
            </Link>
            {session.data?.user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  Your Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  Your Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
