import React, { memo } from 'react';
import { templateProps, paramToStrs } from '..';
import { Typography } from 'antd';
import TypographyIcon from '@/assets/template/Typography.svg';

export default {
  namespace: 'Typography',
  import: [
    {
      from: 'antd',
      imports: ['Typography'],
    }
  ],
  renderText: ({ ControlTypes, text, ...props }: any) => {
    let params: any = {};
    for(let key in props){
      if(props[key]) params[key] = props[key];
    }
    return [
      `<Typography.${ControlTypes}${paramToStrs(params, ' ').join('')} >`,
      `\t${text || 'Typography'}`,
      `</Typography.${ControlTypes}>`
    ]
  },
  renderHTML: () => {
    return <img src={TypographyIcon} />
  },
  props: {
    text: ['textarea', {
      isNewline: true,
      title: '内容文本',
    }],
    ControlTypes: ['radioButton',{
        isNewline: true,
        title: '控件类型',
        valueEnum: {
          Text: 'Text',
          Title: 'Title',
          Paragraph: 'Paragraph',
        }
    }],
    level: ['radioButton', {
      title: '重要程度',
      valueEnum: {
        1: 'H1',
        2: 'H2',
        3: 'H3',
        4: 'H4',
        5: 'H5',
      },
      formProps: {
        initialValue: 1,
      },
      isRender: ({ ControlTypes }) => ControlTypes === 'Title',
      isNewline: true,
    }],
    code: ['switch', { title: '添加代码样式' }],
    copyable: ['switch', {
      title: '是否拷贝',
    }],
    delete: ['switch', { title: '添加删除线' }],
    disabled: ['switch', { title: '禁用文本' }],
    ellipsis: ['switch', { title: '自动溢出省略' }],
    keyboard: ['switch', { title: '添加键盘样式' }],
    mark: ['switch', { title: '添加标记样式' }],
    strong: ['switch', { title: '是否加粗' }],
    italic: ['switch', { title: '是否斜体' }],
    type: ['select', {
      title: '文本类型',
      valueEnum: {
        secondary: 'secondary',
        success: 'success',
        warning: 'warning',
        danger: 'danger',
      }
    }],
    underline: ['switch', { title: '添加下划线样式' }],
  },
  defaultProps: {
    ControlTypes: 'Text',
  },
  render: memo(({ text, level, ControlTypes, ...props}:any) => {
    let Element:any;
    switch(ControlTypes){
      case 'Text': Element = Typography.Text; break;
      case 'Title': Element = Typography.Title; break;
      case 'Paragraph': Element = Typography.Paragraph; break;
    }
    return (
      <Element level={Number(level || 1)} {...props}>
        {text || 'Typography'}
      </Element>
    )
  }),
} as templateProps;