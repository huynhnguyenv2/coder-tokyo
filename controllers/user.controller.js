const md5 = require('md5');
const User = require('../models/user.model');

module.exports.index = function(req,res){
	User.find().then(function(users){
		res.render('users/index', {
			users: users
		});
	})
	
};
module.exports.search = async function(req, res){
	let q = req.query.q;

	let users = await User.find()

	let matchedUsers = users.filter(function(user){
	 	return user.name.indexOf(q) !== -1
	});
	
	res.render('users/index', {
		users: matchedUsers
	})
};
module.exports.create = function(req, res){
	res.render('users/create')
};
module.exports.get = async function(req,res){
	let id = req.params.id;
	let user = await User.findById(id)

	res.render('users/view',{
		user: user
	})
};
module.exports.postCreate = async function(req, res, next){
	try {	
		req.body.avatar = req.file.path.split('/').slice(1).join('/');
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			password: md5(req.body.password),
			avatar: req.body.avatar
		});
		await user.save();
		res.redirect('/users');
	} catch (error) {
		next(error);	
	}
};