const router = require("express").Router();
const moment = require("moment");
const { isMonth, isYear } = require("../../utils/dateUtils");

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

const ctrl = require("../controllers/api.controller")

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



router.get('/statistic-top', async (req, res, next) => {
  const { from, to, criteria } = req.query;

  var fromDate = moment(from, 'DD/MM/YYYY');
  var toDate = moment(to, 'DD/MM/YYYY');

  if (fromDate > toDate) {
    res.status(200).send({
      statusCode: 2,
      statusDescription: 'Invalid date range'
    })
  }
  var field;
  if (criteria === 'death') field = 'Deaths';
  else if (criteria === 'recover') field = 'Recovered';
  else field = 'Confirmed';


  const obj = {}
  if (field === 'Deaths' || field === 'Recovered') {
    const dataFromDate = await ctrl.getByDate(fromDate.format('MM-DD-YYYY').toString())
    const dataToDate = await ctrl.getByDate(toDate.format('MM-DD-YYYY').toString())
    dataToDate.forEach((element) => {
      const countryName = element.Country_Region;
      const countryData = obj[`${countryName}`];

      if (countryData) {
        obj[`${countryName}`] += Number(element[`${field}`]);
      }
      else {
        obj[`${countryName}`] = Number(element[`${field}`]);
      }
    })

    if (!fromDate.isSame(toDate)) {
      dataFromDate.forEach((element) => {
        const countryName = element.Country_Region;
        obj[`${countryName}`] -= Number(element[`${field}`]);
      });
    }
  }
  else if (field === 'Confirmed') {
    while (toDate.diff(fromDate, 'days', true) >= 0) {
      const date = fromDate.format('MM-DD-YYYY').toString();
      const dataFromGithub = await ctrl.getByDate(date);

      dataFromGithub.forEach((element) => {
        const countryName = element.Country_Region;
        const countryData = obj[`${countryName}`];

        if (countryData) {
          obj[`${countryName}`] += Number(element[`${field}`]);
        }
        else {
          obj[`${countryName}`] = Number(element[`${field}`]);
        }

      });

      fromDate.add(1, 'day');
    }
  }

  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({ countryName: key, data: value });
  }
  arr.sort((a, b) => b.data - a.data);

  res.status(200).send(JSON.stringify(
    {
      statusCode: 0,
      statusDescription: 'Success',
      statisticData: arr.slice(0, 10)
    }
  ));
})

router.get("/statistic-data/v2", async (req, res) => {
  const response = await ctrl.filterByCountry(req);
  res.status(200).send(JSON.stringify(response));
});

// router.get("/compare", async (req, res) => {
//   let c1 = req.query.country1,
//     c2 = req.query.country2,
//     time = req.query.time;
//   const resData = {
//     statusCode: 0,
//     statusDescription: "Success",
//     statisticData: await ctrl.compareCountries(c1, c2, time),
//   };
//   res.send(resData);
// });

router.get("/compare", async (req, res, next) => {
  let { from, to, country1, country2 } = req.query

  if (!from || !to || !country1 || !country2)
    return res.status(400).json({
      statusCode: 3,
      statusDescription: "Invalid query"
    })

  const data = await ctrl.compareCountriesByRange(dayConvert(from), dayConvert(to), country1, country2)

  if (data == 2) {
    return res.status(400).json({
      statusCode: 2,
      statusDescription: 'Date record not exist in DB'
    })
  }

  if (data == 4) {
    return res.status(400).json({
      statusCode: 4,
      statusDescription: 'Country record not exist in this date'
    })
  }

  if (data.code && data.code == 1) {
    return res.status(400).json({
      statusCode: 1,
      statusDescription: 'Invalid country name',
      invalidName: data.invalid
    })
  }

  return res.status(200).json({
    statusCode: 0,
    statusDescription: 'Success',
    data: {
      from: from,
      to: to,
      data: data
    }
  })
})

router.get("/data/monthly", async (req, res, next) => {
  const { month, year } = req.query

  if (!month || !year) {
    return res.status(400).json({
      statusCode: 3,
      statusDescription: "Invalid query"
    })
  }

  if (!isMonth(month) || !isYear(year))
    return res.status(400).json({
      statusCode: 3,
      statusDescription: "Invalid date format"
    })


  const data = await ctrl.getByMonth(month, year)

  if (data === -1) {
    return res.status(404).json({
      statusCode: 2,
      statusDescription: 'Date record not existed in DB'
    })
  }

  return res.status(200).json({
    statusCode: 0,
    statusDescription: 'Success',
    data: data
  })
})

router.get("/:date", async (req, res) => {
  res.send(await ctrl.getDate(req.params));
});
module.exports = router;
