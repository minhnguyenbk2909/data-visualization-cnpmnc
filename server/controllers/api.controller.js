const axios = require("axios");
const csv = require("../../utils/csvToJson");
const { formatDate, lastDayofMonth } = require('../../utils/dateUtils')
const moment = require('moment')
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

    let firstDate = formatDate(1, month, year)
    let lstDate = lastDayofMonth(month, year)

    const promiseArr = [
      axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${firstDate}.csv`
      )
      ,
      axios.get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${lstDate}.csv`
      )
    ];

    try {
      let dataArray = await Promise.all(promiseArr
        .map(p => p.catch((err) => {
          console.log(err.response.status)
          return ''
        })))

      let obj = {}

      if (dataArray[0].length === 0 || dataArray[1].length === 0)
        return -1

      let firstMonth = csv(dataArray[0].data)
      let lastMonth = csv(dataArray[1].data)

      for (let i = 0; i < lastMonth.length; i++) {
        const data = lastMonth[i];

        if (!data["Country_Region"]) continue;

        // obj[data["Country_Region"]] = data
        if (!obj.hasOwnProperty(data["Country_Region"])) {
          obj[data["Country_Region"]] = {};
          obj[data["Country_Region"]]["Country_Region"] =
            data["Country_Region"];
          obj[data["Country_Region"]]["Confirmed"] = 0;
          obj[data["Country_Region"]]["Deaths"] = 0;
          obj[data["Country_Region"]]["Recovered"] = 0;
          obj[data["Country_Region"]]["Active"] = 0;
        }

        obj[data["Country_Region"]]["Confirmed"] += data["Confirmed"]
          ? parseInt(data["Confirmed"])
          : 0;
        obj[data["Country_Region"]]["Deaths"] += data["Deaths"]
          ? parseInt(data["Deaths"])
          : 0;
        obj[data["Country_Region"]]["Recovered"] += data["Recovered"]
          ? parseInt(data["Recovered"])
          : 0;
        obj[data["Country_Region"]]["Active"] += data["Active"]
          ? parseInt(data["Active"])
          : 0;
      }

      for (let i = 0; i < firstMonth.length; i++) {
        const data = firstMonth[i];

        if (!data["Country_Region"]) continue;

        if (!obj[data["Country_Region"]]) {
          continue;
        }

        obj[data["Country_Region"]]["Confirmed"] -= data["Confirmed"]
          ? parseInt(data["Confirmed"])
          : 0;
        obj[data["Country_Region"]]["Deaths"] -= data["Deaths"]
          ? parseInt(data["Deaths"])
          : 0;
        obj[data["Country_Region"]]["Recovered"] -= data["Recovered"]
          ? parseInt(data["Recovered"])
          : 0;
        obj[data["Country_Region"]]["Active"] -= data["Active"]
          ? parseInt(data["Active"])
          : 0;
      }

      return obj;
    } catch (err) {
      console.log(err);
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
    const curr = new Date();
    const responseData = {
      statusCode: 4,
      statusDescription: "Unknown error",
      statisticData: [],
    };

    let from = this.dateSplitter(req.query.from)
    let fromDate = new Date(from[2], from[1] - 1, from[0])

    let to = this.dateSplitter(req.query.to)
    let toDate = new Date(to[2], to[1] - 1, to[0]);
    
    let day_count =
      (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
    let country = req.query.country;

    if ((fromDate.getTime() > toDate.getTime()) || moment(curr).startOf('day').isSame(moment(toDate).startOf('day'))) {
      responseData.statusCode = 2,
      responseData.statusDescription = "Invalid date range"
      return responseData;
    }

    for (let day = moment(fromDate).subtract(2, "days"); day < toDate; day = moment(day).add(1, "days")) {
      //console.log(moment(day).format('MM-DD-YYYY'))
      promiseArr.push(this.getByDate(moment(day).format("MM-DD-YYYY")));
    }
    
    const registrations = await Promise.all(promiseArr).then((values) => {
      for (let i = 1; i <= day_count + 1; i++) {
        let item = values[i].find((x) => x.Country_Region == country);
        let prev = values[i - 1].find((x) => x.Country_Region == country);
        let prevCases = values[i - 1].find((x) => x.Country_Region == country).Confirmed;
        let prevDeaths = values[i - 1].find((x) => x.Country_Region == country).Deaths;
        let prevRecoverd = values[i - 1].find((x) => x.Country_Region == country).Recovered;

        if (!item) {
          responseData.statusCode = 1,
          responseData.statusDescription = "Invalid country"
          return responseData;
        }

        const newItem = new Object();
        newItem.dateTime = moment(item.Last_Update).format("DD-MM-YYYY");
        newItem.totalCases = item.Confirmed || 0;
        newItem.newCases = (item.Confirmed - prevCases) > 0 ? item.Confirmed - prevCases : 0;
        newItem.deaths = (item.Deaths - prevDeaths) > 0 ? item.Deaths - prevDeaths : 0
        newItem.recovered = (item.Recovered - prevRecoverd) > 0 ? item.Recovered - prevRecoverd : 0; 

        result.push(newItem);
      }
    });

    if (result.length == day_count + 1)
    {
      responseData.statusCode = 0,
      responseData.statusDescription = "Success"
      responseData.statisticData = result;
    }
    return responseData;
  };
  dateSplitter = (date) => {
    let parts = date.split("-");
    return [parts[0], parts[1], parts[2]];
  };
  async compareCountries(c1, c2, time) {
    let [day, month, year] = this.dateSplitter(time);
    let data = await this.getByDate(`${month}-${day}-${year}`);
    let c1_data = data.find((x) => x.Country_Region == c1),
      c2_data = data.find((x) => x.Country_Region == c2);
    /*
    {
      date:time,
      Country/Region:Vietnam,
      Statistic:
      {
        Confirmed:,
        Deaths:,
        Recovered,
        Active:,
      }
    }
    */
    const result = {
      Date: time,
      "Country 1": {
        Name: c1,
        Confirmed: c1_data.Confirmed,
        Deaths: c1_data.Deaths,
        Recovered: c1_data.Recovered,
        Active: c1_data.Active,
      },
      "Country 2": {
        Name: c2,
        Confirmed: c2_data.Confirmed,
        Deaths: c2_data.Deaths,
        Recovered: c2_data.Recovered,
        Active: c2_data.Active,
      },
    };
    return result;
  }

  configUrl(t) {
    return `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${t}.csv`
  }

  async compareCountriesByRange(t1, t2, c1, c2) {
    let endpoints = [t1, t2]

    let promiseArr =
      endpoints.map(t => axios
        .get(this.configUrl(t))
        .catch(e => {
          console.log(e.response.status);
          return ''
        }))

    try {
      let response = await Promise.all(promiseArr)

      if(response[0].length === 0 || response[1].length === 0){
        return 2
      }

      let t1Data = csv(response[0].data).filter(c => c["Country_Region"] == c1 || c["Country_Region"] == c2)
      let t2Data = csv(response[1].data).filter(c => c["Country_Region"] == c1 || c["Country_Region"] == c2)

      let resData = {}

      for(const data of t2Data) {
        if (!resData.hasOwnProperty(data["Country_Region"])) {
          resData[data["Country_Region"]] = {};
          resData[data["Country_Region"]]["countryName"] =
            data["Country_Region"];
          resData[data["Country_Region"]]["newCase"] = 0;
          resData[data["Country_Region"]]["death"] = 0;
          resData[data["Country_Region"]]["recover"] = 0;
        }

        resData[data["Country_Region"]]["newCase"] += data["Confirmed"]
          ? parseInt(data["Confirmed"])
          : 0;
        resData[data["Country_Region"]]["death"] += data["Deaths"]
          ? parseInt(data["Deaths"])
          : 0;
        resData[data["Country_Region"]]["recover"] += data["Recovered"]
          ? parseInt(data["Recovered"])
          : 0;
      }

      for(const data of t1Data) {

        if (!resData.hasOwnProperty(data["Country_Region"])) {
          return 4
        }

        resData[data["Country_Region"]]["newCase"] -= data["Confirmed"]
          ? parseInt(data["Confirmed"])
          : 0;
        resData[data["Country_Region"]]["death"] -= data["Deaths"]
          ? parseInt(data["Deaths"])
          : 0;
        resData[data["Country_Region"]]["recover"] -= data["Recovered"]
          ? parseInt(data["Recovered"])
          : 0;
      }

      let invalidName = []

      if (!resData[c1]) invalidName.push(c1)
      if (!resData[c2]) invalidName.push(c2)

      if(invalidName.length !== 0){
        return {code: 1, invalid : invalidName}
      }

      

      return resData
    } catch(err) {
      console.log(err);
    }
  }
}


const ac = new ApiController();

module.exports = ac;
