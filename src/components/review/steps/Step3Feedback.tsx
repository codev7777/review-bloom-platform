import { useState, useEffect } from "react";
import { ChevronRight, Copy, ArrowLeft, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ReviewFormData } from "../ReviewFunnel";
import GetDomain from "@/lib/GetDomain";
import { API_URL } from "@/config/env";

interface Step3FeedbackProps {
  formData: ReviewFormData;
  updateFormData: (data: Partial<ReviewFormData>) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onGoToAmazon: () => void;
  promotion?: {
    id: string | number;
    title: string;
    image: string;
    description: string;
  };
  products: Array<{
    id: number;
    title: string;
    image: string;
    asin: string;
  }>;
}

const BACKEND_URL = API_URL.replace("/v1", "");

const Step3Feedback = ({
  formData,
  updateFormData,
  onNextStep,
  onPreviousStep,
  onGoToAmazon,
  products,
  promotion,
}: Step3FeedbackProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReviewFormData, string>>
  >({});
  const [feedbackLength, setFeedbackLength] = useState(
    formData.feedback?.length || 0
  );
  const [isValidFeedback, setIsValidFeedback] = useState(false);

  // Get the selected product's image
  const selectedProduct = products.find((p) => p.id === formData.productId);
  const productImage = selectedProduct?.image
    ? `${BACKEND_URL}/uploads/${selectedProduct.image}`
    : "/images/products/default-product.jpg";

  // Validate feedback on component mount and when feedback changes
  useEffect(() => {
    const valid =
      formData.feedback &&
      formData.feedback.trim() !== "" &&
      formData.feedback.length >= 40;
    setIsValidFeedback(!!valid);
  }, [formData.feedback]);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateFormData({ feedback: value });
    setFeedbackLength(value.length);
    if (errors.feedback) {
      setErrors((prev) => ({ ...prev, feedback: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};

    if (!formData.feedback || formData.feedback.trim() === "") {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.length < 40) {
      newErrors.feedback = "Feedback must be at least 40 characters";
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
        description:
          "Please provide detailed feedback (at least 40 characters).",
        variant: "destructive",
      });
    }
  };

  const handleCopyAndShare = () => {
    // Only proceed if feedback is valid
    if (!isValidFeedback) {
      toast({
        title: "Feedback required",
        description:
          "Please provide detailed feedback (at least 40 characters) before copying.",
        variant: "destructive",
      });
      return;
    }

    // Copy the feedback text to clipboard
    navigator.clipboard
      .writeText(formData.feedback)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description:
            "Your review text has been copied. We'll redirect you to Amazon now.",
        });

        // Short delay before redirecting
        setTimeout(() => {
          onGoToAmazon();
        }, 1000);
      })
      .catch(() => {
        toast({
          title: "Couldn't copy text",
          description: "Please try again or copy the text manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className=" animate-fade-in">
      <div className="flex justify-center items-center mt-10 mb-3">
        <img
          src={`${BACKEND_URL}/uploads/${promotion?.image}`}
          alt={promotion?.title}
          className=" h-[200px] object-contain rounded border border-gray-200"
        />
      </div>
      <h2 className="text-2xl font-semibold text-center ">
        {promotion?.title}
      </h2>
      <div className="flex justify-center items-center mt-12 mb-3">
        <img
          src={productImage}
          alt={selectedProduct?.title || "Product"}
          className="w-[200px] h-[200px] object-contain rounded border border-gray-200"
        />
      </div>
      <p className="text-center text-muted-foreground text-2xl">
        How do you like our <strong>{selectedProduct.title}</strong>?
      </p>

      <div className="space-y-3 mt-8">
        <Label htmlFor="feedback">
          Your Review <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="What did you like or dislike about the product? How was your experience using it?"
          rows={6}
          value={formData.feedback}
          onChange={handleFeedbackChange}
          className={errors.feedback ? "border-destructive" : ""}
        />
        {errors.feedback && (
          <p className="text-sm text-destructive">{errors.feedback}</p>
        )}
        <p className="text-sm text-muted-foreground text-right">
          {feedbackLength}/40 Characters
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-4 items-center">
        {formData.rating >= 4 && (
          <Button
            type="button"
            onClick={handleCopyAndShare}
            disabled={!isValidFeedback}
            className={`flex-1 bg-[#232F3E] hover:bg-[#374151] text-white font-medium w-full sm:w-[500px] ${
              !isValidFeedback ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy & Share on Amazon
          </Button>
        )}

        <Button
          type="submit"
          className="flex-1 bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium pl-10 w-full sm:w-[500px]"
        >
          Continue
          <ChevronRight className="ml-0 w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={onPreviousStep}
          className="flex-1 bg-white hover:bg-gray-200 w-full sm:w-[500px]"
        >
          <ChevronLeft className="mr-0 h-4 w-4" /> Back
        </Button>
      </div>
    </form>
  );
};

export default Step3Feedback;
