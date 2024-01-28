import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import {
  ArrowForward,
  ArrowRightAltRounded,
  EastRounded,
  KeyboardArrowRightRounded,
  RedoRounded,
} from '@mui/icons-material';
import CurrencyWrapper from './CurrencyWrapper';
import { Category, ICategory } from './Category';

export interface IPropsTransactions {
  label?: string;
  amount: number;
  type: string;
  description?: string;
  account: string;
  source?: string;
  categories: ICategory[];
  id: string | number;
  timestamp?: string | number;
}

const Transaction = ({
  label,
  amount,
  description,
  source,
  account,
  type,
  categories,
}: IPropsTransactions) => {
  return (
    <Paper
      sx={{
        p: '1rem',
        borderRadius: '0.5rem',
      }}
    >
      <Grid container spacing={1}>
        <Grid
          container
          item
          xs={12}
          flexWrap={'nowrap'}
          alignItems={'center'}
          spacing={1}
        >
          <Grid
            item
            xs
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 500,
              fontSize: '1.2rem',
            }}
          >
            {label}
          </Grid>
          <Grid
            item
            xs={'auto'}
            sx={{
              maxWidth: '90%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {<CurrencyWrapper>{amount}</CurrencyWrapper>}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.8rem',
            color: '#333a',
          }}
        >
          {description}
        </Grid>
        <Grid item xs={12}>
          {source ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                color: '#555',
              }}
            >
              {source}
              <EastRounded />
              {account}
            </Box>
          ) : (
            <Box>
              {account} {type}
            </Box>
          )}
        </Grid>
        {/* People */}
        {/* <Stack direction="row" p="0.5rem 0.25rem">
          {categories.map((category) => (
            <Chip size="small" key={category} label={category} />
          ))}
        </Stack> */}
        <Stack
          direction="row"
          p="0.5rem 0.25rem"
          spacing={'0.5rem'}
          width={'100%'}
          justifyContent={'flex-end'}
        >
          {categories.map((category) => (
            <Category key={category.id} data={category} />
          ))}
        </Stack>
      </Grid>
    </Paper>
  );
};

export default Transaction;
