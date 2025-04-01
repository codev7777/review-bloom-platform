import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingTier = ({
  title,
  price,
  description,
  features,
  cta,
  isPopular,
  color,
  buttonColor,
  isAnnual,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-max-[400px] relative flex flex-col p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border-2 ${color}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="relative bg-primary text-white text-sm font-medium px-4 py-1 uppercase shadow-md rounded-t-md">
            Most Popular
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-6 mb-2 text-center">{title}</h3>
      <div className="mb-12 text-center">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-muted-foreground">
          /{isAnnual ? "year" : "month"}
        </span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
            ) : (
              <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            )}
            <span className="ml-3 text-sm">{feature.name}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={isPopular ? "default" : "outline"}
        className={`w-full ${buttonColor}`}
        asChild
      >
        <Link to="/auth/signup">{cta}</Link>
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleBilling = () => setIsAnnual(!isAnnual);

  const tiers = [
    {
      title: "Silver",
      price: isAnnual ? "232" : "29",
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
      cta: "Start with Silver",
      color: "bg-gray-200 border-gray-400",
      buttonColor: "bg-gray-400 hover:bg-gray-600",
    },
    {
      title: "Gold",
      price: isAnnual ? "792" : "99",
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
      cta: "Start with Gold",
      isPopular: true,
      color: "bg-yellow-200 border-yellow-500",
      buttonColor: "bg-yellow-400 hover:bg-yellow-600",
    },
    {
      title: "Platinum",
      price: isAnnual ? "1592" : "199",
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
      cta: "Start with Platinum",
      color: "bg-blue-200 border-blue-500",
      buttonColor: "bg-blue-400  hover:bg-blue-600",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 font-semibold text-3xl">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Choose the plan that fits your business needs, with no hidden fees or
          long-term commitments.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="text-sm font-medium">Monthly</span>
          <button
            onClick={toggleBilling}
            className="relative w-16 h-8 bg-gray-300 rounded-full flex items-center transition-all duration-300 p-1"
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow-md"
              animate={{ x: isAnnual ? 32 : 0 }}
            />
          </button>
          <span className="text-sm font-medium">
            Annually <span className="text-green-600">(Save 20%)</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
