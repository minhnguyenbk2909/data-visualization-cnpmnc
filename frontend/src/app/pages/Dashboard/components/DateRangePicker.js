import React from 'react';
import MomentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default function DateRangePicker({
  type,
  setType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  month,
  setMonth,
  setError,
}) {
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setError(false);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setError(false);
  };
  const handleMonthChange = (date) => {
    setMonth(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <>
        <FormControl variant='outlined' style={{ minWidth: 120 }}>
          <InputLabel id='demo-simple-select-outlined-label'>
            Statistic By
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={type}
            onChange={handleChange}
            label='Statistic By'
          >
            <MenuItem value={'date'}>Date</MenuItem>
            <MenuItem value={'month'}>Month</MenuItem>
          </Select>
        </FormControl>
        {type === 'date' && (
          <>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='DD-MM-YYYY'
              id='date-picker-inline'
              label='Start Date'
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='DD-MM-YYYY'
              id='date-picker-inline'
              label='End Date'
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </>
        )}
        {type === 'month' && (
          <DatePicker
            variant='inline'
            openTo='year'
            views={['year', 'month']}
            label='Year and Month'
            helperText='Start from year selection'
            value={month}
            onChange={handleMonthChange}
          />
        )}
      </>
    </MuiPickersUtilsProvider>
  );
}
