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
    var sortParam = params.sortParam;
    var sortType = params.sortType;
    var name = params.name;
    delete params.page;
    delete params.pageSize;
    delete params.name;
    delete params.sortParam;
    delete params.sortType;
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
                },
                {delete_status:1}
            ]
        },
        offset:page * pageSize,
        limit:pageSize,
        order: [
            [sortParam, sortType]
        ]
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

var renewFeeStatus = function(object) {
    object.findAll({
        where: {delete_status:1}
    }).then(function (result) {
        for (var user of result) {
            var diffDate = frameworkUtils.GetDateDiff(new Date(),user.register_date);
            console.log(diffDate);
            if(user.renew_fee_status == 0){
                if (diffDate % renew_fee_time == 0) {
                    var params = {renew_fee_status:1};
                    object.update(params, {
                        where: {id: user.id}
                    }).then(function (result) {

                    }).catch(function (err) {
                        console.log(err.message);
                    });
                }
            }
        }
    }).catch(function (err) {
        console.log(err.message);
    });
}
var taskStatus = function(object) {
    object.findAll({
        where: {delete_status:1}
    }).then(function (result) {
        for (var user of result) {
            var diffDate = frameworkUtils.GetDateDiff(new Date(),user.register_date);
            if (user.task_status==0) {
                if(diffDate % flow_record_time == 0 && user.flow_record_status == 0){
                    var params = {flow_record_status:1};
                    object.update(params, {
                        where: {id: user.id}
                    }).then(function (result) {

                    }).catch(function (err) {
                        console.log(err.message);
                    });
                }
            }else if(user.task_status==1){
                if(diffDate % code_select_time == 0 && user.code_select_status == 0){
                    var params = {code_select_status:1};
                    object.update(params, {
                        where: {id: user.id}
                    }).then(function (result) {

                    }).catch(function (err) {
                        console.log(err.message);
                    });
                }
            }
        }
    }).catch(function (err) {
        console.log(err.message);
    });
};
var findCountInManager = function (resp,object,params,callback) {
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
    object.findAll({
        where:{
            is_manager:1
        }
    }).then(function(users){
        var list = [];
        var count = 0;
        for(var user of users){
            (function (u) {
                var manager = u.dataValues;
                var m = {};
                object.findAndCountAll({
                    where:{
                        '$and': [
                            params,
                            {manager_id : user.id},
                            {
                                name:{
                                    '$like': '%'+name+'%'
                                }
                            },
                            {delete_status:1}
                        ]
                    },
                    offset:page * pageSize,
                    limit:pageSize
                }).then(function(result){
                    count++;
                    m[manager.id] = result.count;
                    list.push(m);
                    if(count == users.length){
                        if(callback){
                            callback(list);
                        }else {
                            resp.send(list);
                        }
                    }
                }).catch(function (err) {
                    count++;
                    list = {result:"FAILURE",message:err.message};
                    if(count == users.length){
                        if(callback){
                            callback(list);
                        }else {
                            resp.send(list);
                        }
                    }
                });
            })(user)
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
    _deleteByManagerIds: _deleteByManagerIds,
    _delete: _delete,
    renewFeeStatus: renewFeeStatus,
    taskStatus: taskStatus,
    findCountInManager: findCountInManager
}
