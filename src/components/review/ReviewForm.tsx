
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StarRating from "./StarRating";

interface ReviewFormProps {
  productName: string;
  productImage: string;
  campaignId: string;
  onSubmit: (formData: ReviewFormData) => void;
}

export interface ReviewFormData {
  orderId: string;
  rating: number;
  feedback: string;
  email: string;
  country: string;
}

const ReviewForm = ({
  productName,
  productImage,
  campaignId,
  onSubmit,
}: ReviewFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReviewFormData>({
    orderId: "",
    rating: 0,
    feedback: "",
    email: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReviewFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};
    
    if (!formData.orderId.trim()) {
      newErrors.orderId = "Order ID is required";
    }
    
    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    }
    
    if (!formData.country) {
      newErrors.country = "Please select your country";
    }
    
    // Email is optional, but if provided, should be valid
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
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
          src={productImage || "https://placehold.co/200x200/EEE/31304D?text=Product"}
          alt={productName}
          className="w-16 h-16 object-contain rounded"
        />
        <div className="text-center sm:text-left">
          <h3 className="font-medium">{productName}</h3>
          <p className="text-sm text-muted-foreground">Campaign ID: {campaignId}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="orderId">Order ID</Label>
        <Input
          id="orderId"
          name="orderId"
          placeholder="Enter your Amazon order ID"
          value={formData.orderId}
          onChange={handleChange}
          className={errors.orderId ? "border-destructive" : ""}
        />
        {errors.orderId && (
          <p className="text-sm text-destructive">{errors.orderId}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Your Rating</Label>
        <div className="flex justify-center sm:justify-start">
          <StarRating onChange={handleRatingChange} />
        </div>
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="feedback">Your Feedback</Label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="Tell us what you think about the product"
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          className={errors.feedback ? "border-destructive" : ""}
        />
        {errors.feedback && (
          <p className="text-sm text-destructive">{errors.feedback}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="country">Where did you purchase this product?</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className={errors.country ? "border-destructive" : ""}>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States (Amazon.com)</SelectItem>
            <SelectItem value="ca">Canada (Amazon.ca)</SelectItem>
            <SelectItem value="uk">United Kingdom (Amazon.co.uk)</SelectItem>
            <SelectItem value="de">Germany (Amazon.de)</SelectItem>
            <SelectItem value="fr">France (Amazon.fr)</SelectItem>
            <SelectItem value="jp">Japan (Amazon.co.jp)</SelectItem>
            <SelectItem value="au">Australia (Amazon.com.au)</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email to receive a gift (optional)"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          We'll send you a thank you gift for your review. Your email won't be
          shared with third parties.
        </p>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 mt-6">
        Submit Review
        <ChevronRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
};

export default ReviewForm;
