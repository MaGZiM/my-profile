var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let obj = {
    title: 'Мои работы',
    footerClass: 'footer_transparent'
  }

  Object.assign(obj, req.app.locals.settings);
  res.render('works', obj);
});

module.exports = router;
