var slider = (function () {
  var count = 0,
    items = $('.slider__down').find('.slider__item'),
    itemsLength = items.length,
    descriptionContainer = $('.schoolsite__blocks'),
    lastNextDescription = descriptionContainer.find('.schoolsite__block')
                                              .filter('.active'),
    lastPrevDescription = descriptionContainer.find('.schoolsite__block')
                                              .eq(count + 1),
    lastDirection = 'up',
    descriptionDirection,
    inProcess = false;

  function slidemove() {
    _showNextSlide($('.slider__list-down'), 'down');
    _showNextSlide($('.slider__list-up'), 'up');
  }

  function _showNextSlide(container, direction) {
    let inCount = count,
        slides = container.find('.slider__item'),
        prevSlide = slides.filter('.active'),
        nextSlide;

    if (direction === 'down') {
      (inCount + 1 >= itemsLength) ? inCount = 0 : inCount++;
    } else {
      (inCount - 1 < 0) ? inCount = itemsLength - 1 : inCount--;
    }

    nextSlide = slides.eq(inCount);

    _animateSlide(prevSlide, nextSlide, direction);
  }

  function _animateSlide(prevItem, nextItem, direction) {
    if (direction === 'down') {
      nextItem.css('top', '-100%');
      prevItem.animate({'top': '100%'}, 1000);
      nextItem.animate({'top': '0'}, 1000, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
      });
    } else {
      nextItem.css('top', '100%');
      prevItem.animate({'top': '-100%'}, 1000);
      nextItem.animate({'top': '0'}, 1000, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
        inProcess = false;
      })
    }
  }

  function _changeDescription(direction) {
    let items = descriptionContainer.find('.schoolsite__block'),
      prevItem = items.filter('.active'),
      nextItem;

    if (direction === lastDirection) {

      nextItem = items.eq(count);
    } else {
      nextItem = lastPrevDescription;
      prevItem = lastNextDescription;
      lastDirection = direction;
    }

    lastNextDescription = nextItem;
    lastPrevDescription = prevItem;

    _animateDescription(nextItem, prevItem, direction);
  }

  function _animateDescription(nextItem, prevItem, direction) {
    if (direction === 'down') {
      nextItem.css('left', '-100%');
      prevItem.animate({'left': '100%'}, 1000);
      nextItem.animate({'left': '0'}, 1000, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
      });
    } else {
      nextItem.css('left', '100%');
      prevItem.animate({'left': '-100%'}, 1000);
      nextItem.animate({'left': '0'}, 1000, function () {
        nextItem.siblings().removeClass('active');
        nextItem.addClass('active');
      });
    }
  }

  function _countCounter(e) {
    if ($(e.target).closest('a').hasClass('slider__move-down')) {
      count++;
      descriptionDirection = 'down';
    } else {
      count--;
      descriptionDirection = 'up';
    }

    if (count > itemsLength - 1) {
      count = 0;
    }

    if (count < 0) {
      count = itemsLength - 1;
    }
  }

  function _changeLarge() {

    let largeImg = $('.works__large-img'),
        mainSrc = items.eq(count).find('img').attr('src');

    largeImg.fadeOut(300, function () {
      largeImg.attr('src', mainSrc);
      largeImg.fadeIn(300);
    });
  }

  function _setupListeners() {
    $('.slider__move').on('click', function (e) {
      e.preventDefault();
      if (!inProcess) {
        inProcess = true;

        _countCounter(e);

        _changeLarge();

        _changeDescription(descriptionDirection);

        slidemove();
      }

    });
  }

  return {
    init: _setupListeners()
  }

}());
