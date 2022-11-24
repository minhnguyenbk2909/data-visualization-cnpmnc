// import "./assets/styles/global.css";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import { ByCountry } from './app/pages/ByCountry/ByCountry';
import Dashboard from './app/pages/Dashboard';
import { Navbar } from './app/pages/Navbar/Navbar';
import { Top10 } from './app/pages/Top10/Top10';
import { Compare } from './app/pages/Compare/Compare';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const [type, setType] = useState('date'); // "date", "month"
  const [startDate, setStartDate] = useState(moment().subtract(2, 'days')); // moment object; format: DD-MM-YYYY
  const [endDate, setEndDate] = useState(moment().subtract(1, 'days')); // moment object; format: DD-MM-YYYY
  const [month, setMonth] = useState(''); // moment object; format: MM-YYYY
  const [country, setCountry] = useState('Vietnam');

  return (
    <Box
      sx={{
        backgroundColor: '#eaeaff',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <Navbar />
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

      <Routes>
        <Route
          path='/byCountry'
          element={
            <ByCountry
              type={type}
              startDate={startDate}
              endDate={endDate}
              country={country}
            />
          }
        />

        <Route path='/top10' element={<Top10 />} />
        <Route path='/compare' element={<Compare />} />
      </Routes>
    </Box>
  );
}

export default App;
