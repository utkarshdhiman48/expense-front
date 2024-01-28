import { Box, Stack } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../components/common/Transaction';
import { db } from '../services/db';
import { Transaction as TransactionModal } from '../services/db/models/transaction';
import Dashboard from '../components/Dashboard';
import ManageCategories from '../components/ManageCategories';
import ManagePeople from '../components/ManagePeople';

const Home: NextPage = () => {
  return (
    <>
      {/* <Dashboard /> */}
      <ManageCategories />
      {/* <ManagePeople /> */}
    </>
  );
};

export default Home;
