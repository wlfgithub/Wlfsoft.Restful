

var md5  = require('md5'),
	fs = require('fs'),
	config = require('./config');
	
function auth () {
	this.config = {};
	var configPath = config.authConfigFilePath;
	var apps  = JSON.parse(fs.readFileSync(configPath));
	for (var i = 0; i < apps.length; i++)  {
		this.config[apps[i].Key] = apps[i];
	}
}

/**
 * 请求认证
 * @param token (* base64(appKey:MD5(appSecret + timestamp):timestamp))
 */
auth.prototype.verify = function (token) {
	
	if(!token) 
		 return false;
	 
	var tickets = token.split(' ');

	if(tickets.length !== 2)
		return false;
	 
	var buffer = new Buffer(tickets[1], 'base64')
	var base64value = buffer.toString();

	var temp = base64value.split(':');
	var appkey = temp[0],
		md5Value = temp[1],
		timestamp = temp[2];

	var app = this.config[appkey];

	if(!app)
		 return false;

	return (md5(app.Secret + timestamp) === md5Value) && ((Date.now() - timestamp) < 10*60*60*1000);
	
};
	

module.exports = new auth();

