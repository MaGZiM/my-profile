'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    BlogSchema = new Schema({
      title: {
        type: String,
        required: [true, 'Укажите заголовок статьи']
      },
      text: {
        type: String,
        required: [true, 'Укажите заголовок статьи']
      },
      date: {
        type: Date
      }
    }, {collection: 'posts'});

mongoose.model('blog', BlogSchema);