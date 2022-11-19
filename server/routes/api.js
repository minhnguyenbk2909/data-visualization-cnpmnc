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

router.get("/data/filter", async (req, res) => {
  // W.I.P
  let from = req.query.from;
  let to = req.query.to;
  let country = req.query.country;
  res.send(`Filter from ${from} to ${to} of ${country}`);
});

router.get("/country-names", (req, res, next) => {
  const responseData = {
    statusCode: 0,
    countryNames: countryNames,
  };
  res.status(200).send(JSON.stringify(responseData));
});

module.exports = router;
