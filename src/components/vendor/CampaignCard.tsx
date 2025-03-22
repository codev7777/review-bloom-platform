
import { BarChart, ChevronRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "../review/StarRating";

interface CampaignCardProps {
  name: string;
  image: string;
  status: "active" | "paused" | "completed";
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
  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-amber-100 text-amber-800 border-amber-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-hover transition-all duration-300">
      <div className="flex items-center space-x-4 p-4 border-b border-border">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{name}</h3>
          <p className="text-xs text-muted-foreground">
            Created: {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <Badge className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Reviews</p>
            <p className="text-lg font-semibold">{reviews}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Rating</p>
            <div className="flex items-center">
              <p className="text-lg font-semibold mr-2">{rating}</p>
              <StarRating
                initialRating={rating}
                onChange={() => {}}
                size={12}
                interactive={false}
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <QrCode className="w-4 h-4 mr-2" />
            View QR
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <BarChart className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-sm font-normal hover:bg-white/80"
        >
          View Campaign Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
