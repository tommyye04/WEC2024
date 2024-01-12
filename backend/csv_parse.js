// install npm csv-parser

// require the filesystem and csv-parser libraries
const csv = require("csv-parser");
const fs = require("fs");
const results = [];

// create function to parse (export)
function parse() {
  // create a readable stream using the csv
  fs.createReadStream("./backend/MOCK_DATA.csv")
    // push the stream to the csv function which creates a writable stream that understands csv format
    .pipe(csv())
    // on 'data' listens for data events and pushes to results array
    .on("data", (data) => results.push(data))
    // on 'end' listens for the end event and will print to signal that the csv has been traced
    .on("end", () => {
      console.log(results);

      // json.stringify the results into a json format
      const jsonData = JSON.stringify(results, null, 2);

      // write the data to data.json
      fs.writeFile("./backend/data.json", jsonData, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Writing Complete");
        }
      });
    });
}

// export the function so that it can be used elsewhere
module.exports = parse;
