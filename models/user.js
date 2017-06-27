'use strict'

const mongoose = require('mongoose'),
      crypto = require('crypto'),
      UserSchema = new mongoose.Schema({
        login: {
          type: String,
          required: [true, 'Укажите логин']
        },
        password: {
          type: String,
          required: [true, 'Введите пароль'],
          set: v => v == ''
            ? v
            : crypto
                .createHash('md5')
                .update(v)
                .digest('hex')
        }
      }, {collection: 'users'});

mongoose.model('user', UserSchema);