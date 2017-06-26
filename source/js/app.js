import * as works from './works/works';
import blur from './works/blurForm/blur';
import sidebar from './blog/sidebar';
//import blogMenu from './blog/blog';
import preloader from './common/preloader';
import * as parallax from './parallax/parallax';
import prepareSend from './prepareSend';

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

  prepareSend('/login', formLogin, data, function (data) {
    if (data === 'Авторизация успешна!') {
      location.href = '/admin';
    }
  });
}

(function() {
  'use strict';
  preloader.init();

  if (document.title === 'Блог') {
    sidebar.init();
    //blogMenu.init();
  }

  if (document.title === 'Мои работы') {
    blur.init();
  }

  if (document.title === 'Обо мне') {
    google.maps.event.addDomListener(window, "load", function initMap() {
        var myLatlng = new google.maps.LatLng(50.005, 36.229);
        var myOptions = {
          zoom: 16,
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
      }
    );
  }
})();
