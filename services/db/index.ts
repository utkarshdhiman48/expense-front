import Dexie, { Table } from 'dexie';
import { Account } from './models/account';
import { Category } from './models/category';
import { Distribution } from './models/distribution';
import { Person } from './models/person';
import { Transaction } from './models/transaction';

export class SubDexie extends Dexie {
  transactions!: Table<Transaction>;
  persons!: Table<Person>;
  categories!: Table<Category>;
  accounts!: Table<Account>;
  distributions!: Table<Distribution>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      transactions: '++id, account, owner, timestamp', // Primary key and indexed props,
      persons: '++id, firstName, lastName, username',
      categories: '++id',
      accounts: '++id',
      distributions: '++id',
    });
  }
}

export const db = new SubDexie();
