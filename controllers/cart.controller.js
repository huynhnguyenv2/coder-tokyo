const Session = require('../models/session.model');

module.exports.addToCart = async function(req, res){
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
    res.redirect('/products');
    return
  }

  let count = await Session.findOne({
    ident: sessionId
  });
  
  if(!count.cart || !count.cart[productId]) {
    count.cart = {[productId]: 1}
    
  }
  else {
    let c = count.cart[productId] ;
    count.cart = {[productId]: ++c};
  }
  await count.save();

  res.redirect('/products');

}