import React from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DateRangePicker() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();
  const [type, setType] = React.useState("date");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleDateChange = (date) => {
    console.log(date.format("DD/MM/yyyy"));
    setSelectedDate(date);
  };
  const handleMonthChange = (date) => {
    console.log(date.format("MM/yyyy"));
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justifyContent="space-around">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Statistic By
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={handleChange}
            label="Statistic By"
          >
            <MenuItem value={"date"}>Date</MenuItem>
            <MenuItem value={"month"}>Month</MenuItem>
          </Select>
        </FormControl>
        {type === "date" && (
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        )}
        {type === "month" && (
          <DatePicker
            variant="inline"
            openTo="year"
            views={["year", "month"]}
            label="Year and Month"
            helperText="Start from year selection"
            value={selectedDate}
            onChange={handleMonthChange}
          />
        )}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
