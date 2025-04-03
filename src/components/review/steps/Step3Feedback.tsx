
import { useState } from "react";
import { ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ReviewFormData } from "../ReviewFunnel";

interface Step3FeedbackProps {
  formData: ReviewFormData;
  updateFormData: (data: Partial<ReviewFormData>) => void;
  onNextStep: () => void;
  onGoToAmazon: () => void;
}

const Step3Feedback = ({
  formData,
  updateFormData,
  onNextStep,
  onGoToAmazon,
}: Step3FeedbackProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});
  const [feedbackLength, setFeedbackLength] = useState(formData.feedback?.length || 0);

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
        description: "Please provide detailed feedback (at least 40 characters).",
        variant: "destructive",
      });
    }
  };

  const handleCopyAndShare = () => {
    // Copy the feedback text to clipboard
    navigator.clipboard.writeText(formData.feedback)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Your review text has been copied. We'll redirect you to Amazon now.",
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
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center">Your Feedback</h2>
      <p className="text-center text-muted-foreground">
        Please share your honest experience with this product
      </p>

      <div className="space-y-3">
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
        {errors.feedback && <p className="text-sm text-destructive">{errors.feedback}</p>}
        <p className="text-sm text-muted-foreground text-right">
          {feedbackLength}/40 characters minimum
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {formData.rating >= 4 && (
          <Button
            type="button"
            onClick={handleCopyAndShare}
            className="flex-1 bg-[#232F3E] hover:bg-[#374151] text-white font-medium"
          >
            <Copy className="mr-2 h-4 w-4" /> Copy & Share on Amazon
          </Button>
        )}
        <Button
          type="submit"
          className={`${formData.rating >= 4 ? 'flex-1' : 'w-full'} bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium`}
        >
          Continue to Receive Gift
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default Step3Feedback;
