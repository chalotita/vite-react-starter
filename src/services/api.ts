import { Contact, Deal, CreateDealPayload } from '@/types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || '';

export const api = {
  // Contacts
  async getContacts(): Promise<Contact[]> {
    const response = await fetch(`${SERVER_URL}/api/contacts`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    const data = await response.json();
    const contacts = data.results || data;
    return contacts.slice(0, 50);
  },

  async getContact(id: string): Promise<Contact> {
    const response = await fetch(`${SERVER_URL}/api/contacts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch contact');
    return response.json();
  },

  async updateContact(id: string, properties: Contact['properties']): Promise<Contact> {
    const response = await fetch(`${SERVER_URL}/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return response.json();
  },

  async deleteContact(id: string): Promise<void> {
    const response = await fetch(`${SERVER_URL}/api/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
  },

  // Deals
  async getDeals(): Promise<Deal[]> {
    const response = await fetch(`${SERVER_URL}/api/deals`);
    if (!response.ok) throw new Error('Failed to fetch deals');
    return response.json();
  },

  async getContactDeals(contactId: string): Promise<Deal[]> {
    const response = await fetch(`${SERVER_URL}/api/contacts/${contactId}/deals`);
    if (!response.ok) throw new Error('Failed to fetch contact deals');
    const data = await response.json();
    return data.results || data;
  },

  async createDeal(payload: CreateDealPayload): Promise<Deal> {
    const response = await fetch(`${SERVER_URL}/api/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create deal');
    return response.json();
  },

  async updateDeal(id: string, properties: Deal['properties']): Promise<Deal> {
    const response = await fetch(`${SERVER_URL}/api/deals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });
    if (!response.ok) throw new Error('Failed to update deal');
    return response.json();
  },

  async deleteDeal(id: string): Promise<void> {
    const response = await fetch(`${SERVER_URL}/api/deals/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete deal');
  },
};
