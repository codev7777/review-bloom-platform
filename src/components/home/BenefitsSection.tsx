import { useEffect, useState, useRef } from "react";
import { ArrowRight, LineChart, Mail, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      title: "Boost Reviews and Ratings",
      description:
        "Get more customer feedback and increase your product ratings with seamless review requests",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Build Your Email List",
      description:
        "Collect customer details and email addresses for future marketing campaigns and product launches",
      icon: <Mail className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Increase Customer Engagement",
      description:
        "Make it easy for shoppers to connect with your brand, redeem gifts, and leave valuable feedback",
      icon: <ThumbsUp className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Track Growth Metrics",
      description:
        "Monitor key performance indicators with detailed analytics on review conversion rates",
      icon: <LineChart className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <section ref={sectionRef} className="py-10 bg-gray-50 max-w-screen">
      <div className="container mx-auto px-4">
        {/* <div
          className={`text-center mb-12 transition-opacity duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-[#FF9900] font-medium">Why Choose ReviewBrothers</span>
          <h2 className="text-3xl font-semibold mt-2 mb-4">
            Boost Your Sales with Better Product Reviews
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            Our platform helps you collect more authentic reviews, build
            customer relationships, and increase your product visibility across
            marketplaces.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <AnimatedCard delay={index * 100}>
              <div
                key={index}
                className={`flex border rounded-lg p-6 bg-white transition-opacity duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="mr-4 mt-1">
                  <div className="p-3 rounded-lg bg-gray-100">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div> */}

        {/* CTA Section */}
        <div
          className={`bg-gradient-to-r from-[#232F3E] to-[#37475A] rounded-xl p-8 md:p-12 transition-opacity duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-semibold text-white mb-3">
                Ready to grow your business?
              </h3>
              <p className="text-gray-300">
                Join thousands of sellers who've boosted their reviews and sales
                with our platform.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] shrink-0"
            >
              <Link to="/auth/signup" className="px-8 group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
