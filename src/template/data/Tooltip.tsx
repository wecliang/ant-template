import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import TooltipIcon from '@/assets/template/Tooltip.svg';
import { Tooltip } from 'antd';

export default {
  namespace: 'Tooltip',
  import: [
    {
      from: 'antd',
      imports: ['Tooltip'],
    }
  ],
  renderText: (props:any) => {
    return [
      [`<Tooltip`,...paramToStrs(props),`>`],
      [`</Tooltip>`]
    ];
  },
  props:{
    title: ['textarea', { title:'提示的文字' }],
    arrowPointAtCenter: ['switch', { title:'箭头是否指向目标元素中心' }],
    autoAdjustOverflow: ['switch', {
      title: '气泡被遮挡时自动调整位置',
      formProps: {
        initialValue: true,
      },
    }],
    color: ['color',{ title: '背景颜色' }],
    defaultVisible: ['switch', { title:'默认是否显隐' }],
    destroyTooltipOnHide: ['switch', { title:'关闭后是否销毁 Tooltip' }],
    placement: ['select', {
      title: '气泡框位置',
      valueEnum: {
        top: 'top',
        left: 'left',
        right: 'right',
        bottom: 'bottom',
        topLeft: 'topLeft',
        topRight: 'topRight',
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight',
        leftTop: 'leftTop',
        leftBottom: 'leftBottom',
        rightTop: 'rightTop',
        rightBottom: 'rightBottom',
      }
    }],
    trigger: ['radioButton', {
      title: '触发方式',
      valueEnum: {
        hover: 'hover',
        focus: 'focus',
        click: 'click',
        contextMenu: 'contextMenu',
      },
      formProps: {
        initialValue: 'hover',
      }
    }],
    zIndex: ['digit', {
      fieldProps:{
        min: 0,
        precision: 0,
      }
    }]
  },
  renderHTML:() => {
    return <img src={TooltipIcon} />
  },
  render:memo((props:any) => {
    return <Tooltip {...props} />
  }),
  isInline: true,
  isContainer: true,
} as templateProps;