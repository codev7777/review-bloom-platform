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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Slightly increased threshold for better visibility trigger
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

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
      <h3 className="text-3xl md:text-4xl font-bold text-[#232F3E]">
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className="text-muted-foreground mt-2 text-center">{title}</p>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-16 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-[#FF9900] font-medium">Our Impact</span>
          <h2 className="text-3xl font-semibold mt-2">
            Trusted by Thousands of Sellers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <Counter
            title="Active Vendors"
            end={5000}
            icon={<Users className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Reviews Collected"
            end={1250000}
            icon={<Star className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Leads Collected"
            end={850000}
            icon={<Inbox className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Campaigns Created"
            end={75000}
            icon={<ShoppingBag className="h-8 w-8 text-[#FF9900]" />}
          />
          <Counter
            title="Promotions Created"
            end={125000}
            icon={<Gift className="h-8 w-8 text-[#FF9900]" />}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
