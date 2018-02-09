'use strict';

const Transom = require('@transomjs/transom-core');
const transomScaffold = require('@transomjs/transom-scaffold');

const transom = new Transom();

// ****************************************************************************
// This sample app doesn't use any metadata from the API definition.
// ****************************************************************************
const myApi = require('./myApi');
console.log("Running " + myApi.name);


// Register my TransomJS SMTP module.
transom.configure(transomScaffold, {
});


// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function(server){



	server.get('/', function(req,res,next){
		res.send('Browse to http://localhost:7070/assets/transomlogo.png');
	});


	// ****************************************************************************
	// Handle 404 errors when a route is undefined.
	// ****************************************************************************
	server.get('.*', function (req, res, next) {
		var err = new Error(req.url + " does not exist");
		err.status = 404;
		next(err);
	});

	// ****************************************************************************
	// Handle Errors within the app as our last middleware.
	// ****************************************************************************
	server.use(function (error, req, res, next) {
		console.error("Error handler", error);
		var data = {};
		data.error = error;
		res.statusCode = error.status || 501;
		res.send(data);
	});

	// ****************************************************************************
	// Handle uncaught exceptions within your code.
	// ****************************************************************************
	process.on('uncaughtException', function (err) {
		console.error('Really bad Error!', err);
	});

	// ****************************************************************************
	// Handle uncaught rejections within your code.
	// ****************************************************************************
	process.on('unhandledRejection', function (err) {
		console.error('unhandledRejection', err);
	});

	// ****************************************************************************
	// Start the Transom server...
	// ****************************************************************************
	server.listen(7070, function () {
		console.log('%s listening at %s', server.name, server.url);
		console.log('browse to http://localhost:7070/assets/transomlogo.png');
	});

});