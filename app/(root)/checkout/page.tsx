"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { ShoppingBag } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import CheckoutPage from "@/components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Page = () => {
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get('amount')!);

  // Decode cartItems from query param (assuming it's a JSON string)
  const rawCartItems = searchParams.get('cartItems');
  const cartItems = rawCartItems ? JSON.parse(decodeURIComponent(rawCartItems)) : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <ShoppingBag className="mx-auto h-12 w-auto text-indigo-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Complete your purchase
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your total amount is{" "}
              <span className="font-medium text-indigo-600">
                ${amount.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="mt-8">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#4F46E5',
                  },
                },
              }}
            >
              <CheckoutPage amount={amount} cartItems={cartItems} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;