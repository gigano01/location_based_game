async function load_json_data() {
	const fetched = await fetch('../../data/location_data.json');
	const data = await fetched.json()
	console.log(data)
	
	return data
}

//we moeten wachten tot alle JSON data geladen werd.
//hierna kan de rest van de code geladen worden
//Javascript is hier echt dom om, maar dit is de beste manier om het te doen :c
async function drawpage() {
	const json_data = await load_json_data()

	const locationData = json_data[getQueryParam("locationID")]

	//gooi een criticale error wanneer de locationID invalide is.
	if (locationData == undefined) {
		location.assign("../error/index.html?error=locationID-invalid")
	}

	console.log(`De geladen locatiedata is:`)
	console.log(locationData)
	
	
	// neem html elementen vast
	const locationNameElement = document.querySelector('#location-name');
	const distanceElement = document.querySelector('#distance');
	
	// definieer radius waarbinnen doelen gevonden mogen worden
	const successRadiusInMeter = locationData.minimumRadius;
	
	// haal alle query parameters op
	const coordinatesParam = locationData.coordinates;
	const coordinates = {
		latitude: coordinatesParam.latitude,
		longitude: coordinatesParam.longtitude,
	}
	
	const locationName = locationData.name;
	locationNameElement.textContent = locationName;
	
	const nextPage = locationData.nextPage;
	
	// sla gegevens op in localStorage om later de draad terug op te kunnen pikken
	localStorage.setItem('locationID', getQueryParam("locationID"));

	let map = null;
	let markerEnd = null;
	let markerGPS = null;
	
	
	// deze functie wordt opgeroepen elke keer een nieuwe locatie doorkomt
	function success(position) {
		if (map) {
			map.flyTo({
			  center: [position.coords.longitude, position.coords.latitude]
			});
		  } else {
			map = createMap("myID", position.coords.latitude, position.coords.longitude, 15, 'mapbox://styles/noahvanleemput/clpgydb7a00jt01poe8ucfwgw');
			markerEnd = createMarker(map, 'markerEnd', 42, 42, 'https://vaw.be/cacher/pin-454.png',coordinates.latitude, coordinates.longitude, false);
		  }
		
		  if (markerGPS) {
			markerGPS.setLngLat([position.coords.longitude, position.coords.latitude]);
		  } else {
			markerGPS = createMarker(map, 'markerGPS', 42, 42, 'https://vaw.be/cacher/gps-454.png',position.coords.latitude, position.coords.longitude, false);
		  }

		console.log('succes', position)
		// bereken afstand tussen mijn locatie en die van mijn doel
		const distance = getDistance(position.coords.latitude, position.coords.longitude, coordinates.latitude, coordinates.longitude).distance;
		// laat die afstand zien
		console.log(distance);
		distanceElement.textContent = distance;
	
		// de afstand tussen mijn locatie en die van mijn doel is minder dan 20 meter, rekeninghoudend met de accuraatheid van gps?
		if (distance < successRadiusInMeter + Math.min(position.coords.accuracy/2, successRadiusInMeter)) {
			// navigeer naar de pagina die getoond moet worden als ik in 20 meter van locatie ben
			location.assign(`../${nextPage}/index.html`)
		}
	}
	
	// wanneer geen gps beschikbaar is
	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	}
	
	// check if page lives in the test iframe
	if (isInIframe()) {
	
		// get map gps positions
		function handleMessage (evt) {
			success({coords: {latitude: evt.data.lat, longitude: evt.data.lng, accuracy: 35}});
		}
		// listen to messages from test-iframe
		window.addEventListener("message", handleMessage, false);
		parent.postMessage({message: "navigate-init"}, "*");
		parent.postMessage({message: "navigate-localstorage", coordinates: coordinatesParam, locationName, nextPage}, "*");
	
	} else {
	
		// options for geolocation
		const options = {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 0
		};
	
		// access real gps data
		navigator.geolocation.watchPosition(success, error, options);
		console.log('hallo')
	}
}
fetch('../../data/gps_data.json')
    .then(response => response.json())
    .then(data => {
        // Get the current location
        navigator.geolocation.getCurrentPosition(position => {
            // Compare the current location with the coordinates in the JSON object
            data.forEach(item => {
                if (item.coord.latitude === position.coords.latitude && item.coord.longitude === position.coords.longitude) {
                    // Update the HTML content of the box with the corresponding instruction
                    document.getElementById('instructionbox').innerHTML = item.instructie;
                }
            });
        });
    });

drawpage()

/*  OUDE CODE
load_json_data().then( (json_data) => {
		//
)
*/