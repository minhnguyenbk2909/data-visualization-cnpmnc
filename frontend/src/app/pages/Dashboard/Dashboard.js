import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment';
import DateRangePicker from './components/DateRangePicker';
import { CountrySelect } from './components/CountrySelect';
import { CriteriaSelect } from './components/CriteriaSelect';

const isDateValid = (startDate, endDate) => {
  const daysBetween = endDate.diff(startDate, 'days');
  if (
    startDate.isSameOrAfter(endDate, 'days') ||
    endDate.isSameOrAfter(moment(), 'days') ||
    daysBetween > 60
  ) {
    return false;
  } else {
    return true;
  }
};

export default function Dashboard({
  type,
  setType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  month,
  setMonth,
  country,
  setCountry,
  country2,
  setCountry2,
  criteria,
  setCriteria,
  setIsLoading,
  setError,
  setStatisticData,
  setCompareData,
  setTopTenData,
}) {
  const { pathname } = useLocation();

  const handleOnClickFind = async () => {
    if (type === 'date' && !isDateValid(startDate, endDate)) {
      setError(true);
      return;
    }

    let from, to;

    switch (type) {
      case 'date':
        from = startDate.format('DD-MM-YYYY');
        to = endDate.format('DD-MM-YYYY');
        break;

      case 'month':
        from = month.startOf('month').format('DD-MM-YYYY');
        to = month.endOf('month').format('DD-MM-YYYY');
        break;

      default:
        break;
    }

    switch (pathname) {
      case '/byCountry':
        setIsLoading(true);

        try {
          const {
            data: { statisticData },
          } = await axios.get(
            `/api/statistic-data/v2?country=${country}&from=${from}&to=${to}`
          );
          console.log(statisticData);

          setStatisticData(statisticData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
        break;

      case '/compare':
        setIsLoading(true);

        try {
          const {
            data: { data },
          } = await axios.get(
            `/api/compare?from=${from}&to=${to}&country1=${country}&country2=${country2}`
          );

          setCompareData(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
        break;

      case '/top10':
        setIsLoading(true);

        try {
          const {
            data: { statisticData },
          } = await axios.get(
            `/api/statistic-top?from=${from}&to=${to}&criteria=${criteria}`
          );

          setTopTenData(statisticData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
        break;

      default:
        break;
    }
  };

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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 32,
        }}
      >
        <DateRangePicker
          type={type}
          setType={setType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          month={month}
          setMonth={setMonth}
          setError={setError}
        />
        {pathname !== '/top10' && (
          <CountrySelect country={country} setCountry={setCountry} />
        )}
        {pathname === '/compare' && (
          <CountrySelect country={country2} setCountry={setCountry2} />
        )}
        {pathname === '/top10' && (
          <CriteriaSelect criteria={criteria} setCriteria={setCriteria} />
        )}
      </Box>

      <Button
        variant='contained'
        style={{ backgroundColor: '#b6b6ff' }}
        onClick={handleOnClickFind}
      >
        Show
      </Button>
    </Box>
  );
}
