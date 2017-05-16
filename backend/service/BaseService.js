/**
 * Created by Captain on 2017/5/14.
 */
var _findAndCountAll = function(resp,object,params,callback){
    var page = params.page;
    var pageSize = params.pageSize;
    delete params.page;
    delete params.pageSize;
    object.findAndCountAll({
        where:params,
        offset:(page - 1) * pageSize,
        limit:pageSize
    }).then(function(result){
        if(callback){
            callback(result);
        }else {
            resp.send(result);
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
    });
};
var _register = function(resp,object,data,callback){
    object.create(data).then(function(result){
        if(callback){
            callback(result);
        }else {
            resp.send(result);
        }
    }).catch(function(err){
        if(callback){
            callback(err.message);
        }else {
            resp.send(err.message);
        }
    });
};
var _update = function(resp,object,data,id,callback){
    object.update(data,{
        where:{id:id}
    }).then(function(result){
        console.log(result);
        if(callback){
            callback(result);
        }else {
            resp.send(result);
        }
    });
};
var _delete = function(resp,object,ids,callback){
    object.destroy({
        where:{
            id:ids
        }
    }).then(function(result){
        console.log(result);
        if(callback){
            callback(result > 0);
        }else {
            resp.send(result > 0);
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