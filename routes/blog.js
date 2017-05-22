var express = require('express');
var router = express.Router();
//const content = require('../source/data/content.json');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {

  let obj = {
    title: 'Блог',
    footerClass: 'footer_solid'
  };
  Object.assign(obj, req.app.locals.settings);

  const Model = mongoose.model('blog');
  Model
    .find()
    .then(posts => {
      Object.assign(obj, {posts: posts});
      res.render('blog', obj);
  });
});

module.exports = router;
