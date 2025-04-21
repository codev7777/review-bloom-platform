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
  console.log(reviews);
  const sorted = reviews.sort(
    (a, b) =>
      new Date(b.feedbackDate).getTime() - new Date(a.feedbackDate).getTime()
  );

  const mostRecent5 = sorted.slice(0, 5);

  console.log(mostRecent5);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
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
            {mostRecent5.slice(0, 10).map((review) => (
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
      </CardContent>
    </Card>
  );
};

export default RecentReviews;
