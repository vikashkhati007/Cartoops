import { ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden w-full mb-6 sm:mb-10 min-h-[60vh] sm:min-h-[80vh]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 relative">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-xs sm:text-sm mb-2 sm:mb-4">
              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Special Summer Collection
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-700">
              Limited Time Offer!<br/>
              <span className="text-indigo-600">Up to 50% OFF!</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg">
              Discover the latest trends and redefine your everyday style with our curated collection of premium fashion essentials.
            </p>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Shop Now
                <ArrowRight className="ml-2 -mr-1 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-3 sm:-space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs sm:text-sm font-medium">
                      {i}K+
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:gap-6 p-2 sm:p-4 mt-8 md:mt-0">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/t-shirt.png" alt="T-Shirt" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/shoes.png" alt="Shoes" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-12">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/hoodie.png" alt="Hoodie" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <Image src="/hat.png" alt="Hat" width={240} height={240} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

            <div className="absolute -top-4 -left-4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-50 rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-20 sm:w-32 h-20 sm:h-32 bg-purple-50 rounded-full filter blur-xl opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}