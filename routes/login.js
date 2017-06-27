const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      crypto = require('crypto');

router.get('/', function (req, res) {
  let obj = {
    title: 'Авторизация'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('login', obj);
})

router.post('/', (req, res) => {
  if(!req.body.login || !req.body.password) {
    return (res.json({status: 'Укажите логин и пароль!'}))
  }

  const Model = mongoose.model('user'),
        password = crypto
          .createHash('md5')
          .update(req.body.password)
          .digest('hex');

  const Skills = mongoose.model('skills');

  Skills.find()
    .then(u => console.log(u));

  Model.find()
    .then(u => console.log(u));

  Model
    .findOne({login: req.body.login, password: password})
    .then(item => {
      console.log(item);
      if(!item) {
        res.json({status: 'Логин и/или пароль введены неверно'});
      } else {
        req.session.isAdmin = true;
        res.json({status: 'Авторизация успешна!'});
      }
    });
});

module.exports = router;