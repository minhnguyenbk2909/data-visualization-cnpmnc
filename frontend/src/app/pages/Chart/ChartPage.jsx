import { Box, Typography } from '@material-ui/core';
import { Chart } from './Chart';

export const ChartPage = ({ type, startDate, endDate, country }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Box
        sx={{
          width: '40%',
          border: '1px solid #009df0',
          borderRadius: 4,
          boxShadow: '0px 2px 5px #333333',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingY: '1rem',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        COVID Cases in {country}
      </Box>
      <Chart
        type={type}
        startDate={startDate}
        endDate={endDate}
        country={country}
      />
    </Box>
  );
};
