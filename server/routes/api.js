const router = require("express").Router();
const moment = require('moment');

const countryNames = require("../constant/countries");

const ctrl = require("../controllers/api.controller");

router.get("/countries/:country", (req, res) => {
  res.send(ctrl.getCountry(req.params.country));
});

router.get("/data/daily/:date", async (req, res) => {
  res.send(await ctrl.getByDate(req.params.date));
})

router.get('/country-names', (req, res, next) => {
  const responseData = {
    statusCode: 0,
    countryNames: countryNames
  }
  res.status(200).send(JSON.stringify(responseData));
})

router.get('/statistic-top', (req, res, next) => {
  const { from, to } = req.query;
  var fromDate = moment(from, 'DD/MM/YYYY');
  var toDate = moment(to, 'DD/MM/YYYY');
  while(toDate.diff(fromDate, 'days', true) >= 0) {

    fromDate.add(1, 'day');
  }
  res.status(200).send("done");
})

module.exports = router;
