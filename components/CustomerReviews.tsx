'use client'

import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  review: string
  productName: string
  verified: boolean
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    date: "2024-01-15",
    review: "Absolutely love the quality of their products! The customer service was exceptional, and the delivery was faster than expected. Will definitely shop here again!",
    productName: "Premium Hoodie",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    date: "2024-01-12",
    review: "The attention to detail in their products is remarkable. I've purchased multiple items, and each one has exceeded my expectations. Great value for money!",
    productName: "Classic T-Shirt",
    verified: true
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    date: "2024-01-10",
    review: "Very impressed with the style and comfort. The size guide was spot on, and the material quality is excellent. Would highly recommend!",
    productName: "Urban Sneakers",
    verified: true
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "2024-01-08",
    review: "Outstanding shopping experience from start to finish. The website is easy to navigate, and the product exactly matches the description. Very satisfied!",
    productName: "Designer Cap",
    verified: true
  }
]

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers about their shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col w-full"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-50">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{review.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full inline-flex items-center">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex-1">
                <Quote className="absolute -top-1 -left-1 w-8 h-8 text-blue-100 transform -rotate-6" />
                <p className="text-gray-700 relative z-10 pl-6 leading-relaxed">
                  {review.review}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">
                  Purchased {review.productName}
                </span>
                <time className="text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.8 out of 5</span>
            <span className="text-sm text-gray-500 ml-2">
              Based on {reviews.length * 247} reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}