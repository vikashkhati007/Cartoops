'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

interface FavoriteProduct {
  id: number
  title: string
  price: number
  image: string
  category: string
}

const initialFavorites: FavoriteProduct[] = [
  { id: 1, title: "Men's Classic T-Shirt", price: 29.99, image: "/placeholder.svg?height=300&width=300", category: "Men's Clothing" },
  { id: 2, title: "Women's Summer Dress", price: 49.99, image: "/placeholder.svg?height=300&width=300", category: "Women's Clothing" },
  { id: 3, title: "Unisex Hoodie", price: 39.99, image: "/placeholder.svg?height=300&width=300", category: "Unisex Clothing" },
  { id: 4, title: "Leather Wallet", price: 24.99, image: "/placeholder.svg?height=300&width=300", category: "Accessories" },
]

export default function FavoriteProductsPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(initialFavorites)

  const removeFromFavorites = (id: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id))
  }

  const addToCart = (product: FavoriteProduct) => {
    // Implement add to cart functionality here
    console.log('Added to cart:', product)
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Favorite Products</h1>
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Your favorites list is empty.</p>
            <p className="text-gray-500 mt-2">Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}