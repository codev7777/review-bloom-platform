import { Gift, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewFormData } from "../ReviewFunnel";

interface Step4ThanksProps {
  formData: ReviewFormData;
  onGoHome: () => void;
}

const Step4Thanks = ({ formData, onGoHome }: Step4ThanksProps) => {
  return (
    <div className="text-center space-y-6 py-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="flex justify-center items-center">
          <img
            src="/images/funnel/amazon-gift-card-5.png"
            className="h-[200px] object-contain rounded"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Thank You for Your Review!</h2>

      <p className="text-muted-foreground">
        We appreciate you taking the time to share your feedback.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6 mx-auto max-w-md">
        <h3 className="font-medium text-lg mb-2 text-amber-900">
          Your Amazon Gift Card
        </h3>
        <p className="text-amber-800 mb-4">
          Thank you for your valuable feedback! As a token of our appreciation,
          we're sending you a free gift: <br />a $5 Amazon Gift Card!
          <span className="text-secondary mt-6 block">
            We truly appreciate your support and hope you continue to enjoy our
            products!
          </span>
        </p>
        <div className="bg-white border border-amber-300 rounded-md p-3 text-center">
          <p className="font-mono font-semibold text-lg">GIFT-XXXX-XXXX-XXXX</p>
          <p className="text-xs text-gray-500 mt-1">
            Check your email at {formData.email} for your actual gift card code.
          </p>
        </div>
      </div>

      {/* <div className="mt-8">
        <Button
          onClick={onGoHome}
          className="bg-[#FF9900] text-[#232F3E] font-medium px-8"
        >
          <Home className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </div> */}
    </div>
  );
};

export default Step4Thanks;
