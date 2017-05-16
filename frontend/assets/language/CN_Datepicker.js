/**
 * Created by Captain on 2017/3/12.
 */
dateLocale = {
    format: 'YYYY/MM/DD',
    separator: ' - ',
    applyLabel: '确定',
    cancelLabel: '取消',
    startLabel: '起始时间',
    endLabel: '结束时间',
    customRangeLabel: '自定义',
    daysOfWeek: [ '日', '一', '二', '三', '四', '五', '六' ],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    firstDay: 1
};
rangesLocale = {
    '今日': [moment(), moment()],
        '昨日': [moment().subtract('days', 1), moment().subtract('days', 1)],
        '最近7日': [moment().subtract('days', 6), moment()],
        '最近30日': [moment().subtract('days', 29), moment()],
        '这个月': [moment().startOf('month'), moment().endOf('month')],
        '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
};