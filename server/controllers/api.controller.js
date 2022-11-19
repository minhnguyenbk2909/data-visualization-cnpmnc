const csvp = require("csv-parser");
const fs = require("fs");

const csv = require("../data/11-17-2022.csv");

class ApiController {
  constructor() {
    this.results = [];
    this.Initialize();
  }

  Initialize() {
    fs.createReadStream(csv)
      .pipe(csv())
      .on("data", (data) => this.results.push(data));
  }

  getCountry(country) {
    return this.results;
  }
}

const ac = new ApiController();

module.exports = ac;
