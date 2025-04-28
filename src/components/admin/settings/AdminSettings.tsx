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
import { toast } from "@/components/ui/use-toast";
import { Save, UserPlus, Trash2 } from "lucide-react";
import { updateUser, updateCurrentUserPassword } from "@/lib/api/users/users.api";
import { useAuth } from "@/hooks/use-auth";

const AdminSettings = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    email: auth.user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleNameChange = async () => {
    try {
      setIsLoading(true);
      await updateUser(auth.user?.id || "", { name: formData.name });
      toast({
        title: "Success",
        description: "Your name has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update name",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      await updateCurrentUserPassword(passwordData.newPassword);
      toast({
        title: "Success",
        description: "Your password has been updated",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteAdmin = async () => {
    if (!inviteEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement invite admin API call
      toast({
        title: "Success",
        description: "Admin invitation sent successfully",
      });
      setInviteEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send admin invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={formData.email} disabled />
          </div>
          <Button
            onClick={handleNameChange}
            disabled={isLoading}
            className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          <Button
            onClick={handlePasswordChange}
            disabled={isLoading}
            className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
          >
            <Save className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
          <CardDescription>Invite or remove admin accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteEmail">Invite New Admin</Label>
            <div className="flex gap-2">
              <Input
                id="inviteEmail"
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Button
                onClick={handleInviteAdmin}
                disabled={isLoading}
                className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Delete Admin Account</Label>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                // TODO: Implement delete admin confirmation dialog
                toast({
                  title: "Delete Admin",
                  description: "This feature will be implemented soon",
                });
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Admin Account
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default AdminSettings;
