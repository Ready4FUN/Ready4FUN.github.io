// Initialize the platform object:
	    var platform = new H.service.Platform({
	    'app_id': '4XeWgoNVvORJz4lkZQhv',
	    'app_code': 'vdYLl9afBxZoVYtRG7jbaQ'
	    });

	    // Obtain the default map types from the platform object
	    var maptypes = platform.createDefaultLayers();
	    const pixelRatio = devicePixelRatio > 1 ? 2 : 1;

	    // Instantiate (and display) a map object:
	    const map = new H.Map(
	    document.getElementById('mapContainer'),
	    platform.getMapTileService({
        	type: 'base'
    	}).createTileLayer(
        	'maptile',
        	'reduced.day',
        	256 * pixelRatio, // bigger tile size for retina
        	'png'
    	), {
    		center:  new H.geo.Point(37, -97),
        	zoom: 5,
        	style: 'default',
        	pixelRatio: pixelRatio,
    	});

	    var mapEvents = new H.mapevents.MapEvents(map);
	    
	   	var behavior = new H.mapevents.Behavior(mapEvents);


 		let ui = H.ui.UI.createDefault(map, maptypes);
		ui.removeControl('mapsettings');