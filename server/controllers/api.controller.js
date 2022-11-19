const csvp = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const csv = require("../../utils/csvToJson");
class ApiController {
  getCountry(country) {
    return this.results;
  }

  async getByDate(date) {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`
      );
      const temp = csv(response.data);
      return temp;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByCountry() {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`
      );
      const temp = csv(response.data);
      return temp;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getListCountry() {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      const temp = csv(response.data);
      return temp;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const ac = new ApiController();

module.exports = ac;
