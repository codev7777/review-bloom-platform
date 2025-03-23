
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
