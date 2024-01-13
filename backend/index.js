const express = require("express");
const app = express();
const fs = require("fs");
const parse = require("./index.js");
const { json } = require("body-parser");
const port = 3000;

// Set the static folder to serve HTML files
app.use(express.static("../frontend"));

app.post("/", function (req, res) {
  // Read the local JSON file
  fs.readFile("./data.json", "utf8", (err, data) => {
    console.log(data);

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

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
