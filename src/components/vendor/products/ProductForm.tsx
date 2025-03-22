
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

// Mock data
const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Kitchen Knife Set', 
    asin: 'B08N5LNQCV', 
    category: 'Kitchen', 
    price: '49.99',
    description: 'Premium kitchen knife set with 5 stainless steel knives and wooden block.',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Knife+Set',
  },
  { 
    id: '2', 
    name: 'Yoga Mat', 
    asin: 'B07D9YYQ8V', 
    category: 'Fitness', 
    price: '24.95',
    description: 'Non-slip yoga mat with alignment lines, 6mm thick for joint protection.',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Yoga+Mat',
  },
  { 
    id: '3', 
    name: 'Bluetooth Headphones', 
    asin: 'B07Q5NDZBD', 
    category: 'Electronics', 
    price: '79.99',
    description: 'Wireless over-ear headphones with noise cancellation and 30-hour battery life.',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Headphones',
  }
];

const CATEGORIES = ['Electronics', 'Kitchen', 'Fitness', 'Home & Garden', 'Beauty', 'Toys', 'Clothing', 'Books', 'Other'];

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    asin: '',
    category: '',
    price: '',
    description: '',
    image: 'https://placehold.co/300x300/FFF5E8/FF9130?text=Product+Image'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch product data based on ID
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          asin: product.asin,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image
        });
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditMode ? "Product updated" : "Product added",
        description: isEditMode 
          ? "The product has been updated successfully" 
          : "The product has been added to your catalog",
      });
      
      navigate('/vendor-dashboard/products');
    } catch (error) {
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
    <div className="space-y-6">
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
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="text" 
                placeholder="e.g. 49.99"
                required
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of your product"
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                <div className="text-center">
                  <img 
                    src={formData.image}
                    alt="Product preview"
                    className="mx-auto h-32 w-32 rounded-lg object-cover mb-4"
                  />
                  <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500 hover:text-orange-600"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/vendor-dashboard/products')}
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
              isEditMode ? 'Save Changes' : 'Add Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
