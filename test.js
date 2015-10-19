

var fs = require('fs'), config = require('./lib/config');

var configPath= config.authConfigFilePath;
var co = {};
var apps  = JSON.parse(fs.readFileSync(configPath));
	for (var i = 0; i < apps.length; i++) 
	{
		co[apps[i].Key] = apps[i];
		console.log("apps items  = ", apps[i]);
	};
console.log("co : ", JSON.stringify(co));
