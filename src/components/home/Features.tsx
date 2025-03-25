import {
  ArrowRight,
  BarChart3,
  Sparkles,
  QrCode,
  Lightbulb,
  Share,
  BarChart4,
  Smartphone,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

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

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground text-primary">
            Streamline your review collection process and gain valuable insights
            from customer feedback.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <QrCode className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  Review Funnel
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/qr-code.png"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Simplify the review collection process with our streamlined
                  funnel.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <QrCode className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  QR Code Integration
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/QR-Code-Integration.jpg"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Generate custom QR codes to place on products, packaging, or
                  receipts.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <BarChart4 className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  Analytics Dashboard
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/analyze.png"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Gain insights from customer feedback with detailed analytics.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <Smartphone className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  Mobile Optimized
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/mobile.jpg"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Perfect experience on any device for easy customer
                  interaction.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  Actionable Insights
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/5stars.jpg"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Turn customer feedback into product improvements.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col min-h-64">
            <CardHeader className="px-4 py-3 bg-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-medium">
                  Easy Sharing
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src="/images/landing/easy-share.jpg"
                  alt="QR Code"
                  className="w-full max-w-[300px] h-auto max-h-60 object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <CardDescription className="text-sm text-gray-600">
                  Share review links across all your marketing channels
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
