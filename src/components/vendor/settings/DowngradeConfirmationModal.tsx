import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DowngradeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  limits: {
    products: { current: number; limit: number; exceeded: boolean };
    campaigns: { current: number; limit: number; exceeded: boolean };
    promotions: { current: number; limit: number; exceeded: boolean };
    users: { current: number; limit: number; exceeded: boolean };
  };
  targetPlanType: string;
}

export const DowngradeConfirmationModal: React.FC<DowngradeConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  limits,
  targetPlanType,
}) => {
  const hasExceededLimits = limits.products.exceeded || limits.campaigns.exceeded || limits.promotions.exceeded || limits.users.exceeded;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            Confirm Plan Downgrade
          </DialogTitle>
          <DialogDescription>
            You are about to downgrade to the {targetPlanType} plan. Please review the following:
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {hasExceededLimits ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-500">
                Warning: Your current usage exceeds the {targetPlanType} plan limits:
              </p>
              <ul className="space-y-2 text-sm">
                {limits.products.exceeded && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>
                      Products: {limits.products.current} / {limits.products.limit} limit
                    </span>
                  </li>
                )}
                {limits.campaigns.exceeded && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>
                      Campaigns: {limits.campaigns.current} / {limits.campaigns.limit} limit
                    </span>
                  </li>
                )}
                {limits.promotions.exceeded && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>
                      Promotions: {limits.promotions.current} / {limits.promotions.limit} limit
                    </span>
                  </li>
                )}
                {limits.users.exceeded && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>
                      Users: {limits.users.current} / {limits.users.limit} limit
                    </span>
                  </li>
                )}
              </ul>
              <p className="text-sm text-gray-600">
                You will need to delete excess items before the downgrade takes effect at the end of your billing period.
              </p>
              {limits.users.exceeded && (
                <p className="text-sm text-red-500 font-medium">
                  Note: You must remove excess users before downgrading from PLATINUM plan.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Your current usage is within the {targetPlanType} plan limits. The downgrade will take effect at the end of your billing period.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-orange-500 hover:bg-orange-600"
            disabled={limits.users.exceeded}
          >
            {limits.users.exceeded ? "Remove Users First" : "Confirm Downgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 