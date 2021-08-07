import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import TreeIcon from '@/assets/template/Tree.svg';
import { Tree } from 'antd';

export default {
  namespace: 'Tree',
  import: [
    {
      from: 'antd',
      imports: ['Tree'],
    }
  ],
  renderText: (props:any) => {
    return [`<Tree`,...paramToStrs(props),`/>`];
  },
  props:{

  },
  renderHTML:() => {
    return <img src={TreeIcon} />
  },
  render:memo((props:any) => {
    return <Tree {...props} />
  }),
} as templateProps;