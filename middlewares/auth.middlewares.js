const User = require('../models/user.model')
module.exports.requireAuth = async function(req, res, next){
  if (!req.signedCookies.userId){
    res.redirect('/auth/login');
    return;
  }

  let user = await User.find({
    id: req.signedCookies.userId
  })

  if(!user){
    res.redirect('/auth/login');
  };
  
  res.locals.user = user;
  next();
}