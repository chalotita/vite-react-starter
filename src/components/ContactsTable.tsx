import { Contact } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { PaginationControls } from '@/components/PaginationControls';

interface ContactsTableProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contact: Contact) => void;
}

export function ContactsTable({
  contacts,
  selectedContactId,
  onSelectContact,
}: ContactsTableProps) {
  const pagination = usePagination(contacts, { defaultPageSize: 25 });

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            pagination.paginatedData.map((contact) => (
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        pageSize={pagination.pageSize}
        hasNextPage={pagination.hasNextPage}
        hasPrevPage={pagination.hasPrevPage}
        onPageChange={pagination.goToPage}
        onPageSizeChange={pagination.setPageSize}
      />
    </div>
  );
}
