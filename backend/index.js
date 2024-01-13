const express = require("express");
const app = express();
const fs = require("fs");
const parse = require("./index.js");
const bodyParser = require("body-parser");
const port = 3000;

// Set the static folder to serve HTML files
app.use(express.static("../frontend"));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", function (req, res) {
  // Read the local JSON file
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON data as the response
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.post("/add", function (req, res) {
  let newItem = {
    Name: req.body.name,
    long: req.body.long,
    lat: req.body.lat,
    date: req.body.date,
    intensity: req.body.intensity,
    type: req.body.type,
  };

  // Clear the cache for the specific file
  delete require.cache[require.resolve("./data.json")];

  let rawdata = fs.readFileSync("./data.json");
  let data = JSON.parse(rawdata);
  data.push(newItem);
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

  res.redirect("back");
});

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
