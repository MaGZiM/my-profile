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
      data: {
        type: Date,
        default: Date.now
      }
    }, {collection: 'posts'});

mongoose.model('blog', BlogSchema);