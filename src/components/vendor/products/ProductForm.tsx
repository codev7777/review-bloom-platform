import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Upload, Image, X } from "lucide-react";
import {
  createProduct,
  updateProduct,
  getProduct,
} from "@/lib/api/products/products.api";
import { getCategories } from "@/lib/api/categories/categories.api";
import { useAuth } from "@/hooks/use-auth";
import { Product, Category } from "@/types";
import { getImageUrl, getImageHeaders } from "@/utils/imageUrl";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/env";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Kitchen Knife Set",
    description: "High-quality stainless steel knife set for your kitchen",
    asin: "B08N5LNQCV",
    categoryId: 1,
    companyId: 1,
    image: "https://placehold.co/300x300/FFF5E8/FF9130?text=Knife+Set",
  },
  {
    id: "2",
    title: "Yoga Mat",
    description: "Non-slip yoga mat for comfortable exercise",
    asin: "B07D9YYQ8V",
    categoryId: 2,
    companyId: 1,
    image: "https://placehold.co/100x100/FFF5E8/FF9130?text=Yoga+Mat",
  },
  {
    id: "3",
    title: "Bluetooth Headphones",
    description: "Wireless headphones with noise cancellation",
    asin: "B07Q5NDZBD",
    categoryId: 3,
    companyId: 1,
    image: "https://placehold.co/100x100/FFF5E8/FF9130?text=Headphones",
  },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BACKEND_URL = API_URL.replace("/v1", "");

interface FormData extends Omit<Partial<Product>, "image"> {
  image: File | string | null;
}

