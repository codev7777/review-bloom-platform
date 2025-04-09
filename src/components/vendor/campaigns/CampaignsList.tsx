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
  SlidersHorizontal
} from 'lucide-react';
import { Campaign } from '@/types';
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

interface CampaignsListProps {
  campaigns: Campaign[];
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaigns }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const extendedCampaigns = campaigns.map(campaign => ({
    ...campaign,
    products: ['Kitchen Knife Set', 'Coffee Maker'],
    promotionName: campaign.name.includes('Kitchen') 
      ? 'Summer Gift Card' 
      : campaign.name.includes('Yoga') 
        ? 'Free Product' 
        : 'Holiday Discount',
    marketplaces: ['US', 'CA', campaign.name.includes('Tech') ? 'JP' : 'GB'],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    reviews: Math.floor(Math.random() * 200) + 10,
  }));
  
  const filteredCampaigns = extendedCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Campaign URL has been copied to clipboard",
    });
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
      
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="hidden lg:table-cell">Promotion</TableHead>
              <TableHead className="hidden lg:table-cell">Reviews</TableHead>
              <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
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
            ))}
            
            {filteredCampaigns.length === 0 && (
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
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignsList;
