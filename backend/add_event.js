import { map } from "../frontend/script";

function getData() {
  const name_value = document.getElementById("name").value;
  const long_value = document.getElementById("long").value;
  const lat_value = document.getElementById("lat").value;
  const intensity_value = document.getElementById("intensity").value;
  const type_value = document.getElementById("type").value;
  const date_value = document.getElementById("date").value;

  console.log(name_value);
  console.log(long_value);
  console.log(lat_value);
  console.log(intensity_value);
  console.log(type_value);
  console.log(date_value);

  var marker = L.marker([lat_value, long_value]).addTo(map);
}

function checkForm() {
  const name_value = document.getElementById("name").value;
  const long_value = document.getElementById("long").value;
  const lat_value = document.getElementById("lat").value;
  const intensity_value = document.getElementById("intensity").value;
  const type_value = document.getElementById("type").value;
  const date_value = document.getElementById("date").value;

  const add_button = document.getElementById("add");

  if (
    name_value.trim() !== "" &&
    long_value.trim() !== "" &&
    lat_value.trim() !== "" &&
    intensity_value.trim() !== "" &&
    type_value.trim() !== "" &&
    date_value.trim() !== ""
  ) {
    add_button.removeAttribute("disabled");
  } else {
    add_button.setAttribute("disabled", "disabled");
  }
}
