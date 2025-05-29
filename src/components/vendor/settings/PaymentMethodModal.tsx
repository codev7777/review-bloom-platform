import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: "stripe" | "paypal") => void;
  selectedPlan: {
    planId: string;
    title: string;
    monthly: number;
    annually: number;
  };
  isAnnual: boolean;
}

export function PaymentMethodModal({
  isOpen,
  onClose,
  onSelectPaymentMethod,
  selectedPlan,
  isAnnual,
}: PaymentMethodModalProps) {
  const price = isAnnual ? selectedPlan.annually : selectedPlan.monthly;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">{selectedPlan.title} Plan</h3>
            <p className="text-2xl font-bold text-orange-500">
              ${price}
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </p>
            <p className="text-sm text-gray-500">
              {isAnnual ? "Billed annually" : "Billed monthly"}
            </p>
          </div>

          <div className="grid gap-4">
            <Button
              variant="outline"
              className="h-16 flex items-center justify-start gap-4"
              onClick={() => onSelectPaymentMethod("stripe")}
            >
              <CreditCard className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Credit Card</span>
                <span className="text-sm text-gray-500">Pay with Stripe</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-16 flex items-center justify-start gap-4"
              onClick={() => onSelectPaymentMethod("paypal")}
            >
              <Wallet className="h-6 w-6 text-blue-600" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">PayPal</span>
                <span className="text-sm text-gray-500">Pay with PayPal</span>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 