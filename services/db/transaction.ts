import moment from 'moment';
import { db } from '.';
import { Transaction } from './models/transaction';

const TIMESTAMPS = {
  MONTH_START: moment().startOf('month').valueOf(),
  MONTH_END: moment().endOf('month').valueOf(),
};

export const transactionsOfMonth = () =>
  db.transactions
    .where('timestamp')
    .between(TIMESTAMPS.MONTH_START, TIMESTAMPS.MONTH_END)
    .toArray();

export const newTransaction = (transaction: Transaction) =>
  db.transactions.add(transaction);
