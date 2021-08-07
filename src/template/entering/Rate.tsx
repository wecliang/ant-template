import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Rate } from 'antd';
import RateIcon from '@/assets/template/Rate.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';

export default {
  namespace: 'Rate',
  import: [{
    from: 'antd',
    imports: ['Rate']
  }],
  renderText: createHtml((props: any) => {
    return [`<Rate${paramToStrs(props, ' ').join('')} />`]
  }),
  renderHTML: () => {
    return <img src={RateIcon} />
  },
  props: {
    ...formItemProps,
    allowClear: ['switch(true)', { title: '允许再次点击删除' }],
    allowHalf: ['switch(false)',{ title:'是否允许半选' }],
    count: ['digit', {
      title: 'star 总数',
      fieldProps: {
        precision: 0,
        min: 1,
        max: 99,
      },
      formProps: {
        initialValue: 5,
      }
    }],
    disabled: ['switch',{ title: '只读模式' }],
  },
  render: formCreate((props:any) => {

    return <Rate {...props} />
  }),
} as templateProps;