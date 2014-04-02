var watchID = 0, 
map,
currentPosition,
directionsDisplay,
directionsService,
selectedMode = "DRIVING",
userLocation=null,
meetingPlace=null;

$(document).on('pageshow','#basic-map',function() {
	
	$('#map_canvas').height($(window).height() - (100 +$('[data-role=header]').height() + $('[data-role=footer]').height()));
			map = new google.maps.Map(document.getElementById('map_canvas'), {
				zoom : 15,
				center : new google.maps.LatLng(38.31491, 26.63799)
			});

			var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.bindTo('bounds', map);
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				    var place = autocomplete.getPlace();
				    if (!place.geometry) {
				      return;
				    }
				    else{
				    	meetingPlace=place.geometry.location
				    }
				  });

			var options = {
				maximumAge : 5000,
				timeout : 10000,
				enableHighAccuracy : true
			};
			watchID = window.navigator.geolocation.watchPosition(wsuccess,
					wfail, options);
		});

function clearWatch() {
	if (watchID > 0) {
		window.navigator.geolocation.clearWatch(watchID);
		watchID = 0;
	}
}

function wsuccess(pos) {
	userLocation = new UserLocationModel(pos.coords.latitude,pos.coords.longitude);
	removePath();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsService = new google.maps.DirectionsService();
	
	currentPosition = new google.maps.LatLng(userLocation.getLatitude(),userLocation.getLongitude());
	map.setCenter(currentPosition);
	directionsDisplay.setMap(map);
	calculateRoute();
};

function wfail(error) {
	console.warn('ERROR(' + error.code + '): ' + error.message);
	alert('ERROR(' + error.code + '): ' + error.message);
};

function calculateRoute() {
	var waypoints = [];
	if (meetingPlace != null) {
	    // if waypoints (via) are set, add them to the waypoints array
	    waypoints.push({
	      location: meetingPlace,
	      stopover: true
	    });
	  }
    var targetDestination = new google.maps.LatLng(38.3124532, 26.745123);
    if (currentPosition && currentPosition != '' && targetDestination && targetDestination != '') {
        var request = {
            origin: currentPosition,
            destination: targetDestination,
			waypoints: waypoints,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: google.maps.DirectionsTravelMode[selectedMode]
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
				$('#directions').empty();
            	directionsDisplay.setOptions({ preserveViewport: true });
                directionsDisplay.setPanel(document.getElementById("directions"));
                directionsDisplay.setDirections(response);
                $("#results").show();
            } else {
                $("#results").hide();
            }
        });
    } else {
        $("#results").hide();
    }
}
function removePath() {
	if(typeof directionsDisplay !== 'undefined') {
		directionsDisplay.setMap(null);
		directionsDisplay = null;
	}
}
function typeRoute(){
	selectedMode = document.getElementById("mode").value;
}

function updateLocation(position,callBack)
{
    $.ajax(
    {
        url: baseUrl+"AddLocation",
        type: "POST",
        data: "{'latitude':" + position.coords.latitude + ",'longitude':" + position.coords.longitude + ",'id':'"+userPhoneNumber+"' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(rsp)
        {
            var info = jQuery.parseJSON(rsp.d);
            callBack(info);
        },
        error: function()
        {
            callBack("error");
        }

    });
}
                    