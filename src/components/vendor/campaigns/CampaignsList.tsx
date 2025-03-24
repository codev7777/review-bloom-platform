import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Campaign } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CampaignForm from "@/components/vendor/campaigns/CampaignForm";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "@/components/ui/use-toast";
import { deleteCampaign } from "@/lib/api/campaigns/campaigns.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyButton } from "@/components/ui/copy-button";
import {
  MoreVertical,
  Pencil,
  Trash2,
  QrCode,
  BarChart4,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CampaignsListProps {
  campaigns: Campaign[];
}

const CampaignsList = ({ campaigns = [] }: CampaignsListProps) => {
  const [open, setOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast({
        title: "Success",
        description: "Campaign deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete campaign: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOpen(true);
  };

  const handleDelete = (campaignId: string) => {
    deleteCampaignMutation.mutate(campaignId);
  };

  const handleViewQr = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setQrDialogOpen(true);
  };

  const handleViewAnalytics = (campaignId: string) => {
    navigate(`/vendor-dashboard/analytics?campaign=${campaignId}`);
    toast({
      title: "Loading analytics",
      description: "Navigating to campaign analytics dashboard.",
    });
  };

  const handleViewDetails = (campaignId: string) => {
    navigate(`/vendor-dashboard/campaigns/edit/${campaignId}`);
    toast({
      title: "Campaign details",
      description: "Loading campaign details.",
    });
  };

  // Handle sort and filter - simplified version
  const [sortField, setSortField] = useState<keyof Campaign>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    // Handle different types of fields
    const valA = a[sortField] || "";
    const valB = b[sortField] || "";

    // String comparison for string fields
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // Default comparison
    return sortDirection === "asc"
      ? valA > valB
        ? 1
        : -1
      : valA < valB
      ? 1
      : -1;
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Table>
          <TableCaption>A list of your campaigns.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer hover:text-orange-500"
                onClick={() => handleSort("code")}
              >
                Code{" "}
                {sortField === "code" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-orange-500"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>URL</TableHead>
              <TableHead
                className="cursor-pointer hover:text-orange-500"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortField === "status" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCampaigns.map((campaign) => (
              <TableRow key={campaign.id} className="group">
                <TableCell className="font-medium">{campaign.code}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>
                  <CopyButton value={campaign.url} />
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewQr(campaign)}
                    className="transition-all opacity-0 group-hover:opacity-100"
                  >
                    <QrCode className="h-4 w-4 mr-1" /> View QR
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewQr(campaign)}>
                        <QrCode className="mr-2 h-4 w-4" /> View QR Code
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewAnalytics(campaign.id)}
                      >
                        <BarChart4 className="mr-2 h-4 w-4" /> Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(campaign.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(campaign.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex items-center justify-between">
                  <DialogTrigger asChild>
                    <Button>Add Campaign</Button>
                  </DialogTrigger>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCampaign ? "Edit Campaign" : "Create Campaign"}
            </DialogTitle>
            <DialogDescription>
              {selectedCampaign
                ? "Edit your campaign here."
                : "Create a new campaign here."}
            </DialogDescription>
          </DialogHeader>
          {/* @ts-ignore - Ignoring for now as CampaignForm expects campaign and setOpen props */}
          <CampaignForm campaign={selectedCampaign} setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Campaign QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to submit a review for {selectedCampaign?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center my-6 animate-fade-in">
            {selectedCampaign && (
              <>
                <QRCodeCanvas
                  value={selectedCampaign.url}
                  size={240}
                  className="border p-2 rounded shadow-sm"
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  URL: {selectedCampaign.url}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      try {
                        const canvas = document.querySelector("canvas");
                        if (canvas) {
                          const pngUrl = canvas.toDataURL("image/png");
                          const downloadLink = document.createElement("a");
                          downloadLink.href = pngUrl;
                          downloadLink.download = `qr-${selectedCampaign.code}.png`;
                          document.body.appendChild(downloadLink);
                          downloadLink.click();
                          document.body.removeChild(downloadLink);
                        }
                      } catch (err) {
                        console.error("Error downloading QR code:", err);
                      }
                    }}
                  >
                    Download QR Code
                  </Button>
                  <CopyButton
                    value={selectedCampaign.url}
                    className="shrink-0"
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignsList;
