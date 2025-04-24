import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api/axiosConfig";
import { toast } from "@/components/ui/use-toast";

export default function SubscriptionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const handleSuccess = async () => {
      if (!sessionId) {
        return;
      }

      try {
        // Call backend to confirm the subscription
        const response = await api.get(
          `/billing/checkout-success?session_id=${sessionId}`
        );

        if (response.data.success) {
          toast({
            title: "Subscription successful",
            description: "Your subscription has been activated successfully.",
          });
        } else {
          throw new Error(
            response.data.error || "Failed to activate subscription"
          );
        }
      } catch (error) {
        console.error("Error confirming subscription:", error);
        toast({
          variant: "destructive",
          title: "Subscription error",
          description:
            error instanceof Error
              ? error.message
              : "There was an error processing your subscription. Please try again.",
        });
      }
    };

    handleSuccess();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your subscription has been confirmed. You can now access all the
            features of your plan.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => navigate("/vendor-dashboard")}
            className="w-full"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/vendor-dashboard/settings")}
            className="w-full"
          >
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
