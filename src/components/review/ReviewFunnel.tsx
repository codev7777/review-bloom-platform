
import { useState } from "react";
import { CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Step1Marketplace from "./steps/Step1Marketplace";
import Step2UserInfo from "./steps/Step2UserInfo";
import Step3Feedback from "./steps/Step3Feedback";
import Step4Thanks from "./steps/Step4Thanks";

interface ReviewFunnelProps {
  campaignId: string;
  productName: string;
  productImage: string;
  vendor: string;
}

export interface ReviewFormData {
  orderId: string;
  rating: number;
  feedback: string;
  email: string;
  country: string;
  name: string;
  usedMoreThanSevenDays: boolean;
  phoneNumber: string;
  asin: string;
}

const FunnelStep = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`transition-all duration-500 transform ${
      isActive
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-20 absolute hidden"
    }`}
  >
    {children}
  </div>
);

const ReviewFunnel = ({
  campaignId,
  productName,
  productImage,
  vendor,
}: ReviewFunnelProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReviewFormData>({
    orderId: "",
    rating: 0,
    feedback: "",
    email: "",
    country: "us",
    name: "",
    usedMoreThanSevenDays: false,
    phoneNumber: "",
    asin: "",
  });

  const updateFormData = (newData: Partial<ReviewFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleGoToAmazon = () => {
    const domain = getAmazonDomain(formData.country);
    // In a real implementation, you would use the actual ASIN to create the correct URL
    const reviewUrl = `${domain}/review/create-review?asin=${formData.asin}`;
    
    // Open Amazon in a new tab
    window.open(reviewUrl, "_blank");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // Helper function to get Amazon domain based on country code
  const getAmazonDomain = (countryCode: string): string => {
    const domains: Record<string, string> = {
      us: "https://www.amazon.com",
      ca: "https://www.amazon.ca",
      uk: "https://www.amazon.co.uk",
      de: "https://www.amazon.de",
      fr: "https://www.amazon.fr",
      jp: "https://www.amazon.co.jp",
      au: "https://www.amazon.com.au",
    };
    return domains[countryCode] || domains.us;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1
                ? "bg-[#FF9900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div
            className={`w-16 h-1 ${
              step >= 2 ? "bg-[#FF9900]" : "bg-gray-200"
            } mx-2`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2
                ? "bg-[#FF9900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div
            className={`w-16 h-1 ${
              step >= 3 ? "bg-[#FF9900]" : "bg-gray-200"
            } mx-2`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3
                ? "bg-[#FF9900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <div
            className={`w-16 h-1 ${
              step >= 4 ? "bg-[#FF9900]" : "bg-gray-200"
            } mx-2`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 4
                ? "bg-[#FF9900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            4
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="relative min-h-[400px] flex flex-col justify-center">
        <FunnelStep isActive={step === 1}>
          <Step1Marketplace
            productName={productName}
            productImage={productImage}
            formData={formData}
            updateFormData={updateFormData}
            onNextStep={handleNextStep}
          />
        </FunnelStep>

        <FunnelStep isActive={step === 2}>
          <Step2UserInfo
            formData={formData}
            updateFormData={updateFormData}
            onNextStep={handleNextStep}
          />
        </FunnelStep>

        <FunnelStep isActive={step === 3}>
          <Step3Feedback
            formData={formData}
            updateFormData={updateFormData}
            onNextStep={handleNextStep}
            onGoToAmazon={handleGoToAmazon}
          />
        </FunnelStep>

        <FunnelStep isActive={step === 4}>
          <Step4Thanks
            formData={formData}
            onGoHome={handleGoHome}
          />
        </FunnelStep>
      </div>
    </div>
  );
};

export default ReviewFunnel;
