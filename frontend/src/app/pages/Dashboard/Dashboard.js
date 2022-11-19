import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateRangePicker from './components/DateRangePicker';
import { Box } from '@material-ui/core';
import { CountrySelect } from './components/CountrySelect';

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
}) {
  const classes = useStyles();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <DateRangePicker
        type={type}
        setType={setType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        month={month}
        setMonth={setMonth}
      />
      <CountrySelect country={country} setCountry={setCountry} />
    </Box>
  );
}
