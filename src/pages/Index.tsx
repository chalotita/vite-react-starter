import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact, Deal } from '@/types';
import { api } from '@/services/api';
import { ContactsTable } from '@/components/ContactsTable';
import { ContactDetail } from '@/components/ContactDetail';
import { EditContactDialog } from '@/components/EditContactDialog';
import { EditDealDialog } from '@/components/EditDealDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { Briefcase } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Selection state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Dialog state
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [deletingDeal, setDeletingDeal] = useState<Deal | null>(null);

  // Fetch contacts
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: api.getContacts,
  });

  // Fetch deals for selected contact
  const { data: contactDeals = [], isLoading: dealsLoading } = useQuery({
    queryKey: ['contactDeals', selectedContact?.id],
    queryFn: () => api.getContactDeals(selectedContact!.id),
    enabled: !!selectedContact,
  });

  // Mutations
  const updateContactMutation = useMutation({
    mutationFn: ({ id, properties }: { id: string; properties: Contact['properties'] }) =>
      api.updateContact(id, properties),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setEditingContact(null);
      toast({ title: 'Contact updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update contact', variant: 'destructive' });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => api.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (selectedContact?.id === deletingContact?.id) {
        setSelectedContact(null);
      }
      setDeletingContact(null);
      toast({ title: 'Contact deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete contact', variant: 'destructive' });
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: ({ id, properties }: { id: string; properties: Deal['properties'] }) =>
      api.updateDeal(id, properties),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactDeals', selectedContact?.id] });
      setEditingDeal(null);
      if (selectedDeal?.id === editingDeal?.id) {
        setSelectedDeal(null);
      }
      toast({ title: 'Deal updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update deal', variant: 'destructive' });
    },
  });

  const deleteDealMutation = useMutation({
    mutationFn: (id: string) => api.deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactDeals', selectedContact?.id] });
      if (selectedDeal?.id === deletingDeal?.id) {
        setSelectedDeal(null);
      }
      setDeletingDeal(null);
      toast({ title: 'Deal deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete deal', variant: 'destructive' });
    },
  });

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setSelectedDeal(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-r from-primary/10 via-accent to-secondary">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="rounded-lg bg-primary p-2">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">CRM Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Contacts Table */}
          <div>
            {contactsLoading ? (
              <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
                <p className="text-muted-foreground">Loading contacts...</p>
              </div>
            ) : (
              <ContactsTable
                contacts={contacts}
                selectedContactId={selectedContact?.id || null}
                onSelectContact={handleSelectContact}
                onEditContact={setEditingContact}
                onDeleteContact={setDeletingContact}
              />
            )}
          </div>

          {/* Contact Detail Panel */}
          <div>
            {selectedContact ? (
              <ContactDetail
                contact={selectedContact}
                deals={contactDeals}
                dealsLoading={dealsLoading}
                selectedDeal={selectedDeal}
                onSelectDeal={setSelectedDeal}
                onEditDeal={setEditingDeal}
                onDeleteDeal={setDeletingDeal}
                onClose={() => {
                  setSelectedContact(null);
                  setSelectedDeal(null);
                }}
              />
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
                <p className="text-muted-foreground">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <EditContactDialog
        contact={editingContact}
        open={!!editingContact}
        onOpenChange={(open) => !open && setEditingContact(null)}
        onSave={(id, properties) => updateContactMutation.mutate({ id, properties })}
        isLoading={updateContactMutation.isPending}
      />

      <EditDealDialog
        deal={editingDeal}
        open={!!editingDeal}
        onOpenChange={(open) => !open && setEditingDeal(null)}
        onSave={(id, properties) => updateDealMutation.mutate({ id, properties })}
        isLoading={updateDealMutation.isPending}
      />

      <DeleteConfirmDialog
        open={!!deletingContact}
        onOpenChange={(open) => !open && setDeletingContact(null)}
        onConfirm={() => deletingContact && deleteContactMutation.mutate(deletingContact.id)}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
        isLoading={deleteContactMutation.isPending}
      />

      <DeleteConfirmDialog
        open={!!deletingDeal}
        onOpenChange={(open) => !open && setDeletingDeal(null)}
        onConfirm={() => deletingDeal && deleteDealMutation.mutate(deletingDeal.id)}
        title="Delete Deal"
        description="Are you sure you want to delete this deal? This action cannot be undone."
        isLoading={deleteDealMutation.isPending}
      />
    </div>
  );
};

export default Index;
