function createmapsandcircle(data) {
   
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    });


    var myMap = L.map('map', {
        center: [40.569531, -101.572517],
        zoom: 4,
        layers: [lightmap]
    });

    var featuresData = data.features

    
    for (i = 0; i < featuresData.length; i++) {

        ///determining what color to use
        var coordinates = featuresData[i].geometry.coordinates
        var magnitude = featuresData[i].properties.mag
        var location = featuresData[i].properties.place
        var time = new Date(featuresData[i].properties.time)
        var intensityColor = ""

        function magnitudeColor() {
            switch (true) {
                case magnitude > 6:
                    return "brown";
                case magnitude > 5:
                    return "maroon";
                case magnitude > 4:
                    return "red";
                case magnitude > 3:
                    return "orange";
                case magnitude > 2:
                    return "yellow";
                case magnitude > 1:
                    return "green";
                case magnitude > 0:
                    return "lightgreen"
            }}


        ////// creating the circle
        console.log(intensityColor)
        L.circle([coordinates[1], coordinates[0]], {
        color: magnitudeColor(magnitude),
        opacity: .5,
        fillColor: intensityColor,
        fillOpacity: .6,
        radius: (magnitude * 25000)
        })
        .bindPopup(`Magnitude: ${magnitude}<hr>Location: ${location}<br>Time: ${time}`)
        .addTo(myMap);

    } //end for loop

    //legend

    L.control.layers(null).addTo(myMap);

    // Create a legend to display information about our map
    var info = L.control({
    position: "bottomleft"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
    };
    // Add the info legend to the map
    info.addTo(myMap);


    function updateLegend(magnitude, time) {
    document.querySelector(".legend").innerHTML = [
        "<div class='square' style='width:20px;height:15px;border:5px solid brown; background-color: brown;'>6+</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid maroon; background-color: maroon;'>5-6</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid red; background-color: red;'>4-5</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid orange; background-color: orange;'>3-4</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid yellow; background-color: yellow;'>2-3</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid green; background-color: green;'>1-2</div>",
        "<div class='square' style='width:20px;height:15px;border:5px solid lightgreen; background-color: lightgreen;'>0-1</div>"

    ].join("");
    }
    updateLegend()





      

}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createmapsandcircle);


