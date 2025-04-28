import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getCompanyUsers, inviteUser, removeUser } from "@/lib/api/companies/companies.api";
import { User } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompanyUser extends User {
  createdAt?: string;
}

export const UserManagementPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const companyUsers = await getCompanyUsers(Number(user?.companyId));
      setUsers(companyUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user?.companyId) {
      fetchUsers();
    }
  }, [user?.companyId]);

  const handleInviteUser = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      await inviteUser(Number(user?.companyId), email);
      toast({
        title: "Success",
        description: "User invited successfully",
      });
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error inviting user:", error);
      toast({
        title: "Error",
        description: "Failed to invite user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = async (userId: string | number) => {
    try {
      await removeUser(Number(user?.companyId), Number(userId));
      toast({
        title: "Success",
        description: "User removed successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error removing user:", error);
      toast({
        title: "Error",
        description: "Failed to remove user",
        variant: "destructive",
      });
    }
  };

  const isFirstMember = users.length > 0 && 
    users.sort((a, b) => new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime())[0].id === user?.id;

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          type="email"
          placeholder="Enter email to invite"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleInviteUser} disabled={isLoading || !isFirstMember}>
          {isLoading ? "Inviting..." : "Invite User"}
        </Button>
      </div>

      <div className="space-y-4">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleRemoveUser(u.id)}
                    disabled={u.id === user?.id || !isFirstMember}
                    className={`px-3 py-1 rounded ${
                      u.id === user?.id || !isFirstMember
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Remove
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {u.id === user?.id 
                    ? "You cannot delete your own account"
                    : !isFirstMember
                    ? "Only the first member can manage users"
                    : "Remove user from company"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};
