/**
 * Created by Captain on 2017/5/14.
 */
var Sequelize = require('sequelize');
var sequelize = require("../interfaces/orm_mysql");
var HistoryTask = sequelize.define('history_task', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    status: Sequelize.INTEGER,
    admin_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    plan_deal_date: Sequelize.DATE,
    real_deal_date: Sequelize.DATE
},{
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    tableName: 'history_task',
    timestamps: false
});
module.exports = HistoryTask;