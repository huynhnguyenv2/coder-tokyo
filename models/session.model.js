const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
  ident: String,
  cart: {}
});

let Session = mongoose.model('Session', sessionSchema);

module.exports = Session;