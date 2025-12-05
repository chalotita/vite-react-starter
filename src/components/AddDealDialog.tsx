import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Contact as ContactIcon} from 'lucide-react';
// Import the necessary Select components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

//Import or define DealStage type
import { Contact, Deal, DealStage } from '@/types';

interface FormState {
  amount: '',
  dealname: '',
  dealstage: DealStage, // Use a valid DealStage value
};

const initialFormState: FormState = {
  amount: '',
  dealname: '',
  dealstage: 'appointmentscheduled', // Use a valid DealStage value
};

interface AddDealDialogProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, properties: Deal['properties']) => void;
  isLoading: boolean;
}


export function AddDealDialog({
  contact,
  open,
  onOpenChange,
  onSave,
  isLoading,
}: AddDealDialogProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  interface FormState {
  amount: string;
  dealname: string;
  dealstage: DealStage;
}




  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      onSave(contact.id, formData);
    }
  };

  const dealStageOptions = [
    { value: 'appointmentscheduled', label: 'Trial started' },
    { value: 'qualifiedtobuy', label: 'Active trial user' },
    { value: 'closedwon', label: 'Converted to paid subscription' },
    { value: 'closedlost', label: 'Trial ended without conversion' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Deal Name</Label>
              <Input
                id="dealname"
                value={formData.dealname}
                onChange={(e) => setFormData({ ...formData, dealname: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dealstage">Deal Stage</Label>
            <Select
              value={formData.dealstage}
              onValueChange={(value) => setFormData({ ...formData, dealstage: value as DealStage })}
              required
            >
              <SelectTrigger id="dealstage">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                {dealStageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
