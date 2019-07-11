'use strict';
const Transom = require('@transomjs/transom-core');
const transomScaffold = require('@transomjs/transom-scaffold');
const opn = require('opn');

const transom = new Transom();

// ****************************************************************************
// This sample app doesn't use any metadata from the API definition.
// ****************************************************************************
const myApi = require('./myApi');
console.log("Running " + myApi.name);

// Register my Transom Scaffold module.
const scaffoldOpts = {};
transom.configure(transomScaffold, scaffoldOpts);


// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function (server) {

	server.get('/', function (req, res, next) {
		const samples = [
			'http://localhost:7070/images/cat.gif',
			'http://localhost:7070/images/theme/transomlogo.png',
			'http://localhost:7070/css/red.css',
			'http://localhost:7070/go-away',
			'http://localhost:7070/go-away-forever'
		];
		let page = '<ul>';
		for (const url of samples) {
			page += `<li><a href="${url}">${url}</a></li>`

		}
		page += '</ul>';
		res.setHeader('content-type', 'text/html');
		res.end(page);
	});


	// ****************************************************************************
	// Handle 404 errors when a route is undefined.
	// ****************************************************************************
	server.get('*', function (req, res, next) {
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
		opn(server.url);
	});
}).catch((error) => {
	console.error('Argh', error);
});