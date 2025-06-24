import { useState, useEffect } from 'react';
import api from "@/lib/api/axiosConfig";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/use-toast";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// PayPal types
interface PayPalOrderDetails {
  payer?: {
    name?: {
      given_name?: string;
    };
  };
  id?: string;
  status?: string;
  create_time?: string;
  update_time?: string;
  payment_source?: Record<string, unknown>;
}

interface PayPalCreateOrderData {
  [key: string]: unknown;
}

interface PayPalCreateOrderActions {
  order: {
    create: (order: Record<string, unknown>) => Promise<string>;
  };
}

interface PayPalOnApproveActions {
  order?: {
    capture: () => Promise<PayPalOrderDetails>;
  };
}

interface PayPalCheckoutProps {
  plan: {
    planId: string;
    title: string;
    monthly: number;
    annually: number;
  };
  isAnnual: boolean;
  isTrial: boolean;
  amount: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PayPalCheckout({
  plan,
  isAnnual,
  isTrial,
  amount,
  onSuccess,
  onCancel,
}: PayPalCheckoutProps) {
  const { user } = useAuth();
  const [{ isPending }] = usePayPalScriptReducer();
  const [planId, setPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const PLAN_CURRENCY = "USD";
  const PRODUCT_NAME = `${plan.title} ${isTrial ? 'Trial' : isAnnual ? 'Annual' : 'Monthly'} Subscription`;
  const PRODUCT_DESCRIPTION = `${plan.title} ${isTrial ? 'Trial' : isAnnual ? 'Annual' : 'Monthly'}`;
  const PLAN_NAME = `${plan.title} ${isTrial ? 'Trial' : isAnnual ? 'Annual' : 'Monthly'} Plan`;
  const PLAN_DESC = `${isTrial ? '1-day Trial ($2.50) + ' : ''}${isAnnual ? 'Annual' : 'Monthly'} subscription for ${plan.title} tier`;

  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = import.meta.env.VITE_PAYPAL_CLIENT_SECRET;
  const PAYPAL_ENV = import.meta.env.VITE_PAYPAL_ENV || 'sandbox';

  // Determine PayPal API base URLs based on environment
  const PAYPAL_API_BASE = PAYPAL_ENV === 'live' ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com';
  const PAYPAL_API_M_BASE = PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  const getAccessToken = async () => {
    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
  };

  // Create a product if needed
  const createProduct = async (token: string) => {
    const response = await fetch(`${PAYPAL_API_BASE}/v1/catalogs/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: PRODUCT_NAME,
        description: PRODUCT_DESCRIPTION,
        type: "SERVICE",
        category: "SERVICES",
        image_url: "https://example.com/product.jpg",
        home_url: "https://example.com"
      })
    });
    const data = await response.json();
    return data.id;
  };

  // Find product by description
  const findProduct = async (token: string) => {
    const response = await fetch(`${PAYPAL_API_M_BASE}/v1/catalogs/products?page_size=20&page=1&total_required=true`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const product = data.products.find((p: { description: string }) => p.description === PRODUCT_DESCRIPTION);
    return product ? product.id : null;
  };

  // Create a billing plan for the product
  const createPlan = async (token: string, productId: string) => {
    const trialAmount = "2.50"; // $2.50 for trial
    const trialDuration = 1; // 1 day for testing (PayPal minimum interval)
    
    const billingCycles = isTrial ? [
      // Trial cycle - 1 day (PayPal minimum interval)
      {
        frequency: {
          interval_unit: "DAY",
          interval_count: trialDuration
        },
        tenure_type: "TRIAL",
        sequence: 1,
        total_cycles: 1,
        pricing_scheme: {
          fixed_price: {
            value: trialAmount,
            currency_code: PLAN_CURRENCY
          }
        }
      },
      // Regular cycle after trial
      {
        frequency: {
          interval_unit: isAnnual ? "YEAR" : "MONTH",
          interval_count: 1
        },
        tenure_type: "REGULAR",
        sequence: 2,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: {
            value: amount,
            currency_code: PLAN_CURRENCY
          }
        }
      }
    ] : [
      // Regular cycle without trial
      {
        frequency: {
          interval_unit: isAnnual ? "YEAR" : "MONTH",
          interval_count: 1
        },
        tenure_type: "REGULAR",
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: {
            value: amount,
            currency_code: PLAN_CURRENCY
          }
        }
      }
    ];

    const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: productId,
        name: PLAN_NAME,
        description: PLAN_DESC,
        status: "ACTIVE",
        billing_cycles: billingCycles,
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee: {
            value: "0",
            currency_code: PLAN_CURRENCY
          },
          setup_fee_failure_action: "CONTINUE",
          payment_failure_threshold: 3
        }
      })
    });
    const data = await response.json();
    return data.id;
  };

  // Find plan by name
  const findPlan = async (token: string) => {
    const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans?page_size=20&page=1&total_required=true`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const planObj = data.plans.find((p: { name: string }) => p.name === PLAN_NAME);
    return planObj ? planObj.id : null;
  };

  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
        // 1. Try to find the plan
        let foundPlanId = await findPlan(token);
        // 2. If not found, create product and plan
        if (!foundPlanId) {
          let productId = await findProduct(token);
          if (!productId) {
            productId = await createProduct(token);
          }
          foundPlanId = await createPlan(token, productId);
        }
        setPlanId(foundPlanId);
      } catch (e) {
        setPlanId(null);
      } finally {
        setLoading(false);
      }
    };
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, isAnnual, isTrial]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <span className="mb-2 text-gray-600">Loading subscription details...</span>
        <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    );
  }
  if (!planId || !amount) {
    return <div className="checkout"><p>No subscription plan or price found</p></div>;
  }
  
  const setPaypalSession = async (details: PayPalOrderDetails) => {
    try {
      const res = await api.post("/billing/create-paypal-subscription", {
        annual: isAnnual,
        details: details,
        isTrial: isTrial,
        planId: plan?.planId,
        user: user,
      });

      if (res.data.success) {
        toast({
          title: "Subscription Successful",
          description: res.data.message,
        });
        onSuccess();
      }
      
    } catch (err) {
      console.error("Paypal Checkout Error:", err);
      
      toast({
        variant: "destructive",
        title: "Paypal Subscription Error",
        description: "Failed to initiate checkout. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout">
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-8">
          <span className="mb-2 text-gray-600">Loading PayPal...</span>
          <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <PayPalButtons
          fundingSource="paypal"
          style={{ layout: "vertical" }}
          createOrder={(
            data: PayPalCreateOrderData,
            actions: PayPalCreateOrderActions
          ) => {
            return actions.order.create({
              purchase_units: [
                {
                  reference_id: planId,
                  description: PLAN_DESC,
                  amount: {
                    value: amount,
                    currency_code: PLAN_CURRENCY
                  },
                },
              ],
            });
          }}
          onApprove={(
            data: PayPalCreateOrderData,
            actions: PayPalOnApproveActions
          ) => {
            if (!actions.order) {
              throw new Error("Order actions not available");
            }
            return actions.order.capture().then((details: PayPalOrderDetails) => {
              console.log(details);
              setPaypalSession(details);
            });
          }}
          onError={onCancel}
        />
      )}
    </div>
  );
}

export default PayPalCheckout; 