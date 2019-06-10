const User = require('../models/user.model')
const md5 = require('md5');
module.exports.login = function(req,res){
	res.render('auth/login');
};

module.exports.postLogin = async function(req,res){

	let email = req.body.email;
	let password = req.body.password;

	//var user = db.get('users').find({email: email}).value();
	let user = await User.findOne({
		email: email
	})
	
	//console.log(user);
	if (!user){
		res.render('auth/login',{
			errors: ["User does not exist"],
			values: req.body
		});
		return;
	}
	
	let hashedPassword = md5(password);
	console.log(user.id)
	if (user.password !== hashedPassword){
		res.render('auth/login',{
			errors: ["Wrong password."],
			values: req.body
		})
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');
}