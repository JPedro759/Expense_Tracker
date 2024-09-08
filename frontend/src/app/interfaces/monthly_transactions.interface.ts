import { Transaction } from './transaction.interface';

export interface MonthlyTransactions {
  year: number;
  month: number;
  transactions: Transaction[];
}
