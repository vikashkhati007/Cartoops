import { Package, ShoppingBag, RefreshCcw, CreditCard } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Flash Sale', icon: Package, color: 'bg-red-100 text-red-600', discount: 'Up to 50% OFF' },
  { name: 'New Arrivals', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600', discount: 'Latest Collection' },
  { name: 'Best Sellers', icon: RefreshCcw, color: 'bg-yellow-100 text-yellow-600', discount: 'Most Popular' },
  { name: 'Special Deals', icon: CreditCard, color: 'bg-green-100 text-green-600', discount: 'Limited Time' }
]

export default function FeaturedCategories() {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Featured Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.name} className="relative rounded-lg overflow-hidden group bg-white shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="p-6">
              <div className={`inline-block p-3 rounded-full ${category.color} mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.discount}</p>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}