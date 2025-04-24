import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api/axiosConfig";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const handleSuccess = async () => {
      if (!sessionId) {
        navigate("/");
        return;
      }

      try {
        // Call backend to confirm the subscription using GET with query parameter
        await api.get(`/billing/checkout-success?session_id=${sessionId}`);

        // Redirect to dashboard after successful confirmation
        navigate("/dashboard");
      } catch (error) {
        console.error("Error confirming subscription:", error);
        // Still redirect to dashboard but show error toast
        navigate("/dashboard");
      }
    };

    handleSuccess();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your subscription has been confirmed. Redirecting you to the
            dashboard...
          </p>
        </div>
        <div className="mt-8">
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
