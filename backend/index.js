const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.get("/", function (req, res) {
  // Read the local JSON file
  fs.readFile("path/to/your/local/file.json", "utf8", (err, data) => {
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
