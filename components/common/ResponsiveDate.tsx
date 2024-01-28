import { Box, Typography } from '@mui/material';
import moment, { Moment, isMoment } from 'moment';

interface IPropsResponsiveDate {
  date: Date | Moment | number | string;
}

const ResponsiveDate = ({ date }: IPropsResponsiveDate) => {
  const momentDate = isMoment(date) ? date : moment(date);

  if (!momentDate.isValid()) return null;

  return (
    <Box sx={{ py: '0.5rem', color: '#333' }}>
      <Typography sx={{ fontWeight: 500 }}>
        {momentDate.format('DD MMM, YYYY')}
      </Typography>
    </Box>
  );
};

export default ResponsiveDate;
