var db = require("../db");

module.exports = function(req, res, next){
  var sessionId = req.signedCookies.sessionId;

  var item = db.get("sessions").find({
    id: sessionId
  }).value().cart;
  var total = Object.values(item).reduce( (a,b) => a + b);
  var temp = [] ;
  Object.keys(item).forEach(function(i){
    return temp.push(db.get("products").find({
      id: i
    }).value())
  });

  var objCart = {
    sum: total,
    details: temp
  }
  res.locals.cart = objCart;

  next();
}