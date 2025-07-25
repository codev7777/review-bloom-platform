import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { generateQRCode } from "@/utils/qrCodeGenerator";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products/products.api";
import { getPromotions } from "@/lib/api/promotions/promotions.api";
import {
  createCampaign,
  updateCampaign,
  getCampaign,
} from "@/lib/api/campaigns/campaigns.api";
import { Campaign, CampaignStatus, Product, Promotion } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import GetDomain from "@/lib/GetDomain";
import { getImageUrl } from "@/utils/imageUrl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Marketplace constants
const MARKETPLACE_COUNTRIES = [
  "BE",
  "US",
  "CA",
  "MX",
  "GB",
  "FR",
  "DE",
  "IT",
  "ES",
  "IN",
  "JP",
  "NL",
  "SE",
  "AU",
  "BR",
  "SG",
  "TR",
  "SA",
  "AE",
  "PL",
  "EG",
  "ZA",
];

const MARKETPLACE_COUNTRY_NAMES: Record<string, string> = {
  BE: "Belgium",
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  ES: "Spain",
  IN: "India",
  JP: "Japan",
  NL: "Netherlands",
  SE: "Sweden",
  AU: "Australia",
  BR: "Brazil",
  SG: "Singapore",
  TR: "Turkey",
  SA: "Saudi Arabia",
  AE: "United Arab Emirates",
  PL: "Poland",
  EG: "Egypt",
  ZA: "South Africa",
};

const PROMOTION_TYPES = [
  {
    value: "NONE" as const,
    label: "No Promotion",
  },
  {
    value: "GIFT_CARD" as const,
    label: "Gift Card or eGift Card",
  },
  {
    value: "DISCOUNT_CODE" as const,
    label: "Discount Code, Promo Code",
  },
  {
    value: "FREE_PRODUCT" as const,
    label: "Free Product",
  },
  {
    value: "DIGITAL_DOWNLOAD" as const,
    label: "Digital Download",
  },
];

// Update the Campaign interface to include qrCode
interface CampaignWithQR extends Campaign {
  qrCode?: string;
}

