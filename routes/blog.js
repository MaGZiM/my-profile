var express = require('express');
var router = express.Router();
const content = require('../source/data/content.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  let obj = {
    title: 'Блог',
    posts: content.posts
  }

  Object.assign(obj, req.app.locals.settings);
  res.render('blog', obj);
});

module.exports = router;
