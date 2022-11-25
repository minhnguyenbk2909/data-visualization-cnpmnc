const router = require("express").Router();
const moment = require('moment');

const countryNames = require("../constant/countries");

const ctrl = require("../controllers/api.controller");

router.get("/data/daily/:date", async (req, res) => {
  let date = req.params.date;
  let parts = date.split("-");
  date = `${parts[1]}-${parts[0]}-${parts[2]}`;
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
  let parts = from.split("-");
  let fromDate = new Date(parts[2], parts[1] - 1, parts[0]);
  let to = req.query.to;
  parts = to.split("-");
  let toDate = new Date(parts[2], parts[1] - 1, parts[0]);
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

router.get("/data/country", async (req, res) => {
  res.send(await ctrl.getByCountry());
});

router.get("/country-names", async (req, res) => {
  res.send(await ctrl.getListCountry());
});



router.get('/statistic-top', async (req, res, next) => {
  const { from, to, criteria } = req.query;
  var fromDate = moment(from, 'DD/MM/YYYY');
  var toDate = moment(to, 'DD/MM/YYYY');
  var field;
  if (criteria === 'death')   field = 'Deaths';
  else if (criteria === 'recover') field = 'Recovered';
  else  field = 'Active';
  const obj = {};
  
  while(toDate.diff(fromDate, 'days', true) >= 0) {
    const date = fromDate.format('MM-DD-YYYY').toString();

    console.log(`GETTING DATA FROM GITHUB, DATE: ${date}`);

    const dataFromGithub = await ctrl.getByDate(date);

    dataFromGithub.forEach((element) => {
      const countryName = element.Country_Region;
      const countryData = obj[`${countryName}`];

      if (countryData)  obj[`${countryName}`] += Number( element[`${field}`] );
      else  obj[`${countryName}`] = Number( element[`${field}`] );
      
    });

    fromDate.add(1, 'day');
  }

  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({countryName: key, data: value});
  }
  const finalArr = arr.sort((a, b) => b.data - a.data);

  res.send(JSON.stringify(finalArr.slice(0, 10)));
})

router.get("/:date", async (req, res) => {
  res.send(await ctrl.getDate(req.params));
});
module.exports = router;
