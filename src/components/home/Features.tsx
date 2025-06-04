import { QrCode, Lightbulb, BarChart4, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        } else {
          setIsVisible(false); // Reset visibility when leaving the viewport
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
      className="py-24 bg-gradient-to-b from-gray-50 to-white  max-w-screen"
    >
      <div className="container px-4 mx-auto 3xl:max-w-[1500px]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Card 1 */}
          <AnimatedCard delay={100}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-01.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-02.png"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-03.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          {/* <AnimatedCard delay={700}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-04.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard> */}

          <AnimatedCard delay={200}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-05.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          {/* <AnimatedCard delay={400}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-06.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={600}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-07.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={800}>
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col min-h-64">
              <img
                src="/images/landing/features/card-08.jpg"
                alt="Card Image"
                className="w-full h-full object-cover aspect-w-1 aspect-h-1 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Card>
          </AnimatedCard> */}
        </div>
      </div>
    </section>
  );
};

export default Features;
