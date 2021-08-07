import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import PopoverIcon from '@/assets/template/Popover.svg';
import { Popover } from 'antd';

export default {
  namespace: 'Popover',
  import: [
    {
      from: 'antd',
      imports: ['Popover'],
    }
  ],
  renderText: (props:any) => {
    return [`<Popover`,...paramToStrs(props),`/>`];
  },
  props:{

  },
  renderHTML:() => {
    return <img src={PopoverIcon} />
  },
  render:memo((props:any) => {
    return <Popover {...props} />
  }),
} as templateProps;