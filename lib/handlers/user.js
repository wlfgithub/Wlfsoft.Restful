
var base = require('../base'),
	_ = require('lodash'),
	userService = require('../services/user');


module.exports = {
	
	/**
	 * 自定义参数验证
	 */
	customValidator: function(m){
		var _resource = {
			size: { isRequired: false, isInt: true, max: 10, msg: '参数size必填，最大10' },
			index: { isRequired: false, isInt: true, min: 1, msg: '参数index必填，最小1' },
			key : { isRequired: false, msg: '参数key为可选项' }
		};
		switch(m){
			case 'usersbydepart':
				_resource.DepartmentID = { isRequired: true, msg: '参数DepartmentID必填' };
				break;
			case 'usersbycreatordepart':
				_resource.CreatorDeptID = { isRequired: true, msg: '参数CreatorDeptID必填' };
				break;
			case 'usersbyid':
				_resource.ID = { isRequired: true, msg: '参数ID必填' };
				break;
			case 'usersbyaccount':
				_resource.Account = { isRequired: true, msg: '参数Account必填' };
				break;
			case 'usersbycode':
				_resource.Code = { isRequired: true, msg: '参数Code必填' };
				break;
			default:
				break;
		}
		var mValidator = {
			resources : _resource
		};
		return mValidator;
	},
	
	create : function (req, res, next) {
		base.sendOk(res, { result: 'create ok' });
		return next();
	},
	
	update : function (req, res, next) {
		
	},
	
	delete : function (req, res, next) {
		
	},
	
	findOne : function (req, res, next){
		
	},
	
	findAll : function (req, res, next) {
		
	},
	
	findByPaged : function (req, res, next) {
		
	},
	
	login : function (req, res, next) {
		
	},
	
	forget : function (req, res, next) {
		
	}, 
	
	resetPwd : function (req, res, next) {
		
	},
	
	sync : function (req, res, next) {
		
	}
	
};










