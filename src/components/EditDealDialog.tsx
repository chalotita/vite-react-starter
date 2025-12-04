import { useState, useEffect } from 'react';
import { Deal, DealStage, DEAL_STAGE_LABELS } from '@/types';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditDealDialogProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, properties: Deal['properties']) => void;
  isLoading: boolean;
}

const DEAL_STAGES: DealStage[] = [
  'appointmentscheduled',
  'qualifiedtobuy',
  'closedwon',
  'closedlost',
];

export function EditDealDialog({
  deal,
  open,
  onOpenChange,
  onSave,
  isLoading,
}: EditDealDialogProps) {
  const [formData, setFormData] = useState({
    dealname: '',
    amount: '',
    dealstage: 'appointmentscheduled' as DealStage,
  });

  useEffect(() => {
    if (deal) {
      setFormData(deal.properties);
    }
  }, [deal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deal) {
      onSave(deal.id, formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dealname">Deal Name</Label>
            <Input
              id="dealname"
              value={formData.dealname}
              onChange={(e) => setFormData({ ...formData, dealname: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dealstage">Stage</Label>
            <Select
              value={formData.dealstage}
              onValueChange={(value: DealStage) =>
                setFormData({ ...formData, dealstage: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                {DEAL_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {DEAL_STAGE_LABELS[stage]}
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
