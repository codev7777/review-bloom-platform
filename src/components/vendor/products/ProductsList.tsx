
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Info
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
import { toast } from '@/components/ui/use-toast';

// Mock data
const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Kitchen Knife Set', 
    asin: 'B08N5LNQCV', 
    category: 'Kitchen', 
    price: '$49.99',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Knife+Set',
    dateAdded: '2023-04-12'
  },
  { 
    id: '2', 
    name: 'Yoga Mat', 
    asin: 'B07D9YYQ8V', 
    category: 'Fitness', 
    price: '$24.95',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Yoga+Mat',
    dateAdded: '2023-05-18'
  },
  { 
    id: '3', 
    name: 'Bluetooth Headphones', 
    asin: 'B07Q5NDZBD', 
    category: 'Electronics', 
    price: '$79.99',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Headphones',
    dateAdded: '2023-02-24'
  },
  { 
    id: '4', 
    name: 'Smart Watch', 
    asin: 'B08L5NP6NG', 
    category: 'Electronics', 
    price: '$129.99',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Watch',
    dateAdded: '2023-06-08'
  },
  { 
    id: '5', 
    name: 'Coffee Maker', 
    asin: 'B07JG7DS1T', 
    category: 'Kitchen', 
    price: '$89.99',
    image: 'https://placehold.co/100x100/FFF5E8/FF9130?text=Coffee',
    dateAdded: '2023-03-30'
  },
];

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.asin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productToDelete));
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully",
      });
      setProductToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate('/vendor-dashboard/products/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <Info className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "Add a product to get started"}
          </p>
          {!searchTerm && (
            <Button 
              variant="outline" 
              className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={() => navigate('/vendor-dashboard/products/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add your first product
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>ASIN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.asin}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/vendor-dashboard/products/edit/${product.id}`)}
                      >
                        <Edit className="h-4 w-4 text-orange-500" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this product? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProduct()}
                              className="bg-red-500 hover:bg-red-600"
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
    </div>
  );
};

export default ProductsList;
