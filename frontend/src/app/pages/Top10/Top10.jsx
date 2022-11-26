import { Box } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const convertStatisticDataToChartDatasets = (topTenData, criteria) => {
  let label;
  let borderColor;
  let backgroundColor;

  if (criteria === 'death') {
    label = 'Death';
    borderColor = '#ff4000';
    backgroundColor = '#ff8080';
  } else if (criteria === 'active') {
    label = 'Active';
    borderColor = '#0000ff';
    backgroundColor = '#8888ff';
  } else if (criteria === 'recover') {
    label = 'Recovered';
    borderColor = '#00ff00';
    backgroundColor = '#88ff88';
  }

  const convertedData = {
    labels: topTenData.map((data) => data.countryName),
    datasets: [
      {
        label: label,
        data: topTenData.map((data) => data.data),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  console.log(convertedData);
  return convertedData;
};

export const Top10 = ({ isLoading, topTenData, criteria }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Top 10 countries with most COVID ${criteria} cases`,
      },
    },
  };

  const data = convertStatisticDataToChartDatasets(topTenData, criteria);

  return (
    <Box
      sx={{
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        marginBottom: 50
      }}
    >
      <Box
        sx={{
          width: '40%',
          border: '1px solid blue',
          borderRadius: 4,
          boxShadow: '0px 0px 2px',
          backgroundColor: '#f5f5ff',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingY: '1rem',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Top 10 countries with most COVID {criteria} cases
      </Box>
      <Box
        sx={{
          width: '60%',
          padding: 20,
          border: '1px solid blue',
          borderRadius: 4,
          backgroundColor: '#f5f5ff',
        }}
      >
        {isLoading ? (
          'Loading...'
        ) : topTenData.length > 0 ? (
          <Bar options={options} data={data} />
        ) : (
          'No data to show!'
        )}
      </Box>
    </Box>
  );
};
