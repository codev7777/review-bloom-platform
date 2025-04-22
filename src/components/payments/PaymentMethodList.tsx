import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock payment methods for demonstration
// In a real implementation, these would come from your Stripe API
const MOCK_PAYMENT_METHODS = [
  {
    id: "pm_1234567890",
    card: {
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
    },
    isDefault: true,
  },
  {
    id: "pm_0987654321",
    card: {
      brand: "mastercard",
      last4: "5555",
      exp_month: 8,
      exp_year: 2024,
    },
    isDefault: false,
  },
];

interface PaymentMethodListProps {
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  onDelete,
  onSetDefault,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>

        {MOCK_PAYMENT_METHODS.length === 0 ? (
          <p className="text-muted-foreground">No payment methods added yet.</p>
        ) : (
          <div className="space-y-4">
            {MOCK_PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                className={`flex justify-between items-center p-4 rounded-md border ${
                  method.isDefault ? "bg-primary/5 border-primary/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium capitalize">
                      {method.card.brand} •••• {method.card.last4}
                      {method.isDefault && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {method.card.exp_month}/{method.card.exp_year}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault && onSetDefault(method.id)}
                    >
                      Make Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => onDelete && onDelete(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodList;
