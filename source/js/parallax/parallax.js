'use strict'

const parallax = (function() {
  const bg = document.querySelector('.hero__bg'),
        user = document.querySelector('.user'),
        image = document.querySelector('.ghost-img-portfolio');
  
  return {
    move: function (block, winScroll, strafeAmount) {
      const strafe = winScroll / - strafeAmount + '%',
            transformString = 'translate3d(0, ' + strafe +', 0)';

      const style = block.style;

      style.transform = transformString;
      style.webkitTransform = transformString;
    },
    init: function(wScroll) {
      this.move(bg, wScroll, 50);
      this.move(user, wScroll, 3);
      this.move(image, wScroll, 7);
    }
  };
}());

window.onscroll = function () {
  let scroll = window.pageYOffset;

  parallax.init(scroll);
}
