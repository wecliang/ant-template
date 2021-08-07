import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { TimePicker } from 'antd';
import TimePickerIcon from '@/assets/template/TimePicker.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'TimePicker',
  import: [{
    from: 'antd',
    imports: ['TimePicker']
  }],
  renderText: createHtml((props: any) => {
    return [`<TimePicker${paramToStrs(props, ' ').join('')} />`]
  }),
  renderHTML: () => {
    return <img src={TimePickerIcon} />
  },
  props: {
    ...formItemProps,
    disabled: ['switch',{ title: '禁用状态' }],
    bordered: ['switch(true)',{ title: '是否有边框' }],
    format: ['text', { title: '时间格式' , formProps: { initialValue: 'HH:mm:ss' }}],
    hourStep: ['digit', { title: '小时选项间隔' }],
    minuteStep: ['digit', { title: '分钟选项间隔' }],
    secondStep: ['digit', { title: '秒选项间隔' }],
    showNow: ['switch(false)', { title: '是否显示此刻选项' }],
    use12Hours: ['switch(false)', { title: '使用12小时制' }],
  },
  render: formCreate((props:any) => {

    return (
      <TimePicker {...props} />
    )
  }),
} as templateProps;