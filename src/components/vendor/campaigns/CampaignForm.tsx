
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Check, 
  X, 
  QrCode,
  AlertCircle,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { generateQRCode } from '@/utils/qrCodeGenerator';

// Mock data
const MOCK_PRODUCTS = [
  { id: '1', name: 'Kitchen Knife Set', asin: 'B08N5LNQCV', category: 'Kitchen' },
  { id: '2', name: 'Yoga Mat', asin: 'B07D9YYQ8V', category: 'Fitness' },
  { id: '3', name: 'Bluetooth Headphones', asin: 'B07Q5NDZBD', category: 'Electronics' },
  { id: '4', name: 'Coffee Maker', asin: 'B085HGFKPJ', category: 'Kitchen' },
  { id: '5', name: 'Resistance Bands', asin: 'B088KFL5XP', category: 'Fitness' },
];

const MOCK_PROMOTIONS = [
  { id: '1', name: 'Summer Gift Card', type: 'Gift Card or eGift Card' },
  { id: '2', name: 'Holiday Discount', type: 'Discount Code, Promo Code or Virtual Gift Card' },
  { id: '3', name: 'Product Giveaway', type: 'Free Product' },
  { id: '4', name: 'Cookbook PDF', type: 'Digital Download' },
];

const MARKETPLACE_COUNTRIES = [
  'US', 'CA', 'MX', 'GB', 'FR', 'DE', 'IT', 'ES', 'IN', 'JP', 
  'NL', 'SE', 'AU', 'BR', 'SG', 'TR', 'SA', 'AE', 'PL', 'EG', 'ZA'
];

const MARKETPLACE_COUNTRY_NAMES: Record<string, string> = {
  'US': 'United States',
  'CA': 'Canada',
  'MX': 'Mexico',
  'GB': 'United Kingdom',
  'FR': 'France',
  'DE': 'Germany',
  'IT': 'Italy',
  'ES': 'Spain',
  'IN': 'India',
  'JP': 'Japan',
  'NL': 'Netherlands',
  'SE': 'Sweden',
  'AU': 'Australia',
  'BR': 'Brazil',
  'SG': 'Singapore',
  'TR': 'Turkey',
  'SA': 'Saudi Arabia',
  'AE': 'United Arab Emirates',
  'PL': 'Poland',
  'EG': 'Egypt',
  'ZA': 'South Africa'
};

