'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const dogSchema = new Schema({
  breed: {type: String, require: true},
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
