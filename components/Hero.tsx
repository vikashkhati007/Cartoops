import { ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden w-full mb-10 min-h-[80vh]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-4">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Special Summer Collection
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-700">
              Limited Time Offer!<br/>
              <span className="text-indigo-600">Up to 50% OFF!</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              Discover the latest trends and redefine your everyday style with our curated collection of premium fashion essentials.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                      {i}K+
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="relative grid grid-cols-2 gap-6 p-4">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/t-shirt.png" alt="T-Shirt" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/shoes.png" alt="Shoes" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-6 mt-12">
              <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/hoodie.png" alt="Hoodie" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/hat.png" alt="Hat" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-50 rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-50 rounded-full filter blur-xl opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}