import { useState, useEffect } from "react";
import { StarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock review data
const recentReviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    avatar: "SJ",
    productName: "Premium Kitchen Knife Set",
    vendorName: "HomeChef Essentials",
    rating: 5,
    comment:
      "These knives are incredible! They're sharp, well-balanced, and the block looks great on my counter. Definitely worth the investment.",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    customerName: "Michael Chen",
    avatar: "MC",
    productName: "Wireless Bluetooth Headphones",
    vendorName: "TechAudio Pro",
    rating: 5,
    comment:
      "Great sound quality and battery life. The noise cancellation works well in most environments. Only giving 4 stars because the ear cups could be more comfortable.",
    date: "3 days ago",
    verified: true,
  },
  {
    id: 3,
    customerName: "Jessica Williams",
    avatar: "JW",
    productName: "Yoga Mat",
    vendorName: "Fitness Guru",
    rating: 5,
    comment:
      "Perfect thickness and grip! I use it daily and it's holding up extremely well. No more slipping during downward dog.",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 4,
    customerName: "Robert Garcia",
    avatar: "RG",
    productName: "Smart Watch",
    vendorName: "Tech Innovations",
    rating: 5,
    comment:
      "This smart watch exceeded my expectations. Battery life is amazing and the health tracking features are spot on. The interface is intuitive and responsive.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    customerName: "Emily White",
    avatar: "EW",
    productName: "Electric Kettle",
    vendorName: "HomeEssentials",
    rating: 5,
    comment:
      "Heats water quickly and efficiently. Great design, but the lid is a bit tricky to open.",
    date: "1 week ago",
    verified: true,
  },
];

interface StarRatingProps {
  rating: number;
  max?: number;
}

const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => (
        <StarIcon
          key={i}
          fill={i < rating ? "#FF9900" : "none"}
          stroke={i < rating ? "#FF9900" : "#D1D5DB"}
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

const RecentReviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(
    recentReviews.slice(0, 4)
  );

  // Move the reviews every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleReviews((prevReviews) => {
        // Remove the first card and add the next card to the end
        const nextIndex =
          (recentReviews.indexOf(prevReviews[3]) + 1) % recentReviews.length;
        const nextReviews = [...prevReviews.slice(1), recentReviews[nextIndex]];
        return nextReviews;
      });
    }, 4000); // Changed from 2000ms to 4000ms

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Real Customer Reviews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what customers are saying about products from our vendors. These
            authentic reviews showcase the power of ReviewBrothers.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-1000 ease-in-out gap-x-4">
            {visibleReviews.map((review) => (
              <Card
                key={review.id}
                className="h-full flex flex-col hover-lift animate-fade-in w-1/4"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.avatar}`}
                        alt={review.customerName}
                      />
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <StarRating rating={review.rating} />
                  </div>
                  <CardTitle className="text-base mt-2">
                    {review.productName}
                  </CardTitle>
                  <CardDescription>{review.vendorName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    "{review.comment}"
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                  <div>
                    {review.customerName} • {review.date}
                  </div>
                  {review.verified && (
                    <Badge
                      variant="outline"
                      className="text-center text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      Verified Purchase
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentReviews;
