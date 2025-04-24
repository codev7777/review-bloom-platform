import { useState, useEffect } from "react";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  getBillingDetails,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  type PaymentMethod,
} from "@/lib/api/billing/billing.api";
import api from "@/lib/api/axiosConfig";

// Subscription plans
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
      { name: "Meta Pixel Support", included: false },
      { name: "Business Features", included: false },
    ],
    planId: "silver",
    priceId: "price_1RH8eXPuMpDKUxfQN4XUH99L",
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
      { name: "Meta Pixel Support", included: true },
    ],
    planId: "gold",
    priceId: "price_1RH8eZPuMpDKUxfQAWOjGe19",
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
      { name: "Meta Pixel Support", included: true },
      { name: "Multiple Sub-Accounts", included: true },
    ],
    planId: "platinum",
    priceId: "price_1RH8ecPuMpDKUxfQhtgExI7J",
  },
];

const useSubscription = () => {
  const { user } = useAuth();
  const [tier, setTier] = useState<string | null>(null);
  const [status, setStatus] = useState<"active" | "none" | "canceled">("none");
  const [loading, setLoading] = useState(false);

  const fetchSubscription = async () => {
    // console.log("user", user);
    if (!user?.id) return;

    try {
      // console.log("11");
      const detail = await getBillingDetails(user.id);
      const details = detail.data;
      console.log("22");
      console.log("details1 ", details);
      if (details.subscription) {
        setTier(details.subscription.plan.name.toLowerCase());
        setStatus(details.subscription.status.toLowerCase());
        // console.log(details.subscription.plan.id);
        console.log(tier);
      } else {
        setTier(null);
        setStatus("none");
      }
    } catch (error) {
      // console.error("Failed to fetch subscription:", error);
      toast({
        variant: "destructive",
        title: "Error loading subscription",
        description: "Could not load subscription details.",
      });
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user?.id]);

  const subscribe = async (plan: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to subscribe.",
      });
      return;
    }

    const selectedPlan = plans.find((p) => p.planId === plan);
    if (!selectedPlan) {
      toast({
        variant: "destructive",
        title: "Invalid Plan",
        description: "Selected plan not found.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/billing/create-checkout-session", {
        userId: user.id,
        priceId: selectedPlan.priceId,
        success_url: `${window.location.origin}/subscription?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/subscription`,
      });

      const { url } = res.data;

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast({
        variant: "destructive",
        title: "Subscription Error",
        description: "Failed to initiate checkout. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const manage = async () => {
    setLoading(true);
    try {
      const res = await api.post("/billing/create-portal-session");
      const { url } = res.data;

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Portal Error",
        description: "Unable to open billing portal.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    tier,
    status,
    loading,
    subscribe,
    manage,
    refresh: fetchSubscription,
  };
};

export function SubscriptionPanel() {
  const { user } = useAuth();
  const [annual, setAnnual] = useState(true);
  const { tier, status, loading, subscribe, manage, refresh } =
    useSubscription();
  const [billing, setBilling] = useState<{
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod?: PaymentMethod;
  }>({ paymentMethods: [] });

  useEffect(() => {
    const loadBillingDetails = async () => {
      if (!user?.id) return;
      try {
        const details = await getBillingDetails(user.id);
        console.log("details2 ", details);
        setBilling({
          paymentMethods: details.paymentMethods,
          defaultPaymentMethod: details.defaultPaymentMethod,
        });
      } catch (error) {
        console.error("Error loading billing details:", error);
        toast({
          variant: "destructive",
          title: "Error loading billing details",
          description: "Please try again later",
        });
      }
    };

    loadBillingDetails();
  }, []);
  useEffect(() => {
    refresh(); // Always refresh subscription status when this panel mounts
  }, []);
  return (
    <TabsContent value="subscription" className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-1 text-white">
          Subscription & Billing
        </h3>
        <p className="text-white text-sm">
          Manage your subscription, payment methods, and billing information
        </p>
      </div>

      {/* Billing Switch */}
      <div className="flex items-center gap-4 mb-8">
        <span className={!annual ? "text-orange-400 font-bold" : "text-white"}>
          Monthly
        </span>
        <button
          onClick={() => setAnnual((a) => !a)}
          className={`w-14 h-7 rounded-full bg-gray-400 p-1 transition-all flex items-center ${
            annual ? "justify-end bg-orange-500" : "justify-start"
          }`}
          aria-label="Toggle billing"
        >
          <span className="block w-6 h-6 bg-white rounded-full shadow" />
        </button>
        <span className={annual ? "text-orange-400 font-bold" : "text-white"}>
          Annually
        </span>
        <span className="ml-4 py-1 px-2 bg-orange-100 text-orange-600 rounded text-xs font-semibold">
          {annual ? "Save 20%" : "Cancel anytime"}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-xl border border-gray-300 bg-[#2e3a48] flex flex-col p-7 relative"
          >
            {/* {console.log(tier === plan.planId, status)} */}
            {tier === plan.planId && status === "active" && (
              <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-green-500 text-white rounded-full font-bold shadow">
                Current
              </span>
            )}
            <div className="mb-2">
              <h4 className="text-2xl font-bold text-white">{plan.title}</h4>
              <p className="text-orange-400 font-semibold mb-2">{plan.desc}</p>
              <div className="flex items-end gap-2 mb-3">
                <div className="text-3xl font-bold text-white">
                  ${annual ? plan.annually : plan.monthly}
                  <span className="text-base font-normal">/mo</span>
                </div>
                <div className="text-sm text-gray-200 opacity-70">
                  {annual ? "billed yearly" : "billed monthly"}
                </div>
              </div>
            </div>
            <ul className="mb-8 mt-2 grid gap-2">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-white text-md"
                >
                  <Check
                    className={`w-5 h-5 ${
                      f.included ? "text-green-400" : "text-gray-400 opacity-60"
                    }`}
                  />
                  <span
                    className={
                      f.included ? "font-semibold" : "line-through opacity-70"
                    }
                  >
                    {f.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              {tier === plan.planId && status === "active" ? (
                <Button
                  disabled
                  className="w-full bg-green-500 text-white cursor-default"
                >
                  Your Plan
                </Button>
              ) : (
                <Button
                  onClick={() => subscribe(plan.planId)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Choose Plan"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <Button
          variant="outline"
          className="bg-white text-orange-500 border-orange-500 border font-semibold"
          onClick={manage}
        >
          Manage Subscription
        </Button>
      </div>
    </TabsContent>
  );
}

export default SubscriptionPanel;
