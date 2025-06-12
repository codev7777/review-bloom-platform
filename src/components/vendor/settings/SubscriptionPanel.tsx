import { useState, useEffect } from "react";
import { Check, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  getBillingDetails,
  type PaymentMethod,
} from "@/lib/api/billing/billing.api";
import api from "@/lib/api/axiosConfig";
import { DowngradeConfirmationModal } from "./DowngradeConfirmationModal";
import { validateDiscountCode } from "@/services/discountCode.service";
import { Input } from "@/components/ui/input";
import { PaymentMethodModal } from "./PaymentMethodModal";
import { PayPalCheckout } from "./PayPalCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      { name: "Collect Seller Feedback", included: false },
      { name: "Personalized Branding", included: false },
      { name: "Multiple Sub-Accounts", included: false },
      
    ],
    planId: "silver",
    monthlyPriceId: "price_1RH8eXPuMpDKUxfQN4XUH99L",
    annualPriceId: "price_1RHMYxPuMpDKUxfQxa4sycID",
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
      { name: "Multiple Sub-Accounts", included: false },
    ],
    planId: "gold",
    monthlyPriceId: "price_1RH8eZPuMpDKUxfQAWOjGe19",
    annualPriceId: "price_1RHMYyPuMpDKUxfQFLGZqK9Y",
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
    monthlyPriceId: "price_1RH8ecPuMpDKUxfQhtgExI7J",
    annualPriceId: "price_1RHMYzPuMpDKUxfQPupJxWdP",
  },
];

interface DowngradeLimits {
  products: { current: number; limit: number; exceeded: boolean };
  campaigns: { current: number; limit: number; exceeded: boolean };
  promotions: { current: number; limit: number; exceeded: boolean };
  users: { current: number; limit: number; exceeded: boolean };
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSubscription = () => {
  const { user } = useAuth();
  const [tier, setTier] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "active" | "none" | "canceled" | "trialing"
  >("none");
  const [loading, setLoading] = useState(false);
  const [annual, setAnnual] = useState(true);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<Date | null>(null);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    discount: number;
    type: string;
  } | null>(null);

