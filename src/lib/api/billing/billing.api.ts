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
  subscription: any;
  customerId: string;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod?: PaymentMethod;
}

export async function getBillingDetails(userId: string) {
  if (!userId) throw new Error("User not logged in");

  const res = await api.get(`/billing/details`, {
    params: { userId }, // 👈 passed as query param
  });

  return res.data;
}

export const addPaymentMethod = async (
  paymentMethodId: string
): Promise<void> => {
  await api.post("/billing/payment-methods", { paymentMethodId });
};

export const removePaymentMethod = async (
  paymentMethodId: string
): Promise<void> => {
  await api.delete(`/billing/payment-methods/${paymentMethodId}`);
};

export const setDefaultPaymentMethod = async (
  paymentMethodId: string
): Promise<void> => {
  await api.put(`/billing/payment-methods/${paymentMethodId}/default`);
};
