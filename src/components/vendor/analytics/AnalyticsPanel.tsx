
import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  Download, 
  Filter, 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ListFilter
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample data for analytics
const ratingDistribution = [
  { name: '5 Stars', value: 65, color: '#16a34a' },
  { name: '4 Stars', value: 20, color: '#84cc16' },
  { name: '3 Stars', value: 8, color: '#facc15' },
  { name: '2 Stars', value: 4, color: '#f97316' },
  { name: '1 Star', value: 3, color: '#ef4444' },
];

const reviewsOverTime = [
  { date: '2023-01', reviews: 18, average: 4.2 },
  { date: '2023-02', reviews: 25, average: 4.3 },
  { date: '2023-03', reviews: 33, average: 4.5 },
  { date: '2023-04', reviews: 42, average: 4.4 },
  { date: '2023-05', reviews: 55, average: 4.6 },
  { date: '2023-06', reviews: 48, average: 4.7 },
  { date: '2023-07', reviews: 60, average: 4.5 },
  { date: '2023-08', reviews: 73, average: 4.8 },
  { date: '2023-09', reviews: 82, average: 4.6 },
  { date: '2023-10', reviews: 91, average: 4.7 },
  { date: '2023-11', reviews: 105, average: 4.8 },
  { date: '2023-12', reviews: 120, average: 4.9 },
];

const recentReviews = [
  {
    id: '1',
    customerName: 'Alex Johnson',
    productName: 'Kitchen Knife Set',
    rating: 5,
    comment: 'Excellent quality knives, they stay sharp for a long time and the handles feel premium.',
    date: '2023-11-28',
  },
  {
    id: '2',
    customerName: 'Samantha Lee',
    productName: 'Yoga Mat',
    rating: 4,
    comment: 'Good grip and comfortable thickness, but wish it was slightly wider.',
    date: '2023-11-26',
  },
  {
    id: '3',
    customerName: 'Michael Patel',
    productName: 'Bluetooth Headphones',
    rating: 5,
    comment: 'Amazing sound quality and battery life. Very comfortable for long sessions.',
    date: '2023-11-25',
  },
  {
    id: '4',
    customerName: 'Emily Rodriguez',
    productName: 'Kitchen Knife Set',
    rating: 3,
    comment: 'Decent knives but not as sharp as I expected. The block is nice though.',
    date: '2023-11-22',
  },
  {
    id: '5',
    customerName: 'James Wilson',
    productName: 'Bluetooth Headphones',
    rating: 5,
    comment: 'Noise cancellation is fantastic. Perfect for my daily commute.',
    date: '2023-11-20',
  },
];

const productPerformance = [
  {
    id: '1',
    name: 'Kitchen Knife Set',
    reviews: 156,
    rating: 4.8,
    trending: 'up',
  },
  {
    id: '2',
    name: 'Yoga Mat',
    reviews: 98,
    rating: 4.5,
    trending: 'stable',
  },
  {
    id: '3',
    name: 'Bluetooth Headphones',
    reviews: 212,
    rating: 4.7,
    trending: 'up',
  },
  {
    id: '4',
    name: 'Smart Watch',
    reviews: 67,
    rating: 4.3,
    trending: 'down',
  },
  {
    id: '5',
    name: 'Coffee Maker',
    reviews: 134,
    rating: 4.2,
    trending: 'stable',
  },
];

