
const Session = require("../models/session.model");
const Product = require("../models/product.model");
module.exports = async function(req, res, next){
  try {
    var sessionId = req.signedCookies.sessionId;
    let item = await Session.findOne({
      ident: sessionId
    });

    if(item.cart !== undefined){
      let t = item.cart;
      var total = Object.values(t).reduce( (a,b) => a + parseInt(b), 0);
      var temp = [] ;
      Object.keys(t).forEach(function(i){
        Product.findById(i).then(function(x){ 
          temp.push(x)
        })
      });

      var objCart = {
        sum: total,
        details: temp 
      }
      res.locals.cart = objCart;
    }
    else res.locals.cart = false;
    next();
  } catch (error) {   
    next(error);
  }
}