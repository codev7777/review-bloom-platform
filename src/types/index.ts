
export interface Campaign {
  id: string;
  name: string;
  code: string;
  url: string;
  productId?: string;
  description?: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'ended';
  startDate?: Date;
  endDate?: Date;
  giftOffer?: boolean;
  giftDescription?: string;
}

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
  subtitle?: string; // Add subtitle property to match usage in AdminOverview
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  period?: string;
  trend?: string;
  percentage?: string;
  icon?: React.ReactNode;
}
