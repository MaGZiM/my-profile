const preloader = (function(){
  let percentsTotal = 0,
      preloader = $('.preloader');

  let imgPath = $('*').map(function(ndx, element) {
    let background = $(element).css('background-image'),
        img = $(element),
        path = '';

    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (img.is('img')) {
      path = img.attr('src');
    }

    if (path) {
      return path;
    }


  });

  var setPercents = function (total, current) {
    var percents = Math.ceil(current / total * 100);

    $('.preloader__percents').html(percents + '%');

    if (percents >= 100) {
      preloader.fadeOut();
    }
  };

  var loadImages = function (images) {

    if (!images.length) preloader.fadeOut();

    images.forEach(function (img, i, images) {
      var fakeImage = $('<img>', {
        attr: {
          src: img
        }
      });

      fakeImage.on('load error', function () {
        percentsTotal++;
        setPercents(images.length, percentsTotal);
      });
    });
  };

  return {
    init: function() {
      var imgs = imgPath.toArray();

      loadImages(imgs);
    }
  }
}());

export default preloader;