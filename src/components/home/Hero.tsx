
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#232f3e] max-w-screen">
      <div className="h-[800px] relative w-full bg-cover bg-no-repeat transition-opacity duration-500 bg-[#232f3e] bg-bottom">
        <div className="absolute inset-0 bg-gradient-radial from-white to-gray-50 z-[-1]"></div>

        {/* Floating Image */}
        <img
          src="/images/landing/hero/hero-img.png"
          alt="Floating Element"
          className="absolute left-[18%] top-1/4 w-64 xl:w-72 2xl:w-80 3xl:w-96 animate-floating"
        />

        <div className="container mx-auto px-4 flex items-center max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3200px]">
          <div className="max-w-lg mx-auto xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="mt-36 inline-flex items-left px-5 py-12 rounded-full text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-medium text-white">
                <div>
                  <span className="inline-flex items-center">
                    1&nbsp;&nbsp;&nbsp;
                    <Link to="/auth/signup">
                      <span className="underline hover:text-[#CC7700] text-[#FF9900]">
                        Boost Reviews for
                      </span>
                      <img
                        src="/images/amazon-logo-white.png"
                        alt="Amazon"
                        className="h-10 xl:h-12 2xl:h-14 3xl:h-16 ml-4 inline-block align-middle"
                      />
                    </Link>
                  </span>
                  <div className="text-white mt-2">
                    2&nbsp;&nbsp;&nbsp;Collect Emails
                  </div>
                  <div className="text-white mt-2">
                    3&nbsp;&nbsp;&nbsp;Drive Sales
                  </div>
                  <div className="text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-white mt-8 ml-12">
                    ...with AI-powered review funnel
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-left animate-fade-in">
              <Button
                size="lg"
                asChild
                className="ml-16 w-full sm:w-auto bg-[#FF9900] hover:bg-orange-600 text-[#232F3E] rounded-full xl:text-lg 2xl:text-xl 3xl:text-2xl xl:py-6 2xl:py-7 3xl:py-8"
              >
                <Link to="/help" className="px-8">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Wave Effect */}
      <div className="absolute bottom-[0px] left-0 w-full overflow-hidden leading-none">
        <svg
          className="hero-waves"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          viewBox="0 30 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            ></path>
          </defs>
          <g className="wave1">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="3"
              fill="rgba(255,255,255, .1)"
            ></use>
          </g>
          <g className="wave2">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="0"
              fill="rgba(255,255,255, .2)"
            ></use>
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" fill="#c2dcfd"></use>
          </g>
        </svg>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-50px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 6s ease-in-out infinite;
          }
          .hero-waves {
              display: block;
              margin-top: 60px;
              width: 100%;
              height: 60px;
              z-index: 5;
              position: relative
          }

          .wave1 use {
              animation: move-forever1 10s linear infinite;
              animation-delay: -2s
          }

          .wave2 use {
              animation: move-forever2 8s linear infinite;
              animation-delay: -2s
          }

          .wave3 use {
              animation: move-forever3 6s linear infinite;
              animation-delay: -2s
          }

          @keyframes move-forever1 {
              0% {
                  transform: translate(85px)
              }

              to {
                  transform: translate(-90px)
              }
          }

          @keyframes move-forever2 {
              0% {
                  transform: translate(-90px)
              }

              to {
                  transform: translate(85px)
              }
          }

          @keyframes move-forever3 {
              0% {
                  transform: translate(-90px)
              }

              to {
                  transform: translate(85px)
              }
          }
          
          /* Add support for 3XL breakpoint */
          @media (min-width: 2000px) {
            .3xl\\:max-w-3xl {
              max-width: 48rem;
            }
            .3xl\\:max-w-\\[3200px\\] {
              max-width: 3200px;
            }
            .3xl\\:text-6xl {
              font-size: 3.75rem;
              line-height: 1;
            }
            .3xl\\:text-4xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }
            .3xl\\:text-2xl {
              font-size: 1.5rem;
              line-height: 2rem;
            }
            .3xl\\:h-16 {
              height: 4rem;
            }
            .3xl\\:w-96 {
              width: 24rem;
            }
            .3xl\\:py-8 {
              padding-top: 2rem;
              padding-bottom: 2rem;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
