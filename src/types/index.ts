
// Enhanced Campaign type to match the backend API
export interface Campaign {
  id: string;
  title: string;
  isActive: 'YES' | 'NO';
  promotionId?: string | number;
  companyId?: string | number;
  productIds?: (string | number)[];
  marketplaces?: string[];
  claims?: number;
  createdAt?: string;
  updatedAt?: string;
  
  // Legacy properties for compatibility with existing components
  name?: string;
  code?: string;
  url?: string;
  description?: string;
  status?: 'draft' | 'scheduled' | 'active' | 'paused' | 'ended';
  startDate?: Date;
  endDate?: Date;
  giftOffer?: boolean;
  giftDescription?: string;
}

// Map isActive to status for compatibility with existing components
export const mapCampaignForDisplay = (campaign: Campaign): Campaign => {
  return {
    ...campaign,
    name: campaign.title,
    status: campaign.isActive === 'YES' ? 'active' : 'paused',
    // Generate a code from the title if not available
    code: campaign.code || campaign.title?.replace(/\s+/g, '_').toUpperCase().substring(0, 10)
  };
};

export interface DiscountCode {
  id: string;
  code: string;
  discount: number;
  type: 'flat' | 'percentage';
  validUntil: string;
  timesUsed: number;
  status: 'active' | 'scheduled' | 'expired';
}

export interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  period?: string;
  trend?: string;
  percentage?: string;
  icon?: React.ReactNode;
}

export interface Company {
  id: string;
  name: string;
  detail?: string;
  logo?: string;
  websiteUrl?: string;
  planId?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
  isEmailVerified?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  image?: string;
  companyId: string | number;
  categoryId?: string | number;
  
  // Legacy properties for compatibility
  name?: string;
  asin?: string;
  category?: string;
  price?: string;
  dateAdded?: string;
}

export interface Promotion {
  id: string;
  title: string;
  image?: string;
  promotionType: 'GIFT_CARD' | 'DISCOUNT_CODE' | 'FREE_PRODUCT' | 'DIGITAL_DOWNLOAD';
  description?: string;
  companyId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}
