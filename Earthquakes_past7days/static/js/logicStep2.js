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
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL

let earthquake  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Adding Style to the output by using data to determing raidus

function styleInfo(feature){
    return {
        opacity:1,
        fileOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

function getRadius(magnitude){
    if (magnitude == 0) {
        return 1;
    }
    return magnitude *4;
}


// Grabbing our GeoJSON data.
d3.json(earthquake).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Changing marker to circle
        pointToLayer: function (feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo
    }).addTo(map);
      
});

// end of code

// storing code that might be useful here

// // Generating a Popup for each element
// function onEachFeature(feature, layer) {
//     layer.bindPopup(feature.properties.AREA_NAME);
// }


// // Adding the Popup to the maps 
// L.geoJSON(data, {
//     style: mystyle,
//     onEachFeature: onEachFeature
// }).addTo(map);

// End of code Storage