
import { useState } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReviewForm, { ReviewFormData } from "./ReviewForm";
import { useNavigate } from "react-router-dom";

interface ReviewFunnelProps {
  campaignId: string;
  productName: string;
  productImage: string;
  vendor: string;
}

const amazonDomains: Record<string, string> = {
  us: "https://www.amazon.com",
  ca: "https://www.amazon.ca",
  uk: "https://www.amazon.co.uk",
  de: "https://www.amazon.de",
  fr: "https://www.amazon.fr",
  jp: "https://www.amazon.co.jp",
  au: "https://www.amazon.com.au",
};

const ReviewFunnel = ({
  campaignId,
  productName,
  productImage,
  vendor,
}: ReviewFunnelProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData | null>(null);

  const handleSubmit = (data: ReviewFormData) => {
    setFormData(data);
    
    // Simulate API call to submit the review
    setTimeout(() => {
      setIsSubmitted(true);
      
      // For 4-5 star ratings, prepare for redirection to Amazon
      if (data.rating >= 4) {
        toast({
          title: "Thank you for your positive review!",
          description: "You'll be redirected to Amazon to share your feedback.",
        });
      } else {
        toast({
          title: "Thank you for your feedback!",
          description: "We appreciate your honest review and will use it to improve our products.",
        });
      }
    }, 1000);
  };

  const handleRedirectToAmazon = () => {
    if (!formData) return;
    
    const domain = amazonDomains[formData.country] || amazonDomains.us;
    // In a real implementation, you would use the actual ASIN to create the correct URL
    const redirectUrl = `${domain}/review/create-review`;
    
    // Open Amazon in a new tab
    window.open(redirectUrl, "_blank");
    
    // Redirect back to home page
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6 lg:p-8 max-w-2xl mx-auto">
      {!isSubmitted ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              How would you rate your experience?
            </h2>
            <p className="text-muted-foreground">
              Your feedback helps {vendor} improve their products and services.
            </p>
          </div>
          <ReviewForm
            productName={productName}
            productImage={productImage}
            campaignId={campaignId}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <div className="text-center space-y-6 py-8 animate-fade-in">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold">
            {formData && formData.rating >= 4
              ? "Thank you for your positive review!"
              : "Thank you for your feedback!"}
          </h2>
          <p className="text-muted-foreground">
            {formData && formData.rating >= 4
              ? "We're delighted that you enjoyed our product. Would you mind sharing your experience on Amazon to help other customers?"
              : "We value your honest feedback and will use it to improve our products and services."}
          </p>
          
          {formData && formData.rating >= 4 ? (
            <Button
              onClick={handleRedirectToAmazon}
              className="mt-6 bg-secondary hover:bg-secondary/90"
            >
              Leave a Review on Amazon <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleGoHome} className="mt-6">
              Return to Home
            </Button>
          )}
          
          {formData && formData.email && (
            <p className="text-sm text-muted-foreground mt-8">
              We'll send your gift to {formData.email} shortly. Thank you!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewFunnel;
