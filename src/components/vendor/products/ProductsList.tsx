
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Info,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronUp,
  ChevronDown
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

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

type SortField = 'name' | 'asin' | 'category' | 'dateAdded';
type SortOrder = 'asc' | 'desc';

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.asin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === null || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'asin') {
      comparison = a.asin.localeCompare(b.asin);
    } else if (sortField === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else if (sortField === 'dateAdded') {
      comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate('/vendor-dashboard/products/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              {categoryFilter ? `Category: ${categoryFilter}` : "Filter by Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {sortedProducts.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <Info className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm || categoryFilter ? "Try a different search term or filter" : "Add a product to get started"}
          </p>
          {!searchTerm && !categoryFilter && (
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
                <TableHead className="cursor-pointer" onClick={() => handleSort('asin')}>
                  <div className="flex items-center">
                    ASIN
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {sortField === 'asin' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {sortField === 'category' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('dateAdded')}>
                  <div className="flex items-center">
                    Date Added
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {sortField === 'dateAdded' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {product.asin}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.asin}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {product.category}
                    </Badge>
                  </TableCell>
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
