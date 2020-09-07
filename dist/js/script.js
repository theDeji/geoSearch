window.onload = function() {
  let ps = placeSearch({
    key: 'ZTf5xUGq3njSNU4DboxAgUySGipf9Ham',
    container: document.querySelector('#place'),
    useDeviceLocation: true,
    collection: [
      'poi',
      'airport',
      'address',
      'adminArea',
    ]
  });

  L.mapquest.key = 'ZTf5xUGq3njSNU4DboxAgUySGipf9Ham';

  var map = L.mapquest.map('map', {
    center: [0, 0],
    layers: L.mapquest.tileLayer('map'),
    zoom: 2
  });
  // L.mapquest.control().addTo(map);

  let markers = [];

  ps.on('change', (e) => {
    markers
      .forEach(function(marker, markerIndex) {
        if (markerIndex === e.resultIndex) {
          markers = [marker];
          marker.setOpacity(1);
          map.setView(e.result.latlng, 11);
        } else {
          removeMarker(marker);
        }
      });
  });

  ps.on('results', (e) => {
    markers.forEach(removeMarker);
    markers = [];

    if (e.results.length === 0) {
      map.setView(new L.LatLng(0, 0), 2);
      return;
    }

    e.results.forEach(addMarker);
    findBestZoom();
  });

  ps.on('cursorchanged', (e) => {
    markers
      .forEach(function(marker, markerIndex) {
        if (markerIndex === e.resultIndex) {
          marker.setOpacity(1);
          marker.setZIndexOffset(1000);
        } else {
          marker.setZIndexOffset(0);
          marker.setOpacity(0.5);
        }
      });
  });

  ps.on('clear', () => {
    console.log('cleared');
    map.setView(new L.LatLng(0, 0), 2);
    markers.forEach(removeMarker);
  });

  ps.on('error', (e) => {
    console.log(e);
  });

  function addMarker(result) {
    let marker = L.marker(result.latlng, {opacity: .4});
    marker.addTo(map);
    markers.push(marker);
  }

  function removeMarker(marker) {
    map.removeLayer(marker);
  }

  function findBestZoom() {
    let featureGroup = L.featureGroup(markers);
    map.fitBounds(featureGroup.getBounds().pad(0.5), { animate: false });
  }
}
