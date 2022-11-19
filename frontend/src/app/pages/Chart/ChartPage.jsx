import { Box, Typography } from '@material-ui/core';
import { Chart } from './Chart';

export const ChartPage = () => {
  const country = 'Vietnam';

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
          width: '100%',
          border: '1px solid #009df0',
          borderRadius: 4,
          boxShadow: '0px 3px 5px #333333',
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
      <Typography>TODO: RANGE PICKER</Typography>
      <Chart country={country} />
    </Box>
  );
};
