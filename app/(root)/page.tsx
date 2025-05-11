import CustomerReviews from "@/components/CustomerReviews";
import EcommerceFeatures from "@/components/EcommerceFeatures";
import FeaturedCategories from "@/components/FeaturedCategories";
import Hero from "@/components/Hero";
import TrendingProductsHero from "@/components/Trendingproducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
          {['T-Shirts', 'Jackets', 'Pants', 'Shoes', 'Hats', 'Accessories', 'Bags', 'More'].map((category) => (
            <div key={category} className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs sm:text-sm font-medium text-gray-800">{category}</p>
            </div>
          ))}
        </div>
        <TrendingProductsHero/>
        <FeaturedCategories />
        <CustomerReviews />  {/* Add this line */}
        <EcommerceFeatures />
      </div>
    </div>
  )
}