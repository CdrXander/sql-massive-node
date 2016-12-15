var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var massive		= require('massive');

var port = 3000;

var app = module.exports = express();
app.use(bodyParser.json());

//Import Controllers AFTER app creation/export
var productCtrl	= require('./productCtrl.js');


//Set up database connection
var conn = massive.connectSync({
	connectionString:"postgres://postgres:postgrespw@localhost/sql_massive_node"
});

app.set('db',conn);
var db = app.get('db');

//END POINTS

app.get('/products', productCtrl.getAll);

app.get('/products/:id', productCtrl.getOne);

app.post('/products/create', productCtrl.create);

app.put('/products/update', productCtrl.update);

app.delete('/products/delete/:id', productCtrl.deleteProduct);


app.listen(port, function() {
  console.log("Started server on port", port);
});