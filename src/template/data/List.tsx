import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import ListIcon from '@/assets/template/List.svg';
import { List, Radio } from 'antd';

export default {
  namespace: 'List',
  import: [
    {
      from: 'antd',
      imports: ['List'],
    }
  ],
  renderText: (props:any) => {
    return [`<List`,...paramToStrs(props),`/>`];
  },
  props:{
    bordered: ['switch',{
      title: '是否展示边框'
    }],
    itemLayout: ['radioButton',{
      isNewline: true,
      title: 'List.Item 布局',
      renderFormItem:() => {
        return (
          <Radio.Group  buttonStyle="solid">
            <Radio.Button value={undefined}>horizontal</Radio.Button>
            <Radio.Button value="vertical">vertical</Radio.Button>
          </Radio.Group>
        )
      },
    }],
    size: ['radioButton', {
      isNewline: true,
      valueEnum: {
        default: 'default',
        large: 'large',
        small: 'small',
      },
      formProps: {
        initialValue: 'default'
      }
    }],
    split: ['switch', {
      title: '是否展示分割线',
    }]
  },
  renderHTML:() => {
    return <img src={ListIcon} />
  },
  render:memo((props:any) => {
    return <List {...props} />
  }),
} as templateProps;