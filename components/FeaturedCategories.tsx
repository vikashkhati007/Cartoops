import { Package, ShoppingBag, RefreshCcw, CreditCard } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Flash Sale', icon: Package, color: 'bg-red-100 text-red-600', gradient: 'from-red-500/10 to-red-500/5', discount: 'Up to 50% OFF' },
  { name: 'New Arrivals', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600', gradient: 'from-blue-500/10 to-blue-500/5', discount: 'Latest Collection' },
  { name: 'Best Sellers', icon: RefreshCcw, color: 'bg-yellow-100 text-yellow-600', gradient: 'from-yellow-500/10 to-yellow-500/5', discount: 'Most Popular' },
  { name: 'Special Deals', icon: CreditCard, color: 'bg-green-100 text-green-600', gradient: 'from-green-500/10 to-green-500/5', discount: 'Limited Time' }
]

export default function FeaturedCategories() {
  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-xl sm:rounded-2xl shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Categories</h2>
          <p className="text-base sm:text-lg text-gray-600">Discover our exclusive collections and special offers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="relative overflow-hidden group bg-white rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-40`}></div>
              <div className="relative p-6 sm:p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${category.color} mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{category.name}</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">{category.discount}</p>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-sm hover:shadow-md w-full"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}