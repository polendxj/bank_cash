/**
 * Created by Captain on 2017/5/25.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express();
var multiparty = require('multiparty');
var fs = require('fs');
var nodemailer = require('nodemailer');
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
var User = require("../models/User");
var HistoryTask = require("../models/HistoryTask");
var StatisticService = require("../service/StatisticService");
var UserService = require("../service/UserService");
var BaseService = require("../service/BaseService");

router.post('/statistic/getBindCardUsers', function (req, resp) {
    StatisticService._countOfBindCardUser(resp, User);
});
router.post('/statistic/getTaskUsers', function (req, resp) {
    StatisticService._countOfTaskUser(resp, User);
});
router.post('/statistic/getTaskHistory', function (req, resp) {
    StatisticService._countOfHistoryTask(resp, HistoryTask);
});
router.post('/statistic/getOperations', function (req, resp) {
    StatisticService._countOfOperation(resp, HistoryTask);
});
router.post('/statistic/newTenRecords', function (req, resp) {
    StatisticService._newTenRecords(resp, HistoryTask);
});
module.exports = router;