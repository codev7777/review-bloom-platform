import api from "../axiosConfig";
import { Promotion } from "@/types";
import { API_URL } from "@/config/env";

// Promotion API endpoints
export const createPromotion = async (data: {
  title: string;
  description: string;
  promotionType:
    | "GIFT_CARD"
    | "DISCOUNT_CODE"
    | "FREE_PRODUCT"
    | "DIGITAL_DOWNLOAD";
  image: string;
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
}): Promise<Promotion> => {
  const response = await api.post("/promotions", data);
  return response.data;
};

export interface GetPromotionsParams {
  companyId?: number;
}

export const getPromotions = async (params?: GetPromotionsParams) => {
  const queryParams = new URLSearchParams();
  if (params?.companyId)
    queryParams.append("companyId", params.companyId.toString());

  const response = await api.get(`/promotions?${queryParams.toString()}`);
  return response.data;
};

export const getPromotion = async (id: string | number): Promise<Promotion> => {
  const response = await api.get(`/promotions/${id}`);
  return response.data;
};

export const getPromotionByUserId = async (params?: GetPromotionsParams) => {
  const queryParams = new URLSearchParams();
  if (params?.companyId)
    queryParams.append("companyId", params.companyId.toString());

  const response = await api.get(`/promotions/user/?${queryParams.toString()}`);
  return response.data;
};

export const updatePromotion = async (
  id: string | number,
  data: {
    title?: string;
    description?: string;
    promotionType?:
      | "GIFT_CARD"
      | "DISCOUNT_CODE"
      | "FREE_PRODUCT"
      | "DIGITAL_DOWNLOAD";
    image?: string;
    isActive?: "YES" | "NO";
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
): Promise<Promotion> => {
  const response = await api.patch(`/promotions/${id}`, data);
  return response.data;
};

export const deletePromotion = async (id: string | number): Promise<void> => {
  await api.delete(`/promotions/${id}`);
};
