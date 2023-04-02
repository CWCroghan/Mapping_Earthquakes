// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6214, -122.3790], 5);

// We create the tile layer that will be the background of our map.
let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });
    
// // An array containing each city's location, state, and population.
// let cityData=cities;

// // Loop through the cities array and create on marker for each city

// cityData.forEach(function(city){
//     console.log(city);
//     L.circleMarker(city.location, 
//         {radius: city.population/200000, 
//         color:"orange"})
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3> Population " + city.population + "</h3>" )
//     .addTo(map);
// });

// Coordinates for each point to be used in the line.
let line = [
  [33.9416, -118.4085],
  [37.6214, -122.3790]
];
// Coordinates for each point to be used in the polyline.
let line2 = [
    [33.9416, -118.4085],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [35.8801, -78.7880],
    [40.6413, -73.7781]
  ];

// Create a polyline using theline coordinates and make the line red.

// L.polyline(line,{ color: "red"}).addTo(map);

// Create a polyline using the line coordinates and make the line yellow.
L.polyline(line2,
    {color: "blue",
    weight: '4',
    opacity: '0.5',
    dashArray: '10 10',
    dashOffset: '5'
}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);