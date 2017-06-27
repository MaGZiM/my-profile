'use strict'

const mongoose = require('mongoose'),
      skillsSchema = mongoose.Schema({
        name: {
          type: String,
          required: [true, 'Укажите область навыков']
        },
        skills: [{
          skillname: {
            type: String,
            required: [true, 'Укажите наименование навыка']
          },
          skillvalue: {
            type: Number,
            required: [true, 'Укажите уровень владения навыком']
          }
        }]
      });

mongoose.model('skills', skillsSchema, 'skills');