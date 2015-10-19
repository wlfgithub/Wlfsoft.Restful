

module.exports = {
	
	sendOk: function (res, data, msg) {
		//console.log('send ok:', data);
		res.send({ ret: 1, message: msg || 'ok', data: data });
		//{"status":"validation failed","errors":[{"scope":"resources","field":"index","code":"MISSING","message":"参数index必填，最小1"}]}
	},
	sendError: function (res, msg) {
		console.log('send error:', msg);
		res.send(400, { ret: 0, message: msg, data: null });
	}

};