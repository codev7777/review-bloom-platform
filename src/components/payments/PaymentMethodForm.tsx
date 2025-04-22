import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentMethodFormProps {
  onSuccess?: () => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ onSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const form = useForm({
    defaultValues: {
      postalCode: "",
    },
  });

  const handleSubmit = async (values: { postalCode: string }) => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setError("Card information is incomplete");
      setLoading(false);
      return;
    }

    try {
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            address: {
              postal_code: values.postalCode,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message || "An error occurred");
        toast.error("Failed to add payment method");
      } else {
        toast.success("Payment method added successfully");
        if (onSuccess) onSuccess();
        form.reset();
        elements.getElement(CardNumberElement)?.clear();
        elements.getElement(CardExpiryElement)?.clear();
        elements.getElement(CardCvcElement)?.clear();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#ef600f]" />
                Add Payment Method
              </h3>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-4">
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <div className="h-10 px-3 rounded-md border bg-background flex items-center">
                  <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </FormItem>

              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <div className="h-10 px-3 rounded-md border bg-background flex items-center">
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </FormItem>

                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <div className="h-10 px-3 rounded-md border bg-background flex items-center">
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Postal Code (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter postal code" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-[#ef600f] hover:bg-[#d85100]"
            >
              {loading ? "Processing..." : "Add Payment Method"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PaymentMethodForm;
