/**
 * Created by Captain on 2017/5/14.
 */

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
    _deleteByManagerIds: _deleteByManagerIds
}
