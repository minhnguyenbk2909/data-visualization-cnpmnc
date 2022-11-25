// import "./assets/styles/global.css";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import { ByCountry } from './app/pages/ByCountry/ByCountry';
import Dashboard from './app/pages/Dashboard';
import { Navbar } from './app/pages/Navbar/Navbar';
import { Top10 } from './app/pages/Top10/Top10';
import { Compare } from './app/pages/Compare/Compare';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  // Client state
  const [type, setType] = useState('date'); // "date", "month"
  const [startDate, setStartDate] = useState(moment().subtract(2, 'days')); // moment object; format: DD-MM-YYYY
  const [endDate, setEndDate] = useState(moment().subtract(1, 'days')); // moment object; format: DD-MM-YYYY
  const [month, setMonth] = useState(''); // moment object; format: MM-YYYY
  const [country, setCountry] = useState('Vietnam');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Server state
  const [statisticData, setStatisticData] = useState([]);

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
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
        setIsLoading={setIsLoading}
        setError={setError}
        statisticData={statisticData}
        setStatisticData={setStatisticData}
      />

      {error && (
        <Typography
          style={{ color: 'red', fontWeight: 700, textAlign: 'center' }}
        >
          Không hợp lệ
        </Typography>
      )}

      <Routes>
        <Route
          path='/byCountry'
          element={
            <ByCountry
              type={type}
              startDate={startDate}
              endDate={endDate}
              country={country}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              statisticData={statisticData}
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
