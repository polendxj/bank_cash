/**
 * Created by Captain on 2017/5/25.
 */
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
var async = require('async');
var sequelize = require("../interfaces/orm_mysql");
var User = require("../models/User");
var Admin = require("../models/Admin");

var _countOfBindCardUser = function (resp, object) {
    async.parallel([
        function (callback) {
            object.count({
                where: {}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {bind_card_status:1}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {bind_card_status:0}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
    ], function (err, results) {
        if(!err){
            var response = {
                result: "SUCCESS",
                totalUser: results[0],
                bindUser: results[1],
                unBindUser: results[2]
            };
            resp.send(response);
        } else{
            resp.send({result: "FAILURE", message:err.message});
        }
    });
};
var _countOfTaskUser = function (resp, object) {
    async.parallel([
        function (callback) {
            object.count({
                where: {flow_record_status:1}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {code_select_status:1}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {renew_fee_status:1}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
    ], function (err, results) {
        if(!err){
            var response = {
                result: "SUCCESS",
                flowRecordUser: results[0],
                codeSelectUser: results[1],
                renewFeeUser: results[2]
            };
            resp.send(response);
        } else{
            resp.send({result: "FAILURE", message:err.message});
        }
    });
};
var _countOfHistoryTask = function (resp, object) {
    async.parallel([
        function (callback) {
            object.count({
                where: {status:1}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {status:2}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            object.count({
                where: {status:3}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
    ], function (err, results) {
        if(!err){
            var response = {
                result: "SUCCESS",
                flowRecordTask: results[0],
                codeSelectTask: results[1],
                renewFeeTask: results[2]
            };
            resp.send(response);
        } else{
            resp.send({result: "FAILURE", message:err.message});
        }
    });
};
var _countOfOperation = function (resp, object) {
    async.parallel([
        function (callback) {
            object.count({
                where: {}
            }).then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                callback(err, null);
            });
        },
        function (callback) {
            sequelize.query("SELECT count(*) as count from (SELECT datediff(plan_deal_date,real_deal_date) as diff from history_task) as d where d.diff=0", { type: sequelize.QueryTypes.SELECT }).then(function (result) {
                console.log(result);
                callback(null, result[0].count);
            }).catch(function (err) {
                callback(err, null);
            });
        }
    ], function (err, results) {
        if(!err){
            var response = {
                result: "SUCCESS",
                totalOperation: results[0],
                delayOperation: results[1]
            };
            resp.send(response);
        } else{
            resp.send({result: "FAILURE", message:err.message});
        }
    });
};
var _newTenRecords = function (resp, object) {
    object.findAll({
        'limit': 10,
        'order': [
            ['real_deal_date', 'DESC']
        ]
    }).then(function(result){
        var count = 0;
        for(var val of result){
            (function (t) {
                Admin.findById(t.admin_id).then(function (admin) {
                    t.dataValues.adminName = admin.name;
                    count++;
                    if(count == 2*result.length){
                        resp.send(result);
                    }
                });
                User.findById(t.user_id).then(function (user) {
                    t.dataValues.userName = user.name;
                    count++;
                    if(count == 2*result.length){
                        resp.send(result);
                    }
                });
            })(val)
        }
    }).catch(function (err) {
        resp.send({result:"FAILURE",message:err.message});
    });
};
module.exports = {
    _countOfBindCardUser: _countOfBindCardUser,
    _countOfTaskUser: _countOfTaskUser,
    _countOfHistoryTask: _countOfHistoryTask,
    _countOfOperation: _countOfOperation,
    _newTenRecords: _newTenRecords,
}