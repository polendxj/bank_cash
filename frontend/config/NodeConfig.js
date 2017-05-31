/**
 * Created by Administrator on 2016/8/30.
 */
/*nodejs 服务地址*/
var node_service = '';

/*分页最大页*/
var page_size = 50;

/*后端超时次数*/
var timeout_time = 5;

/*操作枚举*/
var business_operation_action = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    SEARCH: "SEARCH",
    SAVE: "SAVE",
    BACK: "BACK",
    LIST: "LIST"
};
var business_operation_status = {
    INIT: "INIT",
    DOING: "DOING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
};

/*后端接口*/

var user_list = "/users";
var user_save = "/user/register";
var user_edit = "/user/update";
var user_delete = "/user/deleteByIds";
var user_delete_manager = "/user/deleteByManager";
var user_count_of_manager = "/user/findCountInManager";
var imagePath = node_service + "/uploadImgs";
var send_email = "/user/sendEmail";
var download_flow = "/user/updateFlowRecordStatus";
var renew_fee = "/user/updateRenewFeeStatus";
var code_select = "/user/updateCodeSelectStatus";
var bind_card_user = "/statistic/getBindCardUsers";
var task_user = "/statistic/getTaskUsers";
var task_history = "/statistic/getTaskHistory";
var system_operation = "/statistic/getOperations";
var new_ten = "/statistic/newTenRecords";



