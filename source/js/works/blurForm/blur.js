console.log("in the blur.js");

//$(document).ready(() => {
  var feedbacksSection = $('.feedbacks__background'),
      blur = $('.contact-form__blur'),
      posX = feedbacksSection.offset().left - blur.offset().left;

  console.log(feedbacksSection.offset().top);

  const positionateBg = () => {
    var imgWidth = $('.feedbacks__background').width(),
        posY = feedbacksSection.offset().top - blur.offset().top;
    console.log("posy: " + posY + ", fbckSect: " + feedbacksSection.offset().top + ", blrsection: " + blur.offset().top);
    console.log("window width is " + imgWidth);
    console.log(imgWidth);
    blur.css({
      'background-size': imgWidth+'px'+' auto',
      'background-position-y': posY + 'px'
    });
    console.log("blur width is " + blur.backgroundSize);
    console.log("inside resize");
  };

  $(window).on('load', positionateBg);
  $(window).on('scroll', positionateBg);
  $(window).on('resize', positionateBg);
  //$(window).resize(() => {positionateBg; console.log('inside resize fn')});

//});
/*
$(document).ready(() => {
  console.log("inside ready");
  const formBg = $('.contact-form__blur-bg'),
        sectionBg = $('.feedbacks'),
        docHeight = $(document).height(),
        contForm = $('.contact-form');

  console.log(formBg.offset().left);
  console.log(formBg.offset().top);
  //console.log(contForm.offset().bottom);
  console.log(docHeight);
  console.log($(document).height() - formBg.height());

  const positionateBg = () => {
    const posLeft = -formBg.offset().left;
    const reviewsBgPosY = sectionBg.css('backgroundPositionY').replace('px', '');
    const posTop = -479/!*(formBg.offset().top - sectionBg.offset().top - reviewsBgPosY);*!/

    formBg.css({'background-position': `${posLeft}px ${posTop}px`}, console.log("inside formbg.css" + posLeft + " " + posTop + " " + sectionBg.css('backgroundPositionY')));
    console.log(" inside positionate");
  };

  $(window).on('load', positionateBg);
  $(window).on('scroll', positionateBg);
  $(window).on('resize', positionateBg);
});*/
