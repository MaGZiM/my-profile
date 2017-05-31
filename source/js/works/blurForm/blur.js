var feedbacksSection = $('.feedbacks__background'),
    blur = $('.contact-form__blur');

const positionateBg = () => {
  var imgWidth = $('.feedbacks__background').width(),
      posY = feedbacksSection.offset().top - blur.offset().top;

  blur.css({
    'background-size': imgWidth+'px'+' auto',
    'background-position-y': posY + 'px'
  });
};

$(window).on('load', positionateBg);
$(window).on('scroll', positionateBg);
$(window).on('resize', positionateBg);
