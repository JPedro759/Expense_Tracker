export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  createdOn: Date;
}
