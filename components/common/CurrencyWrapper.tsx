import { CurrencyRupeeRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface IPropsCurrencyWrapper {
  children: ReactNode;
}

const CurrencyWrapper = ({ children }: IPropsCurrencyWrapper) => {
  return (
    <Typography
      sx={{
        display: 'flex',
      }}
    >
      <CurrencyRupeeRounded fontSize="small" />
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          fontWeight: 500,
          fontSize: '1.2rem',
          lineHeight: 1,
        }}
        component="span"
      >
        {children}
      </Typography>
    </Typography>
  );
};

export default CurrencyWrapper;
