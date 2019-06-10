const Product = require('../models/product.model')

module.exports.index = function(req, res, next){
	try {
		Product.find().then(function(products){
			res.render('products/index', {
				products: products
			});
		});
	} catch (error) {
		next(error);
	}
	
};