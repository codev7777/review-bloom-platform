
import { useState } from 'react';
import { 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon, 
  Calendar as CalendarIcon,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Mock time period data
const MOCK_TIME_DATA = [
  { name: 'Jan', reviews: 40, positive: 35, negative: 5 },
  { name: 'Feb', reviews: 30, positive: 24, negative: 6 },
  { name: 'Mar', reviews: 45, positive: 38, negative: 7 },
  { name: 'Apr', reviews: 60, positive: 52, negative: 8 },
  { name: 'May', reviews: 75, positive: 68, negative: 7 },
  { name: 'Jun', reviews: 90, positive: 80, negative: 10 },
  { name: 'Jul', reviews: 105, positive: 95, negative: 10 },
];

// Mock product data
const MOCK_PRODUCT_DATA = [
  { name: 'Kitchen Knife Set', reviews: 156, value: 32, color: '#FF9130' },
  { name: 'Yoga Mat', reviews: 98, value: 20, color: '#36A2EB' },
  { name: 'Bluetooth Headphones', reviews: 212, value: 43, color: '#4BC0C0' },
  { name: 'Smart Watch', reviews: 25, value: 5, color: '#9966FF' },
];

// Mock star ratings data
const MOCK_STAR_DATA = [
  { name: '5 Stars', value: 310, color: '#4BC0C0' },
  { name: '4 Stars', value: 140, color: '#36A2EB' },
  { name: '3 Stars', value: 30, color: '#FFCD56' },
  { name: '2 Stars', value: 10, color: '#FF9F40' },
  { name: '1 Star', value: 5, color: '#FF6384' },
];

// Mock review trends data
const MOCK_TREND_DATA = [
  { name: 'Week 1', reviews: 20, rating: 4.5 },
  { name: 'Week 2', reviews: 25, rating: 4.6 },
  { name: 'Week 3', reviews: 35, rating: 4.7 },
  { name: 'Week 4', reviews: 40, rating: 4.8 },
  { name: 'Week 5', reviews: 50, rating: 4.7 },
  { name: 'Week 6', reviews: 60, rating: 4.8 },
  { name: 'Week 7', reviews: 75, rating: 4.9 },
  { name: 'Week 8', reviews: 90, rating: 4.8 },
];

const AnalyticsPanel = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [productFilter, setProductFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your product reviews
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-lg border">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="time-period" className="block text-sm font-medium mb-1">Time Period</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger id="time-period">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="product" className="block text-sm font-medium mb-1">Product</label>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="1">Kitchen Knife Set</SelectItem>
                <SelectItem value="2">Yoga Mat</SelectItem>
                <SelectItem value="3">Bluetooth Headphones</SelectItem>
                <SelectItem value="4">Smart Watch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="campaign" className="block text-sm font-medium mb-1">Campaign</label>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger id="campaign">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="1">Summer Kitchen Sale</SelectItem>
                <SelectItem value="2">Fitness Promo</SelectItem>
                <SelectItem value="3">Electronics Flash Deal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-end">
          <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-1">486</div>
            <div className="text-sm text-green-600 flex items-center">
              <span className="flex items-center">
                ↑ 12.5% 
                <span className="text-muted-foreground ml-1">vs. previous period</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-1">4.7</div>
            <div className="text-sm text-green-600 flex items-center">
              <span className="flex items-center">
                ↑ 0.3 
                <span className="text-muted-foreground ml-1">vs. previous period</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-1">3.2%</div>
            <div className="text-sm text-red-600 flex items-center">
              <span className="flex items-center">
                ↓ 0.5% 
                <span className="text-muted-foreground ml-1">vs. previous period</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <BarChartIcon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-2">
            <PieChartIcon className="h-4 w-4" />
            By Product
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Trends</CardTitle>
                <CardDescription>Number of reviews over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MOCK_TIME_DATA}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="positive" stackId="a" name="Positive (4-5★)" fill="#4BC0C0" />
                      <Bar dataKey="negative" stackId="a" name="Critical (1-3★)" fill="#FF6384" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Review ratings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MOCK_STAR_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {MOCK_STAR_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews by Product</CardTitle>
              <CardDescription>Breakdown of reviews across your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_PRODUCT_DATA}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reviews" name="Total Reviews" fill="#FF9130" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviews Distribution</CardTitle>
                <CardDescription>Percentage breakdown by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MOCK_PRODUCT_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {MOCK_PRODUCT_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Top performing products by rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_PRODUCT_DATA.map((product, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{product.name}</div>
                        <div className="flex items-center">
                          <span className="text-orange-500 font-semibold mr-2">
                            {(4 + Math.random() * 0.9).toFixed(1)}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: `${80 + Math.random() * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews Over Time</CardTitle>
              <CardDescription>Trend analysis of reviews and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={MOCK_TREND_DATA}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="reviews"
                      name="Number of Reviews"
                      stroke="#FF9130"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rating"
                      name="Average Rating"
                      stroke="#4BC0C0"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conversion Timeline</CardTitle>
              <CardDescription>Percentage of customers leaving reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { name: 'Week 1', conversion: 2.5 },
                      { name: 'Week 2', conversion: 2.7 },
                      { name: 'Week 3', conversion: 3.1 },
                      { name: 'Week 4', conversion: 3.4 },
                      { name: 'Week 5', conversion: 3.2 },
                      { name: 'Week 6', conversion: 3.5 },
                      { name: 'Week 7', conversion: 3.8 },
                      { name: 'Week 8', conversion: 4.0 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Conversion Rate"]} />
                    <Line
                      type="monotone"
                      dataKey="conversion"
                      name="Conversion Rate"
                      stroke="#FF9130"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
