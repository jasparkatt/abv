//Javascript and leaflet info for my map

//Base map tile declarations


var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',

    mbur1 = 'https://a.tiles.mapbox.com/v4/jasparkatt.o8o63d1b/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA';
mbUr2 = 'https://a.tiles.mapbox.com/v4/jasparkatt.mc7mh1f5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA';
mbUr3 = 'https://a.tiles.mapbox.com/v4/jasparkatt.mg637mmi/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFzcGFya2F0dCIsImEiOiJ0dFVNWUxvIn0.c2iL93m2nRg0gnqSlm5bhA';

var myStyle = {
    "color": "#18009f",
    "weight": 4,
    "opacity": 0.5,
    "dashArray": '4',
    "fillOpacity": 0.4
};

var myStyle1 = {
    "color": " #66a06f",
    "weight": 4,
    "opacity": 0.5,
    "dashArray": '4',
    "fillOpacity": 0.4
};

var CountyForest = {
    "color": "#CC6600",
    "weight": 2,
    "opacity": 0.6,
    "dashArray": '5',
    "fillOpacity": 0.5,
    "fillColor": "#5cf418"
};

var SFAPA = {
    "color": "#c3e508",
    "weight": 2,
    "opacity": 0.5,
    "dashArray": '5',
    "fillOpacity": 0.5,
    "fillColor": "#f7a04a"
};

var ESMT = {
    "color": "#a368a3",
    "weight": 2,
    "opacity": 0.5,
    "dashArray": '5',
    "fillOpacity": 0.5,
    "fillColor": "#ef41e8"
};

var WtrShed = {
    "color": "#020217",
    "weight": 2.5,
    "opacity": 0.35,
    "dashArray": '4',
    "fillOpacity": 0.25,
    "fillColor": "#675ced"
};

var Sprng = {
    "radius": 5,
    "fillColor": "#352493",
    "color": " #7f97fa",
    "weight": 4,
    "fillOpacity": 0.5
};
var cafe5Icon = L.AwesomeMarkers.icon({
    prefix: 'fa',
    markerColor: 'blue',
    icon: 'bold',
    iconColor: 'black'
});

Pencil = L.tileLayer(mbur1, {
    id: 'jasparkatt.o8o63d1b',
    attribution: mbAttr
});

Topo = L.tileLayer(mbUr2, {
    id: 'jasparkatt.mc7mh1f5',
    attribution: mbAttr
});

Aerial = L.tileLayer(mbUr3, {
    id: 'jasparkatt.mg637mmi',
    attribution: mbAttr
});

var baseLayers = {
    "Charcoal": Pencil,
    "Terrain": Topo,
    "Satellite": Aerial
};

var map = L.map('map', {
    center: [44.547, -89.352],
    zoom: 7,
    layers: [Pencil]
});

var Stream1 = L.geoJson(clas1, {
    style: myStyle
});

var Stream2 = L.geoJson(clas2, {
    style: myStyle1
});

var cntyF = L.geoJson(cntyFst, {
    style: CountyForest
});

var SfaPa = L.geoJson(sfaPa, {
    style: SFAPA
});

var myLayer = new L.mapbox.featureLayer()
    .loadURL('https://rawgit.com/jasparkatt/hotspots/master/PvtLnd_Esmnt.json')
    .on('ready', function () {
        myLayer.eachLayer(function (layer) {
            layer.bindPopup(layer.feature.properties.PROP_CODE);
        });
        myLayer.setStyle(ESMT);
    });

var myLayer2 = new L.mapbox.featureLayer()
    .loadURL('https://rawgit.com/jasparkatt/hotspots/master/Watersheds_min.json')
    .on('ready', function () {
        myLayer2.eachLayer(function (layer) {
            layer.bindPopup(layer.feature.properties.WSHED_NM);
        });
        myLayer2.setStyle(WtrShed);
    });

$.getJSON("https://rawgit.com/jasparkatt/hotspots/master/Springs_Data_min.json", function (data) {
    var SprnPts = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: cafe5Icon
            }).on('mouseover', function () {
                this.bindPopup('<b>' + 'Remarks: ' + '</b>' + feature.properties.REMARKS + '<br>' + '<b>' + 'Flow (GPM): ' + '</b>' + feature.properties.GPM + ' <br>' + '<b>' + 'ID #: ' + '</b>' + feature.properties.ID + ' <br>' + '<b>' + 'Name:' + '</b>' + feature.properties.NAME).openPopup();
            });
        }
    });
    var markers = L.markerClusterGroup();
    markers.addLayer(SprnPts);

    //var SprnPts = L.geoJson(springs, {
    //    pointToLayer: function (feature, latlng) {
    //        return L.circleMarker(latlng, Sprng);
    //    }
    //});

    L.control.layers(baseLayers, {
        'Class 1': Stream1,
        'Class 2': Stream2,
        'County Forest': cntyF,
        'SFA/Public Access': SfaPa,
        'Pvt Land Easements': myLayer,
        'Watersheds': myLayer2,
        'Spring Locations': markers
    }).addTo(map);

    L.control.scale().addTo(map);
});