import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import EmptyIcon from '@/assets/template/Empty.svg';
import { Empty, Radio } from 'antd';

export default {
  namespace: 'Empty',
  import: [
    {
      from: 'antd',
      imports: ['Empty'],
    }
  ],
  renderText: (props:any) => {
    return [`<Empty`,...paramToStrs(props),`/>`];
  },
  props:{
    description: ['textarea',{
      title: '描述内容',
      isNewline: true,
    }],
    image: ['any', {
      title: '风格',
      isNewline: true,
      render:({ value, onChange }:any) =>{
        return <Radio.Group value={value} onChange={onChange}>
          <Radio value={undefined}>default</Radio>
          <Radio value="SIMPLE">simple</Radio>
        </Radio.Group>
      }
    }]
  },
  renderHTML:() => {
    return <img src={EmptyIcon} />
  },
  render:memo(({ image, ...props}:any) => {
    return <Empty 
        {...props}
        image={image && Empty.PRESENTED_IMAGE_SIMPLE}
      />
  }),
} as templateProps;