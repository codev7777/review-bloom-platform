import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Search, 
  Plus, 
  Edit, 
  Copy, 
  ExternalLink,
  CheckCircle,
  XCircle,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Download
} from 'lucide-react';
import { Campaign, mapCampaignForDisplay } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { QRCode } from '@/components/ui/QRCode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getCampaigns } from '@/lib/api/campaigns/campaigns.api';
import useFetchWithFallback from '@/hooks/useFetchWithFallback';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    title: "Summer Kitchen Sale",
    isActive: "YES",
    promotionId: 1,
    companyId: 1,
    productIds: [1, 2, 3],
    marketplaces: ["US", "CA"],
    claims: 0,
    code: "KITCHEN2023",
    url: "https://example.com/review/KITCHEN2023",
    status: "active",
    name: "Summer Kitchen Sale",
  },
  {
    id: "2",
    title: "Yoga Promotion",
    isActive: "YES",
    promotionId: 2,
    companyId: 1,
    productIds: [3, 4],
    marketplaces: ["US", "GB"],
    claims: 0,
    code: "YOGA2023",
    url: "https://example.com/review/YOGA2023",
    status: "active",
    name: "Yoga Promotion",
  },
  {
    id: "3",
    title: "Tech Gadgets Campaign",
    isActive: "NO",
    promotionId: 3,
    companyId: 1,
    productIds: [5, 6],
    marketplaces: ["US", "JP"],
    claims: 0,
    code: "TECH2023",
    url: "https://example.com/review/TECH2023",
    status: "paused",
    name: "Tech Gadgets Campaign",
  },
];

type SortField = 'name' | 'status' | 'reviews' | 'lastUpdated';
type SortOrder = 'asc' | 'desc';

const CampaignsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedQrCode, setSelectedQrCode] = useState<{ url: string, name: string } | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  
  const { data: campaigns, isLoading } = useFetchWithFallback<Campaign>(
    getCampaigns,
    MOCK_CAMPAIGNS
  );
  
  const extendedCampaigns = campaigns.map(campaign => {
    const displayCampaign = mapCampaignForDisplay(campaign);
    return {
      ...displayCampaign,
      products: ['Kitchen Knife Set', 'Coffee Maker'],
      promotionName: displayCampaign.title.includes('Kitchen') 
        ? 'Summer Gift Card' 
        : displayCampaign.title.includes('Yoga') 
          ? 'Free Product' 
          : 'Holiday Discount',
      marketplaces: campaign.marketplaces || ['US', 'CA'],
      lastUpdated: campaign.updatedAt || new Date().toISOString(),
      reviews: campaign.claims || Math.floor(Math.random() * 200) + 10,
    };
  });
  
  const filteredCampaigns = extendedCampaigns.filter(campaign => {
    const matchesSearch = (campaign.name || campaign.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (campaign.code || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Campaign URL has been copied to clipboard",
    });
  };
  
  const showQrCode = (campaign: any) => {
    setSelectedQrCode({
      url: campaign.url,
      name: campaign.name
    });
    setQrDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your review collection campaigns
          </p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          onClick={() => navigate('/vendor-dashboard/campaigns/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('paused')}>
                Paused
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('name')}>
                <div className="flex items-center justify-between w-full">
                  <span>Campaign Name</span>
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('status')}>
                <div className="flex items-center justify-between w-full">
                  <span>Status</span>
                  {sortField === 'status' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('reviews')}>
                <div className="flex items-center justify-between w-full">
                  <span>Reviews</span>
                  {sortField === 'reviews' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('lastUpdated')}>
                <div className="flex items-center justify-between w-full">
                  <span>Last Updated</span>
                  {sortField === 'lastUpdated' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="hidden lg:table-cell">Promotion</TableHead>
              <TableHead className="hidden lg:table-cell">Reviews</TableHead>
              <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
                    <h3 className="mt-4 text-lg font-medium">Loading campaigns...</h3>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <QrCode className="h-10 w-10 text-muted-foreground opacity-40" />
                    <h3 className="mt-4 text-lg font-medium">No campaigns found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {searchQuery || statusFilter
                        ? 'Try adjusting your search or filter criteria'
                        : 'Get started by creating your first campaign'}
                    </p>
                    {!searchQuery && !statusFilter && (
                      <Button
                        className="mt-4 bg-orange-500 hover:bg-orange-600"
                        onClick={() => navigate('/vendor-dashboard/campaigns/new')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Code: {campaign.code}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'active' ? "default" : "secondary"} className="capitalize">
                      {campaign.status === 'active' ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {campaign.products.map((product, idx) => (
                        <Badge key={idx} variant="outline" className="font-normal">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.promotionName}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.reviews}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {formatDate(campaign.lastUpdated)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => showQrCode(campaign)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View QR Code</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyUrl(campaign.url)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => window.open(campaign.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => navigate(`/vendor-dashboard/campaigns/edit/${campaign.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Campaign</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedQrCode?.name} QR Code</DialogTitle>
          </DialogHeader>
          
          {selectedQrCode && (
            <div className="flex flex-col items-center justify-center p-4">
              <QRCode
                url={selectedQrCode.url}
                size={280}
                title={`${selectedQrCode.name} Campaign QR Code`}
                showDialog={false}
              />
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Scan this code to access the review funnel for <strong>{selectedQrCode.name}</strong>
              </p>
              
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => {
                    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
                    if (canvas) {
                      const link = document.createElement("a");
                      link.download = `${selectedQrCode.name.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
                      link.href = canvas.toDataURL("image/png");
                      link.click();
                      
                      toast({
                        title: "QR Code downloaded",
                        description: "The QR code has been saved to your device.",
                      });
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                
                <Button 
                  onClick={() => {
                    window.open(selectedQrCode.url, '_blank');
                    setQrDialogOpen(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open URL
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
