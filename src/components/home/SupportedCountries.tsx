import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

const countries = [
  { name: "United States", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "Mexico", code: "mx" },
  { name: "United Kingdom", code: "gb" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "India", code: "in" },
  { name: "Japan", code: "jp" },
  { name: "Netherlands", code: "nl" },
  { name: "Sweden", code: "se" },
  { name: "Australia", code: "au" },
  { name: "Brazil", code: "br" },
  { name: "Singapore", code: "sg" },
  { name: "Turkey", code: "tr" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "UAE", code: "ae" },
  { name: "Poland", code: "pl" },
  { name: "Egypt", code: "eg" },
  { name: "South Africa", code: "za" },
];

const AnimatedCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const SupportedCountries = () => {
  return (
    <section
      className="py-20 bg-gradient-to-b to-gray-50 from-[#bedafd] max-x-screen"
      id="supported-countries"
    >
      <div className="container mx-auto px-2">
        <AnimatedCard delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-[35px] lg:text-[25px] xl:text-[35px] font-semibold mt-2 mb-4 text-center block lg:flex items-center justify-center font-[700]">
              {/* <Globe className="mt-1 mr-2 h-5 w-5 text-[#FF9900]" /> */}
              🚀 The Ultimate Tool for all&nbsp;
              <div className="flex justify-center items-center">
                <img
                  src="images/amazon-logo.png"
                  className="h-16 mt-2 xl:h-16  xl:mt-2 lg:h-12 lg:mt-1"
                />
                &nbsp; <b>Sellers</b>
              </div>
              — Across Every Marketplace
            </h2>
            <p className="max-w-2xl mx-auto font-bold text-2xl">
              One platform. 21 countries. Unlimited insights.
            </p>
          </div>
        </AnimatedCard>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
            {countries.map((country, index) => (
              <AnimatedCard key={country.code} delay={100}>
                <div className="rounded-lg p-2 flex flex-col items-center text-center hover:shadow-md transition w-full max-w-[100px]">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={`https://flagcdn.com/w320/${country.code}.png`}
                      alt={country.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium mt-1">
                    {country.name}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedCountries;
