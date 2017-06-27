const mongoose = require('mongoose'),
      readLine = require('readline'),
      rl = readLine.createInterface({input: process.stdin, output: process.stdout}),
      config = require('./config');

mongoose.Promise = global.Promise;
mongoose
  //.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
  .connect(`mongodb://admin:12345@ds143777.mlab.com:43777/portfolio`, {
    user: config.db.user,
    password: config.db.password
  })
  .catch(e => {
  console.error(e);
  throw e;
});

require('./models/db-close');

let login = '',
    password = '';

rl.question('Логин: ', answer => {
  login = answer;

  rl.question('Пароль: ', answ = > {
    password = pswd;

    rl.close();
  });
});


rl.on('close', () =>
  require('./models/user');

  const User = mongoose.model('user'),
    adminUser = new User({login: login, password: password});

  User.findOne({login: login})
    .then(u => {

      if(u) {
        throw new Error('Такой пользователь уже существует!');
      }

      return adminUser.save();
    })
    .then(u => console.log('ok!'), e => console.error(e.message));
    .then(() => process.exit(0));
);