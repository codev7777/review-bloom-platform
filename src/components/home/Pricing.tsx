import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingStar from "../ui/floatingStar";
import FloatingRocket from "../ui/floatingRocket";

const RandomStars = ({ count = 8 }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    const size = Math.floor(Math.random() * 10) + 12; // 12 to 22 px
    const top = Math.random() * 90 + "%";
    const left = Math.random() * 90 + "%";
    const delay = Math.random() * 5; // 0 to 5s delay

    return (
      <FloatingStar key={i} size={size} delay={delay} style={{ top, left }} />
    );
  });

  return <>{stars}</>;
};

const PricingTier = ({
  title,
  AnnuallyPrice,
  MonthlyPrice,
  description,
  features,
  cta,
  isPopular,
  color,
  buttonColor,
  isAnnual,
}) => {
  return (
    <div
      id="pricing"
      className={
        isPopular
          ? "transform lg:scale-110 flex justify-center w-full"
          : "flex justify-center w-full"
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 100 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-[500px] lg:w-[320px] xl:w-[400px] relative flex flex-col rounded-xl shadow-xl transition-all duration-300 hover:shadow-custom border-2 bg-white mb-10 pb-8`}
      >
        {/* <RandomStars count={50} /> */}
        {isPopular && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -top-5 xl:left-[115px] transform -translate-x-1/2 left-[155px] lg:left-[75px] z-50"
          >
            <div className="relative bg-[#ff0000] text-white text-base font-medium px-4 py-1 uppercase shadow-md rounded-t-md">
              Most Popular
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#ff0000] rotate-45"></div>
            </div>
          </motion.div>
        )}
        <div className="bg-[#2e3a48] h-[70px] sm:h-[100px] mx-auto w-full p-6 sm:p-8 rounded-t-xl">
          <h3 className="text-2xl sm:text-4xl font-semibold mt-0 mb-0 text-center text-white z-10 bg-[#2e3a48]">
            {title}
          </h3>
        </div>
        <div className="text-center mt-6 sm:mt-8 mb-2 text-white text-2xl sm:text-3xl font-bold z-10 bg-white">
          <div className="mb-2">
            {isPopular && (
              <div className="text-2xl mb-6 animate-colorSwap px-2">
                Limited Time Extra 20% Off!
              </div>
            )}
            {isPopular && (
              <span className="text-[#2e3a48] line-through text-xl">
                {isAnnual ? "$99" : "$119"}
              </span>
            )}
            {"   "}&nbsp;
            <span className="text-6xl text-[#fc880a]">
              ${isAnnual ? AnnuallyPrice : MonthlyPrice}
            </span>
            <span className="text-3lg text-[#2e3a48]"> /mo</span>
          </div>
          {isAnnual && (
            <div className="text-lg text-green-500 font-semibold z-10 bg-white">
              billed annually
            </div>
          )}
          <div className="mt-2 text-lg text-white opacity-70  z-10 bg-white">
            or <span className="font-medium">${MonthlyPrice}/mo</span> billed
            monthly
          </div>
        </div>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow ml-4 sm:ml-7 z-10 bg-white mr-4 sm:mr-10">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start text-white text-lg sm:text-xl z-10 bg-white"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {feature.included ? (
                <Check className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 text-green-500 z-10 bg-white stroke-[5]" />
              ) : (
                <X className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 text-red-500 z-10 bg-white stroke-[5]" />
              )}
              <span className={`ml-1 sm:ml-3 text-base sm:text-lg z-10 bg-white text-start text-[#2e3a48] font-bold ${!feature.included ? 'line-through [text-decoration-color:red] [text-decoration-thickness:2px]' : ''}`}>
                {feature.name}
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="mb-6 sm:mb-10 mt-6 sm:mt-10 z-50"
        >
          <Button
            className={` w-full bg-[#fc880a] hover:bg-[#f97316] inline text-white px-4 py-3 text-xl z-50`}
            asChild
          >
            <Link to="/auth/signup">Get Started for Free</Link>
          </Button>
        </motion.div>
        <span className="text-[#2e3a48] z-50 text-xs sm:text-base">* No credit card required</span>
      </motion.div>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleBilling = () => setIsAnnual(!isAnnual);

  const tiers = [
    {
      title: "SILVER",
      AnnuallyPrice: "49",
      MonthlyPrice: "59",
      description: "Great for small vendors starting out",
      features: [
        { name: "Unlimited Reviews", included: true },
        { name: "Unlimited Leads", included: true },
        { name: "1 Campaign", included: true },
        { name: "1 Promotion", included: true },
        { name: "1 Product", included: true },
        { name: "1 Marketplace", included: true },
        { name: "Collect Seller Feedback", included: false },
        { name: "Personalized Branding", included: false },
        { name: "Multiple Sub-Accounts", included: false },
      ],
      cta: "Start with Silver",
      color: "bg-gray-200 border-gray-400",
      buttonColor: "bg-gray-400 hover:bg-gray-600",
      isPopular: false,
    },
    {
      title: "GOLD",
      AnnuallyPrice: "79",
      MonthlyPrice: "99",
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
        { name: "Multiple Sub-Accounts", included: false },
      ],
      cta: "Start with Gold",
      isPopular: true,
      color: "bg-yellow-200 border-yellow-500",
      buttonColor: "bg-yellow-400 hover:bg-yellow-600",
    },
    {
      title: "PLATINUM",
      AnnuallyPrice: "179",
      MonthlyPrice: "199",
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
        { name: "Multiple Sub-Accounts", included: true },
      ],
      cta: "Start with Platinum",
      color: "bg-blue-200 border-blue-500",
      buttonColor: "bg-blue-400 hover:bg-blue-600",
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-24 bg-muted/50 max-w-screen">
      <div className="container mx-auto px-2 sm:px-8 text-center max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-[35px] lg:text-[25px] xl:text-[35px] font-semibold mt-2 mb-2 sm:mb-4 text-center lg:flex items-center justify-center font-[700] text-black">
            Plans Made for &nbsp;
            <div className="flex items-center justify-center">
              <img
                src="images/amazon-logo.png"
                className="h-10 sm:h-16 mt-2 lg:h-12 lg:mt-1"
              />{" "}
              &nbsp; <b>Sellers</b>
            </div>
            – Simple, Scalable, Transparent
          </h2>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-5 sm:mt-10 mb-4 sm:mb-8"
        >
          <div className="flex itemx-center justify-center font-bold text-[#ff9900] text-2xl sm:text-4xl my-2 sm:my-5">
            Save Up to 20%
          </div>
          <div className="text-lg sm:text-2xl text-[#2e3a48] font-bold mb-2 sm:mb-4 ">
            per month when build annually
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <span
              className={`w-10 sm:w-20 ${!isAnnual ? "text-xs sm:text-xl font-bold text-[#ff9900]" : "text-xs sm:text-md"}`}
            >
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className="relative w-10 sm:w-16 h-6 sm:h-8 bg-gray-300 rounded-full flex items-center transition-all duration-300 p-1"
            >
              <motion.div
                className="w-5 sm:w-7 h-5 sm:h-7 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? 30 : 0, y: 0 }}
              />
            </button>
            <span
              className={`w-10 sm:w-20 ${!isAnnual ? "text-xs sm:text-md" : "text-xs sm:text-xl font-bold text-[#ff9900]"}`}
            >
              Annually
            </span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3 mx-auto px-10 lg:px-20">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
