export interface Contact {
  id: string;
  properties: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface Deal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: DealStage;
  };
}

export type DealStage = 
  | 'appointmentscheduled' 
  | 'qualifiedtobuy' 
  | 'closedwon' 
  | 'closedlost';

export const DEAL_STAGE_LABELS: Record<DealStage, string> = {
  appointmentscheduled: 'Trial Started',
  qualifiedtobuy: 'Active Trial User',
  closedwon: 'Converted to Paid',
  closedlost: 'Trial Ended',
};

export interface CreateDealPayload {
  dealProperties: {
    dealname: string;
    amount: string;
    dealstage: DealStage;
  };
  contactId: string;
}
