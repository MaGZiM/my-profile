(function() {
  'use strict';


})();

function initMap() {
  var myLatlng = new google.maps.LatLng(50.005, 36.229);
  var myOptions = {
    zoom: 12,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    mapTypeControl: false
  }
  var map = new google.maps.Map(document.getElementById("my-map"), myOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"Hello World!"
  });
};