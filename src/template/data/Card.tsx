import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import CardIcon from '@/assets/template/Card.svg';
import { Card } from 'antd';

export default {
  namespace: 'Card',
  import: [
    {
      imports: ['Card'],
      from: 'antd',
    }
  ],
  renderText: (props:any) => {
    return [
      [`<Card${paramToStrs(props, ' ').join('')} >`],
      [`</Card>`]
    ];
  },
  props:{
    title: ['textarea',{
      isNewline: true,
      title: '卡片标题'
    }],
    bordered: ['switch', { 
      title: '是否有边框',
      formProps: {
        initialValue: true,
      }
    }],
    hoverable: ['switch',{
      title: '鼠标移过时可浮起',
    }],
    loading: ['switch'],
    size: ['radioButton',{
      title: 'card 的尺寸',
      valueEnum: {
        default: 'default',
        small: 'small',
      },
      formProps: {
        initialValue: 'default'
      }
    }],
  },
  renderHTML:() => {
    return <img src={CardIcon} />
  },
  render:memo((props:any) => {
    return <Card {...props} />
  }),
  isContainer: true,
} as templateProps;