  const fetchSubscription = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.companyId) return;

    try {
      const res = await api.get(`/billing/details`, {
        params: { companyId: user.companyId },
      });
      const data = res.data.data;
      setTier(data.subscription?.plan?.name?.toLowerCase() || null);
      setStatus(data.subscription?.status?.toLowerCase() || "none");
      if (data.subscription?.trialEnd) {
        setTrialEndDate(new Date(data.subscription.trialEnd));
      }
      if (data.subscription?.currentPeriodEnd) {
        setCurrentPeriodEnd(new Date(data.subscription.currentPeriodEnd));
      }
      setHasUsedTrial(data.hasUsedTrial || false);
    } catch (error) {
      console.error("Failed to fetch subscription", error);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user?.companyId]);

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a discount code",
      });
      return;
    }

    try {
      const validatedCode = await validateDiscountCode(discountCode);
      setAppliedDiscount({
        code: validatedCode.code,
        discount: validatedCode.discount,
        type: validatedCode.type,
      });
      toast({
        title: "Discount Applied",
        description: `Successfully applied ${validatedCode.code}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "The discount code is invalid or expired",
      });
      setAppliedDiscount(null);
    }
  };

  const subscribe = async (
    planId: string,
    billingType: boolean,
    isTrial: boolean = false
  ) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to subscribe.",
      });
      return;
    }

    const selectedPlan = plans.find((p) => p.planId === planId);
    if (!selectedPlan) {
      toast({
        variant: "destructive",
        title: "Invalid Plan",
        description: "Selected plan not found.",
      });
      return;
    }

    const selectedPriceId = billingType
      ? selectedPlan.annualPriceId
      : selectedPlan.monthlyPriceId;

    setLoading(true);
    try {
      const res = await api.post("/billing/create-checkout-session", {
        userId: user.id,
        priceId: selectedPriceId,
        success_url: `${window.location.origin}/subscription?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/subscription`,
        isTrial: isTrial,
        discountCode: appliedDiscount?.code,
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
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) return;

    try {
      const res = await api.post("/billing/manage-subscription", {
        userId: user.id,
      });
      const { url } = res.data;
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Manage subscription error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not redirect to billing portal.",
      });
    }
  };

  const cancelSubscription = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to cancel subscription.",
      });
      return;
    }

    setCancelLoading(true);
    try {
      await api.post("/billing/cancel-subscription", {
        userId: user.id,
      });

      toast({
        title: "Subscription Cancelled",
        description:
          "Your subscription will be cancelled at the end of the billing period.",
      });

      // Refresh subscription status
      await fetchSubscription();
    } catch (err) {
      console.error("Cancel subscription error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
      });
    } finally {
      setCancelLoading(false);
    }
  };

  return {
    tier,
    status,
    loading,
    subscribe,
    manage,
    refresh: fetchSubscription,
    annual,
    setAnnual,
    plans,
    trialEndDate,
    currentPeriodEnd,
    hasUsedTrial,
    cancelSubscription,
    cancelLoading,
    discountCode,
    setDiscountCode,
    appliedDiscount,
    applyDiscountCode,
  };
};

export function SubscriptionPanel() {
  const { user } = useAuth();
  const [annual, setAnnual] = useState(true);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [subscription, setSubscription] = useState(null);
  const [downgradeData, setDowngradeData] = useState<{
    limits: DowngradeLimits;
    targetPlanType: string;
    targetPlanId: string;
  } | null>(null);
  const {
    tier,
    status,
    loading,
    subscribe,
    refresh,
    trialEndDate,
    currentPeriodEnd,
    hasUsedTrial,
    cancelSubscription,
    cancelLoading,
    discountCode,
    setDiscountCode,
    appliedDiscount,
    applyDiscountCode,
  } = useSubscription();
  const [billing, setBilling] = useState<{
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod?: PaymentMethod;
  }>({ paymentMethods: [] });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"stripe" | "paypal" | null>(null);
  const [showPayPalDialog, setShowPayPalDialog] = useState(false);
  const [isTrialFlow, setIsTrialFlow] = useState(false);

  useEffect(() => {
    const loadBillingDetails = async () => {
      if (!user?.companyId) return;
      try {
        const details = await getBillingDetails(undefined, user.companyId);

        setSubscription(details?.data?.subscription);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentMethodSelect = (method: "stripe" | "paypal") => {
    if (!selectedPlan) return;

    if (method === "stripe") {
      setShowPaymentMethodModal(false);
      setSelectedPaymentMethod(null);
      subscribe(selectedPlan.planId, annual, isTrialFlow);
      setIsTrialFlow(false);
    } else if (method === "paypal") {
      if(isTrialFlow) {
        setTrialByPaypal();
      } else {
        setShowPaymentMethodModal(false);
        setSelectedPaymentMethod("paypal");
        setShowPayPalDialog(true);
      }
    }
  };

  const setTrialByPaypal = async () => {
    try {
      const res = await api.post("/billing/create-paypal-subscription", {
        annual: annual,
        details: {},
        isTrial: isTrialFlow,
        planId: selectedPlan?.planId,
        user: user
      });

      if (res.data.success) {
        toast({
          title: "Subscription Successful",
          description: res.data.message,
        });

        setShowPaymentMethodModal(false);
      }
    } catch (err) {
      console.error("Paypal Checkout Error:", err);
      
      toast({
        variant: "destructive",
        title: "Paypal Subscription Error",
        description: "Failed to initiate checkout. Try again.",
      });
    }
  }

  const handlePayPalSuccess = () => {
    refresh();
    setSelectedPlan(null);
    setSelectedPaymentMethod(null);
    setShowPayPalDialog(false);
    setIsTrialFlow(false);
  };

  const handlePayPalCancel = () => {
    setSelectedPlan(null);
    setSelectedPaymentMethod(null);
    setShowPayPalDialog(false);
    setIsTrialFlow(false);
  };

  const handleDowngradeConfirm = () => {
    if (downgradeData) {
      subscribe(downgradeData.targetPlanId, annual);
      setShowDowngradeModal(false);
      setDowngradeData(null);
    }
  };

  // Calculate the correct price for the current selection
  let selectedAmount = "0.00";
  if (selectedPlan) {
    if (isTrialFlow) {
      selectedAmount = annual
        ? ((selectedPlan.annually  / 30) * 7).toFixed(2)
        : ((selectedPlan.monthly / 30) * 7).toFixed(2);
    } else {
      selectedAmount = annual
        ? (selectedPlan.annually * 12).toFixed(2)
        : selectedPlan.monthly.toFixed(2);
    }
  }

  return (
    <TabsContent value="subscription" className="space-y-4 text-black">
      <div>
        <h3 className="text-xl font-semibold mb-1 ">
          Subscription & Billing
        </h3>
        <p className=" text-sm">
          Manage your subscription, payment methods, and billing information
        </p>
      </div>

      {subscription && (
        <div>
          <h3 className="text-xl font-semibold mb-1 ">
            Current Plan
          </h3>
          <p className="text-sm">
            <span className="font-bold">Plan Type:</span> {subscription?.plan?.planType}
          </p>
          <p className="text-sm">
            <span className="font-bold">Expire Date:</span> {new Date(subscription?.currentPeriodEnd).toISOString().split('T')[0]}
          </p>
        </div>
      )}

      {/* Billing Switch */}
      <div className="flex items-center gap-4 mb-8">
        <span className={!annual ? "text-orange-400 font-bold" : ""}>
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
        <span className={annual ? "text-orange-400 font-bold" : ""}>
          Annually
        </span>
        <span className="ml-4 py-1 px-2 bg-orange-100 text-orange-600 rounded text-xs font-semibold">
          {annual ? "Save 20%" : "Cancel anytime"}
        </span>
      </div>

      {/* Add Discount Code Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-5 w-5 text-orange-400" />
          <h4 className="font-medium text-white">Have a discount code?</h4>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1 text-black"
          />
          <Button
            onClick={applyDiscountCode}
            disabled={!discountCode.trim()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Apply
          </Button>
        </div>
        {appliedDiscount && (
          <div className="mt-2 text-green-400 text-sm">
            {appliedDiscount.type === "PERCENTAGE"
              ? `${appliedDiscount.discount}% off`
              : `$${appliedDiscount.discount} off`}{" "}
            applied
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-xl border border-gray-300 bg-[#2e3a48] flex flex-col p-7 relative h-full"
          >
            {tier === plan.planId && status === "active" && (
              <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-green-500 text-white rounded-full font-bold shadow">
                Current
              </span>
            )}
            {tier === plan.planId && status === "trialing" && (
              <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-blue-500 text-white rounded-full font-bold shadow">
                Trial
              </span>
            )}
            <div className="flex-grow">
              <div className="mb-2">
                <h4 className="text-2xl font-bold text-white">{plan.title}</h4>
                <p className="text-orange-400 font-semibold mb-2">
                  {plan.desc}
                </p>
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
                    {
                      f.included ? 
                        <Check
                          className="w-5 h-5 text-green-400"
                        /> :
                        <X
                          className="w-5 h-5 text-gray-400 opacity-60"
                        />
                    }
                    <span
                      className={
                        // f.included ? "font-semibold" : "line-through text-white [text-decoration-color:red]"
                        f.included ? "font-semibold" : "line-through text-white"
                      }
                    >
                      {f.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              {tier === plan.planId && status === "active" ? (
                <div className="space-y-2">
                  <Button
                    disabled
                    className="w-full bg-green-500 text-white cursor-default"
                  >
                    {" "}
                    {currentPeriodEnd &&
                      `Renews in ${Math.ceil(
                        (currentPeriodEnd.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days`}
                  </Button>
                  <Button
                    onClick={cancelSubscription}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? "Processing..." : "Stop Plan"}
                  </Button>
                </div>
              ) : tier === plan.planId && status === "trialing" ? (
                <div className="space-y-2">
                  <Button
                    disabled
                    className="w-full bg-green-500 text-white cursor-default"
                  >
                    {" "}
                    {trialEndDate &&
                      `Trial ends in ${Math.ceil(
                        (trialEndDate.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days`}
                  </Button>

                  <Button
                    onClick={cancelSubscription}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? "Processing..." : "Stop Trial"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsTrialFlow(false);
                      setShowPaymentMethodModal(true);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Choose Plan"}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsTrialFlow(true);
                      setShowPaymentMethodModal(true);
                    }}
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white ${
                      hasUsedTrial ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading || hasUsedTrial}
                  >
                    {loading
                      ? "Processing..."
                      : hasUsedTrial
                      ? "Trial Already Used"
                      : "Start Free Trial"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {downgradeData && (
        <DowngradeConfirmationModal
          isOpen={showDowngradeModal}
          onClose={() => {
            setShowDowngradeModal(false);
            setDowngradeData(null);
          }}
          onConfirm={handleDowngradeConfirm}
          limits={downgradeData.limits}
          targetPlanType={downgradeData.targetPlanType}
        />
      )}

      <PaymentMethodModal
        isOpen={showPaymentMethodModal}
        onClose={() => {
          setShowPaymentMethodModal(false);
          setSelectedPlan(null);
        }}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        selectedPlan={selectedPlan || plans[0]}
        isAnnual={annual}
      />

      {/* PayPal Payment Dialog */}
      <Dialog open={showPayPalDialog} onOpenChange={setShowPayPalDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pay with PayPal</DialogTitle>
          </DialogHeader>
          {selectedPlan && selectedPaymentMethod === "paypal" && (
            <PayPalScriptProvider options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
              currency: "USD",
              intent: "capture"
            }}>
              <PayPalCheckout
                plan={selectedPlan}
                isAnnual={annual}
                isTrial={isTrialFlow}
                amount={selectedAmount}
                onSuccess={handlePayPalSuccess}
                onCancel={handlePayPalCancel}
              />
            </PayPalScriptProvider>
          )}
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
}

export default SubscriptionPanel;
