require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');

const authMiddleware= require("./middlewares/auth.middlewares");
const sessionMiddleware = require('./middlewares/session.middleware');
const cartMiddleware = require('./middlewares/cart.middleware');

//Set up mongoose connection 
const dev_db_url = "mongodb://admin:admin123@localhost:27017/express-demo?authSource=admin";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//////

const port = 3000;
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware, cartMiddleware);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));


app.get('/', function(request, respond){
	respond.render('index', {
		name: 'Hoang'
	})
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes)
app.use('/cart', cartRoutes);

app.listen(3000, function(){
	console.log('Sever is listening ' + port)
});
