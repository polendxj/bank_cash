/**
 * Created by Captain on 2017/5/14.
 */
var Sequelize = require('sequelize');

var sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});
module.exports = sequelize;