
import { useState } from "react";
import { ChevronRight } from "lucide-react";
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

interface Step1MarketplaceProps {
  productName: string;
  productImage: string;
  formData: ReviewFormData;
  updateFormData: (data: Partial<ReviewFormData>) => void;
  onNextStep: () => void;
}

const Step1Marketplace = ({
  productName,
  productImage,
  formData,
  updateFormData,
  onNextStep,
}: Step1MarketplaceProps) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReviewFormData, string>>
  >({});

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
    updateFormData({ productType: value });
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
    const orderIdPattern = /^\d{3}-\d{7}-\d{7}$/;
    if (!formData.orderId.trim()) {
      newErrors.orderId = "Order ID is required";
    } else if (!orderIdPattern.test(formData.orderId)) {
      newErrors.orderId =
        "Invalid Amazon order ID format. Should be like 123-4567890-1234567";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
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
    } else {
      alert("Please check the form and fill in all required fields correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="flex justify-center items-center">
        <img
          src="/images/funnel/amazon-gift-card-5.png"
          className="h-[200px] object-contain rounded"
        />
      </div>

      {/* Select Product */}
      <div className="space-y-3">
        <Label htmlFor="product">
          Which product did you buy? <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={handleProductChange}
          defaultValue={formData.productType}
        >
          <SelectTrigger className={errors.productType ? "border-destructive" : ""}>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dell-desktop">Dell Desktop</SelectItem>
            <SelectItem value="lenovo-laptop">Lenovo Laptop</SelectItem>
          </SelectContent>
        </Select>
        {errors.productType && (
          <p className="text-sm text-destructive">{errors.productType}</p>
        )}
      </div>

      {/* Select Marketplace */}
      <div className="space-y-3">
        <Label htmlFor="country">
          Select the marketplace you purchased from{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={handleCountryChange}
          defaultValue={formData.country}
        >
          <SelectTrigger className={errors.country ? "border-destructive" : ""}>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States (Amazon.com)</SelectItem>
            <SelectItem value="ca">Canada (Amazon.ca)</SelectItem>
            <SelectItem value="mx">Mexico (Amazon.com.mx)</SelectItem>
            <SelectItem value="gb">United Kingdom (Amazon.co.uk)</SelectItem>
            <SelectItem value="fr">France (Amazon.fr)</SelectItem>
            <SelectItem value="de">Germany (Amazon.de)</SelectItem>
            <SelectItem value="it">Italy (Amazon.it)</SelectItem>
            <SelectItem value="es">Spain (Amazon.es)</SelectItem>
            <SelectItem value="in">India (Amazon.in)</SelectItem>
            <SelectItem value="jp">Japan (Amazon.co.jp)</SelectItem>
            <SelectItem value="nl">Netherlands (Amazon.nl)</SelectItem>
            <SelectItem value="se">Sweden (Amazon.se)</SelectItem>
            <SelectItem value="au">Australia (Amazon.com.au)</SelectItem>
            <SelectItem value="br">Brazil (Amazon.com.br)</SelectItem>
            <SelectItem value="sg">Singapore (Amazon.sg)</SelectItem>
            <SelectItem value="tr">Turkey (Amazon.com.tr)</SelectItem>
            <SelectItem value="sa">Saudi Arabia (Amazon.sa)</SelectItem>
            <SelectItem value="ae">United Arab Emirates (Amazon.ae)</SelectItem>
            <SelectItem value="pl">Poland (Amazon.pl)</SelectItem>
            <SelectItem value="eg">Egypt (Amazon.eg)</SelectItem>
            <SelectItem value="za">South Africa (No Amazon site)</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country}</p>
        )}
      </div>

      {/* Amazon Order ID */}
      <div className="space-y-3">
        <Label htmlFor="orderId">
          Amazon order number <span className="text-red-500">*</span>
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
        <Label htmlFor="usedMoreThanSevenDays">
          Have you been using this product for more than 7 days?{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={handleUsageChange}
          defaultValue={formData.usedMoreThanSevenDays ? "Yes" : "No"}
        >
          <SelectTrigger
            className={errors.usedMoreThanSevenDays ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select Yes or No" />
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

      <Button
        type="submit"
        className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium mt-6"
      >
        Next Step
        <ChevronRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
};

export default Step1Marketplace;
