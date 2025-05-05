import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Building2, Calendar, Package, Megaphone, Target } from "lucide-react";
import { getImageUrl } from "@/utils/imageUrl";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axiosConfig";

interface Subscription {
  id: string;
  status: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

interface Company {
  id: number;
  name: string;
  detail?: string;
  logo?: string;
  websiteUrl?: string;
  planId?: number;
  ratio: number;
  reviews: number;
  metaPixelId?: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  Plan?: {
    id: number;
    name: string;
    planType: string;
  };
  subscription?: Subscription;
  Products?: any[];
  Promotions?: any[];
  campaigns?: any[];
}

interface VendorDetailsProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const getSubscriptionType = (planId?: number) => {
  switch (planId) {
    case 1:
      return "SILVER";
    case 2:
      return "GOLD";
    case 3:
      return "PLATINUM";
    default:
      return "BASIC";
  }
};

const getSubscriptionColor = (subscription: string) => {
  switch (subscription) {
    case "PLATINUM":
      return "bg-purple-100 text-purple-800";
    case "GOLD":
      return "bg-yellow-100 text-yellow-800";
    case "SILVER":
      return "bg-gray-100 text-gray-800";
    case "BASIC":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const VendorDetails = ({ company, isOpen, onClose }: VendorDetailsProps) => {
  const subscriptionType = getSubscriptionType(company.planId);

  const { data: subscriptionData } = useQuery({
    queryKey: ["subscription", company.id],
    queryFn: async () => {
      const response = await api.get(`/billing/company/${company.id}`);
      return response.data;
    },
    enabled: isOpen && !!company.id,
  });

  const subscriptionEndDate = subscriptionData?.data?.subscription?.currentPeriodEnd
    ? format(new Date(subscriptionData.data.subscription.currentPeriodEnd), "MMMM d, yyyy")
    : "No active subscription";
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {company.logo ? (
                    <img
                      src={getImageUrl(company.logo)}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {company.websiteUrl || "No website provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Products</p>
                    <p className="font-medium">
                      {company.Products?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Promotions</p>
                    <p className="font-medium">
                      {company.Promotions?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Campaigns</p>
                    <p className="font-medium">
                      {company.campaigns?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(new Date(company.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <Badge
                    variant="outline"
                    className={getSubscriptionColor(subscriptionType)}
                  >
                    {subscriptionType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan Ends</p>
                  <p className="font-medium">
                    {subscriptionEndDate}
                  </p>
                </div>
                {subscriptionData?.cancelAtPeriodEnd && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Note</p>
                    <p className="text-sm text-yellow-600">
                      This subscription will not auto-renew
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {company.metaPixelId && (
            <Card>
              <CardHeader>
                <CardTitle>Meta Pixel Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium">Connected</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Pixel ID: {company.metaPixelId}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorDetails;
