/**
 * Created by Captain on 2017/5/14.
 */
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
// var _findByManagerId = function(resp,object,params,callback){
//     var page = params.page;
//     var pageSize = params.pageSize;
//     object.findAndCountAll({
//         where:{
//             manager_id: params.manager_id
//         },
//         offset:(page - 1) * pageSize,
//         limit:pageSize
//     }).then(function(result){
//         if(callback){
//             callback(result);
//         }else {
//             resp.send(result);
//         }
//     });
// };
var _findAndCountAll = function(resp,object,params,callback){
    var page = params.page;
    var pageSize = params.pageSize;
    var name = params.name;
    delete params.page;
    delete params.pageSize;
    delete params.name;
    if(!name){
        name = "";
    }
    params = frameworkUtils.deleteNullKey(params);
    console.log(params);
    object.findAndCountAll({
        where:{
            '$and': [
                params,
                {
                    name:{
                        '$like': '%'+name+'%'
                    }
                }
            ]
        },
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
var _deleteByManagerIds = function(resp,object,managerIds,params,callback){
    object.update(params,{
        where:{
            manager_id: managerIds
        }
    }).then(function(result){
        if(callback){
            callback({result:"SUCCESS"});
        }else {
            resp.send({result:"SUCCESS"});
        }
    }).catch(function(err){
        if(callback){
            callback({result:"FAILURE",message:err.message});
        }else {
            resp.send({result:"FAILURE",message:err.message});
        }
    });
};
var _delete = function(resp,object,ids,params,callback){
    object.update(params,{
        where:{
            id: ids
        }
    }).then(function(result){
        if(callback){
            callback({result:"SUCCESS"});
        }else {
            resp.send({result:"SUCCESS"});
        }
    }).catch(function(err){
        if(callback){
            callback({result:"FAILURE",message:err.message});
        }else {
            resp.send({result:"FAILURE",message:err.message});
        }
    });
};

module.exports = {
    _findAndCountAll: _findAndCountAll,
    _deleteByManagerIds: _deleteByManagerIds,
    _delete: _delete
}
