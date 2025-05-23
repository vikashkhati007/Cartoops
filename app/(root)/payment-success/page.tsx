'use client'

import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess({
  searchParams: { amount, orderId },
}: {
  searchParams: { amount: string; orderId: string };
}) {
  useEffect(() => {
    // Save order details to localStorage when payment success page loads
    const orderDetails = {
      items: [], // We'll need to pass cart items through URL or context
      total: parseFloat(amount),
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
  }, [amount]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <CheckCircle className="mx-auto h-12 w-auto text-green-500" />
            </div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Payment Successful!
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Thank you for your purchase
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-sm text-gray-700">Amount paid</p>
              <p className="mt-1 text-4xl font-extrabold text-indigo-600">
                ${parseFloat(amount).toFixed(2)}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                asChild
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link href={`/track-order/${orderId}`}>
                  Track Your Order
                </Link>
              </Button>
              <Button
                asChild
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link href="/orders">
                  View Your Orders
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}