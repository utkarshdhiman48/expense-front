import { ICategory } from '../../../components/common/Category';

export interface Transaction {
  timestamp: number;
  label?: string;
  amount: number;
  type: string;
  description?: string;
  account: string;
  source?: string;
  categories: ICategory[];
  owner: string;
  id: string;
}
