import { useState, useEffect } from "react";
import { CheckCircle, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Step1Marketplace from "./steps/Step1Marketplace";
import Step2UserInfo from "./steps/Step2UserInfo";
import Step3Feedback from "./steps/Step3Feedback";
import Step4Thanks from "./steps/Step4Thanks";
import { createReview } from "@/lib/api/reviews/reviews.api";
import { getCampaign } from "@/lib/api/campaigns/campaigns.api";
import { getProducts } from "@/lib/api/products/products.api";
import { getPublicCampaign } from "@/lib/api/public/publicCampaign";
import { getPublicProducts } from "@/lib/api/public/publicProduct";
import { createPublicReview } from "@/lib/api/public/publicReview";
import { Campaign, Product, Promotion } from "@/types";

interface ReviewFunnelProps {
  campaignId: string;
  productName: string;
  productImage: string;
  vendor: string;
  productId?: number;
  asin?: string;
  promotionId?: number;
  products: Array<{
    id: number;
    title: string;
    image: string;
    asin: string;
  }>;
}

interface ExtendedCampaign extends Campaign {
  product?: Product;
  promotion?: Promotion;
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
  productType?: string;
  productId?: number;
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
  productId,
  asin,
  promotionId,
  products,
}: ReviewFunnelProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { step: urlStep } = useParams<{ step: string }>();

  const [formData, setFormData] = useState<ReviewFormData>({
    orderId: "",
    rating: 0,
    feedback: "",
    email: "",
    country: "us",
    name: "",
    usedMoreThanSevenDays: false,
    phoneNumber: "",
    asin: asin || "",
    productType: "",
    productId,
  });

  const [step, setStep] = useState(1);
  const [campaign, setCampaign] = useState<ExtendedCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let campaignData;

        try {
          // First try to get campaign with authentication
          campaignData = await getCampaign(campaignId);
        } catch (authError) {
          console.log("Auth request failed, trying public endpoint");
          // If authenticated request fails, try public endpoint
          campaignData = await getPublicCampaign(campaignId);
        }

        setCampaign(campaignData);

        if (campaignData.productIds?.length) {
          const numericProductIds = campaignData.productIds
            .map((id) => {
              if (typeof id === "string") {
                return parseInt(id, 10);
              }
              return id;
            })
            .filter((id): id is number => !isNaN(id));

          try {
            // Try to get products with authentication first
            const productsData = await getProducts({
              ids: numericProductIds,
            });
            if (productsData.data.length > 0) {
              console.log("New products data available:", productsData.data);
            }
          } catch (authError) {
            console.log("Auth products request failed, trying public endpoint");
            // If authenticated request fails, try public endpoint
            const publicProductsData = await getPublicProducts(
              numericProductIds
            );
            if (publicProductsData.length > 0) {
              console.log(
                "New public products data available:",
                publicProductsData
              );
            }
          }
        }
      } catch (err) {
        setError("Failed to load campaign data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [campaignId]);

  // Determine current step based on URL parameter
  const getCurrentStep = (): number => {
    if (!urlStep) return 1;
    const stepNum = parseInt(urlStep);
    return isNaN(stepNum) || stepNum < 1 || stepNum > 4 ? 1 : stepNum;
  };

  // Update URL when step changes
  useEffect(() => {
    const currentUrlStep = getCurrentStep();
    if (currentUrlStep !== step) {
      navigate(`/review/${campaignId}/step/${step}`, { replace: true });
    }
  }, [step, campaignId, navigate]);

  // Update step when URL changes
  useEffect(() => {
    const urlStepNumber = getCurrentStep();
    setStep(urlStepNumber);
  }, [urlStep]);

  const updateFormData = (newData: Partial<ReviewFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNextStep = async () => {
    // If we're on step 3 and moving to step 4, submit the review
    if (step === 3) {
      if (!productId) {
        toast({
          title: "Error",
          description: "Product ID is required to submit a review.",
          variant: "destructive",
        });
        return;
      }

      try {
        // Ensure all required fields are present
        if (
          !formData.email ||
          !formData.name ||
          !formData.feedback ||
          !formData.rating
        ) {
          toast({
            title: "Error",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return;
        }

        const reviewData = {
          email: formData.email,
          name: formData.name,
          productId,
          rating: formData.rating,
          feedback: formData.feedback,
          country: formData.country,
          orderNo: formData.orderId,
          promotionId,
          campaignId: campaignId,
        };

        try {
          // First try to submit with authentication
          await createReview(reviewData);
        } catch (authError) {
          console.log("Auth review submission failed, trying public endpoint");
          // If authenticated request fails, try public endpoint
          await createPublicReview(reviewData);
        }

        // Move to step 4 after successful submission
        const nextStep = step + 1;
        if (nextStep <= 4) {
          setStep(nextStep);
          navigate(`/review/${campaignId}/step/${nextStep}`);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast({
          title: "Error",
          description: "Failed to submit review. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Regular step progression
      const nextStep = step + 1;
      if (nextStep <= 4) {
        setStep(nextStep);
        navigate(`/review/${campaignId}/step/${nextStep}`);
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    if (prevStep >= 1) {
      setStep(prevStep);
      navigate(`/review/${campaignId}/step/${prevStep}`);
    }
  };

  const handleGoToAmazon = () => {
    const domain = getAmazonDomain(formData.country);
    const reviewUrl = `${domain}/review/create-review?asin=${formData.asin}`;
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
      mx: "https://www.amazon.com.mx",
      gb: "https://www.amazon.co.uk",
      fr: "https://www.amazon.fr",
      de: "https://www.amazon.de",
      it: "https://www.amazon.it",
      es: "https://www.amazon.es",
      in: "https://www.amazon.in",
      jp: "https://www.amazon.co.jp",
      nl: "https://www.amazon.nl",
      se: "https://www.amazon.se",
      au: "https://www.amazon.com.au",
      br: "https://www.amazon.com.br",
      sg: "https://www.amazon.sg",
      tr: "https://www.amazon.com.tr",
      sa: "https://www.amazon.sa",
      ae: "https://www.amazon.ae",
      pl: "https://www.amazon.pl",
      eg: "https://www.amazon.eg",
      za: "", // No official Amazon South Africa site yet
    };
    return domains[countryCode] || domains.us;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6 lg:p-8 max-w-xl mx-auto">
      <div className="text-xl font-bold mt-8 mb-10">
        {step < 4 && "Don't miss out – tell us where to send your free gift!"}
      </div>
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

      <div className="relative min-h-[400px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : (
          <>
            <FunnelStep isActive={step === 1}>
              <Step1Marketplace
                productName={campaign?.product?.title || ""}
                productImage={campaign?.product?.image || ""}
                formData={formData}
                updateFormData={updateFormData}
                onNextStep={handleNextStep}
                products={products}
                promotion={campaign?.promotion}
                marketplaces={campaign?.marketplaces || []}
              />
            </FunnelStep>

            <FunnelStep isActive={step === 2}>
              <Step2UserInfo
                formData={formData}
                updateFormData={updateFormData}
                onNextStep={handleNextStep}
                onPreviousStep={handlePreviousStep}
              />
            </FunnelStep>

            <FunnelStep isActive={step === 3}>
              <Step3Feedback
                formData={formData}
                updateFormData={updateFormData}
                onNextStep={handleNextStep}
                onPreviousStep={handlePreviousStep}
                onGoToAmazon={handleGoToAmazon}
                products={products}
              />
            </FunnelStep>

            <FunnelStep isActive={step === 4}>
              <Step4Thanks formData={formData} onGoHome={handleGoHome} />
            </FunnelStep>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewFunnel;
