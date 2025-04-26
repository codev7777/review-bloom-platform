import React, { useState, useEffect } from "react";
import { User } from "@/types";
import {
  fetchCompanyUsers,
  inviteCompanyUser,
  removeCompanyUser,
} from "@/lib/services/company.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { UpgradePlanModal } from "./UpgradePlanModal";

interface CompanyUsersProps {
  companyId: number;
}

export const CompanyUsers: React.FC<CompanyUsersProps> = ({ companyId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [companyId]);

  const loadUsers = async () => {
    try {
      const companyUsers = await fetchCompanyUsers(Number(companyId));
      setUsers(companyUsers);
    } catch (error) {
      toast.error("Failed to load company users");
    }
  };

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      await inviteCompanyUser(Number(companyId), email);
      toast.success("Invitation sent successfully");
      setEmail("");
      loadUsers();
    } catch (error: any) {
      console.log("Error object:", error);
      console.log("Error response:", error.response);
      console.log("Error data:", error.response?.data);

      if (
        error.response?.status === 403 ||
        error.response?.data?.code === 403
      ) {
        console.log("Setting showUpgradeModal to true");
        setShowUpgradeModal(true);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to send invitation"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (userId: number) => {
    try {
      await removeCompanyUser(Number(companyId), userId);
      toast.success("User removed successfully");
      loadUsers();
    } catch (error) {
      toast.error("Failed to remove user");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter email to invite"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleInvite} disabled={isLoading}>
          Invite User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(user.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};
