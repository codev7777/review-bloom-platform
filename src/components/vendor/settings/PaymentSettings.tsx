import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
// Removed duplicate import of PaymentMethodForm

// import PaymentMethodForm from "@/components/vendor/payments/PaymentMethodForm";
import PaymentMethodList from "@/components/payments/PaymentMethodList";
import BillingHistory from "@/components/payments/BillingHistory";
import PaymentMethodForm from "@/components/payments/PaymentMethodForm";
import { toast } from "@/components/ui/sonner";
import { Check } from "lucide-react";

const plans = [
  {
    title: "SILVER",
    desc: "Great for small vendors starting out",
    monthly: 59,
    annually: 49,
    features: [
      { name: "Unlimited Reviews", included: true },
      { name: "Unlimited Leads", included: true },
      { name: "1 Campaign", included: true },
      { name: "1 Promotion", included: true },
      { name: "1 Product", included: true },
      { name: "1 Marketplace", included: true },
    ],
    planId: "silver",
  },
  {
    title: "GOLD",
    desc: "For growing businesses expanding their reach",
    monthly: 99,
    annually: 79,
    features: [
      { name: "Unlimited Reviews", included: true },
      { name: "Unlimited Leads", included: true },
      { name: "Unlimited Campaigns", included: true },
      { name: "10 Promotions", included: true },
      { name: "30 Products", included: true },
      { name: "All Marketplaces", included: true },
      { name: "Collect Seller Feedback", included: true },
      { name: "Personalized Branding", included: true },
    ],
    planId: "gold",
  },
  {
    title: "PLATINUM",
    desc: "For established businesses scaling at full speed",
    monthly: 199,
    annually: 179,
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
    planId: "platinum",
  },
];

const PaymentSettings = () => {
  const [selectedPlan] = useState("gold"); // Default to gold plan

  const handleRefreshData = async () => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Payment information refreshed");
  };

  const handleDeletePaymentMethod = (id: string) => {
    toast.success(`Payment method ${id.slice(-4)} deleted`);
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    toast.success(`Payment method ${id.slice(-4)} set as default`);
  };

  const handleSelectPlan = (planId: string) => {
    toast.info(`Selected plan: ${planId}`);
    // In a real implementation, this would redirect to checkout or update subscription
  };

  return (
    <div className="min-h-screen bg-[#212631] text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Payment Settings</h1>

        {/* Plans Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.planId}
                className={`rounded-lg p-6 flex flex-col ${
                  selectedPlan === plan.planId
                    ? "bg-[#ef600f] bg-opacity-10 border-2 border-[#ef600f]"
                    : "bg-white bg-opacity-5 border border-gray-700"
                }`}
              >
                <div className="text-xl font-bold mb-2">{plan.title}</div>
                <div className="text-gray-400 mb-4">{plan.desc}</div>
                <div className="text-3xl font-bold mb-6">
                  ${plan.monthly}
                  <span className="text-lg font-normal text-gray-400">/mo</span>
                </div>
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check
                        className={`h-5 w-5 ${
                          feature.included ? "text-[#ef600f]" : "text-gray-600"
                        }`}
                      />
                      <span className={feature.included ? "" : "text-gray-600"}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleSelectPlan(plan.planId)}
                  className={`w-full mt-auto ${
                    selectedPlan === plan.planId
                      ? "bg-[#ef600f] hover:bg-[#d85100]"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {selectedPlan === plan.planId
                    ? "Current Plan"
                    : "Select Plan"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
          <Elements stripe={stripePromise}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentMethodList
                onDelete={handleDeletePaymentMethod}
                onSetDefault={handleSetDefaultPaymentMethod}
              />
              <PaymentMethodForm />
            </div>
          </Elements>
        </div>

        {/* Billing History Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Billing History</h2>
          <BillingHistory />
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
