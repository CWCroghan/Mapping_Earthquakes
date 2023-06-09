// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a dark view tile layer as alternate background
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

 // Create a base layer that holds both maps.
let baseMaps = {
    Light: streets,
    Satellite: satelliteStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL

let torontoHoods  = "https://raw.githubusercontent.com/CWCroghan/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Generating a Popup for each element
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.AREA_NAME);
}

// Create a style for the lines
let mystyle = {color: "#ffffa1", weight: 1.5 }


// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    //console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data).addTo(map);
 
    // Adding the Popup to the maps 
    L.geoJSON(data, {
        style: mystyle,
        onEachFeature: onEachFeature
    }).addTo(map);

});

// end of code

 