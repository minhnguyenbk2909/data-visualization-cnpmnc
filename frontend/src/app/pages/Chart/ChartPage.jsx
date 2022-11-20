import { Box, Typography } from '@material-ui/core';
import { Chart } from './Chart';

export const ChartPage = ({ type, startDate, endDate, country }) => {
  return (
    <Box
      sx={{
        paddingTop: 16,
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
          boxShadow: '0px 0px 2px #3333d3',
          backgroundColor: '#f5f5ff',
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
