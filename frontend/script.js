const fs = require('fs');
// Fetch JSON data from the backend
fetch("/", { method: "POST" })
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    // Try to parse the text as JSON
    const data = JSON.parse(text);
    console.log(data);
    displayDisasters(data);
  })
  .catch((error) => console.error("Error:", error));

// Display the received data on the frontend
function displayDisasters(data) {
  const displayElement = document.getElementById("displayElement");

  const disasters = document.createElement("ul");

  data.forEach((disaster) => {
    const disasterEntry = document.createElement("li");
    disasterEntry.innerHTML = `
	  <strong>${disaster.Name}</strong><br>
	  Date: ${disaster.date}<br>
	  Intensity: ${disaster.intensity}<br>
	  Location: ${disaster.lat}, ${disaster.long} <br>
	  Type: ${disaster.type}
	`;
    disasters.appendChild(disasterEntry);
  });

  displayElement.appendChild(disasters);
}

var map = L.map("map").setView([20, 30], 2);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
  } else {
    var jsonData = JSON.parse(data);
    jsonData.forEach((element) => {
      var point1 = L.marker([element.lat, element.long]).addTo(map);
    });
  }