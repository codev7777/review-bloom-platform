
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  AlertCircle, 
  Upload, 
  Image as ImageIcon, 
  X, 
  GiftCard, 
  Tag, 
  Gift, 
  Download 
} from 'lucide-react';
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
import { 
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

// Mock promotions for edit mode
const MOCK_PROMOTIONS = [
  {
    id: '1',
    name: 'Summer Gift Card',
    type: 'Gift Card or eGift Card',
    description: 'A $10 Amazon Gift Card for summer purchases',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Gift+Card',
  },
  {
    id: '2',
    name: 'Holiday Discount',
    type: 'Discount Code, Promo Code or Virtual Gift Card',
    description: '15% off discount code for holiday shopping',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Discount',
  },
  {
    id: '3',
    name: 'Product Giveaway',
    type: 'Free Product',
    description: 'Free kitchen gadget for selected customers',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Free+Product',
  },
  {
    id: '4',
    name: 'Cookbook PDF',
    type: 'Digital Download',
    description: 'Exclusive cookbook PDF with recipes',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Digital+Download',
  },
];

const PROMOTION_TYPES = [
  'Gift Card or eGift Card',
  'Discount Code, Promo Code or Virtual Gift Card',
  'Free Product',
  'Digital Download'
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

const PromotionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Gift Card or eGift Card':
      return <GiftCard className="h-5 w-5" />;
    case 'Discount Code, Promo Code or Virtual Gift Card':
      return <Tag className="h-5 w-5" />;
    case 'Free Product':
      return <Gift className="h-5 w-5" />;
    case 'Digital Download':
      return <Download className="h-5 w-5" />;
    default:
      return <Gift className="h-5 w-5" />;
  }
};

const PromotionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Promotion'
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isEditMode) {
      const promotion = MOCK_PROMOTIONS.find(p => p.id === id);
      if (promotion) {
        setFormData({
          name: promotion.name,
          type: promotion.type,
          description: promotion.description,
          image: promotion.image
        });
        setPreviewImage(promotion.image);
      }
    }
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File is too large. Maximum size is 2MB.`);
      return false;
    }

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!acceptedTypes.includes(file.type)) {
      setFileError('Only JPG, PNG, and GIF files are allowed.');
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({ 
      ...prev, 
      image: 'https://placehold.co/300x200/FFF5E8/FF9130?text=Promotion' 
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would submit to an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditMode ? "Promotion updated" : "Promotion created",
        description: isEditMode 
          ? "Your promotion has been updated successfully" 
          : "Your promotion has been created successfully",
        variant: "default",
      });
      
      navigate('/vendor-dashboard/promotions');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the promotion",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{isEditMode ? 'Edit Promotion' : 'Create Promotion'}</h1>
        <p className="text-muted-foreground">
          {isEditMode 
            ? 'Update your promotion details' 
            : 'Create a new promotion for your review campaigns'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Promotion Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Summer Gift Card"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Promotion Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
                className="grid gap-3"
              >
                {PROMOTION_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                    <RadioGroupItem value={type} id={type.replace(/\s+/g, '-').toLowerCase()} />
                    <Label
                      htmlFor={type.replace(/\s+/g, '-').toLowerCase()}
                      className="flex flex-1 items-center gap-2 font-normal"
                    >
                      <PromotionTypeIcon type={type} />
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your promotion..."
                rows={5}
                className="resize-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
                required
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Promotion Image</Label>
              <div 
                className={`mt-2 relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 
                  ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50/30'}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-upload"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                
                {previewImage ? (
                  <div className="relative">
                    <img 
                      src={previewImage}
                      alt="Promotion preview"
                      className="mx-auto h-64 w-full object-contain rounded-lg animate-in zoom-in-95 duration-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors duration-200"
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <ImageIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <div className="flex flex-col items-center text-sm text-muted-foreground">
                      <p>Drag and drop your image here, or</p>
                      <label
                        htmlFor="image-upload"
                        className="mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-orange-500 bg-white border border-orange-200 hover:bg-orange-50 hover:border-orange-300 cursor-pointer transition-all duration-200"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Browse files
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                )}
              </div>
              {fileError && (
                <div className="text-sm text-red-500 mt-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fileError}
                </div>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <Label>Image Guidelines</Label>
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-orange-600">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Use high-quality images for better customer engagement</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-orange-600">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Recommend 3:2 aspect ratio for optimal display</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-orange-600">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Maximum file size is 2MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor-dashboard/promotions')}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
            disabled={isLoading}
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
              isEditMode ? 'Save Changes' : 'Create Promotion'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
