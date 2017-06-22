const blur = (function() {
  var feedbacksSection = $('.feedbacks__background'),
      blur = $('.contact-form__blur');

  const _positionateBg = () => {
    var imgWidth = $('.feedbacks__background').width(),
        posY = feedbacksSection.offset().top - blur.offset().top;

    blur.css({
      'background-size': imgWidth+'px'+' auto',
      'background-position-y': posY + 'px'
    });
  };

  return {
    init: function () {
      $(window).on('load', _positionateBg);
      $(window).on('scroll', _positionateBg);
      $(window).on('resize', _positionateBg);
    }
  }
}());

export default blur;