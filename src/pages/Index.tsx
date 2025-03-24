
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import HowItWorks from "@/components/home/HowItWorks";
import RecentReviews from "@/components/home/RecentReviews";
import FAQ from "@/components/home/FAQ";
import { LoadingBar } from "@/components/ui/loading-bar";
import StatsCounter from "@/components/home/StatsCounter";
import SupportedCountries from "@/components/home/SupportedCountries";
import BenefitsSection from "@/components/home/BenefitsSection";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading bar on initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll to element when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add padding to account for fixed navbar height
          const navbarHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight - 20, // Add some extra padding
            behavior: "smooth",
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

  // Initialize intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Target all elements with the scroll-reveal class
    document.querySelectorAll(".scroll-reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading]);
  return (
    <div className="flex flex-col min-h-screen">
      {loading && <LoadingBar className="mt-[400px]" />}
      {!loading && (
        <div>
          <Navbar />
          <main className="flex-grow pt-24 md:pt-28">
            <Hero />
            <StatsCounter />
            <Features />
            <BenefitsSection />
            <HowItWorks />
            <SupportedCountries />
            <RecentReviews />
            <Pricing />
            <FAQ />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
