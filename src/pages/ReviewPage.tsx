import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewFunnel from "@/components/review/ReviewFunnel";
import Navbar from "@/components/layout/Navbar";
import Logo from "@/components/layout/navbar/Logo";
import { Link } from "react-router-dom";
import { getCampaign } from "@/lib/api/campaigns/campaigns.api";
import { getProducts } from "@/lib/api/products/products.api";
import { getPublicCampaign } from "@/lib/api/public/publicCampaign";
import { getPublicProducts } from "@/lib/api/public/publicProduct";
import { useQuery } from "@tanstack/react-query";
import ReviewFunnelNavbar from "@/components/layout/ReviewFunnelNavbar";

const demoCampaignData = {
  productName: "Demo Product",
  productImage: "https://via.placeholder.com/150",
  vendor: "Amazon",
  productId: 1,
  asin: "DEMOASIN123",
  promotionId: 999,
  marketPlaces: ["US", "GB", "NL"],
  products: [
    {
      id: 1,
      title: "Desktop",
      image: "/images/funnel/demo-campaign-product-1.webp",
      asin: "B012345678",
    },
    {
      id: 2,
      title: "Laptop",
      image: "/images/funnel/demo-campaign-product-2.webp",
      asin: "B087654321",
    },
  ],
  promotion: {
    id: 0,
    title: "$5 Gift Card",
    description: "This is a demo gift card promotion",
    image: "/images/funnel/demo-campaign-promotion.png",
    promotionType: "GIFT_CARD",
    companyId: 1,
  },
};

const ReviewPage = () => {
  const { campaignId, step } = useParams<{
    campaignId: string;
    step: string;
  }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [campaignData, setCampaignData] = useState<{
    productName: string;
    productImage: string;
    vendor: string;
    productId?: number;
    asin?: string;
    promotionId?: number;
    marketPlaces: string[];
    products: Array<{
      id: number;
      title: string;
      image: string;
      asin: string;
    }>;
  } | null>(null);

  const {
    data: campaign,
    isLoading: isCampaignLoading,
    error: campaignError,
  } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: async () => {
      if (!campaignId) return null;
      try {
        const campaignIdNum = parseInt(campaignId, 10);
        if (isNaN(campaignIdNum)) {
          throw new Error("Invalid campaign ID");
        }
        return await getCampaign(campaignIdNum);
      } catch (error) {
        console.log("Auth campaign request failed, trying public endpoint");
        return await getPublicCampaign(campaignId);
      }
    },
    enabled: !!campaignId && campaignId !== "demo-campaign",
    retry: 1,
  });

  const {
    data: productsResponse = { data: [] },
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["campaign-products", campaignId],
    queryFn: async () => {
      if (!campaign?.productIds?.length) return { data: [] };
      const productIds = campaign.productIds.map((id) => Number(id));

      try {
        return await getProducts({ ids: productIds });
      } catch (error) {
        console.log("Auth products request failed, trying public endpoint");
        const publicProducts = await getPublicProducts(productIds);
        return {
          data: publicProducts,
          totalPages: 1,
          totalCount: publicProducts.length,
        };
      }
    },
    enabled: !!campaign?.productIds?.length && campaignId !== "demo-campaign",
  });

  useEffect(() => {
    console.log(campaignId);
    if (campaignId === "demo-campaign") {
      setCampaignData(demoCampaignData);
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaign && productsResponse.data.length > 0) {
      const firstProduct = productsResponse.data[0];
      setCampaignData({
        productName: firstProduct.title,
        productImage: firstProduct.image,
        vendor: "Amazon",
        productId: firstProduct.id,
        asin: firstProduct.asin,
        promotionId: campaign.promotionId
          ? Number(campaign.promotionId)
          : undefined,
        marketPlaces: campaign.marketplaces || [],
        products: productsResponse.data.map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          asin: product.asin || "",
        })),
      });
    } else if (
      campaignId !== "demo-campaign" &&
      !isCampaignLoading &&
      !isProductsLoading
    ) {
      setError("Campaign not found or no products available");
    }
  }, [campaign, productsResponse.data, isCampaignLoading, isProductsLoading]);

  useEffect(() => {
    if (campaignId && !step) {
      navigate(`/review/${campaignId}/step/1`, { replace: true });
    }
  }, [campaignId, step, navigate]);

  const isLoading =
    (isCampaignLoading || isProductsLoading) && campaignId !== "demo-campaign";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900]"></div>
        <p className="mt-4 text-gray-600">Loading campaign...</p>
      </div>
    );
  }

  if (error || !campaignData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-600 mb-4">{error || "Campaign not found"}</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ReviewFunnelNavbar />
      <div className="container mx-auto px-0 sm:px-4 pt-[10vh]">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <ReviewFunnel
          campaignId={campaignId || ""}
          productName={campaignData?.productName || ""}
          productImage={campaignData?.productImage || ""}
          vendor={campaignData?.vendor || ""}
          productId={campaignData?.productId}
          asin={campaignData?.asin}
          promotionId={campaignData?.promotionId}
          products={campaignData?.products || []}
          marketPlaces={campaignData?.marketPlaces || []}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
