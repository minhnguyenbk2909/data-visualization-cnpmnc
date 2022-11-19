const router = require("express").Router();

const ctrl = require("../controllers/api.controller");

router.get("/countries/:country", (req, res) => {
  res.send(ctrl.getCountry(req.params.country));
});

router.get("/data/daily/:date", async (req, res) => {
  res.send(await ctrl.getByDate(req.params.date));
})

module.exports = router;
