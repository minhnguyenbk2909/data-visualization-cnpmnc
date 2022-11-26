import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import DateRangePicker from "./components/DateRangePicker";
import { CountrySelect } from "./components/CountrySelect";
import { CriteriaSelect } from "./components/CriteriaSelect";

const isDateValid = (startDate, endDate, setError) => {
  const daysBetween = endDate.diff(startDate, "days");
  if (startDate.isSameOrAfter(endDate, "days")) {
    setError("Start Date must be before End Date");
    return false;
  } else if (endDate.isSameOrAfter(moment(), "days")) {
    setError("End Date must be before today");
    return false;
  } else if (daysBetween > 60) {
    setError("Max duration is 60 days");
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
    if (type === "date" && !isDateValid(startDate, endDate, setError)) {
      return;
    }

    const from = startDate.format("DD-MM-YYYY");
    const to = endDate.format("DD-MM-YYYY");

    switch (pathname) {
      case "/":
        setIsLoading(true);

        try {
          const {
            data: { statisticData },
          } = await axios.get(
            `/api/statistic-data/v2?country=${country}&from=${from}&to=${to}`
          );

          setStatisticData(statisticData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
        break;

      case "/compare":
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

      case "/top10":
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
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
        {pathname !== "/top10" && (
          <CountrySelect country={country} setCountry={setCountry} />
        )}
        {pathname === "/compare" && (
          <CountrySelect country={country2} setCountry={setCountry2} />
        )}
        {pathname === "/top10" && (
          <CriteriaSelect criteria={criteria} setCriteria={setCriteria} />
        )}
      </Box>

      <Button
        style={{
          backgroundColor: "blueviolet",
          color: "white",
          fontWeight: "bold",
        }}
        variant="contained"
        onClick={handleOnClickFind}
      >
        {/* <Button variant='contained' onClick={handleOnClickFind}> */}
        Show
      </Button>
    </Box>
  );
}
