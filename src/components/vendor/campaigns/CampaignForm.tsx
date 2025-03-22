
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { 
  QrCode,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data
const MOCK_CAMPAIGNS = [
  { 
    id: '1', 
    name: 'Summer Kitchen Sale', 
    productId: '1',
    description: 'Summer promotion for kitchen products with special discounts.',
    amazonRedirectUrl: 'https://www.amazon.com/dp/B08N5LNQCV',
    startDate: new Date('2023-05-15'),
    endDate: new Date('2023-08-15'),
    status: 'active',
    giftOffer: true,
    giftDescription: '$10 Amazon Gift Card'
  },
  { 
    id: '2', 
    name: 'Fitness Promo', 
    productId: '2',
    description: 'Promote yoga products for summer fitness activities.',
    amazonRedirectUrl: 'https://www.amazon.com/dp/B07D9YYQ8V',
    startDate: new Date('2023-06-20'),
    endDate: new Date('2023-09-20'),
    status: 'active',
    giftOffer: true,
    giftDescription: 'Free yoga strap'
  }
];

// Mock products for dropdown
const MOCK_PRODUCTS = [
  { id: '1', name: 'Kitchen Knife Set' },
  { id: '2', name: 'Yoga Mat' },
  { id: '3', name: 'Bluetooth Headphones' },
  { id: '4', name: 'Smart Watch' },
  { id: '5', name: 'Coffee Maker' },
];

const CAMPAIGN_STATUS = ['draft', 'scheduled', 'active', 'paused', 'ended'];

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    productId: '',
    description: '',
    amazonRedirectUrl: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Default 3 months
    status: 'draft',
    giftOffer: false,
    giftDescription: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch campaign data based on ID
      const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);
      if (campaign) {
        setFormData({
          name: campaign.name,
          productId: campaign.productId,
          description: campaign.description,
          amazonRedirectUrl: campaign.amazonRedirectUrl,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          status: campaign.status,
          giftOffer: campaign.giftOffer,
          giftDescription: campaign.giftDescription
        });
      }
    }
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, [name]: date }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditMode ? "Campaign updated" : "Campaign created",
        description: isEditMode 
          ? "The campaign has been updated successfully" 
          : "The campaign has been created successfully",
      });
      
      navigate('/vendor-dashboard/campaigns');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the campaign",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{isEditMode ? 'Edit Campaign' : 'Create New Campaign'}</h1>
        <p className="text-muted-foreground">
          {isEditMode 
            ? 'Update your campaign settings' 
            : 'Set up a new review campaign for your product'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Summer Kitchen Sale"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productId">Product</Label>
              <Select 
                value={formData.productId} 
                onValueChange={(value) => handleSelectChange('productId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PRODUCTS.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of your campaign"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amazonRedirectUrl">Amazon Product URL</Label>
              <Input 
                id="amazonRedirectUrl"
                name="amazonRedirectUrl"
                value={formData.amazonRedirectUrl}
                onChange={handleChange}
                placeholder="e.g. https://www.amazon.com/dp/B08N5LNQCV"
                required
              />
              <p className="text-xs text-muted-foreground">
                Customers with positive reviews will be redirected to this URL
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleDateChange('startDate', date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleDateChange('endDate', date)}
                      fromDate={formData.startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Campaign Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_STATUS.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="giftOffer"
                  name="giftOffer"
                  checked={formData.giftOffer}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <Label htmlFor="giftOffer">Offer an incentive gift for reviews</Label>
              </div>
              
              {formData.giftOffer && (
                <div className="mt-4">
                  <Label htmlFor="giftDescription">Gift Description</Label>
                  <Input 
                    id="giftDescription"
                    name="giftDescription"
                    value={formData.giftDescription}
                    onChange={handleChange}
                    placeholder="e.g. $10 Amazon Gift Card"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-start">
                <QrCode className="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-orange-800">QR Code will be generated automatically</h4>
                  <p className="text-sm text-orange-600 mt-1">
                    After creating the campaign, you'll be able to print or download a custom QR code that directs customers to your review funnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor-dashboard/campaigns')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              isEditMode ? 'Save Changes' : 'Create Campaign'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
