import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchWithFallback } from "../../hooks/useFetchWithFallback";
import { getCampaigns } from "../../services/campaigns";
import { Campaign } from "../../types/campaign";
import { SortField, SortOrder } from "../../types/sort";

const CampaignList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Get the current user's company ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const companyId = user.companyId;

  // Fetch campaigns from the backend with companyId
  const {
    data: campaigns,
    isLoading,
    setData: setCampaigns,
    usingMockData,
  } = useFetchWithFallback<Campaign>(getCampaigns, [], { companyId });

  // Get unique promotion types for filtering
  const promotionTypes = [
    ...new Set(campaigns.map((campaign) => campaign.promotion.promotionType)),
  ];

  // Filter campaigns based on search term and type
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      (campaign.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (campaign.promotion.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === null || campaign.promotion.promotionType === typeFilter;

    return matchesSearch && matchesType;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    let comparison = 0;

    if (sortField === "title") {
      comparison = (a.title || "").localeCompare(b.title || "");
    } else if (sortField === "promotionType") {
      comparison = (a.promotion.promotionType || "").localeCompare(
        b.promotion.promotionType || ""
      );
    } else if (sortField === "createdAt") {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      comparison = dateA - dateB;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return <div>{/* Render your component content here */}</div>;
};

export default CampaignList;
