const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router  = express.Router();

router.get('/', function(req,res){
	res.render('users/index', {
		users: db.get('users').value()
	});
});

router.get('/search', function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var matchedUsers = users.filter(function(user){
		 return user.name.indexOf(q) !== -1
		});
	
	res.render('users/index', {
		users: matchedUsers
	})
});

router.get('/create', function(req, res){
	res.render('users/create')
});

router.get('/:id',function(req,res){
	var id = req.params.id;
  //console.log(id)
	var user = db.get('users').find({id : id}).value();
  //console.log(user);
	res.render('users/view',{
		user: user
	})
})
router.post('/create', function(req, res){
  req.body.id = shortid.generate()
	db.get('users').push(req.body).write();
	res.redirect('/users');
});
module.exports = router;
