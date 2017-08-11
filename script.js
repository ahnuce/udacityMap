var map;
//create a new blank array for all the listing markers.
var markers = [];
  function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });
    var tribeca = {lat: 40.719526, lng: -74.0089934};
    var marker = new google.maps.Marker({
      position: tribeca,
      map: map,
      title: 'First Marker!'
    });
    //These are teh real estate listings that will be shown to the user.
    //Normally we'd have these in a database instead.
    var locations = [
      {title: 'Park Ave Penthouse', location: { lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: { lat: 40.744883, lng: -73.9949465}},
      // {title: 'Anusone', location: { lat: 41.833010, lng: -71.476442}},
      {title: 'Union Square Open Floor Plan', location: { lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: { lat: 40.7281777, lng: -73.984377}},
      {title: 'Chinatown Homey Space', location: { lat: 40.7180628, lng: -73.9961237}},
    ];
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    //the following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++){
      var position = locations[i].location;
      var title = locations[i].title;
      //create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      //push the marker to our array of markers.
      markers.push(marker);
      //extend the boundaries of the map for each marker
      bounds.extend(marker.position);
      //create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function(){
        populateInfoWindow(this, largeInfowindow);
      });
    }
    //This function will loop through the markers array and display them all
    function showListings(){
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++){
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
    }
    //This function will loop through the listings and hide them al
    function hideListings(){
      for (var i = 0; i < markers.length; i++){
        markers[i]. setMap(null);
      }
    }


    function populateInfoWindow(marker, infowindow){
      //check to make sure the infowindow is not already opened on this marker.
      if(infowindow.marker != marker){
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        //make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function(){
          infowindow.setMarker(null);
        });
      }
    }

    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);

};





// var infoWindow = new google.maps.InfoWindow({
//   content: 'Do you ever feel like an InfoWindow, floating through the wind,' + 'ready to start again?'
// });
// marker.addListener('click', function(){
//   infoWindow.open(map,marker);
//   });
//
