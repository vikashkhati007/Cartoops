"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
}

const product: Product = {
  id: 1,
  name: "Premium Comfort T-Shirt",
  category: "Men's Clothing",
  price: 29.99,
  image: "/placeholder.svg?height=600&width=600&text=T-Shirt",
  description:
    "Experience ultimate comfort with our Premium Comfort T-Shirt. Made from 100% organic cotton, this shirt is perfect for everyday wear. Its breathable fabric keeps you cool and comfortable all day long.",
  rating: 4.5,
  reviews: 128,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["White", "Black", "Navy", "Gray"],
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Added to cart:", {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex ">
            <div className="lg:w-1/2 ">
              <div className="h-64 sm:h-96 lg:h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedColor === color ? "ring-2 ring-indigo-500" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="mt-2 flex items-center space-x-3">
                  <button
                    className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-medium">{quantity}</span>
                  <button
                    className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 inline-block mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-200">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setShowDescription(!showDescription)}
            >
              <span className="text-lg font-medium text-gray-900">
                Product Description
              </span>
              {showDescription ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {showDescription && (
              <p className="mt-4 text-gray-600">{product.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
