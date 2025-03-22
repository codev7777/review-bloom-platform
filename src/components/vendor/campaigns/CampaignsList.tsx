
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Info,
  QrCode,
  Eye,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import QRCode from '@/components/ui/QRCode';
import { toast } from '@/components/ui/use-toast';

// Mock data
const MOCK_CAMPAIGNS = [
  { 
    id: '1', 
    name: 'Summer Kitchen Sale', 
    productName: 'Kitchen Knife Set',
    status: 'active',
    reviews: 156,
    rating: 4.8,
    startDate: '2023-05-15',
    endDate: '2023-08-15'
  },
  { 
    id: '2', 
    name: 'Fitness Promo', 
    productName: 'Yoga Mat',
    status: 'active',
    reviews: 98,
    rating: 4.5,
    startDate: '2023-06-20',
    endDate: '2023-09-20'
  },
  { 
    id: '3', 
    name: 'Electronics Flash Deal', 
    productName: 'Bluetooth Headphones',
    status: 'active',
    reviews: 212,
    rating: 4.7,
    startDate: '2023-04-10',
    endDate: '2023-07-10'
  },
  { 
    id: '4', 
    name: 'Holiday Gift Guide', 
    productName: 'Smart Watch',
    status: 'scheduled',
    reviews: 0,
    rating: 0,
    startDate: '2023-11-15',
    endDate: '2023-12-31'
  },
  { 
    id: '5', 
    name: 'Spring Clearance', 
    productName: 'Coffee Maker',
    status: 'ended',
    reviews: 134,
    rating: 4.2,
    startDate: '2023-03-01',
    endDate: '2023-04-15'
  },
];

const CampaignsList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    campaign.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteCampaign = () => {
    if (campaignToDelete) {
      setCampaigns(prevCampaigns => prevCampaigns.filter(c => c.id !== campaignToDelete));
      toast({
        title: "Campaign deleted",
        description: "The campaign has been removed successfully",
      });
      setCampaignToDelete(null);
    }
  };

  const openQrCode = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setQrDialogOpen(true);
  };

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      toast({
        title: "Report exported",
        description: "The campaign report has been downloaded successfully",
      });
      setIsExporting(false);
    }, 1500);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'ended':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-orange-200 text-orange-600 hover:bg-orange-50 transition-all duration-200"
            onClick={handleExportReport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-r-transparent"></span>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </>
            )}
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate('/vendor-dashboard/campaigns/new')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="pl-8 w-full max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <Info className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No campaigns found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "Create a campaign to get started"}
          </p>
          {!searchTerm && (
            <Button 
              variant="outline" 
              className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50 transition-all duration-200 transform hover:scale-105"
              onClick={() => navigate('/vendor-dashboard/campaigns/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create your first campaign
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="transition-colors hover:bg-orange-50/30">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.productName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.reviews}</TableCell>
                  <TableCell>{campaign.rating > 0 ? campaign.rating.toFixed(1) : '-'}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{campaign.startDate}</div>
                      <div className="text-muted-foreground">to {campaign.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openQrCode(campaign.id)}
                        title="View QR Code"
                        className="hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 transform hover:scale-110"
                      >
                        <QrCode className="h-4 w-4 text-orange-500" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          navigate(`/review/${campaign.id}`);
                          toast({
                            title: "Preview mode",
                            description: "You are viewing the review funnel as a customer would see it"
                          });
                        }}
                        title="Preview Review Funnel"
                        className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/vendor-dashboard/campaigns/edit/${campaign.id}`)}
                        title="Edit Campaign"
                        className="hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 transform hover:scale-110"
                      >
                        <Edit className="h-4 w-4 text-orange-500" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete Campaign"
                            className="hover:bg-red-100 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="animate-in zoom-in-95 duration-200">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete campaign</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this campaign? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteCampaign()}
                              className="bg-red-500 hover:bg-red-600 transition-all duration-200"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="max-w-md animate-in zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle>Campaign QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
              <QRCode 
                value={`${window.location.origin}/review/${selectedCampaign}`} 
                size={200}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Scan this QR code or share the link below to direct customers to your review funnel.
            </p>
            <div className="flex w-full items-center space-x-2">
              <Input 
                value={`${window.location.origin}/review/${selectedCampaign}`} 
                readOnly 
              />
              <Button
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/review/${selectedCampaign}`);
                  toast({
                    title: "Copied to clipboard",
                    description: "The link has been copied to your clipboard",
                  });
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
