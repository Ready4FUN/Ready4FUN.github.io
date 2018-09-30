function dataAnalysisClick(){
	document.location.href = "dataAnalysisPage.html"
}


function logisticClick(){
	document.location.href = "logisticPage.html"
}



var heatmapProvider = new H.data.heatmap.Provider({
			type: 'value',
			colors: new H.data.heatmap.Colors({
				'0':   '#008', // dark blue
	 			'0.2': '#0b0', // medium green
	 			'0.5': '#ff0', // yellow
	 			'0.7': '#f00'  // red
			}, true),
			// Paint assumed values in regions where no data is available
			assumeValues: false
});

let diseaseChoise = 'hepatites';

//обработка нажатия селекта
select.addEventListener('change', () => {
    diseaseChoise = disease[parseInt(select.getValue())].toLowerCase();
    getDataHM(slider.value, diseaseChoise);	
});


// Create a semi-transparent heat map layer
var heatmapLayer = new H.map.layer.TileLayer(heatmapProvider, {
	opacity: 0.6
});

// Add the layer to the map
map.addLayer(heatmapLayer)

//slider here
var slider = document.getElementById("weekDisiase");


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
   		getDataHM(slider.value, diseaseChoise);	
} 



function getDataHM(value, disease){
	heatmapProvider.clear();

	fetch('http://172.31.29.255:1488/getDisease?week=' + value + '&disease=' + disease)  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
		        return;  
		      }

		      // Examine the text in the response  
		      response.json().then(function(data) { 
		      	// Add the data
		        heatmapProvider.addData(data); 
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		});
}
