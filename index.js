const express = require('express');
const app = express();
const port = 3000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const shortid = require('shortid');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

db.defaults({
	users: []
}).write()

app.get('/', function(request, respond){
	respond.render('index', {
		name: 'Hoang'
	})
});

app.get('/users', function(req,res){
	res.render('users/index', {
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var matchedUsers = users.filter(function(user){
		 return user.name.indexOf(q) !== -1
		});
	
	res.render('users/index', {
		users: matchedUsers
	})
});

app.get('/users/create', function(req, res){
	res.render('users/create')
});

app.get('/users/:id',function(req,res){
	var id = req.params.id;
  //console.log(id)
	var user = db.get('users').find({id : id}).value();
  //console.log(user);
	res.render('users/view',{
		user: user
	})
})
app.post('/users/create', function(req, res){
  req.body.id = shortid.generate()
	db.get('users').push(req.body).write();
	res.redirect('/users');
});
app.listen(3000, function(){
	console.log('Sever is listening ' + port)
});