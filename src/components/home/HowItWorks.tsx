import {
  QrCode,
  Star,
  BarChart3,
  ShoppingBag,
  CheckCircle,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingBag className="h-10 w-10 text-[#FF9900]" />,
      title: "Create Campaigns",
      description:
        "Set up review campaigns for specific products in your inventory",
      color: "bg-orange-50",
    },
    {
      icon: <QrCode className="h-10 w-10 text-[#146EB4]" />,
      title: "Generate QR Codes",
      description:
        "Place QR codes in your product packaging or email them to customers",
      color: "bg-blue-50",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-[#232F3E]" />,
      title: "Customers Scan & Review",
      description:
        "Customers scan the code and leave their honest feedback about your product",
      color: "bg-gray-100",
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Collect Amazon Reviews",
      description:
        "Positive reviews are redirected to post on Amazon, increasing your ratings",
      color: "bg-yellow-50",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-500" />,
      title: "Review Analytics",
      description: "Track performance and gain insights from your dashboard",
      color: "bg-emerald-50",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-purple-500" />,
      title: "Grow Your Business",
      description:
        "Watch your sales increase as your review count and ratings improve",
      color: "bg-purple-50",
    },
  ];

  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* <span className="text-[#FF9900] font-medium">Simple Process</span> */}
          <h2 className="text-3xl font-semibold mt-2 mb-4">
            Need More Product Reviews?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            ReviewBrothers makes it easy to collect authentic Amazon reviews for
            your products. Follow these simple steps to boost your review count
            and product visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border border-border hover-lift animate-fade-in"
            >
              <CardContent className="pt-6">
                <div
                  className={`${step.color} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
          >
            <Link to="/auth/signup" className="px-8 group">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