// Sample campaign for edit mode
const SAMPLE_CAMPAIGN = {
  id: '1',
  name: 'Summer Kitchen Sale',
  promotionId: '1',
  productIds: ['1', '4'],
  marketplaces: ['US', 'CA', 'GB'],
  isActive: true,
  code: 'KITCHEN2023',
  url: 'https://example.com/review/KITCHEN2023',
};

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    promotionId: '',
    productIds: [] as string[],
    marketplaces: [] as string[],
    isActive: true,
    qrCode: ''
  });

  const [qrCode, setQrCode] = useState<string>('');
  const [campaignUrl, setCampaignUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // For edit mode, load the campaign data
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: SAMPLE_CAMPAIGN.name,
        promotionId: SAMPLE_CAMPAIGN.promotionId,
        productIds: SAMPLE_CAMPAIGN.productIds,
        marketplaces: SAMPLE_CAMPAIGN.marketplaces,
        isActive: SAMPLE_CAMPAIGN.isActive,
        qrCode: ''
      });
      setCampaignUrl(SAMPLE_CAMPAIGN.url);
      
      // Generate QR code for the campaign URL
      generateQRCode({
        value: SAMPLE_CAMPAIGN.url,
        size: 200,
        bgColor: '#FFFFFF',
        fgColor: '#000000',
        level: 'H',
        includeMargin: true
      }).then(qrCodeImageUrl => {
        setQrCode(qrCodeImageUrl);
      });
    }
  }, [id, isEditMode]);

  // Generate a new QR code when the campaign URL changes
  useEffect(() => {
    if (!campaignUrl && !isEditMode) {
      const url = `https://example.com/review/${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setCampaignUrl(url);

      // Generate QR code
      generateQRCode({
        value: url,
        size: 200,
        bgColor: '#FFFFFF',
        fgColor: '#000000',
        level: 'H',
        includeMargin: true
      }).then(qrCodeImageUrl => {
        setQrCode(qrCodeImageUrl);
      });
    }
  }, [campaignUrl, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProductSelect = (productId: string) => {
    setFormData(prev => {
      if (prev.productIds.includes(productId)) {
        return { ...prev, productIds: prev.productIds.filter(id => id !== productId) };
      } else {
        return { ...prev, productIds: [...prev.productIds, productId] };
      }
    });
  };
  
  const handleMarketplaceSelect = (marketplace: string) => {
    setFormData(prev => {
      if (prev.marketplaces.includes(marketplace)) {
        return { ...prev, marketplaces: prev.marketplaces.filter(m => m !== marketplace) };
      } else {
        return { ...prev, marketplaces: [...prev.marketplaces, marketplace] };
      }
    });
  };
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(campaignUrl);
    toast({
      title: "URL Copied",
      description: "Campaign URL has been copied to clipboard",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would submit to an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditMode ? "Campaign updated" : "Campaign created",
        description: isEditMode 
          ? "Your campaign has been updated successfully" 
          : "Your campaign has been created successfully",
        variant: "default",
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
  
  // Get selected promotion details
  const selectedPromotion = MOCK_PROMOTIONS.find(p => p.id === formData.promotionId);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{isEditMode ? 'Edit Campaign' : 'Create Campaign'}</h1>
        <p className="text-muted-foreground">
          {isEditMode 
            ? 'Update your review campaign settings' 
            : 'Configure your new review campaign'}
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
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="promotion">Select Promotion</Label>
              <Select 
                value={formData.promotionId} 
                onValueChange={(value) => handleSelectChange('promotionId', value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20">
                  <SelectValue placeholder="Select a promotion" />
                </SelectTrigger>
                <SelectContent className="animate-in zoom-in-95 duration-100">
                  {MOCK_PROMOTIONS.map(promotion => (
                    <SelectItem key={promotion.id} value={promotion.id}>
                      {promotion.name} - {promotion.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Campaign Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSelectChange('isActive', checked)}
                  />
                  <Label htmlFor="active">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
              
              <div className={`p-3 rounded-md ${formData.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                <div className="flex items-center space-x-2">
                  {formData.isActive ? <Check size={16} /> : <X size={16} />}
                  <span className="text-sm font-medium">
                    {formData.isActive 
                      ? 'This campaign is active and accepting reviews' 
                      : 'This campaign is not active and will not accept reviews'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Products</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {MOCK_PRODUCTS.map(product => (
                  <div
                    key={product.id}
                    className={`
                      border rounded-md p-3 cursor-pointer transition-all duration-200
                      ${formData.productIds.includes(product.id) 
                        ? 'bg-orange-50 border-orange-200' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">ASIN: {product.asin}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center
                        ${formData.productIds.includes(product.id) 
                          ? 'bg-orange-500' 
                          : 'border border-gray-300'
                        }`}
                      >
                        {formData.productIds.includes(product.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {formData.productIds.length === 0 && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Select at least one product
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Select Marketplaces</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {MARKETPLACE_COUNTRIES.map(country => (
                  <Badge
                    key={country}
                    variant={formData.marketplaces.includes(country) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      formData.marketplaces.includes(country) 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleMarketplaceSelect(country)}
                  >
                    {country} - {MARKETPLACE_COUNTRY_NAMES[country]}
                  </Badge>
                ))}
              </div>
              {formData.marketplaces.length === 0 && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Select at least one marketplace
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <QrCode className="h-8 w-8 mx-auto text-orange-500" />
                  <h3 className="font-medium text-lg">Campaign QR Code</h3>
                  
                  <div className="bg-white p-4 rounded-lg border mx-auto max-w-xs">
                    {qrCode ? (
                      <img 
                        src={qrCode}
                        alt="Campaign QR Code"
                        className="mx-auto"
                      />
                    ) : (
                      <div className="h-[200px] w-[200px] mx-auto bg-gray-100 animate-pulse rounded" />
                    )}
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border text-sm relative">
                    <div className="truncate pr-10">{campaignUrl}</div>
                    <button
                      type="button"
                      onClick={handleCopyUrl}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-900"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>This QR code will be automatically generated for your campaign. Customers can scan it to leave their reviews.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedPromotion && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-2">Selected Promotion</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm ml-2">{selectedPromotion.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Type:</span>
                      <span className="text-sm ml-2">{selectedPromotion.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor-dashboard/campaigns')}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
            disabled={isLoading || formData.productIds.length === 0 || formData.marketplaces.length === 0 || !formData.promotionId}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Saving...' : 'Creating...'}
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
