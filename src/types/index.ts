import GetDomain from "@/lib/GetDomain";

// Enhanced Campaign type to match the backend API
export interface Campaign {
  id: string | number;
  title: string;
  isActive: CampaignStatus;
  promotionId: string | number;
  companyId?: string | number;
  productIds: (string | number)[];
  marketplaces: string[];
  claims: number;
  createdAt?: string;
  updatedAt?: string;

  // Legacy properties for compatibility with existing components
  name?: string;
  code?: string;
  url?: string;
  description?: string;
  status?: "active" | "paused"; // Simplified status options to match UI
  startDate?: Date;
  endDate?: Date;
  giftOffer?: boolean;
  giftDescription?: string;
  company?: Company;
  promotion?: Promotion;
  products?: Product[];
  reviews?: Review[];
}

export type CampaignStatus = "YES" | "NO";

// Map isActive to status for compatibility with existing components
export const mapCampaignForDisplay = (campaign: Campaign): Campaign => {
  return {
    ...campaign,
    name: campaign.name || campaign.title, // Use name if available, otherwise use title
    status:
      campaign.status || (campaign.isActive === "YES" ? "active" : "paused"),
    // Generate a code from the title if not available
    code:
      campaign.code ||
      campaign.title?.replace(/\s+/g, "_").toUpperCase().substring(0, 10),
    // Generate a URL if not available
    url: campaign.url || `${GetDomain()}/review/${campaign.id}`,
  };
};

export interface DiscountCode {
  id: string;
  code: string;
  discount: number;
  type: "flat" | "percentage";
  validUntil: string;
  timesUsed: number;
  status: "active" | "scheduled" | "expired";
}

export interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  period?: string;
  trend?: string;
  percentage?: string;
  icon?: React.ReactNode;
}

export interface Company {
  id: string | number;
  name: string;
  detail?: string;
  logo?: string;
  websiteUrl?: string;
  planId?: number;
  ratio?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  companyId?: string | number;
  isEmailVerified?: boolean;
}

export interface Product {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  companyId: string | number;
  categoryId?: string | number;
  ratio?: number;
  createdAt?: string;
  updatedAt?: string;

  // Legacy properties for compatibility
  name?: string;
  asin?: string;
  category?: string | Category; // Can be either a string (legacy) or Category object
  dateAdded?: string;
}

export interface Promotion {
  id: string | number;
  title: string;
  image: string;
  promotionType:
    | "GIFT_CARD"
    | "DISCOUNT_CODE"
    | "FREE_PRODUCT"
    | "DIGITAL_DOWNLOAD";
  description: string;
  companyId: string | number;
  createdAt?: string;
  updatedAt?: string;

  // Gift Card specific fields
  giftCardDeliveryMethod?: "SHIP" | "DIGITAL";

  // Discount Code specific fields
  approvalMethod?: "MANUAL" | "AUTOMATIC";
  codeType?: "SAME_FOR_ALL" | "SINGLE_USE";
  couponCodes?: string[];

  // Free Product specific fields
  freeProductDeliveryMethod?: "SHIP";
  freeProductApprovalMethod?: "MANUAL";

  // Digital Download specific fields
  downloadableFileUrl?: string;
  digitalApprovalMethod?: "MANUAL" | "AUTOMATIC";
}

export interface Category {
  id: string | number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Plan {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  planType: "SILVER" | "GOLD" | "PLATINUM";
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  feedback: string;
  feedbackDate: Date;
  customerId: number;
  productId: number;
  campaignId?: number;
  customer?: Customer;
  product?: Product;
  campaign?: Campaign;
}
