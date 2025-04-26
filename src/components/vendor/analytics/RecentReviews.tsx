import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Review } from "@/types";
import { MessageSquare } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

interface RecentReviewsProps {
  reviews: Review[];
}

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  const sorted = reviews.sort(
    (a, b) =>
      new Date(b.feedbackDate).getTime() - new Date(a.feedbackDate).getTime()
  );

  const mostRecent5 = sorted.slice(0, 5);

  return (
    <Card className="col-span-4 h-96">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {mostRecent5.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mostRecent5.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    {review.Customer?.name || review.name || "N/A"}
                  </TableCell>
                  <TableCell>{review.Product?.title || "N/A"}</TableCell>
                  <TableCell>
                    <RatingStars rating={review.ratio} />
                  </TableCell>
                  <TableCell>
                    {new Date(review.feedbackDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground h-full">
            <MessageSquare className="w-16 h-16 mb-4 mt-16" />
            <p className="text-2xl font-medium">No reviews yet</p>
            <p className="text-lg">Your recent reviews will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReviews;
