// 根据field字段生成对应假数据
import { enteringType } from '@/enums/field';
import { getRandomChineseWord, getRandomString } from './str';


/**
 * @name 生成随机时间戳
 * @param num 生成时间戳范围（单位：月）
 */
export const getTimestamp = (nums:[number, number] = [-64, 64]) => {
    let time = new Date().getTime();
    let min = time + nums[0] * 3600 * 24 * 30 * 1000;
    let max = time + nums[1] * 3600 * 24 * 30 * 1000;
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * @name 根据字段类型，生成对应假数据
 * @param type 当前字段类型
 * @return any
 */
export const getFieldsValue = (type:enteringType) => {
    switch(type){
        case 'id': return getRandomString();
        case 'textarea': return getRandomChineseWord([16,32]);
        case 'date':
        case 'dateRange':
        case 'time':
        case 'dateTime':
        case 'dateTimeRange':
        case 'dateMonth':
        case 'dateYear':
        case 'dateQuarter': return getTimestamp();
        case 'money':
        case 'digit': return Math.round(Math.random() * 1000).toFixed(2);
        case 'switch': return Math.random() > 0.5;
    }
    return getRandomChineseWord();
}