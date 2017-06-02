const express = require('express'),
      router = express.Router(),
      mailer = require('nodemailer'),
      config = require('../mailconfig.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  let obj = {
    title: 'Мои работы',
    footerClass: 'footer_transparent'
  }

  Object.assign(obj, req.app.locals.settings);
  res.render('works', obj);
});

router.post('/', function (req, res) {
  if(!req.body.name || !req.body.email || !req.body.message) {
    return res.json({status: 'Проверьте данные'});
  }

  console.log(`${req.body.email}` + " " + `${req.body.name}`);


  const transporter = mailer.createTransport(config.mail.smtp),
        mailOptions = {
          from: `"${req.body.name}" <${req.body.email}>`,
          to: config.mail.recipient,
          subject: config.mail.subject,
          text: req.body.message.trim()
            .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
        };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return res.json({status: 'При отправке произошла ошибка'});
    }

    return res.json({status: "Письмо успешно отправлено"});
  });
});

module.exports = router;
