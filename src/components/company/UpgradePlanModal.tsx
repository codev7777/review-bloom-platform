import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate("/billing");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] z-[100]">
        <DialogHeader>
          <DialogTitle>Upgrade Required</DialogTitle>
          <DialogDescription>
            User invitation is only available for PLATINUM plan subscribers.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            To invite users to your company, you need to upgrade to our PLATINUM
            plan. This plan includes:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>✓ Unlimited user invitations</li>
            <li>✓ Advanced team management</li>
            <li>✓ Priority support</li>
            <li>✓ And much more!</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpgrade}>Upgrade to PLATINUM</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
