import { Company, User } from "@/types";
import {
  getCompanyUsers,
  inviteUser,
  removeUser,
} from "../api/companies/companies.api";

export const fetchCompanyUsers = async (companyId: number): Promise<User[]> => {
  try {
    return await getCompanyUsers(companyId);
  } catch (error) {
    console.error("Error fetching company users:", error);
    throw error;
  }
};

export const inviteCompanyUser = async (
  companyId: number,
  email: string
): Promise<void> => {
  try {
    await inviteUser(companyId, email);
  } catch (error) {
    console.error("Error inviting user:", error);
    throw error;
  }
};

export const removeCompanyUser = async (
  companyId: number,
  userId: number
): Promise<void> => {
  try {
    await removeUser(companyId, userId);
  } catch (error) {
    console.error("Error removing user:", error);
    throw error;
  }
};
