import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
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

  // const handleAsinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateFormData({ asin: e.target.value });
  //   if (errors.asin) {
  //     setErrors((prev) => ({ ...prev, asin: "" }));
  //   }
  // };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ orderId: e.target.value });
    if (errors.orderId) {
      setErrors((prev) => ({ ...prev, orderId: "" }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    updateFormData({ usedMoreThanSevenDays: checked });
    if (errors.usedMoreThanSevenDays) {
      setErrors((prev) => ({ ...prev, usedMoreThanSevenDays: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};

    // Validate Order ID (Amazon order numbers format: 11Y-YYYYYYY-YYYYYYY)
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

    // if (!formData.asin || formData.asin.trim() === "") {
    //   newErrors.asin = "ASIN is required";
    // }

    if (!formData.usedMoreThanSevenDays) {
      newErrors.usedMoreThanSevenDays =
        "You must have used the product for at least 7 days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNextStep();
    } else {
      toast({
        title: "Please check the form",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-muted rounded-lg">
        <img
          src={
            productImage ||
            "https://placehold.co/200x200/EEE/31304D?text=Product"
          }
          alt={productName}
          className="w-32 h-32 object-contain rounded"
        />
        <div className="text-center sm:text-left">
          <h1 className="font-medium text-2xl">{productName}</h1>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="country">
          Where did you purchase this product?{" "}
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

      {/* <div className="space-y-3">
        <Label htmlFor="asin">
          Amazon ASIN <span className="text-red-500">*</span>
        </Label>
        <Input
          id="asin"
          name="asin"
          placeholder="B00EXAMPLE"
          value={formData.asin}
          onChange={handleAsinChange}
          className={errors.asin ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          The product ID found in the Amazon URL (10 characters)
        </p>
        {errors.asin && (
          <p className="text-sm text-destructive">{errors.asin}</p>
        )}
      </div> */}

      <div className="space-y-3">
        <Label htmlFor="orderId">
          Amazon Order ID <span className="text-red-500">*</span>
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

      <div className="flex items-start space-x-2">
        <Checkbox
          id="usedMoreThanSevenDays"
          checked={formData.usedMoreThanSevenDays}
          onCheckedChange={handleCheckboxChange}
          className={errors.usedMoreThanSevenDays ? "border-destructive" : ""}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="usedMoreThanSevenDays"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that I have used this product for at least 7 days
          </label>
          {errors.usedMoreThanSevenDays && (
            <p className="text-sm text-destructive">
              {errors.usedMoreThanSevenDays}
            </p>
          )}
        </div>
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
