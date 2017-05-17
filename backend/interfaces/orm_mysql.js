/**
 * Created by Captain on 2017/5/14.
 */
var Sequelize = require('sequelize');

var sequelize = new Sequelize('bank_cash', 'root', '199133', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;