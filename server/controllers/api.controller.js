const axios = require("axios");
const csv = require("../../utils/csvToJson");
const formatDate = require('../../utils/formatDate')
const getLastDay = require('../../utils/dateUtils')
const moment = require("moment")
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

  async getByMonth(month, year) {
    const promiseArr = []

    let firstDate = formatDate(1, month, year)
    let lstDate = getLastDay(month, year)
    console.log(lstDate)
    promiseArr.push(
      axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${firstDate}.csv`
      )
        .catch((err) => {
          console.log(err.response.status)
          return ''
        })
    );

    promiseArr.push(
      axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${lstDate}.csv`
      )
        .catch((err) => {
          console.log(err.response.status)
          return ''
        })
    );


    try {
      let dataArray = await Promise.all(promiseArr)
      let obj = {}

      if (dataArray[0].length === 0 || dataArray[1].length === 0)
        return -1
      
      let firstMonth = csv(dataArray[0].data)
      let lastMonth = csv(dataArray[1].data)


      for (let i = 0; i < lastMonth.length; i++) {
        const data = lastMonth[i]

        if (!data["Country_Region"]) continue

        // obj[data["Country_Region"]] = data
        if (!obj.hasOwnProperty(data["Country_Region"])) {
          obj[data["Country_Region"]] = {}
          obj[data["Country_Region"]]["Country_Region"] = data["Country_Region"]
          obj[data["Country_Region"]]["Confirmed"] = 0
          obj[data["Country_Region"]]["Deaths"] = 0
          obj[data["Country_Region"]]["Recovered"] = 0
          obj[data["Country_Region"]]["Active"] = 0
        }

        obj[data["Country_Region"]]["Confirmed"] += data["Confirmed"] ? parseInt(data["Confirmed"]) : 0
        obj[data["Country_Region"]]["Deaths"] += data["Deaths"] ? parseInt(data["Deaths"]) : 0
        obj[data["Country_Region"]]["Recovered"] += data["Recovered"] ? parseInt(data["Recovered"]) : 0
        obj[data["Country_Region"]]["Active"] += data["Active"] ? parseInt(data["Active"]) : 0
      }

      for (let i = 0; i < firstMonth.length; i++) {
        const data = firstMonth[i]

        if (!data["Country_Region"]) continue

        if (!obj[data["Country_Region"]]) {
          continue
        }

        obj[data["Country_Region"]]["Confirmed"] -= data["Confirmed"] ? parseInt(data["Confirmed"]) : 0
        obj[data["Country_Region"]]["Deaths"] -= data["Deaths"] ? parseInt(data["Deaths"]) : 0
        obj[data["Country_Region"]]["Recovered"] -= data["Recovered"] ? parseInt(data["Recovered"]) : 0
        obj[data["Country_Region"]]["Active"] -= data["Active"] ? parseInt(data["Active"]) : 0

      }

      return obj
    }
    catch (err) {
      console.log(err)
    }
  }

  getWeekDays(date) {
    const first = date.getDate() - date.getDay() + 1;
    const last = first + 6;

    const firstDay = new Date(date.setDate(first)); //.toUTCString();
    const lastDay = new Date(date.setDate(last)); //.toUTCString();

    return firstDay;
  }

  async filterByCountry(req) {

    const promiseArr = [];
    const result = [];
    let from = req.query.from;
    let parts = from.split("-");
    let fromDate = new Date(parts[2], parts[1] - 1, parts[0]);
    let to = req.query.to;
    parts = to.split("-");
    let toDate = new Date(parts[2], parts[1] - 1, parts[0]);
    let day_count = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
    let country = req.query.country;
    let request = req.query.request || null;

    for (let day = fromDate; day <= toDate; day = moment(day).add(1, 'days')){
      //console.log(moment(day).format('MM-DD-YYYY'))
      promiseArr.push(this.getByDate(moment(day).format('MM-DD-YYYY')))
    }

    const registrations = await Promise.all(promiseArr).then(values => {
      for (let i = 0; i <= day_count; i++) {
        let item = values[i].find((x) => x.Country_Region == country);
        const newItem = new Object();
        newItem.dateTime = item.Last_Update;
        newItem.newCases = item.Confirmed;
        newItem.deaths = item.Deaths;
        newItem.recovered = item.Recovered;
        result.push(newItem)
      }
    })
    
    return result;
  }
}

const ac = new ApiController();

module.exports = ac;
