import React, { memo } from 'react';
import { paramToStrs, templateProps } from '@/template';
import DividerIcon from '@/assets/template/Divider.svg';
import { Divider } from 'antd';

export default {
  namespace: 'Divider',
  import: [
    {
      imports: ['Divider'],
      from: 'antd',
    }
  ],
  props:{
    text: ['textarea', {
      title: '分割线标题',
      isNewline: true,
    }],
    dashed: ['switch', { title: '是否为虚线' }],
    orientation: ['radioButton',{
      title: '分割线位置',
      valueEnum: {
        left: 'left',
        center: 'center',
        right: 'right',
      },
      formProps:{
        initialValue: 'center',
      }
    }],
    plain: ['switch', { title: '文字是否显示为普通正文样式' }],
    type: ['radioButton', {
      title: '水平还是垂直类型',
      isNewline: true,
      valueEnum: {
        horizontal: 'horizontal',
        vertical: 'vertical',
      }
    }]
  },
  renderText: ({ text, ...props }) => {
    if(text){
      return [
        `<Divider${paramToStrs(props, ' ').join('')} >${text}</Divider>`
      ]
    }
    return [`<Divider${paramToStrs(props, ' ').join('')} />`]
  },
  renderHTML: (props:any) => {
    return <img src={DividerIcon} />
  },
  render: memo(({ text, ...props }:any) => {
    return (
      <Divider {...props}>
        {text}
      </Divider>
    )
  }),
} as templateProps;