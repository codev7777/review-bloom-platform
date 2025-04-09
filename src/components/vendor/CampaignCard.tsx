
import { Link } from "react-router-dom";
import { Calendar, Edit, Star, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types";
import StarRating from "@/components/review/StarRating";

interface CampaignCardProps {
  name: string;
  image: string;
  status: Campaign["status"];
  reviews: number;
  rating: number;
  date: string;
}

const CampaignCard = ({
  name,
  image,
  status,
  reviews,
  rating,
  date,
}: CampaignCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-orange-50">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className="absolute top-2 right-2 capitalize"
        >
          {status}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-medium line-clamp-1 text-base">{name}</h3>
        
        <div className="flex items-center mt-2 gap-1.5">
          <StarRating rating={rating} size={16} readonly />
          <span className="text-sm text-muted-foreground">({reviews})</span>
        </div>
        
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(date)}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            asChild
          >
            <Link to={`/vendor-dashboard/campaigns/edit/1`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Campaign
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
