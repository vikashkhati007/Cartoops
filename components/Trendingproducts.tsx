'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'

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

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        // Sort products by rating and take top 10
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

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth

      let scrollPosition = 0
      const scroll = () => {
        scrollPosition += 1
        if (scrollPosition > scrollWidth - clientWidth) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
        requestAnimationFrame(scroll)
      }

      const animationFrame = requestAnimationFrame(scroll)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [products])

  const renderProductCards = () => {
    if (loading) {
      return Array(5).fill(null).map((_, index) => (
        <div 
          key={`skeleton-${index}`}
          className="flex-shrink-0 w-64 mx-4 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))
    }

    return [...products, ...products].map((product, index) => (
      <div 
        key={`${product.id}-${index}`}
        className="flex-shrink-0 w-64 mx-2 bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <div className="relative h-48 group">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
              <Star className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating.rate}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{product.rating.count} sold</span>
          </div>
          <h3 className="text-sm text-gray-800 mb-1 truncate">{product.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-red-600">Rp{(product.price * 15000).toLocaleString()}</span>
              <span className="ml-1 text-xs text-red-400 line-through">Rp{((product.price * 15000) * 1.2).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <section className="py-16 bg-white rounded-2xl shadow-lg">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <p className="mt-3 text-lg text-gray-600">Discover our most popular products</p>
        </div>
        
        {error && (
          <div className="text-center text-red-600 mb-8">{error}</div>
        )}

        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden gap-8 pb-8 -mx-4 px-4"
        >
          {loading ? renderProductCards() : products.map((product, index) => (
            <div 
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-100"
            >
              <div className="relative h-64 group p-4 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                    <ShoppingCart className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}