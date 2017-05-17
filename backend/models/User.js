/**
 * Created by Captain on 2017/5/14.
 */
var Sequelize = require('sequelize');
var sequelize = require("../interfaces/orm_mysql");
var User = sequelize.define('user', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    name: Sequelize.STRING,
    account: Sequelize.STRING,
    idcard: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    email_password: Sequelize.STRING,
    virtual_card: Sequelize.INTEGER,
    card_img: Sequelize.STRING,
    bind_card_date: Sequelize.DATE,
    renew_fee_date: Sequelize.DATE,
    code_select_date: Sequelize.DATE,
    flow_record_date: Sequelize.DATE,
    renew_fee_status: Sequelize.INTEGER,
    task_status: Sequelize.INTEGER,
    bind_card_status: Sequelize.INTEGER,
    is_manager: Sequelize.INTEGER,
    manager_id: Sequelize.STRING,
    register_date: Sequelize.DATE,
    flow_record_status: Sequelize.INTEGER,
    code_select_status: Sequelize.INTEGER,
    plan_renew_fee_date: Sequelize.DATE,
    plan_flow_record_date: Sequelize.DATE,
    plan_code_select_date: Sequelize.DATE
},{
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    tableName: 'user',
    timestamps: false
});
module.exports = User;