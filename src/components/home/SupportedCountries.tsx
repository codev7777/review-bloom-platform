
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

const countries = [
  { name: "United States", code: "us", flag: "🇺🇸" },
  { name: "United Kingdom", code: "uk", flag: "🇬🇧" },
  { name: "Canada", code: "ca", flag: "🇨🇦" },
  { name: "Germany", code: "de", flag: "🇩🇪" },
  { name: "France", code: "fr", flag: "🇫🇷" },
  { name: "Italy", code: "it", flag: "🇮🇹" },
  { name: "Spain", code: "es", flag: "🇪🇸" },
  { name: "Australia", code: "au", flag: "🇦🇺" },
  { name: "Japan", code: "jp", flag: "🇯🇵" },
  { name: "Mexico", code: "mx", flag: "🇲🇽" },
  { name: "Brazil", code: "br", flag: "🇧🇷" },
  { name: "India", code: "in", flag: "🇮🇳" },
  { name: "Netherlands", code: "nl", flag: "🇳🇱" },
  { name: "Sweden", code: "se", flag: "🇸🇪" },
];

const marketplaces = [
  { name: "Amazon", logo: "amazon" },
  { name: "Etsy", logo: "etsy" },
  { name: "Shopify", logo: "shopify" },
  { name: "Walmart", logo: "walmart" },
  { name: "eBay", logo: "ebay" },
];

const SupportedCountries = () => {
  const [visibleOnMobile, setVisibleOnMobile] = useState(6);

  return (
    <section className="py-20 bg-gray-50 scroll-reveal opacity-0" id="supported-countries">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FF9900] font-medium">Global Reach</span>
          <h2 className="text-3xl font-semibold mt-2 mb-4">Supported Countries & Marketplaces</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ReviewBrothers works across multiple countries and e-commerce platforms, helping you
            collect reviews wherever your customers shop.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-medium text-center mb-8 flex items-center justify-center">
            <Globe className="mr-2 h-5 w-5 text-[#FF9900]" />
            Supported Countries
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {countries.map((country) => (
              <div 
                key={country.code}
                className="bg-white rounded-lg p-4 flex flex-col items-center text-center hover-lift"
              >
                <span className="text-4xl mb-2" aria-hidden="true">{country.flag}</span>
                <span className="text-sm font-medium">{country.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
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
                  <Card className="border-none shadow-sm hover-lift">
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
        </div>
      </div>
    </section>
  );
};

export default SupportedCountries;
