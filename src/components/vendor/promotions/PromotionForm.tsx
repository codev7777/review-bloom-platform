import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X,
  CreditCard,
  CircleOff,
  Tag,
  Gift,
  Download,
  Plus,
  Trash2,
  FileText,
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
import { API_URL } from "@/config/env";

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
    value: "NONE" as const,
    label: "No Promotion",
    icon: <CircleOff className="h-4 w-4" />,
  },
  {
    value: "GIFT_CARD" as const,
    label: "Gift Card or eGift Card",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    value: "DISCOUNT_CODE" as const,
    label: "Discount Code, Promo Code",
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
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB in bytes for PDFs
const BACKEND_URL = API_URL.replace("/v1", "");

type PromotionFormData = Omit<Promotion, "id" | "createdAt" | "updatedAt"> & {
  isActive: "YES" | "NO";
};

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
    isActive: "YES",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [couponCodes, setCouponCodes] = useState<string[]>([]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [error, setError] = useState<{
    title: string;
    message: string;
    showUpgradeButton: boolean;
  } | null>(null);

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
            if (response.couponCodes) {
              setCouponCodes(response.couponCodes);
            }
          }
        } catch (error) {
          console.error("Error fetching promotion:", error);
          toast({
            title: "Error",
            description: "Failed to load promotion data",
            variant: "destructive",
          });
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

  const handlePdfUpload = (file: File) => {
    setFileError(null);

    // Validate file type
    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file");
      return;
    }

    // Validate file size
    if (file.size > MAX_PDF_SIZE) {
      setFileError("PDF file size exceeds 5MB limit");
      return;
    }

    // Create a base64 string
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setFormData((prev) => ({ ...prev, downloadableFileUrl: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the data to be sent with only allowed fields
      const dataToSend: any = {
        title: formData.title,
        description: formData.description,
        promotionType: formData.promotionType,
        isActive: formData.isActive,
      };

      // Only include image if it has changed
      if (isEditMode && hasImageChanged) {
        dataToSend.image = formData.image;
      } else if (!isEditMode) {
        dataToSend.image = formData.image;
      }

      // Add type-specific fields based on promotion type
      switch (formData.promotionType) {
        case "GIFT_CARD":
          dataToSend.giftCardDeliveryMethod = formData.giftCardDeliveryMethod;
          break;
        case "DISCOUNT_CODE":
          dataToSend.approvalMethod = formData.approvalMethod;
          dataToSend.codeType = formData.codeType;
          dataToSend.couponCodes = couponCodes;
          break;
        case "FREE_PRODUCT":
          dataToSend.freeProductDeliveryMethod = "SHIP";
          dataToSend.freeProductApprovalMethod = "MANUAL";
          break;
        case "DIGITAL_DOWNLOAD":
          dataToSend.downloadableFileUrl = formData.downloadableFileUrl;
          dataToSend.digitalApprovalMethod = formData.digitalApprovalMethod;
          break;
      }

      if (isEditMode && id) {
        await updatePromotion(id, dataToSend);
        toast({
          title: "Success",
          description: "Promotion updated successfully",
        });
      } else {
        await createPromotion(dataToSend);
        toast({
          title: "Success",
          description: "Promotion created successfully",
        });
      }
      navigate("/vendor-dashboard/promotions");
    } catch (error: any) {
      console.error("Error submitting promotion:", error);
      // setError({
      //   title: "Error",
      //   message: error.message || "Failed to submit promotion",
      //   showUpgradeButton: false,
      // });
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to save promotion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCouponCode = () => {
    if (newCouponCode.trim()) {
      setCouponCodes([...couponCodes, newCouponCode.trim()]);
      setNewCouponCode("");
    }
  };

  const handleRemoveCouponCode = (index: number) => {
    setCouponCodes(couponCodes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEditMode ? "Edit Promotion" : "Create Promotion"}
        </h1>
        <p>
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
                  className="text-black"
                />
              </div>

              <div className="text-black">
                <Label >Promotion Type</Label>
                <Select
                  value={formData.promotionType}
                  onValueChange={(value) =>
                    handleSelectChange("promotionType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select promotion type"
                      className="text-black bg-gray-400"
                    />
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
                <p className="text-sm mb-2">
                  Provide a detailed description about the promotion, conditions, instructions on how to use the gift card or coupon code once your customers receive it, or any other related information.
                </p>
                <p className="text-sm mb-1">
                  Example:
                  *Limit one free product per household. Only valid on full priced purchases. Proof of purchase is required. No additional purchase is necessary. Please allow 1-2 weeks for delivery. Our offer is not in any way dependent on feedback that you provide, positive or negative. Offer only valid where permitted; void where prohibited. Offer valid while supplies last and subject to change or cancellation at any time.
                </p>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your promotion..."
                  rows={4}
                  required
                  className="text-black"
                />
              </div>

              <div className="text-black">
                <Label >Status</Label>
                <Select
                  value={formData.isActive}
                  onValueChange={(value) =>
                    handleSelectChange("isActive", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Active</SelectItem>
                    <SelectItem value="NO">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type-specific fields */}
              {formData.promotionType === "GIFT_CARD" && (
                <div className="space-y-2">
                  <Label>Delivery Method</Label>
                  <RadioGroup
                    value={formData.giftCardDeliveryMethod}
                    onValueChange={(value) =>
                      handleSelectChange("giftCardDeliveryMethod", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="SHIP" id="ship" />
                      <Label htmlFor="ship">Ship to customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="DIGITAL" id="digital" />
                      <Label htmlFor="digital">
                        Digitally deliver to customer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {formData.promotionType === "DISCOUNT_CODE" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Approval Method</Label>
                    <RadioGroup
                      value={formData.approvalMethod}
                      onValueChange={(value) =>
                        handleSelectChange("approvalMethod", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MANUAL" id="manual" />
                        <Label htmlFor="manual">
                          Manually approve and deliver
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="AUTOMATIC" id="automatic" />
                        <Label htmlFor="automatic">
                          Deliver automatically without approval
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Code Type</Label>
                    <RadioGroup
                      value={formData.codeType}
                      onValueChange={(value) =>
                        handleSelectChange("codeType", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SAME_FOR_ALL" id="same" />
                        <Label htmlFor="same">Same code for everyone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SINGLE_USE" id="single" />
                        <Label htmlFor="single">
                          Single use code for each customer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Coupon Codes</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="text-black"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddCouponCode}
                      >
                        <Plus className="h-4 w-4 text-black" />
                      </Button>
                    </div>
                    <div className="space-y-2 mt-2 text-black">
                      {couponCodes.map((code, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span>{code}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCouponCode(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.promotionType === "DIGITAL_DOWNLOAD" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Downloadable File</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 cursor-pointer transition-colors ${
                        isDragging
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handlePdfUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "application/pdf";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement)
                            .files?.[0];
                          if (file) {
                            handlePdfUpload(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      {formData.downloadableFileUrl ? (
                        <div className="relative w-full h-full">
                          <div className="flex flex-col items-center justify-center h-full">
                            <FileText className="h-10 w-10 text-blue-500 mb-2" />
                            <p className="text-sm text-gray-500 text-center">
                              PDF file uploaded successfully
                            </p>
                            <Button
                              type="button"
                              size="sm"
                              className="mt-2 text-black bg-[#f97216] hover:bg-[#ef600f]"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prev) => ({
                                  ...prev,
                                  downloadableFileUrl: "",
                                }));
                              }}
                            >
                              <X className="h-4 w-4 mr-2 text-black" />
                              Remove PDF
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 text-center">
                            Drag and drop a PDF file here, or click to select
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PDF up to 5MB
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

                  <div className="space-y-2">
                    <Label>Approval Method</Label>
                    <RadioGroup
                      value={formData.digitalApprovalMethod}
                      onValueChange={(value) =>
                        handleSelectChange("digitalApprovalMethod", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MANUAL" id="manual-digital" />
                        <Label htmlFor="manual-digital">
                          Manually approve and deliver
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="AUTOMATIC"
                          id="automatic-digital"
                        />
                        <Label htmlFor="automatic-digital">
                          Deliver automatically without approval
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
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
                    className="hidden text-black"
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
                        <X className="h-4 w-4 text-black" />
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

          <div className="flex justify-end gap-4 text-black">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/vendor-dashboard/promotions")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
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

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              {error.title}
            </h3>
            <p className="text-gray-700 mb-6">{error.message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {error.showUpgradeButton && (
                <button
                  onClick={() => {
                    setError(null);
                    navigate("/vendor-dashboard/settings");
                  }}
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionForm;
