const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

const isAdmin = (req, res, next) => {
  if(req.session.isAdmin) {
    return next();
  }

  res.redirect('/');
};

router.get('/', isAdmin, function (req, res) {
  let obj = {
    title: 'Admin page'
  };
  Object.assign(obj, req.app.locals.settings);

  const Model = mongoose.model('skills');
  Model
    .find()
    .then(skills => {

    Object.assign(obj, {skills: skills});
    res.render('admin', obj);
  });
});

router.post('/addpost', isAdmin, function (req, res) {
  // Требуем наличия заголовка, даты и текста
  if(!req.body.title || !req.body.date || !req.body.text) {
    return res.json({status: 'Укажите данные'});
  }
  const Model = mongoose.model('blog');
  let item = new Model({title: req.body.title, date: new Date(req.body.date), text: req.body.text});
  item.save()
    .then(i => {
      return res.json({status: 'Запись успешно добавлена'});
  }, e => {
      // Если есть ошибки , получаем их список и передаем в шаблон
     const error = Object
       .keys(e.errors)
       .map(key => e.errors[key].message)
       .join(', ');

     // Обрабатываем шаблон и отправляем в браузер
    res.json({
      status: 'При добавлении записи произошла ошибка'
    });
  });
});

module.exports = router;