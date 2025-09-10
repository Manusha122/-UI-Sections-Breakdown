export interface Borrower {
  id: string;
  name: string;
  loan_type?: string;
  amount: number;
  status: string;
  email?: string;
  phone?: string;
  loan_amount?: number;
  employment?: string;
  existing_loan?: number;
  credit_score?: number;
  source_of_funds?: string;
  risk_signal?: string;
  ai_flags?: string[];
  income?: number;
}

export interface Pipeline {
  new: Borrower[];
  inProgress: Borrower[];
  approved: Borrower[];
}

export interface BrokerInfo {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
  email: string;
  phone: string;
  role: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface Store {
  pipeline: Pipeline & { all: Borrower[] };
  active: Borrower | null;
  setActive: (borrower: Borrower) => void;
  workflow: string[];
  broker: BrokerInfo | undefined;
  
  // Action handlers
  escalateToCommittee: () => void;
  requestDocuments: () => void;
  sendToValuer: () => void;
  approveLoan: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}
