'use strict';
var merge = require('merge-stream'),
    buffer = require('vinyl-buffer');

module.exports = function () {
  $.gulp.task('sprite', function () {
    var spriteData = $.gulp.src('./source/sprites/*{.png,.gif}')
      .pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        padding: 15
      }));

    var imgStream = spriteData.img
      .pipe(buffer())
      .pipe($.gp.imagemin())
      .pipe($.gulp.dest($.config.root + '/assets/img'));

    var cssStream =  spriteData.css.pipe($.gulp.dest('./source/style/sprites'));

    return merge(imgStream, cssStream);
  });
};
