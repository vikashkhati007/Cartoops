'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Search, ChevronDown, ShoppingCart, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function ProductPage() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const session = useSession();

  const observer = useRef<IntersectionObserver | null>(null)
  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const [totalProducts, setTotalProducts] = useState<number | null>(null)

useEffect(() => {
  const fetchTotalProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`)
      if (!response.ok) {
        throw new Error('Failed to fetch total products')
      }
      const allProducts = await response.json()
      setTotalProducts(allProducts.length) // Set total number of products
    } catch (err) {
      setError('Failed to load total products count.')
    }
  }

  fetchTotalProducts()
}, [])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let url = `https://fakestoreapi.com/products?limit=20&page=${page}`
        if (selectedCategory && selectedCategory !== 'All') {
          url = `https://fakestoreapi.com/products/category/${encodeURIComponent(selectedCategory)}?limit=20&page=${page}`
        }
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const newProducts = await response.json()
  
        // Compare loaded products with totalProducts to stop infinite scroll
        setProducts(prevProducts => {
          const uniqueProducts = [...prevProducts, ...newProducts].reduce((acc, current) => {
            const x = acc.find((item: { id: any }) => item.id === current.id)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])
          return uniqueProducts
        })
  
        // Stop loading if we've fetched all products
        if (totalProducts && products.length + newProducts.length >= totalProducts) {
          setHasMore(false)
        }
  
        setLoading(false)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        setLoading(false)
      }
    }
  
    fetchProducts()
  }, [page, selectedCategory, totalProducts])

  useEffect(() => {
    setSelectedCategory(categoryFromUrl || 'All')
    setPage(1)
    setProducts([])
  }, [categoryFromUrl])

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId]
    )
  }

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))]

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'priceLow') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  const addCartItem = async (userId: any, productId:any, title:any, price:any, image:any) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        title: title,
        price: price,
        image: image,
        quantity: 1,  // Default quantity
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Cart item added successfully:', data);
    } else {
      console.error('Failed to add cart item:', data);
    }
  };

  
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setPage(1)
                  setProducts([])
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              ref={index === sortedProducts.length - 1 ? lastProductElementRef : null}
            >
              <div className="relative pb-[100%]">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                  aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">{product.title}</h2>
                <p className="text-sm text-gray-600 mb-2 truncate">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <button 
                  // @ts-ignore
                  onClick={() => addCartItem(session.data?.user?.id, product.id, product.title, product.price, product.image)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading more products...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  )
}