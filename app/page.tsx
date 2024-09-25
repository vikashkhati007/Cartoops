import EcommerceFeatures from "@/components/EcommerceFeatures";
import FeaturedCategories from "@/components/FeaturedCategories";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchBar from "@/components/Searchbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <Hero />
        <SearchBar />
        <FeaturedCategories />
        <EcommerceFeatures />
      </main>
    </div>
  )
}