// Add a helper function to get the label from PROMOTION_TYPES
const getPromotionTypeLabel = (promotionType: string) => {
  const promotion = PROMOTION_TYPES.find((p) => p.value === promotionType);
  return promotion ? promotion.label : promotionType;
};

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { user } = useAuth();
  const companyId = user?.companyId ? parseInt(user.companyId, 10) : undefined;

  // Fetch campaign data in edit mode
  const { data: campaignData } = useQuery<Campaign>({
    queryKey: ["campaign", id],
    queryFn: () => (id ? getCampaign(parseInt(id, 10)) : null),
    enabled: isEditMode,
  });

  // Fetch all products for the company
  const { data: productsResponse = { data: [] } } = useQuery<{
    data: Product[];
    totalPages: number;
    totalCount: number;
  }>({
    queryKey: ["products", companyId],
    queryFn: () => getProducts({ companyId }),
    enabled: !!companyId,
  });

  // Fetch promotions for the company
  const { data: promotionsResponse = { data: [] } } = useQuery<{
    data: Promotion[];
    totalPages: number;
    totalCount: number;
  }>({
    queryKey: ["promotions", companyId],
    queryFn: () => getPromotions({ companyId }),
    enabled: !!companyId,
  });

  const [formData, setFormData] = useState<Partial<CampaignWithQR>>({
    title: "",
    isActive: "YES",
    promotionId: "",
    productIds: [],
    marketplaces: [],
  });

  const [qrCode, setQrCode] = useState<string>("");
  const [campaignUrl, setCampaignUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [showUpgradeButton, setShowUpgradeButton] = useState(false);

  // Update form data when campaign data is loaded
  useEffect(() => {
    if (isEditMode && campaignData) {
      setFormData({
        title: campaignData.title,
        promotionId: campaignData.promotionId,
        productIds: campaignData.productIds,
        marketplaces: campaignData.marketplaces,
        isActive: campaignData.isActive,
      });

      setCampaignUrl(`${GetDomain()}/review/${campaignData.id}`);

      // Generate QR code for the campaign URL
      generateQRCode({
        value: `${GetDomain()}/review/${campaignData.id}`,
        size: 200,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        level: "H",
        includeMargin: true,
      }).then((qrCodeImageUrl) => {
        setQrCode(qrCodeImageUrl);
      });
    }
  }, [campaignData, isEditMode]);

  // Generate a new QR code when the campaign URL changes
  useEffect(() => {
    if (!campaignUrl && !isEditMode) {
      const url = `${GetDomain()}/review/${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}`;
      setCampaignUrl(url);

      generateQRCode({
        value: url,
        size: 200,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        level: "H",
        includeMargin: true,
      }).then((qrCodeImageUrl) => {
        setQrCode(qrCodeImageUrl);
      });
    }
  }, [campaignUrl, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "claims" ? Number(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId: string) => {
    setFormData((prev) => {
      const currentProductIds = prev.productIds || [];
      const productIdNum = Number(productId);

      // Toggle the product selection
      const newProductIds = currentProductIds.includes(productIdNum)
        ? currentProductIds.filter((id) => id !== productIdNum)
        : [...currentProductIds, productIdNum];

      return { ...prev, productIds: newProductIds };
    });
  };

  const handleMarketplaceSelect = (marketplace: string) => {
    setFormData((prev) => ({
      ...prev,
      marketplaces: prev.marketplaces?.includes(marketplace)
        ? prev.marketplaces.filter((m) => m !== marketplace)
        : [...(prev.marketplaces || []), marketplace],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.title ||
        !formData.promotionId ||
        !formData.productIds?.length ||
        !formData.marketplaces?.length
      ) {
        setErrorTitle("Error");
        setErrorMessage("Please fill in all required fields");
        setShowUpgradeButton(false);
        setErrorModalOpen(true);
        return;
      }

      if (!companyId) {
        setErrorTitle("Error");
        setErrorMessage(
          "You need to be associated with a company to create a campaign"
        );
        setShowUpgradeButton(false);
        setErrorModalOpen(true);
        return;
      }

      const campaignPayload = {
        ...formData,
        companyId,
        productIds: Array.isArray(formData.productIds)
          ? formData.productIds
          : [formData.productIds],
        marketplaces: Array.isArray(formData.marketplaces)
          ? formData.marketplaces
          : [formData.marketplaces],
      };

      if (isEditMode && id) {
        await updateCampaign(id, campaignPayload);
        toast({
          title: "Success",
          description: "Campaign updated successfully",
        });
      } else {
        await createCampaign(campaignPayload as Campaign);
        toast({
          title: "Success",
          description: "Campaign created successfully",
        });
      }
      navigate("/vendor-dashboard/campaigns");
    } catch (error: any) {
      console.error("Error submitting campaign:", error);

      // Check if this is a marketplace limit error
      if (error.message?.includes("maximum number of marketplaces")) {
        const planMatch = error.message.match(/your (\w+) plan/);
        const planType = planMatch ? planMatch[1] : "";

        setErrorTitle("Plan Limit Reached");
        setErrorMessage(error.message);
        setShowUpgradeButton(true);
      } else {
        setErrorTitle("Error");
        setErrorMessage(error.message || "Failed to save campaign");
        setShowUpgradeButton(false);
      }
      setErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const products = productsResponse.data;
  const promotions = promotionsResponse.data;

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <p className="text-base text-gray-500 mb-4">
        Choose your campaign strategy. Promotion will provide an offer to your customers while collecting reviews
      </p>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Campaign Title <span className="font-normal">(Internal use only)</span></Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>

            <div className="text-black">
              <Label htmlFor="promotionId">
                Promotion
              </Label>
              <Select
                value={formData.promotionId?.toString()}
                onValueChange={(value) =>
                  handleSelectChange("promotionId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a promotion" />
                </SelectTrigger>
                <SelectContent>
                  {promotions.map((promotion) => (
                    <SelectItem
                      key={promotion.id}
                      value={promotion.id.toString()}
                    >
                      {promotion.title} - {getPromotionTypeLabel(promotion.promotionType)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-start gap-1 w-max border border-gray-500 rounded-lg p-1">
             <Plus size={16} /> <button className="text-sm" onClick={() => navigate("/vendor-dashboard/promotions/new")}>Create New Promotion</button>
            </div>

            <div>
              <Label>Products</Label>
              <div className="grid grid-cols-1 gap-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      id={`product-${product.id}`}
                      checked={formData.productIds?.includes(
                        Number(product.id)
                      )}
                      onChange={() =>
                        handleProductSelect(product.id.toString())
                      }
                      className="h-4 w-4"
                    />
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-10 w-10 rounded object-contain mr-3"
                    />
                    <label
                      htmlFor={`product-${product.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{product.title}</span>
                        {product.asin && (
                          <span className="text-sm">
                            ASIN: {product.asin}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {formData.productIds?.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Please select at least one product
                </p>
              )}
            </div>
          </div>

          {1 && (
            <div>
              <div>
                <div className="flex items-center justify-center gap-1 my-1">
                  <img
                      src="/images/amazon-logo.png"
                      alt="Amazon"
                      className="h-5 inline-block align-middle"
                    />
                  <Label>Marketplaces</Label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {MARKETPLACE_COUNTRIES.map((country) => (
                    <div
                      key={country}
                      className="flex items-center space-x-2 p-2 border rounded-md"
                    >
                      <input
                        type="checkbox"
                        id={`marketplace-${country}`}
                        checked={formData.marketplaces?.includes(country)}
                        onChange={() => {
                          const newMarketplaces =
                            formData.marketplaces?.includes(country)
                              ? formData.marketplaces.filter(
                                  (m) => m !== country
                                )
                              : [...(formData.marketplaces || []), country];
                          handleSelectChange("marketplaces", newMarketplaces);
                        }}
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={`marketplace-${country}`}
                        className="flex-1 cursor-pointer"
                      >
                        {MARKETPLACE_COUNTRY_NAMES[country]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-8 mb-1">
                <Switch
                  id="isActive"
                  checked={formData.isActive === "YES"}
                  onCheckedChange={(checked) =>
                    handleSelectChange("isActive", checked ? "YES" : "NO")
                  }
                />
                <Label htmlFor="isActive">Active Campaign</Label>
              </div>
              <div className="flex flex-col">
                <p>Active campaigns are live and ready to collect reviews.</p>
                <p>Inactive campaigns can only be viewed by you in Preview Mode.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 text-black">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/vendor-dashboard/campaigns")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105">
            {isLoading
              ? "Saving..."
              : isEditMode
              ? "Update Campaign"
              : "Create Campaign"}
          </Button>
        </div>
      </form>

      <Dialog open={errorModalOpen} onOpenChange={setErrorModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">{errorTitle}</DialogTitle>
            <DialogDescription className="text-gray-700">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setErrorModalOpen(false)}>
              Close
            </Button>
            {showUpgradeButton && (
              <Button
                onClick={() => {
                  setErrorModalOpen(false);
                  navigate("/vendor-dashboard/settings");
                }}
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

export default CampaignForm;
