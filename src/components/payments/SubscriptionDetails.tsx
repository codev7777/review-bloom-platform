import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock subscription data for demonstration
// In a real implementation, this would come from your Stripe API
const MOCK_SUBSCRIPTION = {
  id: "sub_1234567890",
  plan: "Pro",
  amount: 4900,
  interval: "month",
  currentPeriodEnd: "2024-01-15",
  status: "active",
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

interface SubscriptionDetailsProps {
  onManageClick?: () => void;
  onCancelClick?: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  onManageClick,
  onCancelClick,
}) => {
  // If no subscription, show message
  if (!MOCK_SUBSCRIPTION) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Subscription</h3>
          <div className="text-muted-foreground">
            You don't have an active subscription.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <span>Current Subscription</span>
          <div className="ml-2 rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-800">
            Active
          </div>
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">
                {MOCK_SUBSCRIPTION.plan} Plan
              </div>
              <div className="text-muted-foreground">
                {formatCurrency(MOCK_SUBSCRIPTION.amount)}/
                {MOCK_SUBSCRIPTION.interval}
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-md space-y-2">
            <div className="font-medium mb-2">Plan Benefits</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["Feature 1", "Feature 2", "Feature 3", "Feature 4"].map(
                (feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>
                Renews on {formatDate(MOCK_SUBSCRIPTION.currentPeriodEnd)}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your card will be charged on this date</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancelClick}>
                Cancel
              </Button>
              <Button onClick={onManageClick}>Manage Subscription</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetails;
