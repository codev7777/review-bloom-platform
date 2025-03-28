import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Australia", code: "au" },
  { name: "Japan", code: "jp" },
  { name: "Mexico", code: "mx" },
  { name: "Brazil", code: "br" },
  { name: "India", code: "in" },
  { name: "Netherlands", code: "nl" },
  { name: "Sweden", code: "se" },
];

const marketplaces = [
  { name: "Amazon", logo: "amazon" },
  { name: "Etsy", logo: "etsy" },
  { name: "Shopify", logo: "shopify" },
  { name: "Walmart", logo: "walmart" },
  { name: "eBay", logo: "ebay" },
];

const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
    <section className="py-20 bg-gray-50" id="supported-countries">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* <span className="text-[#FF9900] font-medium">Global Reach</span> */}
          <h2 className="text-3xl font-semibold mt-2 mb-4 text-center flex items-center justify-center">
            <Globe className="mt-1 mr-2 h-5 w-5 text-[#FF9900]" />
            Supported Countries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            ReviewBrothers works across multiple countries, helping you collect
            reviews wherever your customers shop.
          </p>
        </div>

        {/* Supported Countries */}
        <div className="mb-16">
          {/* <h3 className="text-xl font-medium text-center mb-8 flex items-center justify-center">
            <Globe className="mr-2 h-5 w-5 text-[#FF9900]" />
            Supported Countries
          </h3> */}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
            {countries.map((country, index) => (
              <AnimatedCard delay={100 * index}>
                <div
                  key={country.code}
                  className="bg-white rounded-lg p-2 flex flex-col items-center text-center shadow-sm hover:shadow-md transition w-full"
                >
                  <div className="w-full h-24 flex items-center justify-center overflow-hidden rounded-md">
                    <img
                      src={`https://flagcdn.com/w320/${country.code}.png`}
                      alt={country.name}
                      className=" object-cover"
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

        {/* Supported Marketplaces */}
        {/*<div>
          <h3 className="text-xl font-medium text-center mb-8">Supported Marketplaces</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="max-w-3xl mx-auto"
          >
            <CarouselContent>
              {marketplaces.map((marketplace) => (
                <CarouselItem key={marketplace.name} className="basis-1/3 md:basis-1/5">
                  <Card className="border-none shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <span className="text-lg font-semibold">{marketplace.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium">{marketplace.name}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>*/}
      </div>
    </section>
  );
};

export default SupportedCountries;
