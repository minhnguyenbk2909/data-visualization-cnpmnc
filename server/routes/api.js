const router = require("express").Router();
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

module.exports = router;
