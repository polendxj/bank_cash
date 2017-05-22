/**
 * Created by Administrator on 2016/9/22.
 */
var config = {
    production_csm_url: 'http://172.20.225.207:81',  //proc:172.20.225.247,lib:172.21.224.201,172.20.224.165,172.20.225.207
    consul_url: 'http://172.20.225.207:8500',
    node_port: '80',
    time_out: 5000,
    log4j_dir: "",
    database:"bank_cash",
    username:"root",
    password:"199133",
    host: 'localhost',
    dialect: 'mysql',
    renew_fee_time:28,
    flow_record_time:30,
    code_select_time_min:25,
    code_select_time_max:30

};

module.exports = config;