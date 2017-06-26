const sidebar = (function(){

  if (document.title === 'Блог') {

    const list = $('.post-refs__list'),
        listHeight = list.height(),
        posts = $('.blog__posts');
    let offset,
        postsOffset,
        postsOffsetBottom,
        win = $(window).height();

    window.onresize = function () {
      win = $(window).height();
    }

    window.onscroll = function () {
      let eTop = list.offset().top,
          postsTop = posts.offset().top,
          postsBottom = postsTop - ($(window).height() - posts.height());

      offset = eTop - $(window).scrollTop();
      postsOffset = postsTop - $(window).scrollTop();
      postsOffsetBottom = postsBottom - $(window).scrollTop();

      //console.log('eTop: ' + eTop + ', offset: ' + offset + ', postsTop: ' + postsOffset + ', postsBottom: ' + postsOffsetBottom + " " + win);
      if (postsOffset < 20) {
        list.css({'position': 'fixed', 'top': '20px'});
      } else if (postsOffset > 20) {
        list.css({'position': 'relative'});
      }
      //console.info('postsOffsetBottom: ' + postsOffsetBottom + ", listheight: " + listHeight + "    " + (win - postsOffsetBottom) + ', window height: ' + win);
      if (postsOffsetBottom <= 0 && listHeight > (win + postsOffsetBottom)) {
        list.css({'position': 'absolute', 'bottom': '40px', 'top': ''});
      }

    }
  }
/*
  return {
    init: function() {
      //console.log(offset);
    }
  }*/
}());

export default sidebar;