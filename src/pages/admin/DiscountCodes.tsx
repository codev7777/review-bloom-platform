import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import {
  createDiscountCode,
  getDiscountCodes,
  updateDiscountCode,
  deleteDiscountCode,
  DiscountCode,
} from '@/services/discountCode.service';

export default function DiscountCodes() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount: 0,
    validFrom: '',
    validUntil: '',
    isActive: true,
  });

  useEffect(() => {
    loadDiscountCodes();
  }, []);

  const loadDiscountCodes = async () => {
    try {
      const data = await getDiscountCodes();
      setDiscountCodes(data);
    } catch (error) {
      console.error('Failed to load discount codes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCode) {
        await updateDiscountCode(editingCode.id, formData);
      } else {
        await createDiscountCode(formData);
      }
      setIsDialogOpen(false);
      setEditingCode(null);
      setFormData({
        code: '',
        description: '',
        discount: 0,
        validFrom: '',
        validUntil: '',
        isActive: true,
      });
      loadDiscountCodes();
    } catch (error) {
      console.error('Failed to save discount code:', error);
    }
  };

  const handleEdit = (code: DiscountCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      description: code.description || '',
      discount: code.discount,
      validFrom: code.validFrom,
      validUntil: code.validUntil || '',
      isActive: code.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this discount code?')) {
      try {
        await deleteDiscountCode(id);
        loadDiscountCodes();
      } catch (error) {
        console.error('Failed to delete discount code:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discount Codes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Discount Code</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCode ? 'Edit Discount Code' : 'Add Discount Code'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="validFrom">Valid From</Label>
                <Input
                  id="validFrom"
                  type="datetime-local"
                  value={formData.validFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, validFrom: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="validUntil">Valid Until (Optional)</Label>
                <Input
                  id="validUntil"
                  type="datetime-local"
                  value={formData.validUntil}
                  onChange={(e) =>
                    setFormData({ ...formData, validUntil: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="isActive">Status</Label>
                <Select
                  value={formData.isActive ? 'active' : 'inactive'}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value === 'active' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCode ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Valid From</TableHead>
            <TableHead>Valid Until</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discountCodes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.code}</TableCell>
              <TableCell>{code.description}</TableCell>
              <TableCell>{code.discount}%</TableCell>
              <TableCell>
                {format(new Date(code.validFrom), 'MMM d, yyyy HH:mm')}
              </TableCell>
              <TableCell>
                {code.validUntil
                  ? format(new Date(code.validUntil), 'MMM d, yyyy HH:mm')
                  : 'No expiry'}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    code.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {code.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(code)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(code.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 