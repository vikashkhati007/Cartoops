import { Package, ShoppingBag, RefreshCcw, CreditCard } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'New Arrivals', icon: Package },
  { name: 'Best Sellers', icon: ShoppingBag },
  { name: 'Summer Collection', icon: RefreshCcw },
  { name: 'Clearance', icon: CreditCard }
]

export default function FeaturedCategories() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <div key={category.name} className="relative rounded-lg overflow-hidden group bg-white shadow-lg transition-shadow hover:shadow-xl">
          <div className="p-6">
            <category.icon className="h-12 w-12 text-indigo-600 mb-4" />
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