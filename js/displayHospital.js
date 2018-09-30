var hospitalesData;



//var icon = new H.map.Icon(svgMarkup);

var hospitalesMarker  = new H.map.Group();
map.addObject(hospitalesMarker);

fetch('http://172.31.29.255:1488/hospitals')  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
		        return;  
		      }

		      // Examine the text in the response  
		      response.json().then(function(data) { 
		      	// Add the data
		        hospitalesData = data;
		        for(i = 0;  i < hospitalesData.length; i++){
					marker = new H.map.Marker({lat:hospitalesData[i].lng, lng:hospitalesData[i].lat}, {icon: icon});
					marker.setData(hospitalesData[i]);
					hospitalesMarker.addObject(marker);
					//console.log(marker.getData(marker));
				}
				//console.log(hospitalesData);
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
});	




var svgMarkup = 'http://172.31.29.255:1488/hospital-3.png';

// Create an icon, an object holding the latitude and longitude, and a marker:
var icon = new H.map.Icon(svgMarkup);


var routingParams = {
  'mode': 'fastest;car;',
  'start': 'geo!33.87041555094183,-86.84692382812499',
  'range': '4000',
  'rangetype': 'time'
};

// Define a callback function to process the isoline response.
var onResult = function(result) {
  var center = new H.geo.Point(
      result.response.center.latitude,
      result.response.center.longitude),
    isolineCoords = result.response.isoline[0].component[0].shape,
    linestring = new H.geo.LineString(),
    isolinePolygon,
    isolineCenter;

  // Add the returned isoline coordinates to a linestring:
  isolineCoords.forEach(function(coords) {
  linestring.pushLatLngAlt.apply(linestring, coords.split(','));
  });

  // Create a polygon and a marker representing the isoline:
  isolinePolygon = new H.map.Polygon(linestring);
  isolineCenter = new H.map.Marker(center);

  // Add the polygon and marker to the map:
  map.addObjects([isolinePolygon]);

  // Center and zoom the map so that the whole isoline polygon is
  // in the viewport:
  map.setViewBounds(isolinePolygon.getBounds());
};

// Get an instance of the routing service:
var router = platform.getRoutingService();

// Call the Routing API to calculate an isoline:
router.calculateIsoline(
  routingParams,
  onResult,
  function(error) {
  alert(error.message);
  }
);




hospitalesMarker.addEventListener('tap', function(evt) {
  // Log 'tap' and 'mouse' events:
  console.log(evt.target.getData()); 
  nameLabel.setHTML(evt.target.getData().name);
});