const AnalyticsPanel = () => {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  useEffect(() => {
    // Calculate how many filters are active
    let count = 0;
    if (selectedProduct !== 'all') count++;
    if (selectedTimeframe !== 'all') count++;
    if (selectedCampaign !== 'all') count++;
    if (dateRange.from || dateRange.to) count++;
    setFilterCount(count);
  }, [selectedProduct, selectedTimeframe, selectedCampaign, dateRange]);

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      toast({
        title: "Export successful",
        description: "Analytics report has been downloaded as CSV",
      });
      setIsExporting(false);
    }, 1500);
  };

  const applyFilters = () => {
    toast({
      title: "Filters applied",
      description: `Showing data with ${filterCount} active filter${filterCount !== 1 ? 's' : ''}`,
    });
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedProduct('all');
    setSelectedTimeframe('all');
    setSelectedCampaign('all');
    setDateRange({
      from: undefined,
      to: undefined,
    });
    toast({
      title: "Filters reset",
      description: "Showing all data without filters",
    });
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up':
        return <ArrowUpIcon className="text-green-500 h-4 w-4" />;
      case 'down':
        return <ArrowDownIcon className="text-red-500 h-4 w-4" />;
      default:
        return <span className="text-gray-400">→</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Get insights into your reviews and campaign performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
                <Filter className="h-4 w-4 text-orange-500" />
                Filters
                {filterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-orange-500">
                    {filterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 animate-in zoom-in-95 duration-200">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Analytics</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="knife-set">Kitchen Knife Set</SelectItem>
                      <SelectItem value="yoga-mat">Yoga Mat</SelectItem>
                      <SelectItem value="headphones">Bluetooth Headphones</SelectItem>
                      <SelectItem value="watch">Smart Watch</SelectItem>
                      <SelectItem value="coffee-maker">Coffee Maker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign</label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="summer">Summer Kitchen Sale</SelectItem>
                      <SelectItem value="fitness">Fitness Promo</SelectItem>
                      <SelectItem value="electronics">Electronics Flash Deal</SelectItem>
                      <SelectItem value="holiday">Holiday Gift Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal text-sm"
                          disabled={!dateRange.from}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, 'PPP')
                          ) : (
                            <span>From date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal text-sm"
                          disabled={!dateRange.to}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, 'PPP')
                          ) : (
                            <span>To date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="transition-all duration-300"
                  >
                    Reset
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={applyFilters}
                    className="bg-orange-500 hover:bg-orange-600 transition-all duration-300"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            className="border-orange-200 text-orange-500 hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
            onClick={handleExportData}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-r-transparent"></span>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">486</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              <span>12.5% increase from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">4.7</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              <span>0.3 points higher than last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              <span>2 more than last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">3.2%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownIcon className="mr-1 h-4 w-4" />
              <span>0.5% decrease from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Analytics */}
      <Tabs 
        defaultValue="overview" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-orange-50">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="campaigns" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
            >
              Campaigns
            </TabsTrigger>
          </TabsList>
          
          {selectedTab === 'overview' && (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`p-2 ${chartType === 'bar' ? 'bg-orange-100 text-orange-500 border-orange-200' : ''}`} 
                onClick={() => setChartType('bar')}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`p-2 ${chartType === 'line' ? 'bg-orange-100 text-orange-500 border-orange-200' : ''}`}
                onClick={() => setChartType('line')}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`p-2 ${chartType === 'pie' ? 'bg-orange-100 text-orange-500 border-orange-200' : ''}`}
                onClick={() => setChartType('pie')}
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Overview Content */}
        <TabsContent value="overview" className="animate-in fade-in-50 duration-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Review Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {chartType === 'bar' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratingDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {ratingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  
                  {chartType === 'pie' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ratingDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ratingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  
                  {chartType === 'line' && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-muted-foreground">
                        Rating distribution data is better visualized with a bar or pie chart
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Reviews Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {(chartType === 'bar' || chartType === 'line') && (
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'bar' ? (
                        <BarChart data={reviewsOverTime}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="reviews" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : (
                        <LineChart data={reviewsOverTime}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="reviews" 
                            stroke="#f97316" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            animationDuration={1500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="average" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            animationDuration={1500}
                          />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  )}
                  
                  {chartType === 'pie' && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-muted-foreground">
                        Time series data is better visualized with a line or bar chart
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm">
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Reviews</th>
                      <th className="pb-3 font-medium">Rating</th>
                      <th className="pb-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance.map((product) => (
                      <tr key={product.id} className="border-t hover:bg-orange-50/30 transition-colors">
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="py-3">{product.reviews}</td>
                        <td className="py-3">{product.rating.toFixed(1)}</td>
                        <td className="py-3 flex items-center">
                          {getTrendIcon(product.trending)}
                          <span className="ml-2">
                            {product.trending === 'up' ? 'Increasing' : 
                             product.trending === 'down' ? 'Decreasing' : 'Stable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Products Content */}
        <TabsContent value="products" className="animate-in fade-in-50 duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
              <CardDescription>Detailed analytics for each product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="knife-set">Kitchen Knife Set</SelectItem>
                      <SelectItem value="yoga-mat">Yoga Mat</SelectItem>
                      <SelectItem value="headphones">Bluetooth Headphones</SelectItem>
                      <SelectItem value="watch">Smart Watch</SelectItem>
                      <SelectItem value="coffee-maker">Coffee Maker</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-orange-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                      onClick={() => {
                        toast({
                          title: "Period filter applied",
                          description: "Showing data for Last 30 Days",
                        });
                      }}
                    >
                      Last 30 Days
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-orange-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                      onClick={() => {
                        toast({
                          title: "Period filter applied",
                          description: "Showing data for Last 90 Days",
                        });
                      }}
                    >
                      Last 90 Days
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-orange-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                      onClick={() => {
                        toast({
                          title: "Period filter applied",
                          description: "Showing data for This Year",
                        });
                      }}
                    >
                      This Year
                    </Button>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="reviews" 
                        name="Total Reviews" 
                        fill="#f97316" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                      <Bar 
                        dataKey="rating" 
                        name="Average Rating" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card className="border-orange-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Top Performing Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="bg-orange-100 p-4 rounded-lg">
                          <BarChart3 className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Kitchen Knife Set</h4>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">4.8 rating</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-4 h-4 fill-orange-500"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            156 reviews · Most positive mentions: "sharp", "durable", "premium"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Needs Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 p-4 rounded-lg">
                          <ArrowDownIcon className="h-8 w-8 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Coffee Maker</h4>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">4.2 rating</span>
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  className="w-4 h-4 fill-orange-500"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                              <svg
                                className="w-4 h-4 fill-gray-300"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            134 reviews · Common complaints: "leaks", "difficult to clean", "loud"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reviews Content */}
        <TabsContent value="reviews" className="animate-in fade-in-50 duration-300">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Latest customer feedback across all products</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 border-orange-200 hover:bg-orange-50 transition-all duration-300"
                    onClick={() => {
                      toast({
                        title: "Reviews filtered",
                        description: "Showing reviews with higher ratings",
                      });
                    }}
                  >
                    <ListFilter className="h-4 w-4 text-orange-500" />
                    Filter
                  </Button>
                  <Select 
                    defaultValue="recent"
                    onValueChange={(value) => {
                      toast({
                        title: "Sort order changed",
                        description: `Reviews are now sorted by ${value === 'recent' ? 'most recent' : value === 'highest' ? 'highest rating' : 'lowest rating'}`,
                      });
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="highest">Highest Rating</SelectItem>
                      <SelectItem value="lowest">Lowest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{review.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{review.productName} • {review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-orange-500' : 'fill-gray-300'}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                        onClick={() => {
                          toast({
                            title: "Response added",
                            description: "Your response to this review has been saved",
                          });
                        }}
                      >
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button 
                  variant="outline" 
                  className="border-orange-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                  onClick={() => {
                    toast({
                      title: "More reviews loaded",
                      description: "Showing additional customer reviews",
                    });
                  }}
                >
                  Load More Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Campaigns Content */}
        <TabsContent value="campaigns" className="animate-in fade-in-50 duration-300">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Tracking review collection efforts</CardDescription>
                </div>
                <Select
                  defaultValue="active"
                  onValueChange={(value) => {
                    toast({
                      title: "Campaign filter applied",
                      description: `Showing ${value} campaigns`,
                    });
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reviewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="reviews" 
                      name="Summer Kitchen Sale" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      name="Fitness Promo" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow duration-300 bg-green-50">
                  <h3 className="font-medium text-center">Most Effective Campaign</h3>
                  <div className="text-center my-4">
                    <span className="text-xl font-semibold block">Summer Kitchen Sale</span>
                    <div className="flex justify-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 fill-orange-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">156 reviews · 4.8 average rating</p>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-100"
                      onClick={() => {
                        toast({
                          title: "Campaign details",
                          description: "Viewing detailed analytics for Summer Kitchen Sale",
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow duration-300 bg-blue-50">
                  <h3 className="font-medium text-center">Highest Conversion Rate</h3>
                  <div className="text-center my-4">
                    <span className="text-xl font-semibold block">Electronics Flash Deal</span>
                    <span className="text-blue-600 font-medium block mt-1">5.8% Conversion</span>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">212 reviews · 3,658 QR code scans</p>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-100"
                      onClick={() => {
                        toast({
                          title: "Campaign details",
                          description: "Viewing detailed analytics for Electronics Flash Deal",
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow duration-300 bg-orange-50">
                  <h3 className="font-medium text-center">Upcoming Campaign</h3>
                  <div className="text-center my-4">
                    <span className="text-xl font-semibold block">Holiday Gift Guide</span>
                    <span className="text-orange-600 font-medium block mt-1">Starts Nov 15, 2023</span>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">QR codes generated · Materials ready</p>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-200 hover:bg-orange-100"
                      onClick={() => {
                        toast({
                          title: "Campaign details",
                          description: "Viewing preparation details for Holiday Gift Guide",
                        });
                      }}
                    >
                      Edit Campaign
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
