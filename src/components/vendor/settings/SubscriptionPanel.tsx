
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

// Subscription tiers, based on Pricing.tsx
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
  },
];

const useSubscription = () => {
  // You'd normally fetch this from server.
  // Demo status—update with actual data source if available.
  const [tier, setTier] = useState<string | null>(null);
  const [status, setStatus] = useState<"active" | "none" | "canceled">("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetch on mount.
    // Replace with real API for your project
    setTimeout(() => {
      setTier(null); // e.g. "gold"
      setStatus("none");
    }, 300);
  }, []);

  // These would call your real Stripe/Supabase endpoints.
  const subscribe = async (plan: string) => {
    setLoading(true);
    try {
      // Call your subscription endpoint here
      await new Promise((r) => setTimeout(r, 1000));
      setTier(plan);
      setStatus("active");
      toast({ title: "Successfully subscribed!", description: `You are now on the ${plan} plan.`, });
      // Optionally, redirect to Stripe checkout if necessary
    } catch (err) {
      toast({ variant: "destructive", title: "Subscription error", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const manage = async () => {
    setLoading(true);
    try {
      // Call endpoint to open Stripe portal here
      window.open("https://dashboard.stripe.com", "_blank");
    } catch (err) {
      toast({ variant: "destructive", title: "Unable to open portal", });
    } finally {
      setLoading(false);
    }
  };

  return { tier, status, loading, subscribe, manage };
};

const SubscriptionPanel = () => {
  const [annual, setAnnual] = useState(true);
  const { tier, status, loading, subscribe, manage } = useSubscription();

  return (
    <TabsContent value="subscription" className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-1 text-white">Subscription</h3>
        <p className="text-white text-sm">
          Choose a plan to unlock advanced features, manage or upgrade your subscription anytime.
        </p>
      </div>
      {/* Billing Switch */}
      <div className="flex items-center gap-4 mb-8">
        <span className={!annual ? "text-orange-400 font-bold" : "text-white"}>Monthly</span>
        <button
          onClick={() => setAnnual((a) => !a)}
          className={`w-14 h-7 rounded-full bg-gray-400 p-1 transition-all flex items-center ${annual ? 'justify-end bg-orange-500' : 'justify-start'}`}
          aria-label="Toggle billing"
        >
          <span className="block w-6 h-6 bg-white rounded-full shadow" />
        </button>
        <span className={annual ? "text-orange-400 font-bold" : "text-white"}>Annually</span>
        <span className="ml-4 py-1 px-2 bg-orange-100 text-orange-600 rounded text-xs font-semibold">{annual ? "Save 20%" : "Cancel anytime"}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <div key={idx} className={`rounded-xl shadow-xl border border-gray-300 bg-[#2e3a48] flex flex-col p-7 relative`}>
            {tier === plan.planId && status === "active" && (
              <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-green-500 text-white rounded-full font-bold shadow">Current</span>
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
                <li key={i} className="flex items-center gap-2 text-white text-md">
                  <Check className={`w-5 h-5 ${f.included ? "text-green-400" : "text-gray-400 opacity-60"}`} />
                  <span className={f.included ? "font-semibold" : "line-through opacity-70"}>{f.name}</span>
                </li>
              ))}
            </ul>
            {/* Actions */}
            <div className="mt-auto">
              {tier === plan.planId && status === "active" ? (
                <Button disabled className="w-full bg-green-500 text-white cursor-default">Your Plan</Button>
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
};

export default SubscriptionPanel;
