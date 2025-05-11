import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">About Cartoops</h3>
            <p className="text-sm sm:text-base text-gray-600">Cartoops is your one-stop shop for trendy and affordable fashion. We bring you the latest styles at unbeatable prices.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm sm:text-base text-gray-600 hover:text-indigo-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-sm sm:text-base text-gray-600">Subscribe to our newsletter for exclusive deals and updates.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-600">&copy; 2024 Cartoops. All rights reserved.</p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Mail, label: 'Email' },
              ].map((item) => (
                <Link key={item.label} href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}