const csvp = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const csv = require("../../utils/csvToJson");
class ApiController {
  getCountry(country) {
    return this.results;
  }

  async getByDate(date) {
    const response = await axios.get(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`
    );
    const temp = csv(response.data);
    return temp;
  }

  async getByMonth(month) {
    const promiseArr = []
    for (let i = 1; i <= 31; i++) {
        promiseArr.push(
          axios.get(
            `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`
          )
        );
    }
  }
}

const ac = new ApiController();

module.exports = ac;
