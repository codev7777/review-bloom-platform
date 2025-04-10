import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Upload, Save, Eye } from "lucide-react";

const WhiteLabelSettings = () => {
  const [brandSettings, setBrandSettings] = useState({
    companyName: "ReviewBrothers",
    logoUrl: "https://placehold.co/200x80/FF9900/FFFFFF?text=ReviewBrothers",
    primaryColor: "#FF9900",
    secondaryColor: "#232F3E",
    emailFooter: "© 2025 ReviewBrothers. All rights reserved.",
    supportEmail: "support@ReviewBrothers.com",
    customCss: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrandSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would post to an API endpoint
    toast({
      title: "Settings saved",
      description: "Your white label settings have been updated",
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">White Label Settings</h2>
        <Button
          onClick={handleSaveSettings}
          className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>
                Customize how your brand appears to vendors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={brandSettings.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    name="supportEmail"
                    type="email"
                    value={brandSettings.supportEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border rounded-md p-4 flex flex-col items-center space-y-4">
                  <img
                    src={brandSettings.logoUrl}
                    alt="Company Logo"
                    className="h-16 object-contain"
                  />
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={() => {
                          toast({
                            title: "Upload functionality",
                            description:
                              "This would open a file picker in a real app",
                          });
                        }}
                      />
                    </Button>
                    <Input
                      placeholder="Or enter image URL"
                      name="logoUrl"
                      value={brandSettings.logoUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={brandSettings.primaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                      name="primaryColor"
                      value={brandSettings.primaryColor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      name="secondaryColor"
                      value={brandSettings.secondaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                      name="secondaryColor"
                      value={brandSettings.secondaryColor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Customization</CardTitle>
              <CardDescription>
                Customize the email templates sent to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emailFooter">Email Footer Text</Label>
                <Input
                  id="emailFooter"
                  name="emailFooter"
                  value={brandSettings.emailFooter}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Email Templates</Label>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Welcome Email</h4>
                      <p className="text-sm text-gray-500">
                        Sent when a vendor creates an account
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Edit template",
                          description:
                            "This would open the email template editor in a real app",
                        });
                      }}
                    >
                      Edit Template
                    </Button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Review Confirmation</h4>
                      <p className="text-sm text-gray-500">
                        Sent when a customer submits a review
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Edit template",
                          description:
                            "This would open the email template editor in a real app",
                        });
                      }}
                    >
                      Edit Template
                    </Button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Review Report</h4>
                      <p className="text-sm text-gray-500">
                        Weekly review summary sent to vendors
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Edit template",
                          description:
                            "This would open the email template editor in a real app",
                        });
                      }}
                    >
                      Edit Template
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Dashboard Customization</CardTitle>
              <CardDescription>
                Control how vendor dashboards appear to your clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <textarea
                  id="customCss"
                  name="customCss"
                  rows={8}
                  className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder=".vendor-dashboard { /* your styles here */ }"
                  value={brandSettings.customCss}
                  onChange={handleInputChange}
                ></textarea>
                <p className="text-xs text-gray-500">
                  Add custom CSS to further customize the vendor dashboard
                  appearance.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Label>Dashboard Preview</Label>
                  <p className="text-sm text-gray-500">
                    See how your customizations will appear to vendors
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => {
                    toast({
                      title: "Preview functionality",
                      description:
                        "This would open a dashboard preview in a real app",
                    });
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Dashboard
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked
                      onChange={() => {}}
                    />
                    Show platform branding
                  </Label>
                  <p className="text-xs text-gray-500 ml-5">
                    Display "Powered by ReviewBrothers" in the footer
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked
                      onChange={() => {}}
                    />
                    Use vendor's logo
                  </Label>
                  <p className="text-xs text-gray-500 ml-5">
                    Display the vendor's logo in their dashboard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhiteLabelSettings;
