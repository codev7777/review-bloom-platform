import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  User,
  Bell,
  CreditCard,
  Mail,
  Shield,
  Upload,
  X,
  Users,
} from "lucide-react";
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
import SubscriptionPanel from "./SubscriptionPanel";
import UserManagementPanel from "./UserManagementPanel";
// import PaymentSettings from "./PaymentSettings";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const BACKEND_URL = API_URL.replace("/v1", "");

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

interface SettingsFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl: string;
  detail: string;
  logo: string | null;
  metaPixelId: string;
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
    metaPixelId: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.user?.id) {
        try {
          const userData = await getUser(String(auth.user.id));
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
          }));

          if (auth.user.companyId) {
            const company = await getCompany(String(auth.user.companyId));
            setFormData((prev) => ({
              ...prev,
              companyName: company.name || "",
              websiteUrl: company.websiteUrl || "",
              detail: company.detail || "",
              logo: company.logo || null,
              metaPixelId: company.metaPixelId || "",
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

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 5MB");
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("File must be a JPEG, PNG, GIF, or WebP image");
      return;
    }

    setFileError(null);

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
        if (auth.user?.id) {
          const updatedUser = await updateUser(String(auth.user.id), {
            name: formData.name,
          });

          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();
        }
      } else if (activeTab === "company") {
        if (!formData.companyName || !formData.websiteUrl || !formData.detail) {
          toast({
            variant: "destructive",
            title: "Missing Fields",
            description: "Please fill in all required fields",
          });
          return;
        }

        const companyData = {
          name: formData.companyName,
          websiteUrl: formData.websiteUrl,
          detail: formData.detail,
          ratio: 0,
          reviews: [],
          metaPixelId: formData.metaPixelId,
        };

        if (formData.logo !== null) {
          if (typeof formData.logo === "string") {
            if (formData.logo.startsWith("data:image")) {
              (companyData as any).logo = formData.logo;
            } else if (formData.logo.startsWith("http")) {
            }
          } else {
            (companyData as any).logo = "";
          }
        }

        if (!auth.user?.companyId) {
          const newCompany = await createCompany(companyData);
          if (auth.user?.id) {
            const updatedUser = await updateUser(String(auth.user.id), {
              companyId: String(newCompany.id),
            });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.location.reload();
          }
        } else {
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
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="mr-2 h-4 w-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
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
              <Label htmlFor="metaPixelId">Meta Pixel ID</Label>
              <Input
                id="metaPixelId"
                name="metaPixelId"
                placeholder="Enter your Meta Pixel ID"
                value={formData.metaPixelId}
                onChange={handleChange}
                className="text-black"
              />
              <p className="text-xs text-gray-500">
                Available for GOLD and PLATINUM plans only
              </p>
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

        <UserManagementPanel />

        <SubscriptionPanel />
        {/* <PaymentSettings /> */}
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
