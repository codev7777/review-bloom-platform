
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

interface RecentReviewsProps {
  reviews: Review[];
}

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
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
            {reviews.slice(0, 10).map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.Customer?.name || review.name || "N/A"}</TableCell>
                <TableCell>{review.Product?.title || "N/A"}</TableCell>
                <TableCell>{review.ratio} / 5</TableCell>
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
