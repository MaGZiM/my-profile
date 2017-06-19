import * as works from './works/works';
import preloader as perloder from './common/preloader';
import * as parallax from './parallax/parallax';

const formLogin = document.querySelector('#login');

if (formLogin) {
  formLogin.addEventListener('submit', prepareSendLogin)
}

function prepareSendLogin(e) {
  e.preventDefault();
  let data = {
    login: formLogin.login.value,
    password: formLogin.password.value
  };

  console.log("inside prepareSendLogin()");

  prepareSend('/login', formLogin, data, function (data) {
    if (data === 'Авторизация успешна!') {
      location.href = '/admin';
    }
  });
}

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
(function() {
  'use strict';
  preloader.init();
  slider.init();
})();
