
import { Campaign } from "@/types";

// Mock campaigns data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Kitchen Sale",
    code: "KITCHEN2023",
    url: "https://example.com/review/KITCHEN2023",
    status: "active",
  },
  {
    id: "2",
    name: "Yoga Promotion",
    code: "YOGA2023",
    url: "https://example.com/review/YOGA2023",
    status: "active",
  },
  {
    id: "3",
    name: "Tech Gadgets Campaign",
    code: "TECH2023",
    url: "https://example.com/review/TECH2023",
    status: "paused",
  }
];

// Simulate API calls with promises

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCampaigns), 500);
  });
};

export const deleteCampaign = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    // In a real app, this would delete from the backend
    // Here we're just simulating the delay
    setTimeout(() => resolve(), 500);
  });
};
