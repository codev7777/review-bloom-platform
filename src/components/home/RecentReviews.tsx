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
    avatar: "/images/avatars/man-1.jpg",
    productName: "Premium Kitchen Knife Set",
    vendorName: "HomeChef Essentials",
    rating: 5,
    comment:
      "These knives are incredible! They're sharp, well-balanced, and the block looks great on my counter. Definitely worth the investment.",
    date: "2 days ago",
  },
  {
    id: 2,
    customerName: "Michael Chen",
    avatar: "/images/avatars/man-2.jpg",
    productName: "Wireless Bluetooth Headphones",
    vendorName: "TechAudio Pro",
    rating: 4,
    comment:
      "Great sound quality and battery life. The noise cancellation works well in most environments. Only giving 4 stars because the ear cups could be more comfortable.",
    date: "3 days ago",
  },
  {
    id: 3,
    customerName: "Jessica Williams",
    avatar: "/images/avatars/man-3.jpg",
    productName: "Yoga Mat",
    vendorName: "Fitness Guru",
    rating: 5,
    comment:
      "Perfect thickness and grip! I use it daily and it's holding up extremely well. No more slipping during downward dog.",
    date: "5 days ago",
  },
  {
    id: 4,
    customerName: "Robert Garcia",
    avatar: "/images/avatars/woman-1.jpg",
    productName: "Smart Watch",
    vendorName: "Tech Innovations",
    rating: 5,
    comment:
      "This smart watch exceeded my expectations. Battery life is amazing and the health tracking features are spot on. The interface is intuitive and responsive.",
    date: "1 week ago",
  },
  {
    id: 5,
    customerName: "Emily White",
    avatar: "/images/avatars/woman-2.jpg",
    productName: "Electric Kettle",
    vendorName: "HomeEssentials",
    rating: 4,
    comment:
      "Heats water quickly and efficiently. Great design, but the lid is a bit tricky to open.",
    date: "1 week ago",
  },
];

const StarRating = ({ rating, max = 5 }) => (
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

const RecentReviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    console.log(recentReviews); // Debug: check review data
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false); // Reset visibility when leaving the viewport
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      document.getElementById("nextbutton").click();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
      }`}
      id="reviews"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            What Customers Say About Our Vendors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            See what customers are saying about products from our vendors. These
            authentic reviews showcase the power of ReviewBrothers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <CarouselItem
                    key={review.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="h-[320px] flex flex-col">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Avatar className="w-24 h-24">
                              <AvatarImage
                                src={review.avatar}
                                alt={review.customerName}
                                className="object-scale-down w-full h-full"
                              />
                              <AvatarFallback>
                                {review.customerName.charAt(0)}
                              </AvatarFallback>
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
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" id="nextbutton" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RecentReviews;
