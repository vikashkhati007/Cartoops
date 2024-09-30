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
        className="flex-shrink-0 w-64 mx-4 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ))
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 overflow-hidden mb-10 rounded-md">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center text-white text-xl">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 overflow-hidden mb-10 rounded-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Trending Products</h2>
        <div 
          ref={scrollRef}
          className="flex overflow-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {renderProductCards()}
        </div>
      </div>
    </div>
  )
}