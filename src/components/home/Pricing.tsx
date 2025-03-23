
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
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
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <span className="ml-3 text-sm">{feature}</span>
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
      title: "Basic",
      price: "49",
      description: "Perfect for small vendors with 1-3 products",
      features: [
        "Up to 3 products",
        "QR code generation",
        "Review funnel",
        "Basic analytics",
        "Email support",
      ],
      cta: "Start with Basic",
    },
    {
      title: "Pro",
      price: "99",
      description: "Ideal for growing Amazon businesses",
      features: [
        "Up to 10 products",
        "Advanced analytics",
        "Email automation",
        "White-label branding",
        "Priority support",
        "Campaign management",
      ],
      cta: "Start with Pro",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "249",
      description: "For established vendors with multiple products",
      features: [
        "Unlimited products",
        "Team member accounts",
        "Advanced analytics & reports",
        "API access",
        "Dedicated account manager",
        "Custom integration options",
        "Gift card auto-issuance",
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
            All plans include a 14-day free trial. No credit card required.
          </p>
          <Button variant="link" asChild>
            <Link
              to="/pricing-details"
              className="text-primary hover:underline"
            >
              View full pricing details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
