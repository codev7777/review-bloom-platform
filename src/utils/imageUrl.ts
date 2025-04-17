import { useAuth } from "@/hooks/use-auth";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://reviewbrothers.com/api"
    : "http://localhost:3000";

/**
 * Get the full URL for an image
 * @param imagePath - The image path or URL
 * @param fallbackImage - Optional fallback image URL if no image is provided
 * @returns The full image URL
 */
export const getImageUrl = (
  imagePath: string | undefined | null,
  fallbackImage = "https://placehold.co/300x300/FFF5E8/FF9130?text=No+Image"
): string => {
  if (!imagePath) return fallbackImage;

  // If it's already a full URL, return it
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }

  // If it's a relative path, construct the full URL
  return `${BACKEND_URL}/uploads/${imagePath}`;
};

/**
 * Get the authentication token from localStorage
 * @returns The auth token or null if not found
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

/**
 * Get headers for image requests
 * @returns Headers object with authorization token
 */
export const getImageHeaders = (): HeadersInit => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};
