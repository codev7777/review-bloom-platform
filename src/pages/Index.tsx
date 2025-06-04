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
import Demo from "@/components/home/SmartFunnelDemo";
import MoreSocialProof from "@/components/home/MoreSocialProof";

const Index = () => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Show loading bar on initial page load
  //   const timer1 = setTimeout(() => {
  //     setLoading(false);
  //     document.getElementById("isFirstLoad").innerHTML = "0";
  //   }, 2500);
  //   const timer2 = setTimeout(() => {
  //     if (document.getElementById("isFirstLoad").innerHTML == "0")
  //       setLoading(false);
  //   }, 100);
  // const timer2 = setTimeout(() => {
  //   const isFirstLoadingElement = document.getElementById(
  //     "isFirstLoad"
  //   ) as HTMLInputElement;
  //   if (isFirstLoadingElement && isFirstLoadingElement.value === "1") {
  //     setLoading(false);
  //     isFirstLoadingElement.value = "0";
  //   } else isFirstLoadingElement.value = "0";
  // }, 100);

  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

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
            top: elementPosition - navbarHeight - 10, // Adjusted padding
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
  // useEffect(() => {
  //   const observerOptions = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   };

  //   const handleIntersect = (
  //     entries: IntersectionObserverEntry[],
  //     observer: IntersectionObserver
  //   ) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("animate-reveal");
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersect, observerOptions);

  //   // Target all elements with the scroll-reveal class
  //   document.querySelectorAll(".scroll-reveal").forEach((element) => {
  //     observer.observe(element);
  //   });

  //   return () => observer.disconnect();
  // }, [loading]);
  return (
    <div className="flex flex-col min-h-screen ">
      {/* {loading && <LoadingBar className="mt-[400px]" />} */}
      {
        <div>
          <Navbar />
          <main className="flex-grow ">
            <Hero />
            <SupportedCountries />
            <HowItWorks />
            <StatsCounter />
            <Demo />
            {/* <div className="video-box bg-gray-50">
              <div className="container-xl rounded-[10px]">
                <iframe
                  src="https://www.youtube.com/embed/QlPkrGA1SBk"
                  title="YouTube video player"
                  // frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  // allowfullscreen

                  style={{
                    width: "96%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    aspectRatio: "16/9",
                    borderRadius: "30px",
                  }}
                ></iframe>
              </div>
            </div> */}
            <RecentReviews />
            <Pricing />
            <BenefitsSection />
            <MoreSocialProof />
            <Features />
            <FAQ />
          </main>
          <Footer />
        </div>
      }
    </div>
  );
};

export default Index;
