import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#2F3C4D]">
      <div
        className="relative w-full aspect-[24/7] bg-cover bg-no-repeat transition-opacity duration-500 bg-secondary"
        style={{
          backgroundImage: `url('/images/landing/hero/landing.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-white to-gray-50 z-[-1]"></div>

        {/* Floating Image */}
        <img
          src="/images/landing/hero/hero-img.png"
          alt="Floating Element"
          className="absolute left-[18%] top-1/3 w-64 animate-floating"
        />

        <div className="container mx-auto px-4 max-w-[400px]">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="mt-24 inline-flex items-left px-5 py-12 rounded-full text-4xl font-medium text-white ">
                <div>
                  1&nbsp;&nbsp;&nbsp;
                  <Link to="/auth/signup">
                    <span className="underline hover:text-[#CC7700] text-[#FF9900]">
                      Boost Reviews
                    </span>
                  </Link>
                  <br />
                  <div className="text-white mt-2">
                    2&nbsp;&nbsp;&nbsp;Collect Emails
                  </div>
                  <div className="text-white mt-2">
                    3&nbsp;&nbsp;&nbsp;Drive Sales
                  </div>
                  <div className="text-xl text-white mt-8">
                    ...with AI-powered review tunnel
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-left animate-fade-in">
              <Button
                size="lg"
                asChild
                className="ml-16 w-full sm:w-auto bg-[#FF9900] hover:bg-orange-600 text-[#232F3E] rounded-full"
              >
                <Link to="/help" className="px-8">
                  Learn More
                </Link>
              </Button>
              {/* <Button
                size="lg"
                asChild
                className="w-full sm:w-auto group bg-[#FF9900] hover:bg-orange-600 text-[#232F3E]"
              >
                <Link
                  to="/review/demo-campaign"
                  className="px-8 flex items-center"
                >
                  Try Demo
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-50px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 2s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
