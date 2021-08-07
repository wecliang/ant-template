import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import StatisticIcon from '@/assets/template/Statistic.svg';
import { Statistic } from 'antd';

export default {
  namespace: 'Statistic',
  import: [
    {
      from: 'antd',
      imports: ['Statistic'],
    }
  ],
  renderText: (props:any) => {
    return [`<Statistic`,...paramToStrs(props),`/>`];
  },
  props:{
    title: ['text', { title: '数值标题', isNewline: true }],
    value: ['textarea', { title: '数值内容', isNewline: true }],
    valueStyle: ['style', { title: '数值样式' }],
    decimalSeparator: ['text', { title: '设置小数点' }],
    groupSeparator: ['text', { title: '千分位展示符' }],
    loading: ['switch', { title:'加载中' }],
    precision: ['digit', {
      title: '数值精度',
      fieldProps:{
        min: 0,
        precision: 0,
      },
    }],
  },
  defaultProps: {
    value: 1000,
    title: '数值来源'
  },
  renderHTML:() => {
    return <img src={StatisticIcon} />
  },
  render:memo((props:any) => {
    return <Statistic {...props} />
  }),
} as templateProps;