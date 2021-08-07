import type { ProFieldValueType } from '@ant-design/pro-field';

export type enteringTypesProps = {
    [key in ProFieldValueType]?: string;
}

// 录入来源可选值
export const enteringTypes:enteringTypesProps = {
    text: '文本',
    textarea: '文本域',
    password: '密码',
    date: '日期',
    dateWeek: '星期',
    dateMonth: '月份',
    dateQuarter: '季节',
    dateYear: '年',
    dateRange: '日期范围',
    time: '时间',
    timeRange: '时间范围',
    dateTime: '日期时间',
    dateTimeRange: '日期时间范围',
    rate: '评分',
    money: '金额',
    digit: '数字',
    switch: '开关',
    option: '操作',
    select: '下拉选择框',
    checkbox: '多选框',
    radio: '单选框',
    index: '索引',
    indexBorder: '索引',
    progress: '进度条',
    percent: '百分比',
    avatar: '头像',
    image: '图片',
    color: '颜色',
};