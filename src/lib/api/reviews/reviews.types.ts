export interface Review {
  id: number;
  email: string;
  name: string;
  asin: string;
  rating: number;
  feedback: string;
  country: string;
  orderNo?: string;
  promotionId?: number;
  campaignId?: number;
  isSeller?: boolean;
  createdAt: string;
  updatedAt: string;
} 