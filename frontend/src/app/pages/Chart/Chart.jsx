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
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// import moment from 'moment';
// import 'chartjs-adapter-moment';
import axios from 'axios';

export const Chart = ({ country }) => {
  useEffect(() => {
    (async () => {
      // console.log(await axios.get('/api/statistic-data?'));
    })();
  }, []);

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
  const data = {
    Vietnam: {
      datasets: [
        {
          label: 'Positive',
          data: [
            { x: '2022-11-11', y: 213 },
            { x: '2022-11-12', y: 313 },
            { x: '2022-11-13', y: 413 },
            { x: '2022-11-14', y: 113 },
            { x: '2022-11-15', y: 513 },
            { x: '2022-11-16', y: 263 },
            { x: '2022-11-17', y: 333 },
          ],
          borderColor: '#0000ff',
          backgroundColor: '#8888ff',
        },
        {
          label: 'Deaths',
          data: [
            { x: '2022-11-11', y: 23 },
            { x: '2022-11-12', y: 13 },
            { x: '2022-11-13', y: 43 },
            { x: '2022-11-14', y: 15 },
            { x: '2022-11-15', y: 53 },
            { x: '2022-11-16', y: 26 },
            { x: '2022-11-17', y: 33 },
          ],
          borderColor: '#ff4000',
          backgroundColor: '#ff8080',
        },
        {
          label: 'Recovered',
          data: [
            { x: '2022-11-11', y: 25 },
            { x: '2022-11-12', y: 33 },
            { x: '2022-11-13', y: 93 },
            { x: '2022-11-14', y: 173 },
            { x: '2022-11-15', y: 90 },
            { x: '2022-11-16', y: 26 },
            { x: '2022-11-17', y: 151 },
          ],
          borderColor: '#00ff00',
          backgroundColor: '#88ff88',
        },
      ],
    },
    USA: {
      datasets: [
        {
          label: 'Positive',
          data: [
            { x: '2022-11-11', y: 432 },
            { x: '2022-11-12', y: 339 },
            { x: '2022-11-13', y: 413 },
            { x: '2022-11-14', y: 115 },
            { x: '2022-11-15', y: 513 },
            { x: '2022-11-16', y: 963 },
            { x: '2022-11-17', y: 333 },
          ],
          borderColor: '#0000ff',
          backgroundColor: '#8888ff',
        },
        {
          label: 'Deaths',
          data: [
            { x: '2022-11-11', y: 53 },
            { x: '2022-11-12', y: 19 },
            { x: '2022-11-13', y: 180 },
            { x: '2022-11-14', y: 78 },
            { x: '2022-11-15', y: 409 },
            { x: '2022-11-16', y: 59 },
            { x: '2022-11-17', y: 33 },
          ],
          borderColor: '#ff4000',
          backgroundColor: '#ff8080',
        },
        {
          label: 'Recovered',
          data: [
            { x: '2022-11-11', y: 152 },
            { x: '2022-11-12', y: 533 },
            { x: '2022-11-13', y: 93 },
            { x: '2022-11-14', y: 173 },
            { x: '2022-11-15', y: 904 },
            { x: '2022-11-16', y: 276 },
            { x: '2022-11-17', y: 51 },
          ],
          borderColor: '#00ff00',
          backgroundColor: '#88ff88',
        },
      ],
    },
  };

  return (
    <Box
      sx={{
        width: '80%',
        padding: 20,
        border: '1px solid blue',
        borderRadius: 4,
      }}
    >
      <Line options={options} data={data[country]} />
    </Box>
  );
};
