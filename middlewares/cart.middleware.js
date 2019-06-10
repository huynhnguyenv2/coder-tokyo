
const Session = require("../models/session.model");
const Product = require("../models/product.model");
module.exports = async function(req, res, next){
  try {
    let sessionId = req.signedCookies.sessionId;
    let item = await Session.findOne({
      ident: sessionId
    });

    if(item.cart !== undefined){
      let t = item.cart;
      let total = Object.values(t).reduce( (a,b) => a + parseInt(b), 0);
      let temp = [] ;
      Object.keys(t).forEach(async function(i){
        const x = await Product.findById(i);
        temp.push(x);  
      });
      let objCart = {
        sum: total,
        details: temp 
      }
      
      res.locals.cart = objCart;
    }
    else res.locals.cart = {
      sum: 0,
      details: []
    };
    next();
  } catch (error) {   
    next(error);
  }
}