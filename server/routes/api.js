const router = require("express").Router();

const ctrl = require("../controllers/api.controller");

router.get("/countries/:country", (req, res) => {
  res.send(ctrl.getCountry(req.params.country));
});

router.get("/data/daily/:date", async (req, res) => {
  res.send(await ctrl.getByDate(req.params.date));
})

router.get("/data/country", async (req, res) => {
  res.send(await ctrl.getByCountry());
});

router.get("/country-names", async (req, res) => {
  res.send(await ctrl.getListCountry());
});

module.exports = router;
