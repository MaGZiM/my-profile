const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const fileVersionControl = 'version.json';
const currentStatic = require('./gulp/config').root;
const config = require('./config');

// получаем абсолютный путь к папке upload, в которую будут загружаться картинки
// проектов
const uploadDir = path.join(__dirname, config.upload);

//подключение модулей
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:12345@ds143777.mlab.com:43777/portfolio');
/*mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    user: config.db.user,
    password: config.db.password
  })
  .catch(e => {
    console.error(e);
    throw e;
});*/
require('./models/db-close');

// Подключение моделей (сущности, описывающие коллекции базы данных)
require('./models/blog');
require('./models/skills');
require('./models/user');

const app = express();
const server = http.createServer(app);

//var users = require('./routes/users');
const index = require('./routes/index');
const works = require('./routes/works');
const blog = require('./routes/blog');
const about = require('./routes/about');
// maybe needs to be removed
const login = require('./routes/login');
//const mail = require('./routes/mail');
const admin = require('./routes/admin');



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'source/template/pages'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', index);
app.use('/works', works);
app.use('/blog', blog);
app.use('/about', about);
app.use('/admin', admin);
app.use('/login', login);

app.use(function (req, res) {
  res.status(404);
  res.render('404')
});

app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(505);
  res.render('505');
});

server.listen(3000, 'localhost');
server.on('listening', function () {
  jsonfile
    .readFile(fileVersionControl, function (err, obj) {
      if(err) {
        console.log('Данные для хеширования ресурсов из version.json не прочитаны');
        console.log('Server stopped');
        process.exit(1);
      } else {
        app.locals.settings = {
          suffix: obj.suffix,
          version: obj.version
        };
        console.log('Данные для хеширования ресурсов из version.json прочитаны');

        if(!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
      }
    })
})

module.exports = app;
