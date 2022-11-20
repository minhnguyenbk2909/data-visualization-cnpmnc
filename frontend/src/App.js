// import "./assets/styles/global.css";
import { useState } from 'react';
import moment from 'moment';
import { ChartPage } from './app/pages/Chart/ChartPage';
import Dashboard from './app/pages/Dashboard';

import axios from 'axios';
import { Box } from '@material-ui/core';
axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const [type, setType] = useState('date'); // "date", "month"
  const [startDate, setStartDate] = useState(moment().subtract(2, 'days')); // moment object; format: DD-MM-YYYY
  const [endDate, setEndDate] = useState(moment().subtract(1, 'days')); // moment object; format: DD-MM-YYYY
  const [month, setMonth] = useState(''); // moment object; format: MM-YYYY
  const [country, setCountry] = useState('Vietnam');

  return (
    <Box sx={{ backgroundColor: '#e8e8ff' }}>
      <Dashboard
        type={type}
        setType={setType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        month={month}
        setMonth={setMonth}
        country={country}
        setCountry={setCountry}
      />
      <ChartPage
        type={type}
        startDate={startDate}
        endDate={endDate}
        country={country}
      />
    </Box>
  );
}

export default App;
