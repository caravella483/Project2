var map = createMap();
addBaseLayer(map);
createBorough(map);
/**********************************************/
function createMap() {
  // Creating map object
  var map = L.map("map", {
    center: [39.381266, -97.922211],
    zoom: 4
  });
  return map;
}
/**********************************************/
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
/**********************************************/
function createBorough(map) {
  // Uncomment this link local geojson for when data.beta.nyc is down
  var link = "assests/usmap.geojson";
  d3.json(link).then(function (data) {
    var legal  = L.geoJson(data, 
      {
        style : mapStyle,
        onEachFeature: mapFeature,
      })
    legal.addTo(map)
  });
}
/**********************************************/
function mapStyle(feature )
{
  // console.log(feature)
  return {
    color: "white",
    fillColor: "green",
    fillOpacity: 0.5,
    weight: 1.5
  };
}
/**********************************************/
function color(Legal_Status) {
  switch (Legal_Status) {
    case "Mixed": return "yellow";
    case "Fully_Legal": return "red";
    case "Illegal": return "orange";
    case "Queens": return "green";
    case "Staten Island": return "purple";
    default: return "black";
  }
}
/**********************************************/
function mapFeature(feature , layer)
{
  // console.log("mapFeature")
  layer.on({
    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
    // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
    click: function(event) {
      map.fitBounds(event.target.getBounds());
    }
  });
  // Giving each feature a pop-up with information pertinent to it
  layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + feature.properties.Legal_Status + "</h2>");
}


