import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { User, Bell, CreditCard, Mail, Shield, Upload, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createCompany,
  updateCompany,
  getCompany,
} from "@/lib/api/companies/companies.api";
import { updateUser, getUser } from "@/lib/api/users/users.api";
import { Company, User as UserType } from "@/types";
import { getImageUrl } from "@/utils/imageUrl";
import { API_URL } from "@/config/env";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const BACKEND_URL = API_URL.replace("/v1", "");

// Mock data for fallback
const MOCK_COMPANY = {
  id: "1",
  name: "Sample Company",
  website: "https://example.com",
  email: "contact@example.com",
  phone: "+1234567890",
  address: "123 Sample St",
  logo: "https://placehold.co/100x100/FFF5E8/FF9130?text=Logo",
  detail: "Sample company description",
};

// Define a separate interface for the form data
interface SettingsFormData {
  // User fields
  name: string;
  email: string;
  phone: string;
  // Company fields
  companyName: string;
  websiteUrl: string;
  detail: string;
  logo: string | null;
}

const SettingsPanel = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<SettingsFormData>({
    name: auth.user?.name || "",
    email: auth.user?.email || "",
    phone: "",
    companyName: "",
    websiteUrl: "",
    detail: "",
    logo: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const getImageUrl = (imagePath: string | undefined) => {
  //   if (!imagePath)
  //     return "https://placehold.co/100x100/FFF5E8/FF9130?text=No+Logo";
  //   return imagePath.startsWith("http")
  //     ? imagePath
  //     : `${BACKEND_URL}${imagePath}`;
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.user?.id) {
        try {
          // Fetch user data
          const userData = await getUser(String(auth.user.id));
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
          }));

          // Fetch company data if user has a company
          if (auth.user.companyId) {
            const company = await getCompany(String(auth.user.companyId));
            setFormData((prev) => ({
              ...prev,
              companyName: company.name || "",
              websiteUrl: company.websiteUrl || "",
              detail: company.detail || "",
              logo: company.logo || null,
            }));
            if (company.logo) {
              setPreviewImage(getImageUrl(company.logo));
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load user data",
          });
        }
      }
    };

    fetchData();
  }, [auth.user?.id, auth.user?.companyId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("File must be a JPEG, PNG, GIF, or WebP image");
      return;
    }

    setFileError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String);
      setFormData((prev) => ({ ...prev, logo: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, logo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      if (activeTab === "profile") {
        // Only update user information
        if (auth.user?.id) {
          const updatedUser = await updateUser(String(auth.user.id), {
            name: formData.name,
          });

          // Update local storage with new user data
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Force page reload to update auth context
          window.location.reload();
        }
      } else if (activeTab === "company") {
        // Validate required company fields
        if (!formData.companyName || !formData.websiteUrl || !formData.detail) {
          toast({
            variant: "destructive",
            title: "Missing Fields",
            description: "Please fill in all required fields",
          });
          return;
        }

        // Prepare company data
        const companyData = {
          name: formData.companyName,
          websiteUrl: formData.websiteUrl,
          detail: formData.detail,
          ratio: 0, // Default or calculated value
          reviews: 0, // Default number
          createdAt: new Date(), // Date object
          updatedAt: new Date(), // Date object
        };

        // Only include logo if it's a new base64 string or if it's being removed
        if (formData.logo !== null) {
          // If it's a base64 string (new image or existing image)
          if (typeof formData.logo === "string") {
            // Check if it's a base64 string or a URL
            if (formData.logo.startsWith("data:image")) {
              // It's a new base64 image
              (companyData as any).logo = formData.logo;
            } else if (formData.logo.startsWith("http")) {
              // It's an existing URL, don't include it in the update
              // This prevents sending the URL as base64
            }
          }
        } else {
          // If logo is null, send empty string to remove the logo
          (companyData as any).logo = "";
        }

        // If user doesn't have a company, create one
        if (!auth.user?.companyId) {
          // Create company
          const newCompany = await createCompany(companyData);

          // Update user with new company ID
          if (auth.user?.id) {
            const updatedUser = await updateUser(String(auth.user.id), {
              companyId: String(newCompany.id),
            });

            // Update local storage with new user data
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // Force page reload to update auth context
            window.location.reload();
          }
        } else {
          // Update existing company
          await updateCompany(String(auth.user.companyId), companyData);
        }
      }

      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-white">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className="space-y-6"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="company">
            <Shield className="mr-2 h-4 w-4" />
            Company
          </TabsTrigger>
          {/* <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger> */}
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-sm text-white">
              Update your personal information and how others see you on the
              platform
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="text-black"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Company Information</h3>
            <p className="text-sm text-white">
              Update your company details and business information
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website</Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                placeholder="https://www.example.com"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detail">Company Description</Label>
              <Textarea
                id="detail"
                name="detail"
                placeholder="Tell us about your company..."
                value={formData.detail}
                onChange={handleChange}
                rows={4}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img
                      src={getImageUrl(previewImage)}
                      alt="Company logo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-black">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-1 block text-xs text-gray-500">
                        Upload logo
                      </span>
                    </div>
                  )}
                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={ALLOWED_FILE_TYPES.join(",")}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-black"
                  >
                    {previewImage ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {fileError && (
                    <p className="mt-1 text-sm text-red-500">{fileError}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended size: 200x200px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-sm text-white">
              Configure how you want to be notified
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-white">
                  Receive notifications via email
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-white">
                  Receive push notifications in your browser
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Billing Information</h3>
            <p className="text-sm text-white">
              Manage your billing information and subscription
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Current Plan</Label>
                <p className="text-sm text-white">Free Plan</p>
              </div>
              <Button variant="outline" className="text-black">
                Upgrade Plan
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  No payment method added
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
