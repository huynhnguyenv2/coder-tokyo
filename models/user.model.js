const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  avatar: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;