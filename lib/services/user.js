
var _ = require('lodash'),
	DB = require('../provider'),
	userdb = new DB('User');


module.exports = {
	
	defaultFields: { 'ID': 1, 'Name': 1, 'Account': 1, "DepartmentID": 1, 'Avatar': 1, 'Remark': 1,'CreatorDept':1,'Sex':1 },
	
	/**
	 * 自定义查询条件
	 */
	CustomSelector : function  (params) {
		var selectorArr = [];
		if(params.DepartmentID){
			selectorArr.push({ "DepartmentID" : params.DepartmentID });
		}
		if(params.CreatorDeptID){
			selectorArr.push({ "CreatorDept.ID" : params.CreatorDeptID });
		}
		if(params.key){//模糊搜索字段
			selectorArr.push({ "$or":[{"Account":{$regex: params.key, $options: 'i'}},{"Name":{$regex: params.key, $options: 'i'}}] });
		}
		
		if(params.ID){
			selectorArr.push({ "ID" : params.ID });
		}
		if(params.Account){
			selectorArr.push({ "Account" : params.Account });
		}
		if(params.Code){
			selectorArr.push({ "Code" : params.Code });
		}
		
		if(params.loginName){
			selectorArr.push({ "$or":[{"Account": params.loginName },{"Code": params.loginName },{"Email": params.loginName },{"Mobile": params.loginName }] });
		}
		if(params.password){
			selectorArr.push({ "Password" : params.password });
		}
		
		var selector = (selectorArr.length > 0) ? { "$and": selectorArr } : {};
		return selector;
	}
	
	
	
};

