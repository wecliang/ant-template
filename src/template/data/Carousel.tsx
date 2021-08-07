import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import CarouselIcon from '@/assets/template/Carousel.svg';
import { Carousel } from 'antd';
import Div from '../layout/Div';


export default {
  namespace: 'Carousel',
  import: [
    {
      from: 'antd',
      imports: ['Carousel'],
    }
  ],
  renderText: (props:any) => {
    return [
      [`<Carousel`,...paramToStrs(props),`>`],
      [`</Carousel>`]
    ];
  },
  props:{
    autoplay: ['switch', {
      title: '是否自动切换',
    }],
    dotPosition: ['radioButton',{
      title: '面板指示点位置',
      isNewline: true,
      valueEnum: {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
      }
    }],
    dots: ['switch', {
      title: '是否显示面板指示点',
      formProps: {
        initialValue: true,
      }
    }],
    easing: ['text', {
      title: '动画效果',
      formProps:{
        initialValue: 'linear',
      }
    }]
  },
  renderHTML:() => {
    return <img src={CarouselIcon} />
  },
  render:memo(({children, ...props}:any) => {
    return (
      <Carousel {...props} >
        {children}
      </Carousel>
    )
  }),
  children: [
    { ...Div, defaultProps: { ...Div.defaultProps, style:{ width: '100px', height: '100px', background: '#ff0000' }} }
  ],
  isContainer: true,
} as templateProps;