import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#232f3e]  max-w-screen">
      <div className="h-[600px] 3xl:h-[900px] relative w-full bg-cover bg-no-repeat transition-opacity duration-500 bg-[#232f3e] bg-bottom  flex items-center justify-center">
        <img
          src="/images/landing/hero/hero-img.png"
          alt="Floating Element"
          className="absolute left-[18%] top-1/4 w-64 animate-floating 3xl:w-96"
        />

        <div className="container px-4 xl:max-w-[1300px] xl:pl-[500px] max-w-[1200px] pl-[600px] 3xl:pb-40">
          <div className=" ">
            <div className="inline-block mb-6 animate-fade-in">
              <div className=" inline-flex items-left px-5 py-12 rounded-full text-3xl font-medium text-white 3xl:text-5xl">
                <div>
                  <span className="inline-flex items-center">
                    1&nbsp;&nbsp;&nbsp;
                    <Link to="/auth/signup">
                      <span className="underline hover:text-[#CC7700] text-[#FF9900]">
                        Boost Reviews for
                      </span>
                      {"  "}
                      <img
                        src="/images/amazon-logo-white.png"
                        alt="Amazon"
                        className="h-10 ml-4 inline-block align-middle 3xl:h-16 mt-3"
                      />
                    </Link>
                  </span>
                  <div className="text-white mt-2">
                    2&nbsp;&nbsp;&nbsp;Collect Emails
                  </div>
                  <div className="text-white mt-2">
                    3&nbsp;&nbsp;&nbsp;Drive Sales
                  </div>
                  <div className="text-xl text-white mt-8 ml-12 3xl:text-3xl">
                    ...with AI-powered review funnel
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-left animate-fade-in">
              <Button
                size="lg"
                asChild
                className="ml-16 w-full sm:w-auto bg-[#FF9900] hover:bg-orange-600 text-[#232F3E] rounded-full 3xl:text-3xl"
              >
                <Link to="/help" className="px-8 3xl:py-8">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Wave Effect */}
      <div className="absolute bottom-[0px] left-0 w-full overflow-hidden leading-none">
        {/* <svg
          className="animate-wave w-[200%] h-20 md:h-24 lg:h-32"
          viewBox="0 0 1490 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1300,0 1500,50 L1500,100 L0,100 Z"
            fill="#c2dcfd"
          />
        </svg> */}

        <svg
          className="hero-waves "
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          viewBox="0 30 150 28 "
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
        `}
      </style>
    </section>
  );
};

export default Hero;
