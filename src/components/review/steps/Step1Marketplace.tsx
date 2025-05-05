import { useState, useEffect } from "react";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StarRating from "../StarRating";
import { ReviewFormData } from "../ReviewFunnel";
import { getImageUrl } from "@/utils/imageUrl";
import { API_URL } from "@/config/env";
import { useParams } from "react-router-dom";

interface Step1MarketplaceProps {
  planId: number;
  productName: string;
  productImage: string;
  formData: ReviewFormData;
  updateFormData: (data: Partial<ReviewFormData>) => void;
  onNextStep: () => void;
  products: Array<{
    id: number;
    title: string;
    image: string;
    asin: string;
  }>;
  promotion?: {
    id: string | number;
    title: string;
    image: string;
    description: string;
  };
  marketPlaces?: string[];
  isDemo: boolean;
}

const MARKETPLACE_COUNTRY_NAMES: Record<string, string> = {
  US: "United States (Amazon.com)",
  CA: "Canada (Amazon.ca)",
  BE: "Belgium (Amazon.com.be)",
  MX: "Mexico (Amazon.com.mx)",
  GB: "United Kingdom (Amazon.co.uk)",
  FR: "France (Amazon.fr)",
  DE: "Germany (Amazon.de)",
  IT: "Italy (Amazon.it)",
  ES: "Spain (Amazon.es)",
  IN: "India (Amazon.in)",
  JP: "Japan (Amazon.co.jp)",
  NL: "Netherlands (Amazon.nl)",
  SE: "Sweden (Amazon.se)",
  AU: "Australia (Amazon.com.au)",
  BR: "Brazil (Amazon.com.br)",
  SG: "Singapore (Amazon.sg)",
  TR: "Turkey (Amazon.com.tr)",
  SA: "Saudi Arabia (Amazon.sa)",
  AE: "United Arab Emirates (Amazon.ae)",
  PL: "Poland (Amazon.pl)",
  EG: "Egypt (Amazon.eg)",
  ZA: "South Africa (Amazon.co.za)",
};

export const amazonOrderUrls: Record<string, string> = {
  US: "https://www.amazon.com/gp/css/order-history",
  CA: "https://www.amazon.ca/gp/css/order-history",
  MX: "https://www.amazon.com.mx/gp/css/order-history",
  GB: "https://www.amazon.co.uk/gp/css/order-history",
  FR: "https://www.amazon.fr/gp/css/order-history",
  DE: "https://www.amazon.de/gp/css/order-history",
  IT: "https://www.amazon.it/gp/css/order-history",
  ES: "https://www.amazon.es/gp/css/order-history",
  IN: "https://www.amazon.in/gp/css/order-history",
  JP: "https://www.amazon.co.jp/gp/css/order-history",
  NL: "https://www.amazon.nl/gp/css/order-history",
  SE: "https://www.amazon.se/gp/css/order-history",
  AU: "https://www.amazon.com.au/gp/css/order-history",
  BR: "https://www.amazon.com.br/gp/css/order-history",
  SG: "https://www.amazon.sg/gp/css/order-history",
  TR: "https://www.amazon.com.tr/gp/css/order-history",
  SA: "https://www.amazon.sa/gp/css/order-history",
  AE: "https://www.amazon.ae/gp/css/order-history",
  PL: "https://www.amazon.pl/gp/css/order-history",
  EG: "https://www.amazon.eg/gp/css/order-history",
  ZA: "https://www.amazon.co.za/gp/css/order-history",
};

const BACKEND_URL = API_URL.replace("/v1", "");

