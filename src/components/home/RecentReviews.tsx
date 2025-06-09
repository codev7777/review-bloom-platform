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

// Mock vendor review data
const vendorReviews = [
  {
    id: 1,
    vendorName: "Elite Amazon Sellers",
    jobTitle: "CEO & Founder",
    reviewerName: "John D", // Human name
    avatar: "/images/avatars/man-1.jpg",
    rating: 5,
    comment:
      "This platform has completely streamlined our review collection process. The automated funnel saved us hours of manual work!",
    date: "2 days ago",
  },
  {
    id: 2,
    vendorName: "TechHub Enterprises",
    jobTitle: "Marketing Director",
    reviewerName: "James S", // Human name
    avatar: "/images/avatars/man-2.jpg",
    rating: 4,
    comment:
      "The dashboard provides excellent insights into our customer feedback. Would love more customization options in the future!",
    date: "3 days ago",
  },
  {
    id: 3,
    vendorName: "EcoGoods Marketplace",
    jobTitle: "Operations Manager",
    reviewerName: "Olivia M", // Human name
    avatar: "/images/avatars/woman-1.jpg",
    rating: 5,
    comment:
      "Super easy to set up, and our review conversion rate has significantly improved. A must-have tool for any Amazon seller!",
    date: "5 days ago",
  },
  {
    id: 4,
    vendorName: "HomeEssentials Pro",
    jobTitle: "E-commerce Manager",
    reviewerName: "Jun L", // Human name
    avatar: "/images/avatars/man-3.jpg",
    rating: 5,
    comment:
      "We love how compliant and efficient the system is. Our customers engage more, and we see better ratings on Amazon!",
    date: "1 week ago",
  },
  {
    id: 5,
    vendorName: "Gadget World",
    jobTitle: "Product Manager",
    reviewerName: "Mia E", // Human name
    avatar: "/images/avatars/woman-2.jpg",
    rating: 4,
    comment:
      "The automation is top-notch, but I wish there were more analytics tools. Still, it's a great addition to our business!",
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

const VendorReviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-gray-50  max-w-screen">
      <div
        ref={sectionRef}
        className={`py-20 bg-gray-50 transition-opacity duration-1000 ${
          isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
        }`}
        id="vendor-reviews"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              From Our Ambassadors
            </h2>
            <p className="max-w-2xl mx-auto text-[#dab159]">
              Amazon Sellers share how our review funnel helps them boost
              reviews and grow their business.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {vendorReviews.length > 0 ? (
                  vendorReviews.map((review) => (
                    <CarouselItem
                      key={review.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Card className="h-[340px] flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Avatar className="w-24 h-24">
                                <AvatarImage
                                  src={review.avatar}
                                  alt={review.vendorName}
                                  className="object-scale-down w-full h-full"
                                />
                                <AvatarFallback>
                                  {review.vendorName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <StarRating rating={review.rating} />
                            </div>
                            <CardTitle className="text-base mt-2">
                              {review.reviewerName}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              {review.jobTitle} at {review.vendorName}
                            </CardDescription>
                            {/* <CardDescription className="text-sm text-muted-foreground mt-1">
                            {review.vendorName}
                          </CardDescription> */}
                          </CardHeader>

                          <CardContent className="flex-grow mt-4">
                            <p className="text-sm text-muted-foreground">
                              "{review.comment}"
                            </p>
                          </CardContent>

                          <CardFooter className="flex justify-between items-center py-2 border-t text-xs text-muted-foreground">
                            <div>{review.date}</div>
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
      </div>
    </section>
  );
};

export default VendorReviews;
