
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { User, Bell, CreditCard, Mail, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const SettingsPanel = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving your settings",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Mail className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account details and profile information
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name || "Vendor User"} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || "vendor@example.com"} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Company Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your company details and business information
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Example Store" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://www.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amazon-store">Amazon Store URL</Label>
                  <Input id="amazon-store" type="url" placeholder="https://www.amazon.com/stores/page/..." />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSave}
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
                'Save Changes'
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Choose how and when you'd like to be notified
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">New Reviews</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a customer leaves a new review
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="new-reviews-email" className="text-sm">Email</Label>
                    <Switch id="new-reviews-email" defaultChecked />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="new-reviews-app" className="text-sm">In-App</Label>
                    <Switch id="new-reviews-app" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Campaign Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about campaign status changes and performance
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="campaign-email" className="text-sm">Email</Label>
                    <Switch id="campaign-email" defaultChecked />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="campaign-app" className="text-sm">In-App</Label>
                    <Switch id="campaign-app" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Marketing & Tips</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive tips, product updates, and marketing materials
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="marketing-email" className="text-sm">Email</Label>
                    <Switch id="marketing-email" defaultChecked />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="marketing-app" className="text-sm">In-App</Label>
                    <Switch id="marketing-app" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              <Label htmlFor="digest-frequency">Email Digest Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="digest-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="none">Don't send</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Subscription & Billing</h3>
            <p className="text-sm text-muted-foreground">
              Manage your subscription, payment methods, and billing information
            </p>
          </div>
          
          <div className="rounded-md border p-6 space-y-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">Current Plan</h4>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-semibold text-orange-500">Pro Plan</span>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>
              <Button variant="outline" className="text-orange-500 border-orange-200 hover:bg-orange-50">
                Upgrade Plan
              </Button>
            </div>
            
            <div className="space-y-1 text-sm">
              <p>Renewal date: <span className="font-medium">October 15, 2023</span></p>
              <p>Billing cycle: <span className="font-medium">Monthly</span></p>
            </div>
            
            <div className="pt-4 border-t space-y-4 mt-4">
              <h4 className="font-medium">Plan Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 25 active campaigns</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom email templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-md border p-6 space-y-4">
            <h4 className="font-medium">Payment Method</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-8 bg-slate-800 rounded mr-3 flex items-center justify-center text-white text-xs">VISA</div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Billing History</h4>
              <Button variant="outline" size="sm">
                Download All
              </Button>
            </div>
            
            <div className="border rounded-md divide-y">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Pro Plan - Monthly</p>
                  <p className="text-sm text-muted-foreground">Sep 15, 2023</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-4">$49.99</span>
                  <Button variant="ghost" size="sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Pro Plan - Monthly</p>
                  <p className="text-sm text-muted-foreground">Aug 15, 2023</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-4">$49.99</span>
                  <Button variant="ghost" size="sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="branding" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Email & Branding</h3>
            <p className="text-sm text-muted-foreground">
              Customize the look and feel of your customer communications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input id="brand-name" defaultValue="Example Store" />
                <p className="text-xs text-muted-foreground">
                  This will appear as the sender name in emails
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand-logo">Brand Logo</Label>
                <div className="mt-2 flex items-center">
                  <div className="h-12 w-12 rounded bg-slate-200 flex items-center justify-center mr-4">
                    <span className="text-slate-500 text-xs">Logo</span>
                  </div>
                  <Button variant="outline" size="sm" className="mr-2">
                    Upload
                  </Button>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 200x200px, PNG or JPG
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand-colors">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="brand-colors" 
                    type="color" 
                    className="w-12 h-10 p-1 rounded cursor-pointer"
                    defaultValue="#FF9130"
                  />
                  <Input 
                    type="text" 
                    defaultValue="#FF9130" 
                    className="w-32"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signature">Email Signature</Label>
                <Textarea 
                  id="email-signature" 
                  placeholder="Enter your email signature"
                  rows={4}
                  defaultValue="Best regards,\nThe Example Store Team\nwww.example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-thank-you">Review Thank You Message</Label>
                <Textarea 
                  id="review-thank-you" 
                  placeholder="Enter your thank you message"
                  rows={4}
                  defaultValue="Thank you for taking the time to review our product! Your feedback helps us improve our offerings and helps other customers make informed decisions."
                />
                <p className="text-xs text-muted-foreground">
                  This message will be shown to customers after they submit a review
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account security and access settings
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Change Password</h4>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter your current password" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter your new password" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm your new password" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Update Password
                </Button>
              </div>
            </div>
            
            <div className="pt-6 border-t space-y-4">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Enhance your account security with 2FA</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add an extra layer of security to your account by requiring a verification code along with your password.
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
            
            <div className="pt-6 border-t space-y-4">
              <h4 className="font-medium">Account Access</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Active Sessions</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You're currently logged in on 1 device
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Sessions
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t space-y-4">
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive">
                Delete Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
