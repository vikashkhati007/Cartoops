import EcommerceFeatures from "@/components/EcommerceFeatures";
import FeaturedCategories from "@/components/FeaturedCategories";
import Hero from "@/components/Hero";
import SearchBar from "@/components/Searchbar";
import TrendingProductsHero from "@/components/Trendingproducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 sm:pb-24 ">
        <TrendingProductsHero/>
        <EcommerceFeatures />
        <FeaturedCategories />
      </main>
    </div>
  )
}