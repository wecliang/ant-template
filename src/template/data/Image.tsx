import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import ImageIcon from '@/assets/template/Image.svg';
import { Image } from 'antd';

export default {
  namespace: 'Image',
  import: [
    {
      from: 'antd',
      imports: ['Image'],
    }
  ],
  renderText: (props:any) => {
    return [`<Image`,...paramToStrs(props),`/>`];
  },
  props:{
    src: ['textarea', {
      isNewline: true,
      title: '图片地址',
    }],
    preview: ['switch',{
      title: '图片预览',
      formProps: {
        initialValue: true,
      }
    }],
    width: ['digit',{
      title: '图片宽度',
      fieldProps: {
        min: 0,
        precision: 0,
      }
    }],
    height: ['digit', {
      title: '图片高度',
      fieldProps: {
        min: 0,
        precision: 0,
      }
    }],
    alt: ['textarea', {
      isNewline: true,
      title: '图像描述',
    }],
    fallback: ['textarea', {
      isNewline: true,
      title: '加载失败容错地址'
    }]
  },
  defaultProps:{
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    width: 200,
  },
  renderHTML:() => {
    return <img src={ImageIcon} />
  },
  render:memo((props:any) => {
    return <Image {...props} />
  }),
} as templateProps;