const Step1Marketplace = ({
  planId,
  productName,
  productImage,
  formData,
  updateFormData,
  onNextStep,
  products,
  promotion,
  marketPlaces = [],
  isDemo,
}: Step1MarketplaceProps) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReviewFormData, string>>
  >({});
  const { campaignId } = useParams<{
    campaignId: string;
  }>();
  const [companyPlan, setCompanyPlan] = useState<string | null>(null);

  useEffect(() => {
    const CompanyPlan = () => {
      // setCompanyPlan(data.planType);
    };

    if (campaignId && campaignId !== "demo-campaign") {
      CompanyPlan();
    }
  }, [campaignId]);

  const handleRatingChange = (rating: number) => {
    updateFormData({ rating });
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };
  const handleCountryChange = (value: string) => {
    updateFormData({ country: value });
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ orderId: e.target.value });
    if (errors.orderId) {
      setErrors((prev) => ({ ...prev, orderId: "" }));
    }
  };

  const handleProductChange = (value: string) => {
    const selectedProduct = products.find((p) => p.id.toString() === value);
    if (selectedProduct) {
      updateFormData({
        productType: value,
        productId: selectedProduct.id,
        asin: selectedProduct.asin,
      });
    } else if (value === "seller") {
      updateFormData({
        productType: "seller",
        productId: null,
        asin: null,
      });
    }
    if (errors.productType) {
      setErrors((prev) => ({ ...prev, productType: "" }));
    }
  };

  const handleUsageChange = (value: string) => {
    updateFormData({ usedMoreThanSevenDays: value === "Yes" });
    if (errors.usedMoreThanSevenDays) {
      setErrors((prev) => ({ ...prev, usedMoreThanSevenDays: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.orderId) {
      newErrors.orderId = "Order ID is required";
    }

    if (!formData.rating) {
      newErrors.rating = "Please rate the product";
    }

    if (!formData.productType) {
      newErrors.productType = "Please select a product";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {/* Promotion Image */}
      <div className="flex justify-center items-center my-6">
        {campaignId == "demo-campaign" ? (
          <img
            src={promotion?.image}
            alt={promotion?.title}
            className=" h-[200px] object-contain rounded border border-gray-200"
          />
        ) : (
          <img
            src={`${BACKEND_URL}/uploads/${promotion?.image}`}
            alt={promotion?.title}
            className=" h-[200px] object-contain rounded border border-gray-200"
          />
        )}
      </div>
      {/* <h2 className="text-2xl font-semibold text-center">Select Marketplace</h2>
      <p className="text-center text-muted-foreground">
        Choose where you purchased the product
      </p> */}

      {/* Product Selection */}

      <div className="space-y-3">
        <Label htmlFor="productType">
          {planId === 2 || planId === 3
            ? "Select Product or Seller"
            : "Select Product"}{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={handleProductChange}
          value={formData.productType}
        >
          <SelectTrigger
            className={errors.productType ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.title}
              </SelectItem>
            ))}
            {(planId === 2 || planId === 3) && (
              <SelectItem value="seller">Seller</SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.productType && (
          <p className="text-sm text-destructive">{errors.productType}</p>
        )}
      </div>

      {/* Country Selection */}
      <div className="space-y-3">
        <Label htmlFor="country">
          Select Marketplace <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={handleCountryChange} value={formData.country}>
          <SelectTrigger className={errors.country ? "border-destructive" : ""}>
            <SelectValue placeholder="Select your marketplace" />
          </SelectTrigger>
          <SelectContent>
            {marketPlaces.map((marketplace) => (
              <SelectItem key={marketplace} value={marketplace.toLowerCase()}>
                {MARKETPLACE_COUNTRY_NAMES[marketplace] || marketplace}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country}</p>
        )}
      </div>

      {/* Amazon Order ID */}
      <div className="space-y-3">
        <Label htmlFor="orderId">
          Amazon order number<span className="text-red-500">*</span>
          {"   "}
          <a
            href={
              amazonOrderUrls[formData.country.toUpperCase()] ||
              "https://www.amazon.com/gp/css/order-history"
            }
            target="_new"
            id="order_number_link"
            className="hover:text-[#f97316] text-[#ff9900]"
          >
            What is this&nbsp;
            <HelpCircle className="mb-1 w-4 h-4 inline" />
          </a>{" "}
        </Label>
        <Input
          id="orderId"
          name="orderId"
          placeholder="110-0000000-0000000"
          value={formData.orderId}
          onChange={handleOrderIdChange}
          className={errors.orderId ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          Format: 110-0000000-0000000
        </p>
        {errors.orderId && (
          <p className="text-sm text-destructive">{errors.orderId}</p>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <Label>
          Your Rating <span className="text-red-500">*</span>
        </Label>
        <div className="flex justify-center sm:justify-start">
          <StarRating
            onChange={handleRatingChange}
            initialValue={formData.rating}
          />
        </div>
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating}</p>
        )}
      </div>

      {/* Product Usage Confirmation */}
      <div className="space-y-3">
        <Label>
          Have you used the product for more than 7 days?{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={handleUsageChange}
          value={formData.usedMoreThanSevenDays ? "Yes" : "No"}
        >
          <SelectTrigger
            className={errors.usedMoreThanSevenDays ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
        {errors.usedMoreThanSevenDays && (
          <p className="text-sm text-destructive">
            {errors.usedMoreThanSevenDays}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-4 items-center">
        <Button
          type="submit"
          className="flex-1 bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium pl-10 w-full sm:w-[500px]"
        >
          Continue
          <ChevronRight className="ml-0 w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default Step1Marketplace;
