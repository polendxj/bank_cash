/**
 * Created by Captain on 2017/5/14.
 */
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
var _findAndCountAll = function(resp,object,params,callback){
    var page = params.page;
    var pageSize = params.pageSize;
    delete params.page;
    delete params.pageSize;
    params = frameworkUtils.deleteNullKey(params);
    object.findAndCountAll({
        where:params,
        offset:page * pageSize,
        limit:pageSize
    }).then(function(result){
        if(callback){
            callback(result);
        }else {
            resp.send(result);
        }
    }).catch(function (err) {
        if(callback){
            callback({result:"FAILURE",message:err.message});
        }else {
            resp.send({result:"FAILURE",message:err.message});
        }
    });
};
var _findByIds = function(resp,object,ids,callback){
    object.findAll({
        where:{
            id:ids
        }
    }).then(function(result){
        if(callback){
            callback(result);
        }else {
            resp.send(result);
        }
    }).catch(function (err) {
        resp.send(err.message);
    });
};
var _register = function(resp,object,data,callback){
    object.create(data).then(function(result){
        if(callback){
            callback({result:"SUCCESS"});
        }else {
            resp.send({result:"SUCCESS"});
        }
    }).catch(function(err){
        console.log(err);
        if(callback){
            callback({result:"FAILURE",message:err.errors[0].message});
        }else {
            resp.send({result:"FAILURE",message:err.errors[0].message});
        }
    });
};
var _update = function(resp,object,data,id,callback){
    object.update(data,{
        where:{id:id}
    }).then(function(result){
        if(callback){
            callback({result:"SUCCESS"});
        }else {
            resp.send({result:"SUCCESS"});
        }
    }).catch(function (err) {
        if(callback){
            callback({result:"FAILURE",message:err.message});
        }else {
            resp.send({result:"FAILURE",message:err.message});
        }
    });
};
var _delete = function(resp,object,ids,callback){
    object.destroy({
        where:{
            id:ids
        }
    }).then(function(result){
        if(callback){
            callback({result:"SUCCESS"});
        }else {
            resp.send({result:"SUCCESS"});
        }
    }).catch(function (err) {
        if(callback){
            callback({result:"FAILURE",message:err.message});
        }else {
            resp.send({result:"FAILURE",message:err.message});
        }
    });
};

module.exports = {
    _findAndCountAll: _findAndCountAll,
    _findByIds: _findByIds,
    _register: _register,
    _update: _update,
    _delete: _delete
};