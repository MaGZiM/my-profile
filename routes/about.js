var express = require('express');
var router = express.Router();
const content = require('../source/data/content.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  let obj = {
    title: 'Обо мне',
    skills: content.skills,
    contacts: content.contacts
  }

  Object.assign(obj, req.app.locals.settings);
  res.render('about', obj);
});

module.exports = router;
