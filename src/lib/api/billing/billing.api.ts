
import api from "../axiosConfig";

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface BillingDetails {
  customerId: string;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod?: PaymentMethod;
}

export const getBillingDetails = async (): Promise<BillingDetails> => {
  const response = await api.get("/billing/details");
  return response.data;
};

export const addPaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await api.post("/billing/payment-methods", { paymentMethodId });
};

export const removePaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await api.delete(`/billing/payment-methods/${paymentMethodId}`);
};

export const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await api.put(`/billing/payment-methods/${paymentMethodId}/default`);
};
