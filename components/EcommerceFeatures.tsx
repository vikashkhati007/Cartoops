import { Truck, RefreshCcw, CreditCard, Package } from 'lucide-react'

const features = [
  { 
    icon: Truck, 
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50'
  },
  { 
    icon: RefreshCcw, 
    title: '30-Day Returns',
    description: 'Easy returns within 30 days'
  },
  { 
    icon: CreditCard, 
    title: 'Secure Payment',
    description: 'Safe & secure payment methods'
  },
  { 
    icon: Package, 
    title: 'Quality Products',
    description: 'Handpicked premium products'
  },
]

export default function EcommerceFeatures() {
  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-xl sm:rounded-2xl shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Us</h2>
          <p className="text-base sm:text-lg text-gray-600">Shop with confidence with our premium services</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm mb-4 sm:mb-6">
                <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}