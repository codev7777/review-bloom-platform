
import { useState } from "react";
import { Copy, Edit, PlusCircle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Mock discount data
const MOCK_DISCOUNTS = [
  {
    id: "1",
    code: "WELCOME25",
    discount: 25,
    type: "percentage",
    validUntil: "2023-12-31",
    timesUsed: 127,
    status: "active",
  },
  {
    id: "2",
    code: "SUMMER10",
    discount: 10,
    type: "percentage",
    validUntil: "2023-09-30",
    timesUsed: 84,
    status: "expired",
  },
  {
    id: "3",
    code: "PREMIUM50",
    discount: 50,
    type: "flat",
    validUntil: "2023-12-15",
    timesUsed: 32,
    status: "active",
  },
  {
    id: "4",
    code: "NEWVENDOR",
    discount: 100,
    type: "percentage",
    validUntil: "2024-01-31",
    timesUsed: 12,
    status: "active",
  },
  {
    id: "5",
    code: "BLACKFRIDAY",
    discount: 40,
    type: "percentage",
    validUntil: "2023-11-30",
    timesUsed: 0,
    status: "scheduled",
  },
];

interface DiscountCode {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "flat";
  validUntil: string;
  timesUsed: number;
  status: "active" | "expired" | "scheduled";
}

const DiscountCodesList = () => {
  const [discounts, setDiscounts] = useState<DiscountCode[]>(MOCK_DISCOUNTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<DiscountCode | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    type: "percentage",
    validUntil: "",
  });

  const handleOpenDialog = (discount?: DiscountCode) => {
    if (discount) {
      setCurrentDiscount(discount);
      setFormData({
        code: discount.code,
        discount: discount.discount,
        type: discount.type,
        validUntil: discount.validUntil,
      });
    } else {
      setCurrentDiscount(null);
      setFormData({
        code: "",
        discount: 0,
        type: "percentage",
        validUntil: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentDiscount(null);
  };

  const handleOpenDeleteDialog = (discount: DiscountCode) => {
    setCurrentDiscount(discount);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentDiscount(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSaveDiscount = () => {
    // In a real app, this would send data to an API
    if (currentDiscount) {
      // Update existing discount
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === currentDiscount.id
            ? { ...d, ...formData, status: determineStatus(formData.validUntil) }
            : d
        )
      );
      toast({
        title: "Discount updated",
        description: `Discount code ${formData.code} has been updated`,
      });
    } else {
      // Create new discount
      const newDiscount: DiscountCode = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        timesUsed: 0,
        status: determineStatus(formData.validUntil),
      };
      setDiscounts((prev) => [...prev, newDiscount]);
      toast({
        title: "Discount created",
        description: `New discount code ${formData.code} has been created`,
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteDiscount = () => {
    if (currentDiscount) {
      setDiscounts((prev) => prev.filter((d) => d.id !== currentDiscount.id));
      toast({
        title: "Discount deleted",
        description: `Discount code ${currentDiscount.code} has been deleted`,
        variant: "destructive",
      });
      handleCloseDeleteDialog();
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: `Discount code ${code} copied to clipboard`,
    });
  };

  const determineStatus = (validUntil: string): "active" | "expired" | "scheduled" => {
    const today = new Date();
    const validDate = new Date(validUntil);
    
    if (validDate < today) {
      return "expired";
    } else if (validDate > new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
      return "scheduled";
    } else {
      return "active";
    }
  };

  const getStatusBadge = (status: "active" | "expired" | "scheduled") => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Discount Codes</h2>
        <Button 
          onClick={() => handleOpenDialog()}
          className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Discount
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Active Discount Codes</CardTitle>
          <CardDescription>
            Manage subscription discount codes for your vendors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Times Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <span>{discount.code}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-gray-100"
                        onClick={() => handleCopyCode(discount.code)}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy code</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {discount.discount}
                    {discount.type === "percentage" ? "%" : " USD"}
                  </TableCell>
                  <TableCell>{discount.validUntil}</TableCell>
                  <TableCell className="text-right">{discount.timesUsed}</TableCell>
                  <TableCell>{getStatusBadge(discount.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                        onClick={() => handleOpenDialog(discount)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 text-red-500 hover:text-red-600"
                        onClick={() => handleOpenDeleteDialog(discount)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {discounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-gray-500">No discount codes found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Discount Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentDiscount ? "Edit Discount Code" : "Create Discount Code"}
            </DialogTitle>
            <DialogDescription>
              {currentDiscount
                ? "Update the discount code details below"
                : "Create a new discount code for vendor subscriptions"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="e.g., SUMMER25"
                value={formData.code}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">
                Use uppercase letters and numbers for better readability
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Amount</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max={formData.type === "percentage" ? "100" : "1000"}
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <select
                  id="type"
                  name="type"
                  className="input-field"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (USD)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                name="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveDiscount}
              className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
            >
              {currentDiscount ? "Update" : "Create"} Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Discount Code</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the discount code{" "}
              <span className="font-semibold text-foreground">
                {currentDiscount?.code}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteDiscount}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscountCodesList;