const ProductForm = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const isEditMode = Boolean(productId);
  const companyId = auth?.user?.companyId
    ? parseInt(auth.user.companyId, 10)
    : undefined;

  // Fetch categories using react-query
  const {
    data: categoriesResponse = { data: [] },
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useQuery<{
    data: Category[];
    totalPages: number;
    totalCount: number;
  }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(1, 1000), // Fetch up to 1000 categories
    retry: false,
    staleTime: 0, // Always consider the data stale
    gcTime: 0, // Don't cache the data
  });

  // Handle categories error
  useEffect(() => {
    if (isCategoriesError) {
      toast({
        variant: "destructive",
        title: "Failed to load categories",
        description:
          "There was an error loading the categories. Please try again.",
      });
    }
  }, [isCategoriesError, toast]);

  const categories: Category[] = categoriesResponse?.data ?? [];

  console.log("Initial setup:", {
    params,
    productId,
    isEditMode,
    authUser: auth?.user,
    companyId: auth?.user?.companyId,
  });

  // Fetch product data in edit mode
  const { data: productData } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => (productId ? getProduct(productId) : null),
    enabled: isEditMode,
  });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
    asin: "",
    categoryId: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update form data when product data is loaded
  useEffect(() => {
    if (isEditMode && productData) {
      setFormData({
        title: productData.title || "",
        description: productData.description || "",
        image: productData.image || null,
        asin: productData.asin || "",
        categoryId: productData.categoryId,
      });

      if (productData.image) {
        const imageUrl = getImageUrl(productData.image);
        console.log("Setting image preview URL:", imageUrl);
        setImagePreview(imageUrl);
      }
    }
  }, [productData, isEditMode]);

  useEffect(() => {
    console.log("useEffect triggered:", {
      params,
      productId,
      isEditMode,
      isFetching,
      currentFormData: formData,
    });

    const fetchProduct = async () => {
      if (isEditMode && productId) {
        console.log("Starting fetchProduct with:", {
          productId,
          isEditMode,
          currentFormData: formData,
        });

        setIsFetching(true);
        try {
          console.log("Making API call to get product with ID:", productId);
          const response = await getProduct(productId);
          console.log("API Response received:", response);

          if (response) {
            const newFormData = {
              title: response.title || "",
              description: response.description || "",
              image: response.image || null,
              companyId:
                response.companyId?.toString() ||
                auth?.user?.companyId?.toString() ||
                "",
              categoryId: response.categoryId?.toString() || "",
              asin: response.asin || "",
            };
            console.log("Setting new formData:", newFormData);

            setFormData(newFormData);

            if (response.image) {
              const imageUrl = getImageUrl(response.image);
              console.log("Setting image preview URL:", imageUrl);
              setImagePreview(imageUrl);
            }
          } else {
            console.warn("No product data received from API");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          if (error.response) {
            console.error("Error response:", error.response.data);
          }
          toast({
            title: "Error",
            description: "Failed to load product data. Please try again.",
            variant: "destructive",
          });
          navigate("/vendor-dashboard/products");
        } finally {
          setIsFetching(false);
        }
      } else {
        console.log("Skipping fetchProduct because:", {
          isEditMode,
          productId,
          isFetching,
        });
      }
    };

    fetchProduct();
  }, [productId, isEditMode, auth?.user?.companyId, navigate]);

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("imagePreview updated:", imagePreview);
  }, [imagePreview]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
      );
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("File must be an image (JPEG, PNG, or WebP)");
      return;
    }

    setFileError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setHasImageChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setHasImageChanged(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.title || !formData.description || !formData.categoryId) {
        setErrorMessage("Please fill in all required fields");
        setErrorModalOpen(true);
        return;
      }

      if (!companyId) {
        setErrorMessage(
          "You need to be associated with a company to create a product"
        );
        setErrorModalOpen(true);
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("categoryId", formData.categoryId.toString());
      formDataToSubmit.append("companyId", companyId.toString());
      if (formData.asin) formDataToSubmit.append("asin", formData.asin);
      if (formData.image instanceof File) {
        formDataToSubmit.append("image", formData.image);
      }

      if (isEditMode && productId) {
        await updateProduct(productId, formDataToSubmit);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await createProduct(formDataToSubmit);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }
      navigate("/vendor-dashboard/products");
    } catch (error: any) {
      console.error("Error submitting product:", error);

      // Check if the error is a plan limit error (403 status and message about plan limits)
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.includes("maximum number of products")
      ) {
        const planType =
          error.response.data.message.match(
            /your (SILVER|GOLD|PLATINUM) plan/i
          )?.[1] || "current";
        let upgradeMessage = "";

        if (planType === "SILVER") {
          upgradeMessage =
            "Upgrade to GOLD plan for up to 30 products or PLATINUM plan for unlimited products.";
        } else if (planType === "GOLD") {
          upgradeMessage = "Upgrade to PLATINUM plan for unlimited products.";
        }

        setErrorMessage(
          `You have reached the maximum number of products allowed by your ${planType} plan. ${upgradeMessage}`
        );
        setErrorModalOpen(true);
      } else {
        // For all other errors, show a toast
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.message || "Failed to save product",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-500 text-white">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-white">
          {isEditMode
            ? "Update your product information"
            : "Add a new product to your catalog"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                required
                className="text-black"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
                required
                className="text-black"
              />
            </div>

            <div>
              <Label htmlFor="asin">ASIN</Label>
              <Input
                id="asin"
                name="asin"
                value={formData.asin}
                onChange={handleInputChange}
                placeholder="Enter product ASIN"
                className="text-black"
              />
            </div>

            <div className="text-black">
              <Label className="text-white">Category</Label>
              <Select
                value={formData.categoryId?.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: parseInt(value),
                  }))
                }
                disabled={isLoadingCategories}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select a category"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent className="text-black">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Product Image</Label>
              <div
                className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 ${
                  imagePreview ? "border-transparent" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="max-h-60 max-w-60 object-contain rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-gray-200"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-white mb-2" />
                    <p className="text-sm text-white">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-white mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
              {fileError && (
                <div className="text-sm text-red-500 mt-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fileError}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/vendor-dashboard/products")}
            className="transition-all duration-200 hover:bg-gray-100 text-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-200 transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditMode ? "Saving..." : "Adding..."}
              </span>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>

      <Dialog open={errorModalOpen} onOpenChange={setErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">
              Plan Limit Reached
            </DialogTitle>
            <DialogDescription className="text-gray-700">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setErrorModalOpen(false)}
            >
              Close
            </Button>
            {errorMessage.includes("Upgrade to") && (
              <Button
                type="button"
                onClick={() => {
                  setErrorModalOpen(false);
                  navigate("/vendor-dashboard/settings");
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Upgrade Plan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
