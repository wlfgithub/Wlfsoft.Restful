
var debug = require('debug'),
	config = require('./lib/config'),
	server = require('./lib/server');

debug.enable('*');
var log = debug('index');

var domain = require('domain').create();

domain.on('error', function (err) {
    log('system error:', err);
});

domain.run(function () {

	process.env.DEBUG = true;//启用debug模式
	
	server.listen(config.server.port, config.server.host, function () {
		log('%s listening at %s', server.name, server.url);
	});

});


