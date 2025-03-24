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
            from customer feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedCard>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Review Funnel</CardTitle>
                <CardDescription>
                  Simplify the review collection process with our streamlined
                  funnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass-card rounded-lg overflow-hidden mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors duration-300">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                      <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                      <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                      <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                      <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                    </div>
                    <div className="w-full h-16 rounded-md bg-white/60 p-2 text-sm text-gray-600">
                      "I absolutely love this product! It has made my life so
                      much easier."
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit ml-auto opacity-70"
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Collect more authentic reviews
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
                    asChild
                  >
                    <Link to="/review/demo-campaign">
                      Try Demo
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>QR Code Integration</CardTitle>
                <CardDescription>
                  Generate custom QR codes to place on products, packaging, or
                  receipts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass-card rounded-lg overflow-hidden mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors duration-300 flex justify-center">
                  <div className="bg-white p-4 rounded-lg w-32 h-32 flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-800" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Easy for customers to scan
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Gain insights from customer feedback with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass-card rounded-lg overflow-hidden mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors duration-300">
                  <div className="flex flex-col space-y-2">
                    <div className="w-full flex items-end space-x-1 h-24">
                      <div className="w-1/6 h-1/3 bg-orange-300 rounded-t"></div>
                      <div className="w-1/6 h-2/3 bg-orange-400 rounded-t"></div>
                      <div className="w-1/6 h-[80%] bg-orange-500 rounded-t"></div>
                      <div className="w-1/6 h-[95%] bg-orange-600 rounded-t"></div>
                      <div className="w-1/6 h-full bg-orange-700 rounded-t"></div>
                      <div className="w-1/6 h-3/4 bg-orange-500 rounded-t"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Track performance metrics
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <AnimatedCard delay={300}>
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Smartphone className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Perfect experience on any device for easy customer interaction
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground">
                Turn customer feedback into product improvements
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={700}>
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Share className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share review links across all your marketing channels
              </p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
