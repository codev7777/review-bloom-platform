
import { useState } from "react";
import { DownloadIcon, Edit, EyeIcon, MoreHorizontal, Search, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Mock vendor data
const vendors = [
  {
    id: "v1",
    name: "Kitchen Essentials Co.",
    email: "contact@kitchenessentials.com",
    campaigns: 8,
    products: 15,
    reviews: 432,
    status: "active",
    subscription: "premium",
    createdAt: "2023-06-12",
  },
  {
    id: "v2",
    name: "Fitness Revolution",
    email: "info@fitnessrevolution.com",
    campaigns: 5,
    products: 8,
    reviews: 287,
    status: "active",
    subscription: "basic",
    createdAt: "2023-07-23",
  },
  {
    id: "v3",
    name: "TechGadgetry",
    email: "support@techgadgetry.com",
    campaigns: 6,
    products: 12,
    reviews: 356,
    status: "active",
    subscription: "premium",
    createdAt: "2023-05-04",
  },
  {
    id: "v4",
    name: "Outdoor Adventures",
    email: "hello@outdooradv.com",
    campaigns: 4,
    products: 9,
    reviews: 198,
    status: "suspended",
    subscription: "basic",
    createdAt: "2023-08-17",
  },
  {
    id: "v5",
    name: "Home Decor Plus",
    email: "sales@homedecorplus.com",
    campaigns: 3,
    products: 7,
    reviews: 122,
    status: "active",
    subscription: "basic",
    createdAt: "2023-09-01",
  },
];

const VendorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleExport = () => {
    // In a real app, this would generate and download a CSV or similar
    toast({
      title: "Export complete",
      description: "Vendor data has been exported successfully",
    });
    setShowExportDialog(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "basic":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Vendor Accounts</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search vendors..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="ml-auto flex items-center gap-1"
            onClick={() => setShowExportDialog(true)}
          >
            <DownloadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">All Vendors</CardTitle>
          <CardDescription>
            {filteredVendors.length} total vendors registered
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-right">Campaigns</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Reviews</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id} className="group hover:bg-gray-50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{vendor.name}</span>
                      <span className="text-sm text-gray-500">{vendor.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(vendor.status)}`}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getSubscriptionColor(vendor.subscription)}`}>
                      {vendor.subscription.charAt(0).toUpperCase() + vendor.subscription.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{vendor.campaigns}</TableCell>
                  <TableCell className="text-right">{vendor.products}</TableCell>
                  <TableCell className="text-right">{vendor.reviews}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hidden h-8 w-8 group-hover:flex"
                        onClick={() => {
                          toast({
                            title: "Vendor details",
                            description: `Viewing details for ${vendor.name}`,
                          });
                        }}
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              toast({
                                title: "Edit vendor",
                                description: `Editing ${vendor.name}`,
                              });
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              toast({
                                title: "Action triggered",
                                description: "This would show a delete confirmation dialog in a real app",
                                variant: "destructive",
                              });
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVendors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="font-medium">No vendors found</h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search query
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Vendor Data</DialogTitle>
            <DialogDescription>
              Choose the format and data to include in your export.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <select className="input-field">
                <option value="csv">CSV (.csv)</option>
                <option value="excel">Excel (.xlsx)</option>
                <option value="json">JSON (.json)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Include Data</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-campaigns" className="h-4 w-4 rounded border-gray-300" checked />
                  <label htmlFor="include-campaigns">Campaign Statistics</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-reviews" className="h-4 w-4 rounded border-gray-300" checked />
                  <label htmlFor="include-reviews">Review Data</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-products" className="h-4 w-4 rounded border-gray-300" checked />
                  <label htmlFor="include-products">Product Information</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorsList;
