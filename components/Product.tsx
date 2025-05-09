"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, ChevronDown, ShoppingCart, Heart, Filter, SortAsc, SortDesc } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const session = useSession();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const [totalProducts, setTotalProducts] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch total products");
        }
        const allProducts = await response.json();
        setTotalProducts(allProducts.length);
      } catch (err) {
        setError("Failed to load total products count.");
      }
    };

    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `https://fakestoreapi.com/products?limit=20&page=${page}`;
        if (selectedCategory && selectedCategory !== "All") {
          url = `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}?limit=20&page=${page}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const newProducts = await response.json();

        setProducts((prevProducts) => {
          const uniqueProducts = [...prevProducts, ...newProducts].reduce(
            (acc, current) => {
              const x = acc.find((item: { id: any }) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          return uniqueProducts;
        });

        if (
          totalProducts &&
          products.length + newProducts.length >= totalProducts
        ) {
          setHasMore(false);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory, totalProducts]);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl || "All");
    setPage(1);
    setProducts([]);
  }, [categoryFromUrl]);

  const toggleFavorite = async (
    productId: number,
    producttitle: string,
    productdescription: string,
    productprice: number,
    productimage: string
  ) => {
    const product = {
      productId: productId,
      title: producttitle,
      description: productdescription,
      image: productimage,
      price: productprice,
    };

    const res = await fetch("/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      const data = await res.json();
      toast({
        title: "Favorite item added",
      })
      setFavorites((prevFavorites) =>
        prevFavorites.includes(productId)
          ? prevFavorites.filter((id) => id !== productId)
          : [...prevFavorites, productId]
      );
    }
    else{
      toast({
        title: "Failed to add favorite item",
      });
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "priceLow") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const addCartItem = async (
    userId: any,
    productId: any,
    title: any,
    price: any,
    image: any
  ) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        title: title,
        price: price,
        image: image,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast({ title: `Item added to cart`});
    } else {
      toast({ title: `Failed to add item to cart`});
    }
  };

  const renderProductCards = () => {
    if (loading && products.length === 0) {
      return Array(8).fill(null).map((_, index) => (
        <div 
          key={`skeleton-${index}`}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative pb-[100%] bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      ));
    }

    return sortedProducts.map((product, index) => (
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
        ref={
          index === sortedProducts.length - 1
            ? lastProductElementRef
            : null
        }
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
            onClick={() =>
              toggleFavorite(
                product.id,
                product.title,
                product.description,
                product.price,
                product.image
              )
            }
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label={
              favorites.includes(product.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              className={`h-5 w-5 ${
                favorites.includes(product.id)
                  ? "text-red-500 fill-current"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
            {product.title}
          </h2>
          <p className="text-sm text-gray-600 mb-2 truncate">
            {product.category}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={() =>
                addCartItem(
                  // @ts-ignore
                  session.data?.user?.id,
                  product.id,
                  product.title,
                  product.price,
                  product.image
                )
              }
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600">Discover our collection of high-quality products</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category and Sort Filters */}
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:flex-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:flex-none"
              >
                <option value="name">Sort by Name</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => {
              const isLastElement = index === sortedProducts.length - 1;
              return (
                <div
                  key={product.id}
                  ref={isLastElement ? lastProductElementRef : null}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(product.id, product.title, product.description, product.price, product.image)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Heart
                            className={`h-6 w-6 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          />
                        </button>
                        <button
                          onClick={() => addCartItem(session?.data?.user?.email, product.id, product.title, product.price, product.image)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <ShoppingCart className="h-6 w-6 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}