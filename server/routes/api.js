const router = require("express").Router();

const ctrl = require("../controllers/api.controller");

router.get("/data/daily", async (req, res) => {
  let day = req.query.day;
  let month = req.query.month;
  let year = req.query.year;
  let date = `${month}-${day}-${year}`;
  console.log(date);
  res.send(await ctrl.getByDate(date));
});

router.get("/data/filter", async (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let country = req.query.country;
  res.send(`Filter from ${from} to ${to} of ${country}`);
});

module.exports = router;
