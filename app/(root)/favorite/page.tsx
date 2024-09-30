"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface FavoriteProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

export default function FavoriteProductsPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorite", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch favorite items");
        }

        const data = await res.json();
        setFavorites(data.favoriteItems);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to fetch favorite items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id: number) => {
    try {
      const res = await fetch(`/api/favorite?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast({
          title: "Favorite removed",
          description: "The product has been removed from your favorites.",
        });
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== id)
        );
      } else {
        throw new Error("Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast({
        title: "Error",
        description: "Failed to remove the item from favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addToCart = async (productid: number, producttitle: string, productimage: string, productprice: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // @ts-ignore
          userId: session.data?.user?.id!,
          productId: productid,
          title: producttitle,
          price: productprice,
          image: productimage,
        }),
      });

      if (response.ok) {
        toast({
          title: "Added to cart",
          description: "The product has been added to your cart.",
        });
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add the item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <div className="w-full h-64 bg-gray-200 animate-pulse" />
              </div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (favorites.length === 0) {
      return (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">
            Your favorites list is empty.
          </p>
          <p className="text-gray-500 mt-2">
            Start adding products you love!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
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
                aria-label={`Remove ${product.title} from favorites`}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {product.category}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product.id, product.title, product.image, product.price)}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
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
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Favorite Products
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}