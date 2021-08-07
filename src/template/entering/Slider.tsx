import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Slider } from 'antd';
import SliderIcon from '@/assets/template/Slider.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'Slider',
  import: [{
    from: 'antd',
    imports: ['Slider']
  }],
  renderText: createHtml((props: any) => {
    return [`<Slider${paramToStrs(props, ' ').join('')} />`]
  }),
  renderHTML: () => {
    return <img src={SliderIcon} />
  },
  props: {
    ...formItemProps,
    disabled: ['switch',{ title: '禁用状态' }],
    range: ['switch(false)', { title: '双滑块模式' }],
    reverse: ['switch(false)', { title: '反向坐标轴' }],
    step: ['digit', { title: '步长' }],
    vertical: ['switch(false)', { title: '垂直方向展示' }],
  },
  render: formCreate((props:any) => {

    return (
      <Slider {...props} />
    )
  }),
} as templateProps;