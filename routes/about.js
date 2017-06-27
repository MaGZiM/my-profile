var express = require('express');
var router = express.Router();
const content = require('../source/data/content.json');
const mongoose = require('mongoose');

router.get('/', function(req, res, next) {

  let obj = {
    title: 'Обо мне',
    contacts: content.contacts,
    footerClass: 'footer_transparent'
  };
  Object.assign(obj, req.app.locals.settings);

  const Model = mongoose.model('skills');
  Model
    .find()
    .then(skills => {

    Object.assign(obj, {skills: skills});
    res.render('about', obj);
  });
});

module.exports = router;
