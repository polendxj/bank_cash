/**
 * Created by Captain on 2017/5/14.
 */

var _findByManagerId = function(resp,object,params,callback){
    var page = params.page;
    var pageSize = params.pageSize;
    object.findAndCountAll({
        where:{
            manager_id: params.manager_id
        },
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

var _deleteByManagerIds = function(resp,object,managerIds,callback){
    object.destroy({
        where:{
            manager_id: managerIds
        }
    }).then(function(result){
        if(callback){
            callback(result > 0);
        }else {
            resp.send(result > 0);
        }
    });
};

module.exports = {
    _deleteByManagerIds: _deleteByManagerIds,
    _findByManagerId: _findByManagerId
}
