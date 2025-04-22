import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Mock plans data for demonstration
// In a real implementation, these would come from your backend
const MOCK_PLANS = [
  {
    id: "plan_basic",
    name: "Basic",
    price: 1900,
    interval: "month",
    features: ["Feature 1", "Feature 2", "Email support"],
    popular: false,
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 4900,
    interval: "month",
    features: [
      "All Basic features",
      "Feature 3",
      "Feature 4",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: 9900,
    interval: "month",
    features: [
      "All Pro features",
      "Feature 5",
      "Feature 6",
      "Dedicated support",
      "Custom integration",
    ],
    popular: false,
  },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

interface PlanSelectorProps {
  onSelectPlan?: (planId: string) => void;
  currentPlanId?: string;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({
  onSelectPlan,
  currentPlanId = "plan_pro", // Default to Pro for demonstration
}) => {
  const [billingInterval, setBillingInterval] = useState<"month" | "year">(
    "month"
  );
  const yearlyDiscount = 0.2; // 20% discount for yearly billing

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-medium mb-4">Choose a Plan</h3>

          <div className="inline-flex items-center rounded-md border p-1">
            <Button
              variant={billingInterval === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingInterval("month")}
            >
              Monthly
            </Button>
            <Button
              variant={billingInterval === "year" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingInterval("year")}
              className="relative"
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1 rounded-full">
                -20%
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_PLANS.map((plan) => {
            const isCurrentPlan = currentPlanId === plan.id;
            const price =
              billingInterval === "year"
                ? plan.price * 12 * (1 - yearlyDiscount)
                : plan.price;

            return (
              <Card
                key={plan.id}
                className={`overflow-hidden border ${
                  plan.popular ? "border-primary/50 shadow-md" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    MOST POPULAR
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="text-xl font-bold mb-1">{plan.name}</div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingInterval}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={isCurrentPlan ? "outline" : "default"}
                    disabled={isCurrentPlan}
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                  >
                    {isCurrentPlan ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanSelector;
