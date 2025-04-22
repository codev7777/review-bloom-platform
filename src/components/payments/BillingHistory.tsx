import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock invoice data for demonstration
// In a real implementation, these would come from your Stripe API
const MOCK_INVOICES = [
  {
    id: "in_1234567890",
    amount: 4900,
    status: "paid",
    date: "2023-11-15",
    number: "1001",
  },
  {
    id: "in_0987654321",
    amount: 4900,
    status: "paid",
    date: "2023-10-15",
    number: "1000",
  },
  {
    id: "in_2468135790",
    amount: 14900,
    status: "pending",
    date: "2023-12-15",
    number: "1002",
  },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BillingHistory: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Billing History</h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_INVOICES.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.number}</TableCell>
                <TableCell>{formatDate(invoice.date)}</TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {invoice.status === "paid" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Paid</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-amber-600">Pending</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <ArrowDownToLine className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {MOCK_INVOICES.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No billing history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BillingHistory;
