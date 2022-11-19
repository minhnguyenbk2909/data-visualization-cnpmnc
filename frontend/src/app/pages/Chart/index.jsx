import { Box, Typography } from '@material-ui/core';
import { Chart } from './Chart';

export const ChartPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Typography>TODO: RANGE PICKER</Typography>
      <Chart />
    </Box>
  );
};
