'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  price: number
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function TrendingProductsHero() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        const sortedProducts = data.sort((a: Product, b: Product) => b.rating.rate - a.rating.rate).slice(0, 10)
        setProducts(sortedProducts)
        setLoading(false)
      } catch (err) {
        setError('Failed to load trending products. Please try again later.')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const renderProductCards = () => {
    if (loading) {
      return Array(4).fill(null).map((_, index) => (
        <div 
          key={`skeleton-${index}`}
          className="w-full md:w-1/2 lg:w-1/4 p-4"
        >
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-full">
            <div className="relative h-64 bg-gray-100 animate-pulse"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded-full w-1/2 mb-4 animate-pulse"></div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-4 bg-gray-100 rounded-full mr-1 animate-pulse"></div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-100 rounded-full w-1/3 animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    return products.map((product) => (
      <div 
        key={product.id}
        className="w-full md:w-1/2 lg:w-1/4 p-4"
      >
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="relative h-64 group bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            <div className="absolute z-30 top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              HOT
            </div>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-sm font-medium text-yellow-700">{product.rating.rate}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600 font-medium">{product.rating.count} sold</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h3>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <p className="text-lg text-gray-600">Discover our hottest products of the week</p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        
        {error ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <span className="text-red-600 text-2xl">!</span>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {renderProductCards()}
          </div>
        )}
      </div>
    </section>
  )
}