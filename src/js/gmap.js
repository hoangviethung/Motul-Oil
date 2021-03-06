function initialize() {
	// Nếu mà vị trí bằng rỗng thì trả về Hồ Chí Minh
	var latLocation, lngLocation;
	if (inputLocations.length != 0) {
		latLocation = inputLocations[0].lat;
		lngLocation = inputLocations[0].lng;
	} else {
		latLocation = '10.823181';
		lngLocation = '106.629675';
	}

	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(latLocation, lngLocation),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [{
				"saturation": 36
			}, {
				"color": "#000000"
			}, {
				"lightness": 40
			}]
		}, {
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#000000"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "all",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 17
			}, {
				"weight": 1.2
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "landscape",
			"elementType": "labels.text",
			"stylers": [{
				"saturation": "-6"
			}, {
				"lightness": "12"
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 21
			}]
		}, {
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [{
				"saturation": "1"
			}, {
				"lightness": "-1"
			}, {
				"visibility": "on"
			}, {
				"color": "#a2a2a2"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [{
				"saturation": "9"
			}, {
				"gamma": "0.93"
			}, {
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"lightness": 17
			}, {
				"visibility": "simplified"
			}, {
				"color": "#ED1D24"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 29
			}, {
				"weight": 0.2
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 18
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 19
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#dedede"
			}, {
				"lightness": 17
			}]
		}, {
			"featureType": "water",
			"elementType": "labels.text",
			"stylers": [{
				"color": "#ffffff"
			}]
		}],
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var locations = inputLocations;

	var marker, i;
	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});

	var bounds = new google.maps.LatLngBounds();


	var count = 0;
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
			map: map,
			icon: locations[i].icon
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				map.setCenter(marker.getPosition());
				infowindow.setContent(
					'<div class="maker-info row"><div class="img-maker">' +
					'<img src="' + locations[i].image +
					'"></div><div class="detail-maker"><h6>' + locations[i].name +
					'</h6><p><strong>Địa chỉ:</strong>' + locations[i].address +
					'</p><p><strong>Điện thoại:</strong> ' + locations[i].phone +
					'</p></div><div class="clearfix"></div></div>'
				);
				infowindow.open(map, marker);
			}
		})(marker, i));

		markers.push(marker);

		var item1 = new google.maps.LatLng(locations[i].lat, locations[i].lng)

		if (bounds.contains(item1) === false && count <15) {
			bounds.extend(item1);
			count++;
		}
	}

	if (locations.length > 1) {
		map.fitBounds(bounds);
	}
}

if ($('#map').length > 0) {
	google.maps.event.addDomListener(window, 'load', initialize);
}

function myClick(id) {
	google.maps.event.trigger(markers[id], 'click');
	$("html,body").animate({
		scrollTop: $("#map").offset().top - 70
	}, 1200)
}