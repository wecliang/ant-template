import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Select } from 'antd';
import SelectIcon from '@/assets/template/Select.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'Select',
  import: [{
    from: 'antd',
    imports: ['Select']
  }],
  renderText: createHtml((props: any) => {
    return [
      `<Select${paramToStrs(props, ' ').join('')} />`
    ]
  }),
  renderHTML: () => {
    return <img src={SelectIcon} />
  },
  props: {
    ...formItemProps,
    placeholder:['text', {
      title: '选择提示'
    }],
    disabled: ['switch',{ title: '只读模式' }],
  },
  defaultProps:{
    placeholder: '请选择',
  },
  render: formCreate((props:any) => {

    return (
      <Select {...props}>
        <Select.Option value="1">选项一</Select.Option>
        <Select.Option value="2">选项二</Select.Option>
        <Select.Option value="3">选项三</Select.Option>
      </Select>
    )
  }),
} as templateProps;