import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import BadgeIcon from '@/assets/template/Badge.svg';
import { Badge, InputNumber } from 'antd';


// 位置偏移
const offsetRender = ({ value, onChange }:any) => {


  return (
    <div style={{ display:'flex', alignItems:'center' }}>
      <InputNumber
        placeholder="水平间距"
        value={value && value[0]}
        precision={0} 
        onChange={(val) => {
          onChange(value? [val, value[1]] : [val, 0])
        }}
      />
      <span>—</span>
      <InputNumber
        placeholder="垂直间距"
        value={value && value[1]} 
        precision={0}
        onChange={(val) => {
          onChange(value? [value[0], val] : [0, val])
        }}
      />
    </div>
  )
}

export default {
  namespace: 'Badge',
  import: [
    {
      from: 'antd',
      imports: ['Badge'],
    }
  ],  
  renderText: (props:any) => {
    return [
      [`<Badge${paramToStrs(props,' ').join('')} >`],
      [`</Badge>`]
    ];
  },
  props:{
    status: ['select',{
      title: '状态',
      valueEnum: {
        success: 'success',
        processing: 'processing',
        default: 'default',
        error: 'error',
        warning: 'warning',
      }
    }],
    text: ['text', {
      isNewline: true,
      title: '状态点的文本',
    }],
    color: ['color',{ title:'小圆点颜色' }],
    count: ['digit', { title:'展示数字' }],
    dot: ['switch', { title:'不展示数字' }],
    offset: ['any',{
      title: '位置偏移',
      isNewline: true,
      render: offsetRender,
    }],
    overflowCount: ['digit', {
      title: '展示封顶数字值',
      formProps: {
        initialValue: 99,
      },
      fieldProps:{
        precision: 0,
      }
    }],
    showZero: ['switch', {
      title: '当数值为 0 时，是否展示 Badge',
    }],
    size: ['radioButton',{
      title: '圆点的大小',
      valueEnum:{
        default: 'default',
        small: 'small',
      }
    }],
    title: ['textarea',{
      title: '鼠标放在状态点上时显示的文字',
      fieldProps: {
        placeholder: '请输入',
      }
    }]
  },
  renderHTML:() => {
    return <img src={BadgeIcon} />
  },
  render:memo((props:any) => {
    return <Badge {...props} />
  }),
  isInline: true,
  isContainer: true,
} as templateProps;