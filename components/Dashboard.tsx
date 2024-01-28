import { Box, Container, Stack } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../components/common/Transaction';
import { db } from '../services/db';
import { Transaction as TransactionModal } from '../services/db/models/transaction';
import {
  newTransaction,
  transactionsOfMonth,
} from '../services/db/transaction';
import moment from 'moment';
import TransactionsList from './common/TransactionsList';
import SearchFilter from './common/SearchFilter';

const Dashboard = () => {
  const saveTransaction = () => {
    // db.transactions.add({
    //   id: uuidv4(),
    //   account: uuidv4(),
    //   amount: 100,
    //   categories: [uuidv4(), uuidv4()],
    //   description: 'description',
    //   label: 'label',
    //   owner: uuidv4(),
    //   timestamp: Date.now(),
    //   type: 'income',
    // });
    // db.accounts.add({
    //   balance: 100,
    //   id: uuidv4(),
    //   label: 'Bacc 1',
    // });
    // db.accounts.add({
    //   balance: 100,
    //   id: uuidv4(),
    //   label: 'Bacc 2',
    // });
    // db.categories.add({
    //   id: uuidv4(),
    //   label: 'Cat 1',
    // });
    // db.categories.add({
    //   id: uuidv4(),
    //   label: 'Cat 2',
    // });
    // db.persons.add({
    //   id: uuidv4(),
    //   firstName: 'First01',
    //   lastName: 'Last01',
    //   accounts: ['2f35f7ec-1859-4d8a-8f0c-c105430adad8'],
    //   username: 'uname01',
    // });
    // db.persons.add({
    //   id: uuidv4(),
    //   firstName: 'First02',
    //   lastName: 'Last02',
    //   accounts: ['80c807f1-205b-4fa9-aa16-91caea19da29'],
    //   username: 'uname02',
    // });
  };
  const [transactions, setTransactions] = useState<TransactionModal[]>([]);

  // useEffect(() => {
  //   transactionsOfMonth()
  //     .then((res) => console.log('RES', res))
  //     .catch((err) => console.log(err));
  //   // newTransaction({
  //   //   account: '80c807f1-205b-4fa9-aa16-91caea19da29',
  //   //   amount: 1000,
  //   //   categories: ['8cb2179a-985e-4b23-93f2-de243aa5a7dd'],
  //   //   id: uuidv4(),
  //   //   owner: 'b5931fc4-a190-4bde-b8ea-77935c1f9126',
  //   //   timestamp: moment().startOf('day').valueOf(),
  //   //   type: 'income',
  //   //   description:
  //   //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus tempora aut mollitia, accusamus accusantium cupiditate aliquam voluptatum debitis facere officiis quidem ipsum quos unde magnam sed doloribus fugit. Eos earum assumenda sunt maiores esse ullam quam quia iste quas modi.',
  //   //   label: 'Credited without source !!',
  //   // });
  // }, []);

  useEffect(() => {
    setTransactions(
      [
        {
          timestamp: 1655861600000,
          label: 'Groceries',
          amount: 100,
          type: 'Debit',
          description: 'Milk, eggs, bread',
          account: 'Checking',
          source: 'Bank',
          categories: [
            { id: '87326qwe87324', title: 'Food' },
            { id: '8732623432487324', title: 'Transportation' },
          ],
          owner: 'Jane Doe',
          id: '1234567890',
        },
        {
          timestamp: 1655868200000,
          label: 'Gas',
          amount: 50,
          type: 'Credit',
          description: 'Filled up the car',
          account: 'Savings',
          source: 'Credit Card',
          categories: [{ id: '873264237324', title: 'Transportation' }],
          owner: 'John Smith',
          id: '9876543210',
        },
        {
          timestamp: 1655774800000,
          label: 'Entertainment',
          amount: 20,
          type: 'Debit',
          description: 'Movie tickets',
          account: 'Checking',
          source: 'Cash',
          categories: [{ id: '8732632432324', title: 'Entertainment' }],
          owner: 'Jane Doe',
          id: '1234567891',
        },
        {
          timestamp: 1655781400000,
          label: 'Bills',
          amount: 150,
          type: 'Credit',
          description: 'Electricity bill',
          account: 'Checking',
          source: 'Bank',
          categories: [{ id: '87324487324', title: 'Bills' }],
          owner: 'John Smith',
          id: '9876543211',
        },
        {
          timestamp: 1655788000000,
          label: 'Travel',
          amount: 300,
          type: 'Debit',
          description: 'Airfare',
          account: 'Savings',
          source: 'Credit Card',
          categories: [{ id: '8733434347324', title: 'Travel' }],
          owner: 'Jane Doe',
          id: '1234567892',
        },
      ].sort((item) => item.timestamp)
    );
  }, []);

  // return <button onClick={saveTransaction}>save</button>;

  return (
    <Container>
      <SearchFilter />
      <TransactionsList list={transactions} showPagination />
    </Container>
  );
};

export default Dashboard;
