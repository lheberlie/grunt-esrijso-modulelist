var map;

require([
    "dojo/dom-construct", "dojo/parser",
    "esri/dijit/HistogramTimeSlider", "esri/InfoTemplate",
    "esri/layers/FeatureLayer", "esri/map",
    "dojo/domReady!", "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer"
], function (domConstruct, parser, HistogramTimeSlider, InfoTemplate, FeatureLayer, Map) {
        parser.parse();

        map = new Map("mapDiv", {
            basemap: "oceans",
            center: [-100, 40],
            zoom: 4
        });

        // feature service with U2 concerts from 1980 - 2011
        var featuresUrl = "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/U2/FeatureServer/0";
        var layer = new FeatureLayer(featuresUrl, {
            id: "u2",
            infoTemplate: new InfoTemplate(
                "U2 Concerts:  1980  2011",
                "Date:  ${Date:DateFormat(selector: "date", fullYear: true)}<br>" +
                    "Venue:  ${Venue}, ${City}, ${State}<br>" +
                    "Tour:  ${Tour}"
            ),
            // infoTemplate: new InfoTemplate("title", "description"),
            mode: FeatureLayer.MODE_SNAPSHOT, // SNAPSHOT required for the histogram time slider
            outFields: ["*"]
        });

        var layerUpdateEnd = layer.on("update-end", function () {
            layerUpdateEnd.remove();

            var sliderElem = domConstruct.create("div", {
                id: "timeSlider_" + map.id,
                style: "margin-bottom:10px; bottom:33px"
            }, "bottom-div");
            var sliderParams = {
                // format the dates as mm/dd/yyyy
                // more formatting options:  https://developers.arcgis.com/en/javascript/jshelp/intro_formatinfowindow.html
                dateFormat: "DateFormat(selector: \"date\", fullYear: true)",
                layers: [ layer ],
                mode: "show_all",
                timeInterval: "esriTimeUnitsYears"
            };
            var slider = new HistogramTimeSlider(sliderParams, sliderElem);
            map.setTimeSlider(slider);
            domConstruct.destroy("loading");
        });

        map.addLayer(layer);
    }
);