const router = require("express").Router();
const countryNames = require("../constant/countries");

const ctrl = require("../controllers/api.controller");

router.get("/data/daily", async (req, res) => {
  let day = req.query.day;
  let month = req.query.month;
  let year = req.query.year;
  let date = `${month}-${day}-${year}`;
  let country = req.query.country;
  let data = await ctrl.getByDate(date);
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
  var parts = from.split("-");
  fromDate = new Date(parts[2], parts[1] - 1, parts[0]);
  let to = req.query.to;
  parts = to.split("-");
  toDate = new Date(parts[2], parts[1] - 1, parts[0]);
  let country = req.query.country;
  const dayFiles = [];
  var day_count = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
  console.log(`Days between: ${day_count}`);
  res.send(":)");
});

router.get("/country-names", (req, res, next) => {
  const responseData = {
    statusCode: 0,
    countryNames: countryNames,
  };
  res.status(200).send(JSON.stringify(responseData));
});

module.exports = router;
