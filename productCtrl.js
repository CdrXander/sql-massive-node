var app = require('./server.js');

module.exports = {
	create:create,
	getAll:getAll,
	getOne:getOne,
	update:update,
	deleteProduct:deleteProduct
}



function create(req,res,next) {
	var db = app.get('db');
	db.create_product([req.body.name, req.body.desc, req.body.price, req.body.imgurl], function(err) {
		if(!err) {
			res.status(201).send("Product Created");
		} else {
			res.status(500).send(err);
		}
	})
}

function getAll(req,res,next) {
	var db = app.get('db');
	db.read_products(function(err,products){
		if(!err) {
			res.status(200).send(products);
		} else {
			res.status(500).send(err)
		}
	})
}

function getOne(req,res,next) {
	var db = app.get('db');
	db.read_product([req.params.id], function(err, product) {
		if(!err) {
			res.status(200).send(product);
		} else {
			res.status(500).send(err)
		}
	})
}

function update(req,res,next) {
	var db = app.get('db');
	db.update_product([req.body.desc, req.body.id], function(err) {
		if(!err) {
			res.status(204).send("Product Updated");
		} else {
			res.status(500).send(err)
		}
	})
}

function deleteProduct(req,res,next) {
	var db = app.get('db');
	db.delete_product([req.params.id], function(err) {
		if(!err) {
			res.status(204).send("Product Deleted");
		} else {
			res.status(500).send(err)
		}
	})
}