import { Package, ShoppingBag, RefreshCcw, CreditCard } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'New Arrivals', icon: Package, color: 'bg-pink-100 text-pink-600' },
  { name: 'Best Sellers', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { name: 'Summer Collection', icon: RefreshCcw, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Clearance', icon: CreditCard, color: 'bg-green-100 text-green-600' }
]

export default function FeaturedCategories() {
  return (
    <section id="featured-categories" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <div key={category.name} className="relative rounded-lg overflow-hidden group bg-white shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
          <div className="p-6">
            <div className={`inline-block p-3 rounded-full ${category.color} mb-4`}>
              <category.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">Explore our latest {category.name.toLowerCase()} and find your perfect style.</p>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}