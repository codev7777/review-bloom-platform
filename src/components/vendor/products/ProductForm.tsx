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
import { useAuth } from "@/hooks/use-auth";
import { Product } from "@/types";
import { getImageUrl, getImageHeaders } from "@/utils/imageUrl";

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

const CATEGORIES = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Kitchen" },
  { id: 3, name: "Fitness" },
  { id: 4, name: "Home & Garden" },
  { id: 5, name: "Beauty" },
  { id: 6, name: "Toys" },
  { id: 7, name: "Clothing" },
  { id: 8, name: "Books" },
  { id: 9, name: "Other" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BACKEND_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

interface FormData extends Omit<Partial<Product>, "image"> {
  image: File | string | null;
}

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const isEditMode = Boolean(productId);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    categoryId: string;
    companyId: string;
    image: string | null;
    asin?: string;
  }>({
    title: "",
    description: "",
    categoryId: "",
    companyId: auth?.user?.companyId?.toString() || "",
    image: null,
    asin: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode && productId) {
        setIsFetching(true);
        try {
          console.log("Starting to fetch product with ID:", productId);
          console.log("Current formData:", formData);

          const response = await getProduct(productId);
          console.log("API Response:", response);

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

            // Set form data
            setFormData(newFormData);

            // Set image preview if image exists
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
      }
    };

    fetchProduct();
  }, [productId, isEditMode, auth?.user?.companyId, navigate]);

  // Add effect to log formData changes
  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  // Add effect to log imagePreview changes
  useEffect(() => {
    console.log("imagePreview updated:", imagePreview);
  }, [imagePreview]);

  const handleChange = (
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

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
      );
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("File must be an image (JPEG, PNG, or WebP)");
      return;
    }

    setFileError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData((prev) => ({
        ...prev,
        image: base64String,
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
      // Validate required fields
      if (!formData.title || !formData.description || !formData.categoryId) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categoryId", String(formData.categoryId));
      formDataToSend.append("companyId", String(formData.companyId));

      if (formData.asin) {
        formDataToSend.append("asin", formData.asin);
      }

      // Only include image if it has been changed
      if (hasImageChanged && formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (isEditMode && productId) {
        await updateProduct(productId, formDataToSend);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await createProduct(formDataToSend);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }

      navigate("/vendor-dashboard/products");
    } catch (error) {
      console.error("Error submitting product:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to submit product",
        variant: "destructive",
      });
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
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-muted-foreground">
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="asin">ASIN</Label>
              <Input
                id="asin"
                name="asin"
                value={formData.asin}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, asin: e.target.value }))
                }
                placeholder="Enter product ASIN"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, categoryId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
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
                      className="h-48 w-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
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
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
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
    </div>
  );
};

export default ProductForm;
