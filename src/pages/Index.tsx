
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import HowItWorks from "@/components/home/HowItWorks";
import RecentReviews from "@/components/home/RecentReviews";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to element when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add padding to account for fixed navbar height
          const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight - 20, // Add some extra padding
            behavior: "smooth"
          });
        }
      }
    };

    // Initial check for hash
    handleHashChange();

    // Add event listener
    window.addEventListener("hashchange", handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        <Hero />
        <Features />
        <HowItWorks />
        <RecentReviews />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
