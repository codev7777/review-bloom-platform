
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Upload, Image, X } from 'lucide-react';
import axios from 'axios';

const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Kitchen Knife Set', 
    asin: 'B08N5LNQCV', 
    category: 'Kitchen', 
    image: 'https://placehold.co/300x300/FFF5E8/FF9130?text=Knife+Set',
  },
  { 
    id: '2', 
    name: 'Yoga Mat', 
    asin: 'B07D9YYQ8V', 
    category: 'Fitness', 
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Yoga+Mat',
  },
  { 
    id: '3', 
    name: 'Bluetooth Headphones', 
    asin: 'B07Q5NDZBD', 
    category: 'Electronics', 
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Headphones',
  }
];

const CATEGORIES = ['Electronics', 'Kitchen', 'Fitness', 'Home & Garden', 'Beauty', 'Toys', 'Clothing', 'Books', 'Other'];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const BACKEND_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    asin: '',
    category: '',
    image: 'https://placehold.co/300x300/FFF5E8/FF9130?text=Product+Image'
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isEditMode) {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          asin: product.asin,
          category: product.category,
          image: product.image
        });
        setPreviewImage(product.image);
      }
    }
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      image: 'https://placehold.co/300x300/FFF5E8/FF9130?text=Product+Image' 
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit to backend API
      await axios.post(`${BACKEND_URL}/v1/product/`, formData);
      
      toast({
        title: isEditMode ? "Product updated" : "Product added",
        description: isEditMode 
          ? "Your product has been updated successfully" 
          : "Your product has been added to your catalog",
        variant: "default",
      });
      
      navigate('/vendor-dashboard/products');
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the product",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-2xl font-semibold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
        <p className="text-muted-foreground">
          {isEditMode 
            ? 'Update your product information' 
            : 'Add a new product to your catalog'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Premium Kitchen Knife Set"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="asin">Amazon ASIN</Label>
              <Input 
                id="asin"
                name="asin"
                value={formData.asin}
                onChange={handleChange}
                placeholder="e.g. B08N5LNQCV"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
              <p className="text-xs text-muted-foreground">
                The unique Amazon Standard Identification Number for your product
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="animate-in zoom-in-95 duration-100">
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Product Image</Label>
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
                      alt="Product preview"
                      className="mx-auto h-64 w-64 object-contain rounded-lg animate-in zoom-in-95 duration-200"
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
                    <Image className="mx-auto h-16 w-16 text-gray-400" />
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
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor-dashboard/products')}
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
                {isEditMode ? 'Saving...' : 'Adding...'}
              </span>
            ) : (
              isEditMode ? 'Save Changes' : 'Add Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
