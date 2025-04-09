
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gift, 
  CreditCard, 
  Tag, 
  Download, 
  Edit, 
  Plus, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock promotions data
const MOCK_PROMOTIONS = [
  {
    id: '1',
    name: 'Summer Gift Card',
    type: 'Gift Card or eGift Card',
    description: 'A $10 Amazon Gift Card for summer purchases',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Gift+Card',
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    name: 'Holiday Discount',
    type: 'Discount Code, Promo Code or Virtual Gift Card',
    description: '15% off discount code for holiday shopping',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Discount',
    createdAt: '2023-11-20',
  },
  {
    id: '3',
    name: 'Product Giveaway',
    type: 'Free Product',
    description: 'Free kitchen gadget for selected customers',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Free+Product',
    createdAt: '2023-08-05',
  },
  {
    id: '4',
    name: 'Cookbook PDF',
    type: 'Digital Download',
    description: 'Exclusive cookbook PDF with recipes',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Digital+Download',
    createdAt: '2023-09-12',
  },
];

type SortField = 'name' | 'type' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const PromotionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Gift Card or eGift Card':
      return <CreditCard className="h-5 w-5 text-orange-500" />;
    case 'Discount Code, Promo Code or Virtual Gift Card':
      return <Tag className="h-5 w-5 text-emerald-500" />;
    case 'Free Product':
      return <Gift className="h-5 w-5 text-purple-500" />;
    case 'Digital Download':
      return <Download className="h-5 w-5 text-blue-500" />;
    default:
      return <Gift className="h-5 w-5 text-gray-500" />;
  }
};

const PromotionsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Get unique promotion types for filtering
  const promotionTypes = [...new Set(MOCK_PROMOTIONS.map(promo => promo.type))];
  
  // Filter promotions
  const filteredPromotions = MOCK_PROMOTIONS.filter(promotion => {
    const matchesSearch = promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === null || promotion.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Sort promotions
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortField === 'createdAt') {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
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
          <h1 className="text-2xl font-semibold">Promotions</h1>
          <p className="text-muted-foreground">
            Manage your promotional offers for review campaigns
          </p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          onClick={() => navigate('/vendor-dashboard/promotions/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search promotions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {typeFilter ? `Type: ${typeFilter.split(' ')[0]}` : "Filter by Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                All Types
              </DropdownMenuItem>
              {promotionTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                  <div className="flex items-center gap-2">
                    <PromotionTypeIcon type={type} />
                    <span>{type}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
                {sortField ===  'name' ? ' by Name' : sortField === 'type' ? ' by Type' : ' by Date'}
                {sortOrder === 'asc' ? ' (A-Z)' : ' (Z-A)'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('name')}>
                <div className="flex items-center justify-between w-full">
                  <span>Name</span>
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('type')}>
                <div className="flex items-center justify-between w-full">
                  <span>Type</span>
                  {sortField === 'type' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                <div className="flex items-center justify-between w-full">
                  <span>Date Created</span>
                  {sortField === 'createdAt' && (
                    sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPromotions.map((promotion) => (
          <Card key={promotion.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 h-full">
            <div className="aspect-video w-full overflow-hidden bg-orange-50">
              <img
                src={promotion.image}
                alt={promotion.name}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1 text-base">{promotion.name}</h3>
                  <div className="flex items-center mt-1 gap-1">
                    <PromotionTypeIcon type={promotion.type} />
                    <span className="text-xs text-muted-foreground line-clamp-1">{promotion.type}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap ml-2">
                  {formatDate(promotion.createdAt)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {promotion.description}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => navigate(`/vendor-dashboard/promotions/edit/${promotion.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Promotion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {sortedPromotions.length === 0 && (
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No promotions found</h3>
          <p className="text-muted-foreground">
            {searchQuery || typeFilter ? 'Try different search or filter criteria' : 'Get started by creating a promotion'}
          </p>
          <Button
            className="mt-4 bg-orange-500 hover:bg-orange-600"
            onClick={() => navigate('/vendor-dashboard/promotions/new')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromotionsList;
