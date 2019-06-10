const shortid = require("shortid");
const Session = require("../models/session.model")
module.exports = async function(req, res, next){
  if(!req.signedCookies.sessionId){
    let sessionId = shortid.generate();
    
    res.cookie("sessionId",sessionId ,{
      signed: true
    });

    let session = new Session({
      ident: sessionId,
    })
    await session.save();
  }

  next();
}