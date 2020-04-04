var map = createMap();
addBaseLayer(map);
// createBorough(map);
/**********************************************/
function createMap() {
  // Creating map object
  var map = L.map("map", {
    center: [37.0902405, -95.7128906],
    zoom: 4
  });
  return map;
}

function addBaseLayer(map) {
  // Adding tile layer
  var base = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  base.addTo(map);
}



L.geoJSON(data, {
  style: function (feature) {
      return {color: feature.properties.color};
  }
}).bindPopup(function (layer) {
  return layer.feature.properties.description;
}).addTo(map);

