import { Box, Pagination, PaginationProps, Stack } from '@mui/material';
import Transaction, { IPropsTransactions } from './Transaction';
import moment from 'moment';
import ResponsiveDate from './ResponsiveDate';

interface IPropsTransactionsList {
  list: IPropsTransactions[];
  showPagination?: boolean;
  handlePaginationChange?: PaginationProps['onChange'];
}

const TransactionsList = ({
  list,
  showPagination,
  handlePaginationChange,
}: IPropsTransactionsList) => {
  let lastDate: string | number | undefined;

  return (
    <Box>
      <Stack spacing={2}>
        {list.map((transaction) => {
          const showDate = !moment(transaction?.timestamp)
            .startOf('day')
            .isSame(moment(lastDate).startOf('day'));

          lastDate = transaction?.timestamp;

          return (
            <>
              {showDate && transaction.timestamp && (
                <ResponsiveDate date={transaction.timestamp} />
              )}
              <Transaction key={transaction.id} {...transaction} />
            </>
          );
        })}
      </Stack>
      <Box
        p="2rem"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {showPagination && (
          <Pagination onChange={handlePaginationChange} count={10} />
        )}
      </Box>
    </Box>
  );
};

export default TransactionsList;
