import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { TreeSelect } from 'antd';
import TreeSelectIcon from '@/assets/template/TreeSelect.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'TreeSelect',
  import: [{
    from: 'antd',
    imports: ['TreeSelect']
  }],
  renderText: createHtml((props: any) => {
    return [`<TreeSelect${paramToStrs(props, ' ').join('')} />`]
  }),
  renderHTML: () => {
    return <img src={TreeSelectIcon} />
  },
  props: {
    ...formItemProps,
    disabled: ['switch',{ title: '禁用状态' }],
    bordered: ['switch(true)', { title: '是否显示边框' }],
    placeholder: ['text', { title: '选择提示', isNewline: true }],
  },
  render: formCreate((props:any) => {

    return (
      <TreeSelect {...props} />
    )
  }),
} as templateProps;