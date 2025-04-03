import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className={isPopular && "transform scale-110 max-w-screen"}>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 100 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-[400px] h-[880px] relative flex flex-col p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border-2 bg-[url('/images/landing/pricing-background.png')]  bg-cover mb-20`}
      >
        {isPopular && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -top-3 left-[120px] transform -translate-x-1/2"
          >
            <div className="relative bg-primary text-white text-xl font-medium px-4 py-1 uppercase shadow-md rounded-t-md">
              Most Popular
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
            </div>
          </motion.div>
        )}
        <h3 className="text-5xl font-semibold mt-4 mb-2 text-center text-white">
          {title}
        </h3>
        <div className="mb-12 text-center mt-16 text-[#3d64f2] text-6xl flex flex-col">
          <span className="font-bold">${price}</span>
          {/* <div className="text-4xl">
          <br />
        </div> */}
          <span className="font-bold text-lg">
            per month
            {/* {isAnnual ? "(Annually Billing)" : ""} */}
          </span>
        </div>

        <ul className="space-y-3 mb-8 flex-grow ml-7">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start text-white text-xl"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {feature.included ? (
                <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-500" />
              ) : (
                <X className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-500" />
              )}
              <span className="ml-3 text-lg">{feature.name}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="mb-10"
        >
          <Button
            // variant={isPopular ? "default" : "outline"}
            className={` w-full bg-[#3c5efd] hover:bg-[#4c6eff] inline text-white px-10 py-5 text-3xl`}
            asChild
          >
            <Link to="/auth/signup">B u y&nbsp;&nbsp; N o w</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleBilling = () => setIsAnnual(!isAnnual);

  const tiers = [
    {
      title: "Silver",
      price: isAnnual ? "49" : "59",
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
      price: isAnnual ? "79" : "99",
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
      price: isAnnual ? "179" : "199",
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
      buttonColor: "bg-blue-400 hover:bg-blue-600",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-semibold text-3xl"
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-muted-foreground mb-6"
        >
          Choose the plan that fits your business needs, with no hidden fees or
          long-term commitments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className={`font-medium ${isAnnual ? "text-xl" : "text-md"}`}>
            Monthly
          </span>
          <button
            onClick={toggleBilling}
            className="relative w-16 h-8 bg-gray-300 rounded-full flex items-center transition-all duration-300 p-1"
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow-md"
              animate={{ x: isAnnual ? 32 : 0 }}
            />
          </button>
          <span className={`font-medium ${isAnnual ? "text-md" : "text-xl"}`}>
            Annually
          </span>
          <span className="text-green-600">(Save 20%)</span>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
