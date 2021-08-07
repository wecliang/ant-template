import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import CalendarIcon from '@/assets/template/Calendar.svg';
import { Calendar } from 'antd';

export default {
  namespace: 'Calendar',
  import: [
    {
      from: 'antd',
      imports: ['Calendar'],
    }
  ],
  renderText: (props:any) => {
    return [`<Calendar`,...paramToStrs(props),`/>`];
  },
  props:{
    fullscreen: ['switch', { 
      title: '是否全屏显示',
      formProps: {
        initialValue: true,
      }
    }],
    mode: ['radioButton',{
      title: '初始模式',
      valueEnum:{
        month: 'month',
        year: 'year',
      },
      formProps:{
        initialValue: 'month',
      }
    }]
  },
  renderHTML:() => {
    return <img src={CalendarIcon} />
  },
  render:memo((props:any) => {
    return <Calendar {...props} />
  }),
} as templateProps;