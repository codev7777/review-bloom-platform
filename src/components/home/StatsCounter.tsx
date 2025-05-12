import React, { useState, useEffect } from "react";
import { Users, Star, Inbox, ShoppingBag, Gift } from "lucide-react";

interface CounterProps {
  title: string;
  end: number;
  suffix?: string;
  duration?: number;
  icon: React.ReactNode;
}

const Counter = ({
  title,
  end,
  suffix = "",
  duration = 2000,
  icon,
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  // Intersection observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set to true when component comes into view
        } else {
          setIsVisible(false); // Reset when component goes out of view
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trigger animation when the component becomes visible
  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    // Reset the count to 0 every time we start the animation
    setCount(0);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end)); // Increment the count based on progress

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step); // Continue the animation
      }
    };

    animationFrame = requestAnimationFrame(step); // Start the animation

    return () => cancelAnimationFrame(animationFrame); // Clean up on unmount
  }, [end, duration, isVisible]); // Re-run whenever end value, duration, or visibility changes

  return (
    <div
      ref={divRef}
      className={`flex flex-col items-center transition-opacity duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-white">
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className="text-white mt-2 text-center">{title}</p>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="pt-12 bg-gray-50  max-w-screen">
      <div className="container mx-auto px-4 bg-gradient-to-r from-[#232F3E] to-[#37475A] py-8 rounded-3xl 3xl:max-w-[1500px]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mt-2 font-montserrat text-white">
            Trusted by Thousands of Sellers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Counter
            title="Active Vendors"
            end={3864}
            icon={<Users className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Reviews Collected"
            end={31423}
            icon={<Star className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Campaigns Created"
            end={512}
            icon={<ShoppingBag className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Promotions Created"
            end={1067}
            icon={<Gift className="h-8 w-8 text-[#FF9900]" />}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
