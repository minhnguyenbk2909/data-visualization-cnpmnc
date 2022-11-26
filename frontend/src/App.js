// import "./assets/styles/global.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import axios from "axios";
import { ByCountry } from "./app/pages/ByCountry/ByCountry";
import Dashboard from "./app/pages/Dashboard";
import { Navbar } from "./app/pages/Navbar/Navbar";
import { Top10 } from "./app/pages/Top10/Top10";
import { Compare } from "./app/pages/Compare/Compare";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  // Client state
  const [type, setType] = useState("date"); // "date", "month"
  const [startDate, setStartDate] = useState(
    moment("05-06-2021", "DD-MM-YYYY")
  ); // moment object; format: DD-MM-YYYY
  const [endDate, setEndDate] = useState(moment("04-07-2021", "DD-MM-YYYY")); // moment object; format: DD-MM-YYYY
  const [month, setMonth] = useState(""); // moment object; format: MM-YYYY
  const [country, setCountry] = useState("Vietnam");
  const [country2, setCountry2] = useState("Thailand");
  const [criteria, setCriteria] = useState("death");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Server state
  const [statisticData, setStatisticData] = useState([]);
  const [compareData, setCompareData] = useState({});
  const [topTenData, setTopTenData] = useState([]);

  useEffect(() => {
    setStatisticData([]);
    setCompareData({});
    setTopTenData([]);
  }, [country, country2, criteria]);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#eaeaff",
        display: "flex",
        flexDirection: "column",
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
        country2={country2}
        setCountry2={setCountry2}
        criteria={criteria}
        setCriteria={setCriteria}
        setIsLoading={setIsLoading}
        setError={setError}
        setStatisticData={setStatisticData}
        setCompareData={setCompareData}
        setTopTenData={setTopTenData}
      />

      {error && (
        <Typography
          style={{ color: "red", fontWeight: 700, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}

      <Routes>
        <Route
          path="/"
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

        <Route
          path="/top10"
          element={
            <Top10
              type={type}
              startDate={startDate}
              endDate={endDate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              topTenData={topTenData}
              criteria={criteria}
            />
          }
        />

        <Route
          path="/compare"
          element={
            <Compare
              type={type}
              startDate={startDate}
              endDate={endDate}
              country={country}
              country2={country2}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              compareData={compareData}
            />
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
