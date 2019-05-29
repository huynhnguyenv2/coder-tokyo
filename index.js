const express = require('express');
const db = require("./db")
const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');

const port = 3000;
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser());


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));


app.get('/', function(request, respond){
	respond.render('index', {
		name: 'Hoang'
	})
});

app.use('/users', userRoutes);

app.listen(3000, function(){
	console.log('Sever is listening ' + port)
});