import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

export const Compare = ({ country, country2, isLoading, compareData }) => {
  const convertCompareDataToChartDatasets = (compareData) => {
    const countryNames = Object.keys(compareData.data);

    return {
      datasets: [
        {
          label: countryNames[0],
          labels: ['New Cases', 'Deaths', 'Recovered'],
          data: [
            {
              y: 'New Cases',
              x: compareData.data?.[countryNames[0]]?.newCase,
            },
            {
              y: 'Deaths',
              x: compareData.data?.[countryNames[0]]?.death,
            },
            {
              y: 'Recovered',
              x: compareData.data?.[countryNames[0]]?.recover,
            },
          ],
          backgroundColor: '#ff8f00',
        },
        {
          label: countryNames[1],
          labels: ['New Cases', 'Deaths', 'Recovered'],
          data: [
            {
              y: 'New Cases',
              x: compareData.data?.[countryNames[1]]?.newCase,
            },
            {
              y: 'Deaths',
              x: compareData.data?.[countryNames[1]]?.death,
            },
            {
              y: 'Recovered',
              x: compareData.data?.[countryNames[1]]?.recover,
            },
          ],
          backgroundColor: '#8f008f',
        },
      ],
    };
  };

  const isChartDataEmpty = Object.keys(compareData).length === 0;
  const chartData =
    !isChartDataEmpty && convertCompareDataToChartDatasets(compareData);

  const tableConfigs = {
    columns: [
      { label: 'Country', field: 'countryName', width: 200, color: '#000000' },
      { label: 'New Cases', field: 'newCase', width: 140, color: '#0000af' },
      { label: 'Deaths', field: 'death', width: 140, color: '#af4000' },
      { label: 'Recovered', field: 'recover', width: 140, color: '#00af00' },
    ],
    rows: isChartDataEmpty ? [] : Object.keys(compareData.data), // ['country1', 'country2']
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Compare COVID Cases in ${country} & ${country2}`,
      },
    },
    indexAxis: 'y',
    minBarLength: 1,
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
      y: {
        min: 0,
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
      },
    },
    grouped: true,
  };

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
        Compare COVID Cases in {country} & {country2}
      </Box>

      {isLoading ? (
        <LinearProgress />
      ) : isChartDataEmpty ? (
        ''
      ) : (
        <Table style={{ width: 'fit-content', backgroundColor: '#f5f5ff' }}>
          <TableHead>
            <TableRow>
              {tableConfigs.columns.map((tableColumn) => {
                return (
                  <TableCell
                    align='center'
                    style={{
                      width: tableColumn.width,
                      fontWeight: 700,
                      border: '1px solid blue',
                      boxSizing: 'border-box',
                    }}
                  >
                    {tableColumn.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableConfigs.rows.map((tableRow) => {
              const countryName = tableRow;
              return (
                <TableRow>
                  {tableConfigs.columns.map((tableColumn) => {
                    return (
                      <TableCell
                        align='center'
                        style={{
                          width: tableColumn.width,
                          color: tableColumn.color,
                          border: '1px solid blue',
                          boxSizing: 'border-box',
                        }}
                      >
                        {compareData.data[countryName][tableColumn.field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Box
        sx={{
          width: '60%',
          padding: 20,
          border: '1px solid blue',
          borderRadius: 4,
          backgroundColor: '#f5f5ff',
          marginBottom: 50,
        }}
      >
        {isLoading ? (
          <LinearProgress />
        ) : isChartDataEmpty ? (
          'No data to show!'
        ) : (
          <Bar options={options} data={chartData} />
        )}
      </Box>
    </Box>
  );
};
