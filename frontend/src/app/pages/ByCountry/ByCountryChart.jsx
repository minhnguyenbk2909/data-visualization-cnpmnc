// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import { Box } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// import moment from 'moment';
// import 'chartjs-adapter-moment';
import axios from 'axios';

const convertStatisticDataToChartDatasets = (statisticData) => {
  const chartConfigs = [
    {
      field: 'newCases',
      label: 'New Cases',
      borderColor: '#0000ff',
      backgroundColor: '#8888ff',
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

export const ByCountryChart = ({ type, startDate, endDate, country }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [isLoading, setIsLoading] = useState(true);

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
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const from = startDate.format('DD-MM-YYYY');
      const to = endDate.format('DD-MM-YYYY');
      try {
        const {
          data: { statisticData },
        } = await axios.get(
          `/api/statistic-data/v2?country=${country}&from=${from}&to=${to}`
        );

        setChartData(convertStatisticDataToChartDatasets(statisticData));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startDate, endDate, country]);

  return (
    <Box
      sx={{
        width: '90%',
        // height: 400,
        padding: 20,
        border: '1px solid blue',
        borderRadius: 4,
        backgroundColor: '#f5f5ff',
      }}
    >
      {isLoading ? 'Loading...' : <Line options={options} data={chartData} />}
    </Box>
  );
};
