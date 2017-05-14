var express = require('express');
var path = require('path');
var ejs = require('ejs');
var http = require('http');
var serveStatic = require('serve-static');
var cluster = require('cluster')
var numCPUs = require('os').cpus().length;
var favicon = require('serve-favicon');
var cookieSession = require('cookie-session');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urllib = require('url');
var process = require('process');
var frameworkUtils = require('./backend/frameworkHelper/frameworkUtils');
var exec = require('child_process').exec;
var querystring = require('querystring');
var config = require('./config/config');
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {type: 'console'}, //控制台输出
        {
            type: 'file', //文件输出
            filename: config.log4j_dir,
            maxLogSize: 1024 * 1024,
            backups: 3,
            category: 'main'
        }
    ]
});
logger = log4js.getLogger('main');
// var SysManagerCSR = require('./routes/SysManagerCSR')    此处导入router
var AdminRouter = require('./backend/routers/AdminRouter');
var UserRouter = require('./backend/routers/UserRouter');
var CurrentTaskRouter = require('./backend/routers/CurrentTaskRouter');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(SysManagerCSR)                                   此处使用router
app.use(AdminRouter)
app.use(UserRouter)
app.use(CurrentTaskRouter)
app.use(express.static(path.join(__dirname, 'build')));
app.set('port', require('./config/config').node_port);
app.get('*', function (request, response, next) {
    response.sendFile(__dirname + '/build/index.html');
});
var server = app.listen(app.get('port'), function (req, res) {
    console.log('服务器启动了...');
});
process.on('uncaughtException', function (err) {
    console.log(err);
});
process.on('exit', function () {
    console.log('Bye.');
});
module.exports = app;
