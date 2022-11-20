const router = require("express").Router();
const moment = require("moment");

const countryNames = require("../constant/countries");

function dayConvert(date) {
  // Convert string "dd-mm-yyyy" to "mm-dd-yyyy"
  let parts = date.split("-");
  return `${parts[1]}-${parts[0]}-${parts[2]}`;
}

function dateAdapter(date) {
  // Convert "dd-mm-yyyy" to Date instance
  let parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

const ctrl = require("../controllers/api.controller");

router.get("/data/daily/:date", async (req, res) => {
  let country = req.query.country;
  let data = await ctrl.getByDate(dayConvert(req.params.date));
  if (!country) {
    res.send(data);
  } else {
    res.send(data.find((x) => x.Country_Region == country));
  }
});

router.get("/statistic-data", async (req, res) => {
  // W.I.P
  /*
  1) Get all daily files corresponds to each day
  2) Filter one country on each file
  3) Merge on output
  */
  let from = req.query.from;
  let to = req.query.to;
  let fromDate = new Date(dayConvert(from));
  let toDate = new Date(dayConvert(to));
  let country = req.query.country;
  let statisticData = [];
  var day_count = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
  console.log(`Days between: ${day_count}`);
  for (let i = 0; i < 3; i++) {
    let data = await ctrl.getByDate(dayConvert(from));
    let country_data = data.find((x) => x.Country_Region == country);
    let res_obj = {
      dateTime: 0,
      newCases: country_data.Confirmed,
      deaths: country_data.Deaths,
      recovered: country_data.Recovered,
    };
    statisticData.push(res_obj);
  }
  console.log(statisticData);
  res.send(":)");
});

router.get("/country-names", (req, res, next) => {
  const responseData = {
    statusCode: 0,
    countryNames: countryNames,
  };
  res.status(200).send(JSON.stringify(responseData));
});

router.get("/data/country", async (req, res) => {
  res.send(await ctrl.getByCountry());
});

router.get("/country-names", async (req, res) => {
  res.send(await ctrl.getListCountry());
});

router.get("/:date", async (req, res) => {
  res.send(await ctrl.getDate(req.params));
});

router.get("/statistic-top", (req, res, next) => {
  const { from, to } = req.query;
  var fromDate = moment(from, "DD/MM/YYYY");
  var toDate = moment(to, "DD/MM/YYYY");
  while (toDate.diff(fromDate, "days", true) >= 0) {
    fromDate.add(1, "day");
  }
  res.status(200).send("done");
});

router.get("/statistic-data/v2/", async (req, res) => {
  const responseData = {
    statusCode: 0,
    statusDescription: "Success",
    statisticData: await ctrl.filterByCountry(req),
  };
  res.status(200).send(JSON.stringify(responseData));
});

module.exports = router;
