/**
 * Created by Captain on 2017/5/14.
 */
var Sequelize = require('sequelize');
var sequelize = require("../interfaces/orm_mysql");
var Admin = sequelize.define('admin', {
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    permission: Sequelize.STRING,
    head_img: Sequelize.STRING
},{
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    tableName: 'admin',
    timestamps: false
});
module.exports = Admin;