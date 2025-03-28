import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = [
    "/images/landing/hero/landing-1.png",
    "/images/landing/hero/landing-2.png",
    "/images/landing/hero/landing-3.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageLoaded(false); // Trigger fade-out before changing image
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 300); // Delay image change for smooth transition (500ms fade-out duration)
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  const handlePrev = () => {
    setImageLoaded(false); // Trigger fade-out before changing image
    setTimeout(() => {
      setCurrentImage(
        (prevImage) => (prevImage - 1 + images.length) % images.length
      );
    }, 300); // Delay image change for smooth transition
  };

  const handleNext = () => {
    setImageLoaded(false); // Trigger fade-out before changing image
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 100); // Delay image change for smooth transition
  };

  const handleImageLoad = () => {
    setImageLoaded(true); // Set image as loaded after it finishes loading
  };

  return (
    <section className="bg-[#2F3C4D]">
      <div
        className="relative w-full w-full aspect-[24/7] bg-cover bg-no-repeat transition-opacity duration-500 bg-secondary"
        style={{
          backgroundImage: `url('${images[currentImage]}')`,
          opacity: imageLoaded ? 1 : 0, // Fade effect when image is loaded
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-white to-gray-50 z-[-1]"></div>
        <div className="container mx-auto px-4  max-w-[400px]">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="mt-24 inline-flex items-left px-5 py-16 rounded-full  text-[#FF9900] text-4xl font-medium">
                <Link to="/auth/signup">
                  <span className="underline hover:text-[#CC7700]">
                    Boost Reviews
                  </span>
                  <br />
                  <div className="text-white mt-2">
                    Collect Emails <br /> Drive Sales
                  </div>
                  <div className="text-xl text-white mt-8">
                    ...with AI-powered review tunnel
                  </div>
                </Link>
              </div>
            </div>
            <div className=" flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-[#FF9900] hover:bg-orange-600 text-[#232F3E]"
              >
                <Link to="/help" className="px-8">
                  Learn More
                </Link>
              </Button>
              <Button
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
              </Button>
            </div>
            {/* <p className="mt-8 sm:mt-16 text-xl text-white max-w-2xl mx-auto animate-fade-in font-bold">
            The all-in-one platform that helps Amazon vendors collect, manage,
            and leverage product reviews to boost sales and improve products.
          </p> */}
          </div>

          <div className="absolute top-1/2 left-0 right-0 flex justify-between z-10 transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="p-4 text-4xl  hover:opacity-50"
            >
              <img
                src="/images/landing/hero/left.png"
                style={{ height: "64px" }}
              />
            </button>
            <button
              onClick={handleNext}
              className="p-1 text-4xl  hover:opacity-50"
            >
              <img
                src="/images/landing/hero/right.png"
                style={{ height: "64px" }}
              />
            </button>
          </div>
        </div>

        {/* Preload images to avoid gaps */}
        <img
          src={images[currentImage]}
          alt="Hero Slide"
          onLoad={handleImageLoad}
          className="hidden"
        />
      </div>
    </section>
  );
};

export default Hero;
