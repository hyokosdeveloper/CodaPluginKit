//!online or offline...
online = window.navigator.onLine;

//!preview map...

var map,
	geocoder,
	marker,
	icon,
	infoWindow,
	infoWindowState,
	trafficLayer,
	transitLayer,
	bicyclingLayer;

//!map markers...
var pinX = 16.5, pinY = 51, pin = 'M16.5,51s-16.5-25.119-16.5-34.327c0-9.2082,7.3873-16.673,16.5-16.673,9.113,0,16.5,7.4648,16.5,16.673,0,9.208-16.5,34.327-16.5,34.327zm0-27.462c3.7523,0,6.7941-3.0737,6.7941-6.8654,0-3.7916-3.0418-6.8654-6.7941-6.8654s-6.7941,3.0737-6.7941,6.8654c0,3.7916,3.0418,6.8654,6.7941,6.8654z';

var starX = 19, starY = 20, star = 'm18.546,22c-1.3807,0-2.5-1.1193-2.5-2.5s1.1193-2.5,2.5-2.5,2.5,1.1193,2.5,2.5-1.1193,2.5-2.5,2.5zm11.461,13.276-2.189-12.763,9.273-9.039-12.814-1.862-5.731-11.612-5.731,11.612-12.815,1.862,6.3251,6.166,2.9477,2.873-2.189,12.763,11.462-6.026z';

var circleX = 16.5, circleY = 16.5, circle = 'M16.5,33c-9.0818,0-16.5-7.119-16.5-16.327,0-9.2082,7.3873-16.673,16.5-16.673,9.113,0,16.5,7.4648,16.5,16.673,0,9.208-7.418,16.327-16.5,16.327zm0-9.462c3.7523,0,6.7941-3.0737,6.7941-6.8654,0-3.7916-3.0418-6.8654-6.7941-6.8654s-6.7941,3.0737-6.7941,6.8654c0,3.7916,3.0418,6.8654,6.7941,6.8654z';

var flagX = 2, flagY = 41, flag = 'M0,38.9947301 C0,40.1022101 0.887729645,41 2,41 L2,41 C3.1045695,41 4,40.1055269 4,38.9947301 L4,2.00526988 C4,0.897789907 3.11227036,0 2,0 L2,0 C0.8954305,0 0,0.894473121 0,2.00526988 L0,38.9947301 L0,38.9947301 Z M5,2 L5,20 L25,20 L18,11 L25,2 L5,2 L5,2 Z';

var shieldX = 14.5, shieldY = 43, shield = 'M28,28.3617021 C28,36.4462108 14.5,43 14.5,43 C14.5,43 1,36.4462108 1,28.3617021 L0,6.40492536 C1.51463471,7.55346267 3.39733927,8.23404255 5.4375,8.23404255 C10.4425805,8.23404255 14.5,5.05281792 14.5,0 C14.5,5.05281792 18.5574195,8.23404255 23.5625,8.23404255 C25.6026607,8.23404255 27.4853653,7.55346267 29,6.40492536 L28,28.3617021 Z';

var arrowX = 19.5, arrowY = 42, arrow = 'M0,20 L19.5,42 L39,20 L35.0000567,20 C32.2386016,20 30,17.763962 30,15.0047466 L30,0 L9,0 L9,15.0047466 C9,17.7635489 6.75213598,20 3.9999433,20 L0,20 Z'; 

//!colorpicker array...
var colorsArray = new Array('#ff0000', '#ff1a00', '#ff3300', '#ff4d00', '#ff6600', '#ff8000', '#ff9900', '#ffb300', '#ffcc00', '#ffe500', '#ffff00', '#e6ff00', '#ccff00', '#b2ff00', '#99ff00', '#80ff00', '#66ff00', '#4cff00', '#33ff00', '#1aff00', '#00ff00', '#00ff19', '#00ff33', '#00ff4d', '#00ff66', '#00ff80', '#00ff99', '#00ffb3', '#00ffcc', '#00ffe6', '#00ff00', '#00e5ff', '#00ccff','#00b2ff', '#0099ff', '#007fff', '#0066ff', '#004cff', '#0033ff', '#0019ff', '#0000ff', '#1900ff', '#3300ff', '#4d00ff', '#6600ff', '#7f00ff', '#9900ff', '#b300ff', '#cc00ff', '#e500ff', '#ff00ff', '#ff00e6', '#ff00cc', '#ff00b2', '#ff0099', '#ff0080', '#ff0066', '#ff004c', '#ff0033', '#ff001a');

