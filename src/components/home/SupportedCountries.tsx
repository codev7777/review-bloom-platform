import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

const countries = [
  { name: "United States", code: "us" },
  { name: "Turkey", code: "tr" },
  { name: "Canada", code: "ca" },
  { name: "Mexico", code: "mx" },
  { name: "United Kingdom", code: "gb" },
  { name: "Australia", code: "au" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Singapore", code: "sg" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "India", code: "in" },
  { name: "Japan", code: "jp" },
  { name: "Netherlands", code: "nl" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "UAE", code: "ae" },
  { name: "Brazil", code: "br" },
  { name: "Poland", code: "pl" },
  { name: "Egypt", code: "eg" },
  { name: "South Africa", code: "za" },
  { name: "Sweden", code: "se" },
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
      className="py-20 bg-gray-50 bg-gradient-to-b from-[#ffffff] via-[#FF9900] to-[#f9fafb]"
      id="supported-countries"
    >
      <div className="container mx-auto px-2">
        <AnimatedCard delay={200}>
          <div className="text-center mb-16">
            <h2 className="text-[45px] font-semibold mt-2 mb-4 text-center flex items-center justify-center font-[700]">
              {/* <Globe className="mt-1 mr-2 h-5 w-5 text-[#FF9900]" /> */}
              Tool for all &nbsp;
              <img src="images/amazon-logo.png" className="h-16" />
              &nbsp; Marketplaces
            </h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            ReviewBrothers works across multiple countries, helping you collect
            reviews wherever your customers shop.
          </p> */}
          </div>
        </AnimatedCard>

        <div className="mb-16">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11 gap-6 max-w-11xl mx-auto">
            {countries.map((country, index) => (
              <AnimatedCard key={country.code} delay={100}>
                <div className="rounded-lg p-2 flex flex-col items-center text-center hover:shadow-md transition w-full">
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
