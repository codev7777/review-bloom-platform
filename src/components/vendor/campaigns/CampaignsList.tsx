
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Campaign } from "@/types"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CampaignForm from "@/components/vendor/campaigns/CampaignForm";
import { QRCode } from "react-qrcode-logo";
import { toast } from "@/components/ui/use-toast";
import { deleteCampaign } from "@/lib/api/campaigns/campaigns.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyButton } from "@/components/ui/copy-button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CampaignsListProps {
  campaigns: Campaign[]
}

const CampaignsList = ({ campaigns = [] }: CampaignsListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const queryClient = useQueryClient();

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({
        title: "Success",
        description: "Campaign deleted successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete campaign: ${error.message}`,
        variant: "destructive"
      })
    }
  });

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOpen(true);
  };

  const handleDelete = (campaignId: string) => {
    deleteCampaignMutation.mutate(campaignId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table>
        <TableCaption>A list of your campaigns.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.code}</TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>
                <CopyButton value={campaign.url} />
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
                    <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(campaign.id)}>
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
            <TableCell colSpan={4}>
              <div className="flex items-center justify-between">
                <DialogTrigger asChild>
                  <Button>Add Campaign</Button>
                </DialogTrigger>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedCampaign ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
          <DialogDescription>
            {selectedCampaign ? "Edit your campaign here." : "Create a new campaign here."}
          </DialogDescription>
        </DialogHeader>
        {/* @ts-ignore - Ignoring for now as CampaignForm expects campaign and setOpen props */}
        <CampaignForm campaign={selectedCampaign} setOpen={setOpen} />
        {selectedCampaign && (
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-sm text-muted-foreground">Scan the QR code to submit a review</p>
            <QRCode value={selectedCampaign.url} size={200} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CampaignsList;
