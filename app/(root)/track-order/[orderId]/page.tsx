'use client'

import { useEffect, useState } from 'react'
import { Package, Truck, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface OrderItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface OrderDetails {
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
}

export default function TrackOrder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = localStorage.getItem('currentOrder')
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder))
    }

    // Simulate order progress
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 2) {
          // Update order status based on current step
          const newStatus = prev === 0 ? 'processing' : 'completed';
          const updatedOrder = storedOrder ? { ...JSON.parse(storedOrder), status: newStatus } : null;
          localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
          setOrderDetails(updatedOrder);
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Order Received', icon: Package },
    { title: 'Order Processing', icon: Truck },
    { title: 'Order Completed', icon: CheckCircle }
  ];

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No order details found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Order</h1>
          
          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className={`mt-2 text-sm font-medium ${index <= currentStep ? 'text-blue-500' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600">Status: {orderDetails.status}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                {orderDetails.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-900">Total</p>
                    <p className="font-semibold text-gray-900">${orderDetails.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}