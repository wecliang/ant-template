import React from 'react';
import { paramToStrs, templateProps } from '..';
import { Space } from 'antd';
import SpaceIcon from '@/assets/template/Space.svg';

export default {
  namespace: 'Space',
  import: [
    {
      from: 'antd',
      imports: ['Space']
    }
  ],
  renderText: (props) => {
    return [
      [`<Space${paramToStrs(props,' ').join('')} >`],
      [`</Space>`]
    ]
  },
  renderHTML: () => {
    return <img src={SpaceIcon} />
  },
  props:{

  },
  render: (props:any) => {
    return <Space { ...props } />
  },
  isContainer: true,
} as templateProps