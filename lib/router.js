
var handler = require('./handlers/index');

module.exports = {
	
	registerAPI : function (server) {
		
		/**
		 * 用户信息模块
		 */
		server.get('/v1/users/:id', handler.user.findOne);
		
	}
		
};
