import { Box, LinearProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

const convertStatisticDataToChartDatasets = (statisticData) => {
  const chartConfigs = [
    {
      field: 'totalCases',
      label: 'Total Cases',
      borderColor: '#00004f',
      backgroundColor: '#11116f',
    },
    {
      field: 'newCases',
      label: 'New Cases',
      borderColor: '#0000ff',
      backgroundColor: '#4444ff',
    },
    {
      field: 'deaths',
      label: 'Deaths',
      borderColor: '#ff4000',
      backgroundColor: '#ff8080',
    },
    {
      field: 'recovered',
      label: 'Recovered',
      borderColor: '#00ff00',
      backgroundColor: '#88ff88',
    },
  ];

  return {
    datasets: chartConfigs.map((chartConfig) => ({
      label: chartConfig.label,
      data: statisticData.map((statisticDatum) => ({
        x: statisticDatum.dateTime,
        y: statisticDatum[chartConfig.field],
      })),
      borderColor: chartConfig.borderColor,
      backgroundColor: chartConfig.backgroundColor,
    })),
  };
};

export const ByCountry = ({ country, isLoading, statisticData }) => {
  const chartData = convertStatisticDataToChartDatasets(statisticData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `COVID Cases in ${country}`,
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        marginBottom: 50,
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
          <LinearProgress />
        ) : statisticData.length > 0 ? (
          <Line options={options} data={chartData} />
        ) : (
          'No data to show!'
        )}
      </Box>
    </Box>
  );
};
