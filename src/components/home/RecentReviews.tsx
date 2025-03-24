import { useEffect, useRef, useState } from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Log to check if reviews are being passed correctly
  useEffect(() => {
    console.log(recentReviews); // Log to verify data
  }, []);

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger the animation when the section is in view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 ${isVisible ? "opacity-100 animate-fade-in" : "opacity-0"} transition-opacity duration-1000`}
      id="reviews"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FF9900] font-medium">Testimonials</span>
          <h2 className="text-3xl font-semibold mb-4">What Customers Say About Our Vendors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what customers are saying about products from our vendors. These
            authentic reviews showcase the power of ReviewBrothers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Check if reviews are properly rendered */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full flex flex-col hover-lift animate-fade-in">
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
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p>No reviews available</p> // Show this if no reviews are available
              )}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RecentReviews;
