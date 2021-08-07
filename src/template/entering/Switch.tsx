import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Switch } from 'antd';
import SwitchIcon from '@/assets/template/Switch.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'Switch',
  import: [{
    from: 'antd',
    imports: ['Switch']
  }],
  renderText: createHtml((props: any) => {
    return [`<Switch${paramToStrs(props, ' ').join('')} />`]
  }),
  renderHTML: () => {
    return <img src={SwitchIcon} />
  },
  props: {
    ...formItemProps,
    disabled: ['switch',{ title: '禁用状态' }],
  },
  render: formCreate((props:any) => {

    return (
      <Switch {...props} />
    )
  }),
} as templateProps;