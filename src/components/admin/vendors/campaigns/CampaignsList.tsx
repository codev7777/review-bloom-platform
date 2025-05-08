import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QrCode,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mapCampaignForDisplay } from "@/types";
import { getCampaigns } from "@/lib/api/campaigns/campaigns.api";
import { useQuery } from "@tanstack/react-query";

type SortField = "title" | "isActive" | "claims" | "updatedAt";
type SortOrder = "asc" | "desc";

const CampaignsList: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.id;

  const { data: campaignsResponse, isLoading } = useQuery({
    queryKey: [
      "campaigns",
      companyId,
    ],
    queryFn: () =>
      getCampaigns({
        companyId: companyId ? parseInt(companyId, 10) : undefined,
      }),
  });

  const campaigns = campaignsResponse?.data || [];
  const extendedCampaigns = campaigns.map((campaign) => {
    const mappedCampaign = mapCampaignForDisplay(campaign);
    const isActive = mappedCampaign.isActive === "YES";
    return {
      ...mappedCampaign,
      products: mappedCampaign.productIds || [],
      promotionName: mappedCampaign.promotion?.title || "",
      marketplaces: mappedCampaign.marketplaces || [],
      lastUpdated: mappedCampaign.updatedAt || new Date().toISOString(),
      reviews: mappedCampaign.claims || 0,
      status: isActive ? "active" : "paused",
    };
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p>Manage your review collection campaigns</p>
        </div>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-1"
          onClick={() => navigate(`/admin-dashboard/vendors`)}
        >
          <span className="hidden sm:inline">Go to Vendor</span>
        </Button>
      </div>

      <div className="rounded-md border border-gray-600 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-600">
              <TableHead className="min-w-[200px] ">
                Campaign
              </TableHead>
              <TableHead >Status</TableHead>
              <TableHead className="hidden md:table-cell ">
                Products
              </TableHead>
              <TableHead className="hidden lg:table-cell ">
                Promotion
              </TableHead>
              <TableHead className="hidden lg:table-cell ">
                Reviews
              </TableHead>
              <TableHead className="hidden sm:table-cell ">
                Last Updated
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-b border-gray-600">
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
                    <h3 className="mt-4 text-lg font-medium">
                      Loading campaigns...
                    </h3>
                  </div>
                </TableCell>
              </TableRow>
            ) : extendedCampaigns.length === 0 ? (
              <TableRow className="border-b border-gray-600">
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <QrCode className="h-10 w-10 text-gray-300 opacity-80" />
                    <h3 className="mt-4 text-lg font-medium">
                      No campaigns found
                    </h3>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              extendedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-b border-gray-600">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">
                        {campaign.name || campaign.title}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "active" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {campaign.status === "active" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {campaign.products && campaign.products.length > 0 ? (
                        campaign.products.length
                      ) : (
                        <span className="text-sm">No products</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.promotionName || "N/A"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.reviews || 0}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {formatDate(campaign.lastUpdated)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignsList;
