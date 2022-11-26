import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateRangePicker from './components/DateRangePicker';
import { Box } from '@material-ui/core';
import { CountrySelect } from './components/CountrySelect';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { CriteriaSelect } from './components/CriteriaSelect';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const isDateValid = (startDate, endDate, setError) => {
  const daysBetween = endDate.diff(startDate, 'days');
  if (
    startDate.isSameOrAfter(endDate, 'days') ||
    endDate.isSameOrAfter(moment(), 'days') ||
    daysBetween > 30
  ) {
    setError(true);
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
    if (!isDateValid(startDate, endDate, setError)) {
      return;
    }

    const from = startDate.format('DD-MM-YYYY');
    const to = endDate.format('DD-MM-YYYY');

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
          )

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

      <Button variant='contained' onClick={handleOnClickFind}>
        Show
      </Button>
    </Box>
  );
}
