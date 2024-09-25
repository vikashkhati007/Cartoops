import { Truck, RefreshCcw, CreditCard, Package } from 'lucide-react'

const features = [
  { icon: Truck, text: 'Free Shipping' },
  { icon: RefreshCcw, text: '30-Day Returns' },
  { icon: CreditCard, text: 'Secure Payment' },
  { icon: Package, text: 'Quality Products' },
]

export default function EcommerceFeatures() {
  return (
    <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {features.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <item.icon className="h-10 w-10 text-indigo-600 mb-2" />
          <span className="text-gray-700 font-medium">{item.text}</span>
        </div>
      ))}
    </section>
  )
}