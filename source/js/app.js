import prepareSend from './prepareSend';
import * as works from './works/works';
import * as parallax from './parallax/parallax'

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

var slider = (function () {
  var count = 0,
      items = $('.slider__down').find('.slider__item'),
      inProcess = false;

  var init = function() {
    _setUpListeners();

  }

  var _setUpListeners = function() {
    $('.slider__move').on('click', function(e) {
      e.preventDefault();

      if (!inProcess) {
        inProcess = true;

        if ($(e.target).closest('a').hasClass('slider__move-down')) {
          count--;
        } else {
          count++;
        }

        if (count > items.length - 1) {
          count = 0;
        }

        if (count < 0) {
          count = items.length - 1;
        }

        var mainSrc = items.eq(count).find('img').attr('src');

        $('.works__large-img').attr('src', mainSrc);

        slideshow();
        console.log(count, 'inProcess: ' + inProcess);
      }
    });

  };
  
  function slideshow() {
    _showNextSlide($('.slider__list-down'), 'down');
    _showNextSlide($('.slider__list-up'), 'up');
    inProcess = false
  }

  function _showNextSlide(container, direction) {
    var innerCount = count,
        items = container.find('.slider__item'),
        prevItem = items.filter('.active');

    if (direction === 'down') {
      ((innerCount - 1) < 0) ? innerCount = (items.length - 1) : innerCount--;
    } else {
      ((innerCount + 1) > (items.length - 1)) ? innerCount = 0 : innerCount++;
    }

    var nextItem = items.eq(innerCount);
    onSlide(nextItem, prevItem, direction);
  }
  
  function onSlide(nextItem, prevItem, direction) {
    if(direction == 'down') {
      nextItem.css({'top': '-100%'});
      prevItem.animate({'top': '100%'}, 300);
      nextItem.animate({'top': 0}, 300, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
      });
    } else {
      nextItem.css('top', '100%');
      prevItem.animate({'top': '-100%'}, 300);
      nextItem.animate({'top': '0'}, 300, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
      })
    }
  }

  return {
    init: _setUpListeners()
  }

}());

(function() {
  'use strict';

  slider.init;

})();