var states = [{
  location: [40.7128, -74.0059],
  name: "New York",
  Legal_Status: "Mixed"
},
{
  location: [41.8781, -87.6298],
  name: "Illinois",
  Legal_Status: "Fully Legal"
},
{
  location: [29.7604, -95.3698],
  name: "Texas",
  Legal_Status: "Mixed"
},
{
  location: [34.0522, -118.2437],
  name: "California",
  Legal_Status: "Fully Legal"
},
{
  location: [41.2524, -95.9980],
  name: "Nebraska",
  Legal_Status: "Fully Illegal"
},
{
  location: [33.9959, -84.4426],
  name: "Georgia",
  Legal_Status: "Mixed"
},
{
  location: [41.2524, -95.9980],
  name: "Nebraska",
  Legal_Status: "Fully Illegal"

},
{
  location: [29.472505, -82.345234],
  name: "Florida",
  Legal_Status: "Mixed"
},
{
  location: [35.2639, -80.8234],
  name: "North Carolina",
  Legal_Status: "Fully Illegal"
},
{
  location: [33.9740, -80.4569],
  name: "South Carolina",
  Legal_Status: "Fully Illegal"
},
{
  location: [43.7419, -84.3438],
  name: "Michigan",
  Legal_Status: "Fully Legal"
},
{
  location: [64.9771, -150.9913],
  name: "Alaska",
  Legal_Status: "Fully Legal"
},
{
  location: [32.9167, -86.7494],
  name: "Alabama",
  Legal_Status: "Fully Illegal"
},
{
  location: [34.7494, -92.5625],
  name: "Arkansas",
  Legal_Status: "Mixed"
},
{
  location: [34.3387, -111.6355],
  name: "Arizona",
  Legal_Status: "Mixed"
},
{
  location: [39.2918, -105.7068],
  name: "Colorado",
  Legal_Status: "Fully Legal"
},
{
  location: [41.6196, -72.3731],
  name: "Connecticut",
  Legal_Status: "Mixed"
},
{
  location: [38.9101, -77.0187],
  name: "District of Columbia",
  Legal_Status: "Fully Legal"
},
{
  location: [38.8194, -75.4445],
  name: "Delaware",
  Legal_Status: "Mixed"
},
{
  location: [21.4102, -157.9807],
  name: "Hawaii",
  Legal_Status: "Mixed"
},
{
  location: [42.0145, -93.6667],
  name: "Iowa",
  Legal_Status: "Mixed"
},
{
  location: [43.5886, -114.4136],
  name: "Idaho",
  Legal_Status: "Fully Illegal"
},
{
  location: [40.2332, -86.1909],
  name: "Indiana",
  Legal_Status: "Mixed"
},
{
  location: [38.5289, -98.4763],
  name: "Kansas",
  Legal_Status: "Fully Illegal"
},
{
  location: [37.3832, -85.2983],
  name: "Kentucky",
  Legal_Status: "Mixed"
},
{
  location: [30.7765, -91.5245],
  name: "Louisiana",
  Legal_Status: "Mixed"
},
{
  location: [42.5001, -72.0246],
  name: "Massachusetts",
  Legal_Status: "Fully Legal"
},
{
  location: [39.4991, -76.7999],
  name: "Maryland",
  Legal_Status: "Mixed"
},
{
  location: [45.0346, -69.0968],
  name: "Maine",
  Legal_Status: "Fully Legal"
},
{
  location: [46.2325, -94.9279],
  name: "Minnesota",
  Legal_Status: "Mixed"
},
{
  location: [38.2747, -92.4175],
  name: "Missouri",
  Legal_Status: "Mixed"
},
{
  location: [33.4907, -89.4727],
  name: "Mississippi",
  Legal_Status: "Fully Illegal"
},
{
  location: [46.9079, -109.6775],
  name: "Montana",
  Legal_Status: "Mixed"
},
{
  location: [47.4385, -100.2821],
  name: "North Dakota",
  Legal_Status: "Mixed"
},
{
  location: [43.5556, -71.5063],
  name: "New Hampshire",
  Legal_Status: "Mixed"
},
{
  location: [40.2859, -74.4118],
  name: "New Jersey",
  Legal_Status: "Mixed"
},
{
  location: [34.0913, -106.1166],
  name: "New Mexico",
  Legal_Status: "Mixed"
},
{
  location: [39.8478, -116.7247],
  name: "Nevada",
  Legal_Status: "Fully Legal"
},
{
  location: [40.2747, -82.7704],
  name: "Ohio",
  Legal_Status: "Mixed"
},
{
  location: [35.9763, -97.0570],
  name: "Oklahoma",
  Legal_Status: "Mixed"
},
{
  location: [43.7755, -120.6843],
  name: "Oregon",
  Legal_Status: "Fully Legal"
},
{
  location: [40.8297, -77.7937],
  name: "Pennysylvania",
  Legal_Status: "Mixed"
},
{
  location: [41.7612, -71.5749],
  name: "Rhode Island",
  Legal_Status: "Mixed"
},
{
  location: [44.4344, -100.4689],
  name: "South Dakota",
  Legal_Status: "Fully Illegal"
},
{
  location: [35.6755, -86.6919],
  name: "Tennessee",
  Legal_Status: "Fully Illegal"
},
{
  location: [39.0956, -111.6043],
  name: "Utah",
  Legal_Status: "Mixed"
},
{
  location: [37.3437, -78.9030],
  name: "Virginia",
  Legal_Status: "Mixed"
},
{
  location: [43.9514, -72.7926],
  name: "Vermont",
  Legal_Status: "Fully Legal"
},
{
  location: [47.3256, -119.8075],
  name: "Washington",
  Legal_Status: "Fully Legal"
},
{
  location: [44.7463, -89.6264],
  name: "Wisconsin",
  Legal_Status: "Fully Illegal"
},
{
  location: [38.4613, -81.1399],
  name: "West Virginia",
  Legal_Status: "Mixed"
},
{
  location: [43.0025, -107.4139],
  name: "Wyoming",
  Legal_Status: "Mixed"
}
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < states.length; i++) {
  var country = states[i];
  L.marker(states.location)
    .bindPopup("<h1>" + states.name + "</h1> <hr> <h3>Legal_status " + states.Legal_Status+ "</h3>")
    .addTo(myMap);
}