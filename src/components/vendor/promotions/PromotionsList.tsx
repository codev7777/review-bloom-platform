
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, GiftCard, Tag, Download, Edit, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

const PromotionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Gift Card or eGift Card':
      return <GiftCard className="h-5 w-5 text-orange-500" />;
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
  
  const filteredPromotions = MOCK_PROMOTIONS.filter(promotion => 
    promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search promotions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promotion) => (
          <Card key={promotion.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video w-full overflow-hidden bg-orange-50">
              <img
                src={promotion.image}
                alt={promotion.name}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium line-clamp-1 text-base">{promotion.name}</h3>
                  <div className="flex items-center mt-1 gap-1">
                    <PromotionTypeIcon type={promotion.type} />
                    <span className="text-xs text-muted-foreground">{promotion.type}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
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
      
      {filteredPromotions.length === 0 && (
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No promotions found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try a different search term' : 'Get started by creating a promotion'}
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
