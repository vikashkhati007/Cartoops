"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ShoppingCartPage() {
  const session = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async (userId: string) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cart?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setCartItems(data);
        } else {
          throw new Error(data.message || "Error fetching cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast({
          title: "Error",
          description: "Failed to load cart items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    //@ts-ignore
    if (session.data?.user?.id) {
    //@ts-ignore
      fetchCartItems(session.data.user.id);
    }
    //@ts-ignore
  }, [session.data?.user?.id]);

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`/api/cart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItemId: id,
          quantity: newQuantity,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        throw new Error(data.message || "Error updating cart item quantity");
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`/api/cart?cartItemId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart.",
        });
      } else {
        throw new Error(data.message || "Error removing cart item");
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const renderSkeletonItem = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center animate-pulse">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-300 rounded-md"></div>
      <div className="ml-4 flex-grow">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="flex items-center mt-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full ml-2"></div>
        </div>
      </div>
      <div className="ml-4">
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {[...Array(3)].map((_, index) => (
              <div key={index}>{renderSkeletonItem()}</div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
              <div className="my-4 h-px bg-gray-300"></div>
              <div className="flex justify-between mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      );
    }

    if (cartItems.length === 0) {
      return <p className="text-xl text-gray-600">Your cart is empty.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center"
            >
              <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2 text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-semibold">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800 font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800 font-semibold">$0.00</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Total
              </span>
              <span className="text-lg font-semibold text-gray-800">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Shopping Cart
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}