import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X,
  CreditCard,
  Tag,
  Gift,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import {
  createPromotion,
  getPromotion,
  updatePromotion,
} from "@/lib/api/promotions/promotions.api";
import { Promotion } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";

// Mock promotions for fallback
const MOCK_PROMOTIONS = [
  {
    id: "1",
    title: "Summer Gift Card",
    promotionType: "GIFT_CARD" as const,
    description: "A $10 Amazon Gift Card for summer purchases",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Gift+Card",
    companyId: 1,
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    title: "Holiday Discount",
    promotionType: "DISCOUNT_CODE" as const,
    description: "15% off discount code for holiday shopping",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Discount",
    companyId: 1,
    createdAt: "2023-11-20",
  },
  {
    id: "3",
    title: "Product Giveaway",
    promotionType: "FREE_PRODUCT" as const,
    description: "Free kitchen gadget for selected customers",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Free+Product",
    companyId: 1,
    createdAt: "2023-08-05",
  },
  {
    id: "4",
    title: "Cookbook PDF",
    promotionType: "DIGITAL_DOWNLOAD" as const,
    description: "Exclusive cookbook PDF with recipes",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Digital+Download",
    companyId: 1,
    createdAt: "2023-09-12",
  },
];

const PROMOTION_TYPES = [
  {
    value: "GIFT_CARD" as const,
    label: "Gift Card or eGift Card",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    value: "DISCOUNT_CODE" as const,
    label: "Discount Code, Promo Code or Virtual Gift Card",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    value: "FREE_PRODUCT" as const,
    label: "Free Product",
    icon: <Gift className="h-4 w-4" />,
  },
  {
    value: "DIGITAL_DOWNLOAD" as const,
    label: "Digital Download",
    icon: <Download className="h-4 w-4" />,
  },
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const BACKEND_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

type PromotionFormData = Omit<Promotion, "id" | "createdAt" | "updatedAt">;

const PromotionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PromotionFormData>({
    title: "",
    promotionType: "GIFT_CARD",
    description: "",
    image: "https://placehold.co/300x200/FFF5E8/FF9130?text=Promotion",
    companyId: 1,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [hasImageChanged, setHasImageChanged] = useState(false);

  // Get the current user's company ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId || 1; // Default to 1 if not available

  useEffect(() => {
    const fetchPromotion = async () => {
      if (isEditMode && id) {
        setIsFetching(true);
        try {
          const response = await getPromotion(id);
          if (response) {
            setFormData(response);
            setPreviewImage(getImageUrl(response.image));
          }
        } catch (error) {
          console.error("Error fetching promotion:", error);
          toast.error("Failed to load promotion data");
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchPromotion();
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setFileError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setFileError("Please upload an image file");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 5MB limit");
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setPreviewImage(base64String);
      setFormData((prev) => ({ ...prev, image: base64String }));
      setHasImageChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFileError("");

    try {
      if (!formData.image) {
        setFileError("Please upload an image");
        return;
      }

      // Create the promotion data object
      const promotionData = {
        title: formData.title,
        description: formData.description,
        promotionType: formData.promotionType,
        ...(hasImageChanged && { image: formData.image }), // Only include image if it has been changed
      };

      if (isEditMode && id) {
        await updatePromotion(id, promotionData);
        toast({
          title: "Success",
          description: "Promotion updated successfully",
        });
      } else {
        await createPromotion(promotionData);
        toast({
          title: "Success",
          description: "Promotion created successfully",
        });
      }
      navigate("/vendor-dashboard/promotions");
    } catch (err) {
      console.error("Error submitting promotion:", err);
      toast({
        title: "Error",
        description: "Failed to save promotion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEditMode ? "Edit Promotion" : "Create Promotion"}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode
            ? "Update your promotion details"
            : "Create a new promotion for your review campaigns"}
        </p>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Promotion Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Summer Gift Card"
                  required
                />
              </div>

              <div>
                <Label>Promotion Type</Label>
                <Select
                  value={formData.promotionType}
                  onValueChange={(value) =>
                    handleSelectChange("promotionType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select promotion type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROMOTION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your promotion..."
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Promotion Image</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 cursor-pointer transition-colors ${
                    isDragging
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />

                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(null);
                          setFormData((prev) => ({
                            ...prev,
                            image:
                              "https://placehold.co/300x200/FFF5E8/FF9130?text=Promotion",
                          }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        Drag and drop an image here, or click to select
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </>
                  )}
                </div>

                {fileError && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {fileError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/vendor-dashboard/promotions")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Promotion"
              ) : (
                "Create Promotion"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PromotionForm;
