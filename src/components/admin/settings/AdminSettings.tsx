
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your platform settings have been updated",
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platform Settings</h2>
        <Button 
          onClick={handleSaveSettings}
          className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="amazon">Amazon Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the overall platform behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Let new vendors sign up to the platform
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Enable Free Trial</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow vendors to try the platform before purchasing
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Dark Mode Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode toggle for all users
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the entire platform in maintenance mode
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="pt-4 border-t">
                <Label className="font-medium mb-2 block">Default Language</Label>
                <select className="input-field w-full max-w-xs">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how notifications are sent to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">New Vendor Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when new vendors sign up
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Payment Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for subscription payments
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Send weekly platform usage reports
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system issues
                  </p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Password Complexity</Label>
                  <p className="text-sm text-muted-foreground">
                    Require strong passwords for all users
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log users out after inactivity
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="pt-4 border-t">
                <Label className="font-medium mb-2 block">Session Timeout Duration</Label>
                <select className="input-field w-full max-w-xs">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60" selected>1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="amazon" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amazon Integration</CardTitle>
              <CardDescription>
                Configure how the platform integrates with Amazon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Amazon API Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable direct connection to Amazon's API
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Automatic Order Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Verify Amazon order IDs automatically
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Review Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor customer reviews posted on Amazon
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="pt-4 border-t">
                <Label className="font-medium mb-2 block">API Credentials</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Amazon API Key</Label>
                    <input type="password" className="input-field w-full" value="••••••••••••••••" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>API Secret</Label>
                    <input type="password" className="input-field w-full" value="••••••••••••••••" readOnly />
                  </div>
                  <Button variant="outline">Update API Credentials</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
