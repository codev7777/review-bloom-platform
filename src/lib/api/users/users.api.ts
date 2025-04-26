import api from "../axiosConfig";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
  isEmailVerified?: boolean;
}

// User authentication endpoints
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<{
  user: User;
  tokens: { access: { token: string }; refresh: { token: string } };
}> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("/auth/logout", { refreshToken });
  return response.data;
};

export const refreshTokens = async (
  refreshToken: string
): Promise<{
  tokens: { access: { token: string }; refresh: { token: string } };
}> => {
  const response = await api.post("/auth/refresh-tokens", { refreshToken });
  return response.data;
};

export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<{ message: string }> => {
  const response = await api.post(
    "/auth/reset-password",
    { password },
    {
      params: { token },
    }
  );
  return response.data;
};

export const sendVerificationEmail = async (): Promise<{ message: string }> => {
  const response = await api.post("/auth/send-verification-email");
  return response.data;
};

export const verifyEmail = async (
  token: string
): Promise<{ message: string }> => {
  const response = await api.post("/auth/verify-email", { token });
  return response.data;
};

// User management endpoints
export const getUsers = async (params?: {
  name?: string;
  role?: string;
  isEmailVerified?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}): Promise<{ data: User[]; totalPages: number; totalCount: number }> => {
  const response = await api.get("/users", { params });
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string | number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateCurrentUser = async (
  userData: Partial<User>
): Promise<User> => {
  const response = await api.patch("/users/me", userData);
  return response.data;
};

export const updateUserPassword = async (
  id: string,
  password: string
): Promise<{ message: string }> => {
  const response = await api.patch(`/users/${id}/password`, { password });
  return response.data;
};

export const updateCurrentUserPassword = async (
  password: string
): Promise<{ message: string }> => {
  const response = await api.patch("/users/me/password", { password });
  return response.data;
};
