
var restify = require('restify'),
	debug = require('debug'),
	router = require('./router'),
	auth = require('./auth'),
	restifyValidation = require('node-restify-validation');
	
debug.enable('*');
var log = debug('server')
var startTime = Date.now();

var server = restify.createServer({
	name: 'Wlfsoft.Restful',
	version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restifyValidation.validationPlugin({
	errorsAsArray: true,
	forbidUndefinedVariables: true
	//errorHandler: restify.errors.InvalidArgumentError
}));
server.use(restify.bodyParser());

server.pre(function (req, res, next) {

	req.headers.accept = 'application/json';

	log(req.method, req.url);
	res.charSet('utf-8');

	if (process.env.DEBUG)
		return next();
	
	// 请求头部分添加认证信息
	if (!auth.verify(req.headers['authorization']))
		return next(new restify.NotAuthorizedError('Invalid token.'));

	return next();
});

server.get('/', function (req, res, next) {
	res.send({ 'ServerName': server.name, RunTimes: (Date.now() - startTime) / 1000 + 's' });
	return next();
});

router.registerAPI(server);

module.exports = server;

