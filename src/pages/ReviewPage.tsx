
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewFunnel from "@/components/review/ReviewFunnel";

const ReviewPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaignData, setCampaignData] = useState<{
    productName: string;
    productImage: string;
    vendor: string;
  } | null>(null);

  useEffect(() => {
    // Simulate API call to fetch campaign data
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would be an API call
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Check if campaignId exists and is valid
        if (!campaignId) {
          throw new Error("Campaign ID is missing");
        }

        // Demo campaign data
        if (campaignId === 'demo-campaign') {
          setCampaignData({
            productName: "ReviewBloom Demo Product",
            productImage: "https://placehold.co/300x300/FFF5E8/FF9130?text=Demo+Product",
            vendor: "ReviewBloom Demo",
          });
          return;
        }
        
        // Placeholder data - in a real app, this would come from the API
        // Simulate different products based on campaign ID
        const productData = {
          '1': {
            productName: "Premium Kitchen Knife Set",
            productImage: "https://placehold.co/300x300/FFF5E8/FF9130?text=Kitchen+Set",
            vendor: "HomeChef Essentials",
          },
          '2': {
            productName: "Yoga Mat",
            productImage: "https://placehold.co/300x300/FFF5E8/FF9130?text=Yoga+Mat",
            vendor: "Fitness Guru",
          },
          '3': {
            productName: "Bluetooth Headphones",
            productImage: "https://placehold.co/300x300/FFF5E8/FF9130?text=Headphones",
            vendor: "Tech Innovations",
          }
        };
        
        // @ts-ignore - This is just for demo purposes
        if (productData[campaignId]) {
          // @ts-ignore - This is just for demo purposes
          setCampaignData(productData[campaignId]);
        } else {
          setCampaignData({
            productName: "Premium Kitchen Knife Set",
            productImage: "https://placehold.co/300x300/FFF5E8/FF9130?text=Kitchen+Set",
            vendor: "HomeChef Essentials",
          });
        }
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError("Failed to load campaign information. Please check the URL and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-border p-8 max-w-2xl mx-auto">
            <div className="space-y-6 animate-pulse">
              <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </div>
        ) : campaignData ? (
          <ReviewFunnel
            campaignId={campaignId || ""}
            productName={campaignData.productName}
            productImage={campaignData.productImage}
            vendor={campaignData.vendor}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ReviewPage;
