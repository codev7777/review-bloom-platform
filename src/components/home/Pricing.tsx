import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: { name: string; included: boolean }[];
  cta: string;
  isPopular?: boolean;
}

const PricingTier = ({
  title,
  price,
  description,
  features,
  cta,
  isPopular = false,
}: PricingTierProps) => {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-hover ${
        isPopular
          ? "bg-gradient-to-b from-white to-secondary/5 border-2 border-secondary"
          : "bg-white border border-border"
      }`}
    >
      {isPopular && (
        <span className="absolute top-0 right-8 -translate-y-1/2 bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-muted-foreground">/month</span>
        <div className="text-sm text-muted-foreground">Billed annually</div>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            )}
            <span className="ml-3 text-sm">{feature.name}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={isPopular ? "default" : "outline"}
        className={`w-full ${isPopular ? "bg-secondary hover:bg-secondary/90" : ""}`}
        asChild
      >
        <Link to="/auth/signup">{cta}</Link>
      </Button>
    </div>
  );
};

const Pricing = () => {
  const tiers = [
    {
      title: "Starter",
      price: "29",
      description: "Great for small vendors starting out",
      features: [
        { name: "Unlimited Reviews", included: true },
        { name: "Unlimited Leads", included: true },
        { name: "1 Campaign", included: true },
        { name: "1 Promotion", included: true },
        { name: "1 Product", included: true },
        { name: "1 Marketplace", included: true },
        { name: "Collect Seller Feedback", included: false },
        { name: "Meta Pixel Support", included: false },
        { name: "Business Features", included: false },
      ],
      cta: "Start with Starter",
    },
    {
      title: "Pro",
      price: "99",
      description: "For growing businesses expanding their reach",
      features: [
        { name: "Unlimited Reviews", included: true },
        { name: "Unlimited Leads", included: true },
        { name: "Unlimited Campaigns", included: true },
        { name: "10 Promotions", included: true },
        { name: "30 Products", included: true },
        { name: "All Marketplaces", included: true },
        { name: "Collect Seller Feedback", included: true },
        { name: "Personalized Branding", included: true },
        { name: "Meta Pixel Support", included: true },
      ],
      cta: "Start with Pro",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "199",
      description: "For established businesses scaling at full speed",
      features: [
        { name: "Unlimited Reviews", included: true },
        { name: "Unlimited Leads", included: true },
        { name: "Unlimited Campaigns", included: true },
        { name: "Unlimited Promotions", included: true },
        { name: "Unlimited Products", included: true },
        { name: "All Marketplaces", included: true },
        { name: "Collect Seller Feedback", included: true },
        { name: "Personalized Branding", included: true },
        { name: "Meta Pixel Support", included: true },
        { name: "Multiple Sub-Accounts", included: true },
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-semibold text-foreground text-3xl sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your business needs, with no hidden fees or
            long-term commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans are billed annually. 14-day free trial included. No credit card required.
          </p>
          <Button variant="link" asChild>
            <Link to="/pricing-details" className="text-primary hover:underline">
              View full pricing details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
