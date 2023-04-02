// Add console.log to check to see if our code is working.
console.log("working");

// ----------------------- Single Point data  ----------------
// Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"14",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Adding geoJson data with bindPopup pointToLayer
// L.geoJSON(sanFranAirport,{
//     pointToLayer:function(feature,latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.city + "," + feature.properties.country + "</h2> <h4>" + feature.properties.name + "</h4> ");
//     }
// }).addTo(map);


// // Adding geoJson data with onEachFeature popup
// L.geoJSON(sanFranAirport,{
//     onEachFeature:function(feature,layer){
//         console.log(layer);
//         layer.bindPopup("<h2> Code: "+ feature.properties.faa + " <br> Name: "+ feature.properties.name + "</h2>")
//     }
// }).addTo(map);

// // We create the tile layer that will be the background of our map.
// let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         accessToken: API_KEY
//     });

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
// ----------------------- Single Point data End -----------------

// We create the tile layer that will be the background of our map.
let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a dark view tile layer as alternate background
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

 // Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL

let airportData = "https://raw.githubusercontent.com/CWCroghan/Mapping_Earthquakes/main/majorAirports.json";

// Generating a Popup for each element
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.name);
}

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    //console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data).addTo(map);

    // Adding the Popup to the maps 
    L.geoJSON(data, {
    onEachFeature: onEachFeature
    }).addTo(map);
});

// end of code