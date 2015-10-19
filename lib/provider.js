
var mongo = require('mongodb-wrapper'),
    config = require('./config'),
    Q = require('q'),
    _ = require('lodash');
	
function provider(_collection){
	
	var db = mongo.db(config.dbconnection);
	db.collection(_collection);
	this.collection = db[_collection];

} 	

/**
 * 插入操作
 * @param docs 插入数据
 */
provider.prototype.insert = function (docs) {
    var deferred = Q.defer();
    this.collection.insert(docs, function (err, docs) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(docs);
    });
    return deferred.promise;
};
/**
 * 更新操作
 * @param selector 查询条件
 * @param data 更新数据
 */
provider.prototype.update = function (selector, data) {
    var deferred = Q.defer();
    this.collection.update(selector, data/*{ $set: data }*/, true, function (err, docs) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(docs);
    });
    return deferred.promise;
};
/**
 * 删除操作
 * @param selector 查询条件
 */
provider.prototype.remove = function (selector) {
    var deferred = Q.defer();
    this.collection.remove(selector, function (err, docs) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(docs);
    });
    return deferred.promise;
};
/**
 * 查询总记录数
 * @param selector 查询条件
 */
provider.prototype.count = function (selector) {
    var deferred = Q.defer();
    this.collection.find(selector).count(function (err, data) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(data);
    });
    return deferred.promise;
};
/**
 * 查询单条数据
 * @param selector 查询条件
 * @param field 返回表数据字段
 */
provider.prototype.findOne = function (selector,field) {
    var deferred = Q.defer();
    this.collection.findOne(selector,field||{}, function (err, doc) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(doc);
    });
    return deferred.promise;
};
/**
 * 分页查询
 */
provider.prototype.findByPaged = function (q) {
    var me = this;

    //q.selector = q.selector || {};//findPageItems 合并移到这里
  
    var query = {
        selector: {},
        field: {},
        sort: { '_id': -1 },
        index: 1,
        size: 10
    };

    _.assign(query, q);

    query.size = Math.max(query.size, 1);
    query.index = Math.max(query.index, 1);
    
    return me.count(query.selector).then(function (total) {
        if (total == 0)
            return { pageSize: query.size, pageIndex: query.index, totalPageCount: 0, totalItemCount: 0, items: [] };
        return me.findPageItems(q).then(function (e) {
            return {
                totalItemCount: total,
                pageSize: query.size,
                pageIndex: query.index,
                totalPageCount: Math.ceil(total / query.size),
                items: e
            };
        })
    })
};
provider.prototype.findPageItems = function (q) {
    var deferred = Q.defer();
    var query = {
        selector: {},
        field: {},
        sort: { '_id': -1 },
        index: 1,
        size: 10
    };

    _.assign(query, q);

    query.size = Math.max(query.size, 1);
    query.index = Math.max(query.index, 1);

    this.collection.find(query.selector, query.field)
        .sort(query.sort)
        .limit(query.size)
        .skip((query.index - 1) * query.size)
        .toArray(function (err, docs) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(docs);

        });
    return deferred.promise;
};

/**
 * 
 */
provider.prototype.distinct = function (key, selector) {
    var deferred = Q.defer();
    this.collection.distinct(key, selector, function (err, docs) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(docs);
    });
    return deferred.promise;
};
/**
 * 
 */
provider.prototype.find = function (selector, field, sort) {
    var deferred = Q.defer();
    sort = sort || { '_id': -1 };
    field = field || {};
    this.collection.find(selector,field).sort(sort).toArray(function (err, docs) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(docs);

    });
    return deferred.promise;
};


module.exports = provider;

