import { Contact, Deal, DEAL_STAGE_LABELS } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, MapPin, User, Pencil, Trash2, DollarSign, X } from 'lucide-react';

interface ContactDetailProps {
  contact: Contact;
  deals: Deal[];
  dealsLoading: boolean;
  selectedDeal: Deal | null;
  onSelectDeal: (deal: Deal | null) => void;
  setAddingDeal: (contact: Contact | null) => void;
  //onEditDeal: (deal: Deal) => void;
  //onDeleteDeal: (deal: Deal) => void;
  onClose: () => void;
}

function getDealStageBadgeVariant(stage: string) {
  switch (stage) {
    case 'closedwon':
      return 'default';
    case 'closedlost':
      return 'destructive';
    case 'qualifiedtobuy':
      return 'secondary';
    default:
      return 'outline';
  }
}

export function ContactDetail({
  contact,
  deals,
  dealsLoading,
  selectedDeal,
  onSelectDeal,
  //onEditDeal,
  //onDeleteDeal,
  onClose,
  setAddingDeal,
}: ContactDetailProps) {
  return (
    <div className="space-y-4">
      
      <Card>
        
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            {contact.properties.firstname} {contact.properties.lastname}
          </CardTitle>
          
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{contact.properties.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{contact.properties.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{contact.properties.address}</span>
          </div>
          <button
                  className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/80 transition"
                  onClick={() => setAddingDeal(contact)}
                >
                  <span>Add Deal</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dealsLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading deals...</div>
          ) : deals.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No deals found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Stage</TableHead>
                  {/* <TableHead className="w-[100px]">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow
                    key={deal.id}
                    className={`cursor-pointer transition-colors ${
                      selectedDeal?.id === deal.id ? 'bg-accent' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => onSelectDeal(deal)}
                  >
                    <TableCell className="font-medium">{deal.properties.dealname}</TableCell>
                    <TableCell>${deal.properties.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getDealStageBadgeVariant(deal.properties.dealstage)}>
                        {DEAL_STAGE_LABELS[deal.properties.dealstage] || deal.properties.dealstage}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditDeal(deal);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDeal(deal);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedDeal && (
        <Card className="border-primary/20 bg-accent/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Deal Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => onSelectDeal(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p className="font-medium">{selectedDeal.properties.dealname}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Amount:</span>
              <p className="font-medium">${selectedDeal.properties.amount}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Stage:</span>
              <Badge
                className="ml-2"
                variant={getDealStageBadgeVariant(selectedDeal.properties.dealstage)}
              >
                {DEAL_STAGE_LABELS[selectedDeal.properties.dealstage] || selectedDeal.properties.dealstage}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
