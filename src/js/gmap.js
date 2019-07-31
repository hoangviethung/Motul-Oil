var markers = [];

function getLocationInViewPort(map, locations) {
	var bounds = map.getBounds();
	var markerInViewPort = [];
	for (var j = 0; j < locations.length; j++) {
		var marker2 = new google.maps.Marker({
			position: new google.maps.LatLng(locations[j].lat, locations[j].lng),
		});
		if (bounds.contains(marker2.getPosition()) === true) {
			markerInViewPort.push(locations[j])
		}
	}
	// Array.prototype.forEach.call(markerInViewPort, function (location) {
	// 	console.log(location)
	// })
	return markerInViewPort;
}

function initialize() {
	if (document.querySelectorAll("#map").length > 0) {
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(10.763806, 106.691302),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "landscape", "elementType": "labels.text", "stylers": [{ "saturation": "-6" }, { "lightness": "12" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "saturation": "1" }, { "lightness": "-1" }, { "visibility": "on" }, { "color": "#a2a2a2" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "saturation": "9" }, { "gamma": "0.93" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "lightness": 17 }, { "visibility": "simplified" }, { "color": "#4f4f4f" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#ed1d24" }, { "lightness": 17 }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "color": "#ffffff" }] }],
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var locations = [{
			lat: 10.763806,
			lng: 106.691302,
			name: 'HO CHI MINH',
			// icon: 'resources/images/icons/icon_map.png',
			address: '166A Trần Hưng Đạo ,P.Nguyễn Cư Trinh, Quận 1 ,TP. HCM',
			phone: '(+028) 3606 8688',
		},
		{
			lat: 10.776201,
			lng: 106.687059,
			name: 'Bảo Tàng Chứng Tích Chiến Tranh',
			// icon: 'resources/images/icons/icon_map.png',
			address: '28 Võ Văn Tần, P.6, Quận 3, TP. Hồ Chí Minh, Việt Nam',
			phone: '+84 28 3930 5587',
		},
		];

		var marker, i;
		var infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(map, 'click', function () {
			infowindow.close();
		});


		for (i = 0; i < locations.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
				map: map,
				animation: google.maps.Animation.BOUNCE,
				icon: locations[i].icon,
			});
			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					map.setCenter(marker.getPosition());
					infowindow.setContent(
						`<div class="maker-info" style="width:100%">
							<h4>${locations[i].name}</h4>
							<p><b>Địa chỉ:</b> ${locations[i].address}</p>
							<p><b>Điện thoại:</b>  ${locations[i].phone}</p>
						</div>`
					);
					marker.addListener("click", function () {
						if (marker.getAnimation() !== null) {
							marker.setAnimation(null);
						} else {
							marker.setAnimation(google.maps.Animation.BOUNCE);
						}
					})
					infowindow.open(map, marker);
				}
			})(marker, i));

			markers.push(marker);

			google.maps.event.addListener(map, "center_changed", function () {
				// getLocationInViewPort(map, locations);
				var listMapInViewPort = getLocationInViewPort(map, locations);
				document.getElementById("map-list").innerHTML = ""
				listMapInViewPort.forEach(function (location) {
					document.getElementById("map-list").innerHTML = `
						<div class="map-item">
							<h4>${location.name}</h4>
							<p><b>Địa chỉ:</b> ${location.address}</p>
							<p><b>Điện thoại:</b>  ${location.phone}</p>
						</div>
					`
					console.log(location.name)
					console.log(location.address)
					console.log(location.phone)
				})
			})
		}

		// tìm kiếm googlemap
		var input = document.getElementById('searchmap');
		var searchBox = new google.maps.places.SearchBox(input);

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function () {
			searchBox.setBounds(map.getBounds());
		});


		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		var bounds = new google.maps.LatLngBounds();
		searchBox.addListener('places_changed', function () {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}

			// Clear out the old markers.
			markers.forEach(function (marker) {
				marker.setMap(null);
			});

			// For each place, get the icon, name and location.
			places.forEach(function (place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};
				console.log(place)
				// Create a marker for each place.
				markers.push(new google.maps.Marker({
					map: map,
					// icon: icon,
					// center: new google.maps.LatLng(10.763806, 106.691302),
					title: place.name,
					animation: google.maps.Animation.BOUNCE,
					zoom: 12,
					position: place.geometry.location
				}));

				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
		});
		google.maps.event.addDomListener(window, 'load', initialize);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

function myClick(id) {
	google.maps.event.trigger(markers[id], 'click');
	$("html,body").animate({
		scrollTop: $("#map").offset().top - 70
	}, 1200)
}