var mapStyles = [
	{
		"featureType": "landscape",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "water",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "water",
		"elementType": "labels",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "administrative",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "administrative",
		"elementType": "labels",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "poi",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "road",
		"stylers": [
			{ "visibility": "on" }
		]
	},{
		"featureType": "transit",
		"stylers": [
			{ "visibility": "on" }
		]
	}
];

//!init map...
function initialize() {
	
	geocoder = new google.maps.Geocoder();
	
	var latLang = new google.maps.LatLng(41.8723889, 12.48018019999995);
	
	var mapOptions = {
		zoom: 8,
		center: latLang,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false
		}

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	trafficLayer 	= new google.maps.TrafficLayer();
	transitLayer 	= new google.maps.TransitLayer();
	bicyclingLayer 	= new google.maps.BicyclingLayer();
	
	//!update map center...
	google.maps.event.addListener(map, 'center_changed', function() {
		
		$('#map-lat').val(map.getCenter().lat());
		$('#map-lng').val(map.getCenter().lng());
		
	});
	
	//!update map zoom controls...
	google.maps.event.addListener(map, 'zoom_changed', function() {
		
		var zoomLevel = map.getZoom();		
		$('#zoom').val(zoomLevel);
		$('#zoom-level').val(zoomLevel);
	});
	
	//!update map type controls...
	google.maps.event.addListener(map, 'maptypeid_changed', function() {
		
		var maptype = map.mapTypeId;
	
		switch(maptype) {
		case 'roadmap':
			
			$('#map-type').val('ROADMAP');
			break;
		case 'terrain':
			
			$('#map-type').val('TERRAIN');
			break;
		case 'satellite':
			
			$('#map-type').val('SATELLITE');
			break;
		default:
			
			$('#map-type').val('HYBRID');
		}
	});
	
	
}//end map initialize...


function geocodeAddress() {

	if(online) {

		var address = $('#location').val();
		
		geocoder.geocode( { 'address': address}, function(results, status) {
		
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			
			$('#geo-lat').val(results[0].geometry.location.lat());
			$('#geo-lng').val(results[0].geometry.location.lng());
			
			
			if($('#show-marker').is(':checked')) {
				
				marker.setPosition(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
				
				$('#marker-lat').val(results[0].geometry.location.lat());
				$('#marker-lng').val(results[0].geometry.location.lng());
				
			}
			
			
		} else {
		
		alert('Geocode was not successful for the following reason: ' + status);
		}
		
		});

	} else {
		
		alert('Your Mac must be online for Geolocation to work');
		
	}
}


function checkResize(){ 
	
	//resize preview...
	setMainPosition();
	
	//if online center map...
	if(online) {
		var center = map.getCenter(); 
		google.maps.event.trigger(map, 'resize'); 
		map.setCenter(center); 
	}

}
	
window.onresize = checkResize;

//if online init map...
if(online) {

	google.maps.event.addDomListener(window, 'load', initialize);
	
	
	google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open;
	google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close;
	google.maps.InfoWindow.prototype._openedState = false;

	google.maps.InfoWindow.prototype.open =
		function (map, anchor) {
			this._openedState = true;
			this._open(map, anchor);
			$('#info-window-state').val('true');
		};

	google.maps.InfoWindow.prototype.close =
		function () {
			this._openedState = false;
			this._close();
			$('#info-window-state').val('false');
		};

	google.maps.InfoWindow.prototype.getOpenedState =
		function () {
			return this._openedState;
		};

	google.maps.InfoWindow.prototype.setOpenedState =
		function (val) {
		this._openedState = val;
		$('#info-window-state').val(infoWindow.getOpenedState());
	};
}


//!set <main> position based on header height...
function setMainPosition() {
		
	var height = $('header').height();
	
	$('main').css('top', height + 'px');
}


//!toggle disabled attribute...
(function($) {

	$.fn.toggleDisabled = function() {
		
		return this.each(function() {
		
			this.disabled = !this.disabled;
		});
	};

})(jQuery);
	


