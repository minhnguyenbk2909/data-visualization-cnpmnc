const csvp = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const csvToJson = require("csvtojson");
class ApiController {
  getCountry(country) {
    return this.results;
  }

  async getByDate(date) {
    const response = await axios.get(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/01-01-2021.csv"
    );
    csvToJson()
      .fromFile(response.data)
      .then((jsonObj) => {
        console.log(jsonObj);
      });
  }
}

const ac = new ApiController();

module.exports = ac;
