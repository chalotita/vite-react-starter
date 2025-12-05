import { Contact } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2, Users } from 'lucide-react';

interface ContactsTableProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contact: Contact) => void;
  //onEditContact: (contact: Contact) => void;
  //onDeleteContact: (contact: Contact) => void;
}

export function ContactsTable({
  contacts,
  selectedContactId,
  onSelectContact,
  //onEditContact,
  //onDeleteContact,
}: ContactsTableProps) {

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-card-foreground">Contacts</h2>
        <span className="ml-auto text-sm text-muted-foreground">{contacts.length} contacts</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            {/* <TableHead className="w-[100px]">Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className={`cursor-pointer transition-colors ${
                  selectedContactId === contact.id
                    ? 'bg-accent'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onSelectContact(contact)}
              >
                <TableCell className="font-medium">
                  {contact.properties.firstname} {contact.properties.lastname}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {contact.properties.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {contact.properties.phone}
                </TableCell>
                {/* <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditContact(contact);
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
                        onDeleteContact(contact);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