//!docready...
$(document).ready(function() {
	
	setMainPosition();
	
	
	//!search...
	$('#search').click(function() {
		
		geocodeAddress();		
	});
	
	
	//!submit input on enter...
	$('#location').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (code == 13) {
			e.preventDefault();
			e.stopPropagation();
		
			$(this).blur();
			
			if(online) {
				
				geocodeAddress();
			}
		}
	});
	
	
	//!toggle sections...
	$('main > dl > dt').click(function() {
		$(this).toggleClass('opened').next().slideToggle('fast');
	});
	
	
	//!toggle optional controls...
	$('.has-options').click(function() {

		$(this).next().slideToggle('fast').find(' > .row > select, > .row > input, > .row > textarea, > .row > .input-wrap > input, > .row > .slider-wrap > input').toggleDisabled();

		if($(this).hasClass('show-marker')) {

			$('.marker-location').slideToggle('fast');
		}
	});
	
	
	//!generate button...
	$('#generate').click(function() {
		
		generateMapCode();		
	});
	
	
	//!reload button...
	$('#reload').click(function() {

		location.reload();
	})
	
	
	//! CONTROLS...
	
	//! LAT / LNG inputs...
	$('#map-lat, #map-lng').blur(function() {
		
		if(online) {
		
			map.setCenter(new google.maps.LatLng($('#map-lat').val(), $('#map-lng').val()))	
		}
	});
	
	$('#map-lat, #map-lng').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (code == 13) {
			e.preventDefault();
			e.stopPropagation();
		
			$(this).blur();
			map.setCenter(new google.maps.LatLng($('#map-lat').val(), $('#map-lng').val()));
		}
	});
	
	
	//!maptype...
	$('#map-type').change(function() {
		
		if(online) {
			eval('map.setMapTypeId(google.maps.MapTypeId.' + $(this).val() + ');');
		}			
	});
	
	
	//!show map type control...
	$('#show-map-type').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('mapTypeControl', true);
			
			} else {
				
				map.set('mapTypeControl', false);				
			}
		}	
	});
	
	
	//!map type control options...
	$('#map-type-menu, #map-type-position').change(function() {
		
		if(online) {
		
			var type = $('#map-type-menu').val();
			var position = $('#map-type-position').val();
				
			eval('map.setOptions({mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.' + type + ', position: google.maps.ControlPosition.' + position + '}});');
		}	
	});
	
	
	//!zoom slider...
	$('#zoom').on('input', function(){
		
		if(online) {
			
			var zoom = parseInt($('#zoom').val());
			map.set('zoom', zoom);
		}	
	});
	
	
	//!show zoom control...
	$('#show-zoom').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('zoomControl', true);
			
			} else {
				
				map.set('zoomControl', false);	
			}
		}
	});
	
	
	//!zoom control options...
	$('#zoom-type-menu, #zoom-position').change(function() {
		
		if(online) {
		
			var style = $('#zoom-type-menu').val();
			var position = $('#zoom-position').val();
				
			eval('map.setOptions({zoomControlOptions: {position: google.maps.ControlPosition.' + position + ', style: google.maps.ZoomControlStyle.' + style + '}});');
		}
		
	});
	
	
	//!show pan control...
	$('#show-pan').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('panControl', true);
			
			} else {
				
				map.set('panControl', false);
			}
		}	
	});
	
	
	//!pan control options...
	$('#pan-position').change(function() {
		
		if(online) {
		
			var position = $(this).val();
				
			eval('map.setOptions({panControlOptions: {position: google.maps.ControlPosition.' + position + '}});');
		}		
	});
	
	
	//!make marker...
	function makeMarker() {
		
		var center = map.getCenter();
				
		function updateMarkerPosition() {
			$('#marker-lat').val(marker.getPosition().lat());
			$('#marker-lng').val(marker.getPosition().lng());
		}
		
		marker = new google.maps.Marker({
			position: center,
			map: map,
			draggable:true,
			animation: google.maps.Animation.DROP
		});
		
		//get title
		marker.setTitle($('#marker-title').val());
		
		var path, pathX, pathY, scale;
		
		//get path & anchor
		switch ($('#marker-shape').val()) {
			
			case 'pin':
			
				path = pin; pathX = pinX; pathY = pinY;
				break;
			
			case 'star':
				
				path = star; pathX = starX; pathY = starY;
				break;
				
			case 'circle':
			
				path = circle; pathX = circleX; pathY = circleY;
				break;
			
			case 'flag':
			
				path = flag; pathX = flagX; pathY = flagY;
				break;
			
			case 'shield':
			
				path = shield; pathX = shieldX; pathY = shieldY;
				break;
				
			default:
			
				path = arrow; pathX = arrowX; pathY = arrowY;
		}
		
		switch ($('#marker-size').val()) {
			
			case 'small':
			
				scale = .66;
				break;
				
			case 'large':
			
				scale = 1.33;
				break;
			
			default:
			
				scale = 1;
		}
		
		var icon = {
			
			path: path,
			fillColor: $('#marker-color').val(),
			fillOpacity: parseFloat($('#fill-opacity').val()),
			anchor: new google.maps.Point(pathX, pathY),
			strokeWeight: 0,
			scale: scale
		}
		
		if($('#show-stroke').is(':checked')) {
			
			icon.strokeWeight = parseInt($('#stroke-width').val());
			icon.strokeColor = $('#stroke-color').val();
			icon.strokeOpacity = parseFloat($('#stroke-opacity').val());
			
		}
		
						
		marker.setIcon(icon);
		
		updateMarkerPosition();
		
		google.maps.event.addListener(marker, 'dragend', function() {
			
			updateMarkerPosition();
		});
		
		if($('#add-info-window').is(':checked')) {
			
			addInfoWindow();
				
		}
		
	}
	
	
	//!show marker...
	$('#show-marker').click(function() {
		
		if(online) {
			
			if($(this).is(':checked')) {
				
				makeMarker();
				
			} else {
				
				marker.setMap(null);
			}
			
		} else {
			
			//center marker on map...
			var lat = $('#map-lat').val();
			var lng = $('#map-lng').val();
		
			$('#marker-lat').val(lat);
			$('#marker-lng').val(lng);			
		}
	});
	
	
	//!update marker...
	function updateMarkerStyle() {
		
		var icon = marker.getIcon();
		
		switch ($('#marker-shape').val()) {
			
			case 'pin':
			
				icon.path = pin;
				icon.anchor = new google.maps.Point(pinX, pinY);
				break;
			
			case 'star':
				
				icon.path = star;
				icon.anchor = new google.maps.Point(starX, starY);
				break;
				
			case 'circle':
			
				icon.path = circle;
				icon.anchor = new google.maps.Point(circleX, circleY);
				break;
			
			case 'flag':
			
				icon.path = flag;
				icon.anchor = new google.maps.Point(flagX, flagY);
				break;
				
			case 'shield':
			
				icon.path = shield;
				icon.anchor = new google.maps.Point(shieldX, shieldY);
				break;
				
			default:
			
				icon.path = arrow;
				icon.anchor = new google.maps.Point(arrowX, arrowY);
		}
		
		switch ($('#marker-size').val()) {
			
			case 'small':
			
				icon.scale = .66;
				break;
				
			case 'large':
			
				icon.scale = 1.33;
				break;
			
			default:
			
				icon.scale = 1;
		}
		
		icon.fillColor = $('#marker-color').val();
		icon.fillOpacity = parseFloat($('#fill-opacity').val());
		
		if($('#show-stroke').is(':checked')) {
			
			icon.strokeWeight = parseInt($('#stroke-width').val());
			icon.strokeColor = $('#stroke-color').val();
			icon.strokeOpacity = parseFloat($('#stroke-opacity').val());			
		}
		
		
		marker.setIcon(icon);		
		marker.setTitle($('#marker-title').val());		
	}
	
	
	//!marker title...
	$('#marker-title').blur(function() {
		
		if(online) {
		
			updateMarkerStyle();
		}
	});

	
	$('#marker-title').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (code == 13) {
			e.preventDefault();
			e.stopPropagation();
		
			$(this).blur();
			
			if(online) {
			
				updateMarkerStyle();
			}
		}
	});

		
	//!marker shape, color etc...
	$('#marker-shape, #marker-size, #marker-color, #stroke-color').change(function() {
		
		if(online) {
			
			updateMarkerStyle();
		}
	});
	
	
	//!marker sliders...
	$('#fill-opacity, #stroke-width, #stroke-opacity').on('input', function(){
		
		var level = $(this).val();
		
		$(this).parent().next().val(level);
		
		if(online) {
			
			updateMarkerStyle();
		}
	});
	
	//!marker lat, lng...
	$('#marker-lat, #marker-lng').blur(function() {
		
		if(online) {
		
			marker.setPosition(new google.maps.LatLng($('#marker-lat').val(), $('#marker-lng').val()));	
		}
	});

	
	$('#marker-lat, #marker-lng').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (code == 13) {
			e.preventDefault();
			e.stopPropagation();
		
			$(this).blur();
			
			if(online) {
			
				marker.setPosition(new google.maps.LatLng($('#marker-lat').val(), $('#marker-lng').val()));
			}
		}
	});

	
	
	//!center on marker...
	$('#center-on-marker').click(function() {
		
		if(online) {
			
			//if online center map on marker...
			var lat = $('#marker-lat').val();
			var lng = $('#marker-lng').val();
		
			$('#map-lat').val(lat);
			$('#map-lng').val(lng);
			
			map.setCenter(new google.maps.LatLng(lat, lng));
		
		} else {
			
			//if offline center marker on map...
			var lat = $('#map-lat').val();
			var lng = $('#map-lng').val();
		
			$('#marker-lat').val(lat);
			$('#marker-lng').val(lng);
		}
		
	});
	
	
	//!show stroke...
	$('#show-stroke').click(function() {
	
		if(online) {
			
			if($(this).is(':checked')) {
				
				updateMarkerStyle();
				
				
			} else {
				
				var icon = marker.getIcon();
				
				icon.strokeWeight = 0;
			
				marker.setIcon(icon);				
			}
		}
	});
	
	
	//!show infowindow...
	$('#add-info-window').click(function() {
		
		if(online) {
		
			if($('#show-marker').is(':checked')) {
		
				if($(this).is(':checked')) {
				
					addInfoWindow();
					
				} else {
	
					infoWindow.setMap(null);
					infoWindow = null;		
				}
			}			
		}
	});
	
	
	//!addInfoWindow...
	function addInfoWindow() {

		if(online) {
					
			infoWindow = new google.maps.InfoWindow({});
				
			//!info window marker click listener...	
			google.maps.event.addListener(marker, 'click', function() {
				
				var width = $('#info-window-width').val();
				
				var content = '<div class="window-content"';
				
				if(width.length > 0) {
					
					content += ' style="width: ' + width + 'px"';					
				}
				
				content += '>' +
				
			$('#info-window').val().replace(/\n/g, "<br>") +
			
			'</div>';
			
				infoWindow.setContent(content);
				
				infoWindow.open(map,marker);
			});
			
			//!info window close listener...
			(function (w) {
				
				google.maps.event.addListener(w, "closeclick", function (e) {
					
					w.setOpenedState(false);					
				});
			
			})(infoWindow);
		}	
	}
	
	
	//!update info window content...
	$('#info-window, #info-window-width').blur(function() {
		
		if(online) {
		
			updateInfoWindow();
		}
	});

	
	$('#info-window, #info-window-width').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (code == 13) {
			e.preventDefault();
			e.stopPropagation();
		
			$(this).blur();
			
			if(online) {
			
				updateInfoWindow();
			}
		}
	});
	
	
	//!update info window...
	function updateInfoWindow() {
		
		if(online) {
			
			//if marker exists...
			var state = $('#info-window-state').val();
			
			if(state === 'true') {
				
				infoWindow.setMap(null);
				infoWindow = null;
				
				addInfoWindow();
				
				var width = $('#info-window-width').val();
				
				var content = '<div class="window-content"';
				
				if(width.length > 0) {
					
					content += ' style="width: ' + width + 'px"';					
				}
				
				content += '>' +
				
			$('#info-window').val().replace(/\n/g, "<br>") +
			
			'</div>';
			
				infoWindow.setContent(content);
				
				infoWindow.open(map, marker);
								
			} else {
				
				addInfoWindow();				
			}
		}
	}
	
	
	//!show streetview control...
	$('#show-streetview').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('streetViewControl', true);
			
			} else {
				
				map.set('streetViewControl', false);
			}
		}	
	});
	
	
	//!streetview control options...
	$('#streetview-position').change(function() {
		
		if(online) {
		
			var position = $(this).val();
				
			eval('map.setOptions({streetViewControlOptions: {position: google.maps.ControlPosition.' + position + '}});');
		}
	});
	
	
	//!scale control...
	$('#show-scale').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('scaleControl', true);
			
			} else {
				
				map.set('scaleControl', false);
			}
		}
	});
	
	
	//!disable mouse scroll...
	$('#scrollwheel').click(function() {
		
		if(online) {
			
			if($(this).is(':checked')) {
				
				map.set('scrollwheel', false);
					
			} else {
				
				map.set('scrollwheel', true);				
			}
		}
	});
	
	
	//!overview control...
	$('#show-overview').click(function() {
		
		if(online) {
		
			if ($(this).is(':checked')) {
			
				map.set('overviewMapControl', true);
			
			} else {
				
				map.set('overviewMapControl', false);
			}
		}
	});
	
	
	//!traffic layer...
	$('#traffic').click(function() {
		
		if(online) {
		
			if($(this).is(':checked')) {
				
				trafficLayer.setMap(map);
				
			} else {
				
				trafficLayer.setMap(null);
			}
		}
	});
	
	
	//transit layer...
	$('#transit').click(function() {
		
		if(online) {
		
			if($(this).is(':checked')) {
				
				transitLayer.setMap(map);
				
			} else {
				
				transitLayer.setMap(null);
			}
		}
	});
	
	
	//!bicycling layer...
	$('#bicycling').click(function() {
		
		if(online) {
		
			if($(this).is(':checked')) {
				
				bicyclingLayer.setMap(map);
				
			} else {
				
				bicyclingLayer.setMap(null);
			}
		}
	});
	
	
	//!customize map...
	$('.set-map-style').click(function() {
		
		if(online) {
			
			if($('#show-styles').is(':checked')) {
				
				updateMapStyles();
				
				map.setOptions({styles: mapStyles});
				
			} else {
				
				map.setOptions({styles: null});				
			}
		}
	});
	
	$('.colorpicker input').change(function() {
		
		if(online) {
			
			updateMapStyles();
			
			map.setOptions({styles: mapStyles});
		}
	});
	
	
	//!update map styles...
	function updateMapStyles() {
		
		function setMapColor(id, key) {
			
			if($('#' + id + '-color').is(':checked')) {
				
				var hue = colorsArray[$('#' + id + '-h').val()];
				var sat = parseInt($('#' + id + '-s').val());
				var lig = parseInt($('#' + id + '-l').val());
				var gam = parseFloat($('#' + id + '-g').val());
				
				mapStyles[key].stylers.splice(1,0,{ "hue": hue });
				mapStyles[key].stylers.splice(2,1,{ "saturation": sat });
				mapStyles[key].stylers.splice(3,2,{ "lightness": lig });
				mapStyles[key].stylers.splice(4,3,{ "gamma": gam });
			
			} else {
				
				mapStyles[key].stylers.splice(1,4);
			}
		}
		
		//land...
		if($('#land').is(':checked')) {
			
			mapStyles[0].stylers[0].visibility = "on";
			
			setMapColor('land', 0);
			
		} else {
			
			mapStyles[0].stylers[0].visibility = "off";
		}
		
		
		//water...
		if($('#water').is(':checked')) {
			
			mapStyles[1].stylers[0].visibility = "on";
			
			setMapColor('water', 1);

		} else {
			
			mapStyles[1].stylers[0].visibility = "off";
		}
		
		
		//water labels...
		if($('#water-labels').is(':checked')) {
			
			mapStyles[2].stylers[0].visibility = "on";
			
		} else {
			
			mapStyles[2].stylers[0].visibility = "off";
		}
		
		
		//admin...
		if($('#admin').is(':checked')) {
			
			mapStyles[3].stylers[0].visibility = "on";
			
			setMapColor('admin', 3);
			
		} else {
			
			mapStyles[3].stylers[0].visibility = "off";
		}
		
		
		//admin labels...
		if($('#admin-labels').is(':checked')) {
			
			mapStyles[4].stylers[0].visibility = "on";
			
		} else {
			
			mapStyles[4].stylers[0].visibility = "off";
		}
		
		
		//poi...
		if($('#poi').is(':checked')) {
			
			mapStyles[5].stylers[0].visibility = "on";
			
			setMapColor('poi', 5);
			
		} else {
			
			mapStyles[5].stylers[0].visibility = "off";
		}
		
		
		//roads...
		if($('#road').is(':checked')) {
			
			mapStyles[6].stylers[0].visibility = "on";
			
			setMapColor('road', 6);
			
		} else {
			
			mapStyles[6].stylers[0].visibility = "off";
		}
		
		
		//transit...
		if($('#trans').is(':checked')) {
			
			mapStyles[7].stylers[0].visibility = "on";
			
			setMapColor('trans', 7);
			
		} else {
			
			mapStyles[7].stylers[0].visibility = "off";
		}
	}
	
});
