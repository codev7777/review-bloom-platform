import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { UserPlus, Trash2, Mail } from "lucide-react";
import { User } from "@/types";
import { getCompanyUsers, inviteUser } from "@/lib/api/companies/companies.api";
import { deleteUser } from "@/lib/api/users/users.api";
import { UpgradePlanModal } from "@/components/company/UpgradePlanModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UserManagementPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const auth = useAuth();
  const companyId = auth.user?.companyId
    ? Number(auth.user.companyId)
    : undefined;

  useEffect(() => {
    if (companyId) {
      fetchUsers();
    }
  }, [companyId]);

  const fetchUsers = async () => {
    try {
      const companyUsers = await getCompanyUsers(companyId!);
      setUsers(companyUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load company users",
      });
    }
  };

  const handleInviteUser = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an email address",
      });
      return;
    }

    setIsLoading(true);
    try {
      await inviteUser(companyId!, email);
      toast({
        title: "Success",
        description: "User invited successfully",
      });
      setEmail("");
      fetchUsers();
    } catch (error: any) {
      console.error("Error inviting user:", error);
      if (
        error.response?.status === 403 ||
        error.response?.data?.code === 403
      ) {
        setShowUpgradeModal(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.message || "Failed to invite user",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = async (userId: number) => {
    if (userId === Number(auth.user?.id)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You cannot remove yourself from the company",
      });
      return;
    }

    const user = users.find((u) => u.id === userId);
    if (user) {
      setUserToDelete(user);
      setShowDeleteModal(true);
    }
  };

  const confirmRemoveUser = async () => {
    if (!userToDelete || !companyId) return;

    setIsLoading(true);
    try {
      await deleteUser(userToDelete.id);
      toast({
        title: "Success",
        description: "User removed from company successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error removing user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to remove user from company",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <TabsContent value="users" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Management</h3>
        <p className="text-sm text-white">
          Invite and manage users for your company
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black"
            />
          </div>
          <Button
            onClick={handleInviteUser}
            disabled={isLoading}
            className="mt-6 bg-orange-500 hover:bg-orange-600"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>

        <div>
          <h4 className="font-medium">Company Users</h4>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{user.name || user.email}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveUser(user.id)}
                  disabled={isLoading}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-gray-400">No users found</p>
            )}
          </div>
        </div>
      </div>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              {userToDelete?.name || userToDelete?.email} from your company?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRemoveUser}
              disabled={isLoading}
            >
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default UserManagementPanel;
