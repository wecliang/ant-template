import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import AvatarIcon from '@/assets/template/Avatar.svg';
import { Avatar } from 'antd';
import { IconView } from '@/component/SelectIcon';

export default {
  namespace: 'Avatar',
  import: ({ icon }) => {
    let result: templateProps['import'] = [
      {
        imports: ['Avatar'],
        from: 'antd',
      }
    ]
    if(icon){
      result.push({
        imports: [`${icon.type}${icon.iconType}`],
        from: '@ant-design/icons',
      })
    }

    return result;
  },
  renderText: ({icon, ...props}:any) => {
    return [`<Avatar${icon? ` icon={<${icon.type}${icon.iconType} />}` : ''} ${paramToStrs(props, ' ').join('')} />`];
  },
  props:{
    alt: ['text', { title:'图片无法显示时替代文本'} ],
    gap: ['digit', {
      title: '字符类型距离左右两侧边界单位像素',
      formProps:{
        initialValue: 4
      },
      fieldProps:{
        min: 0,
        precision: 0,
      }
    }],
    shape: ['radioButton',{
      title: '头像形状',
      valueEnum: {
        circle: 'circle',
        square: 'square',
      },
      formProps: {
        initialValue: 'circle',
      }
    }],
    icon: ['icon'],
    size: ['digit'],
    // size: ['radioButton', {
    //   title: '头像大小',
    //   isNewline: true,
    //   valueEnum: {
    //     large: 'large',
    //     small: 'small',
    //     default: 'default',
    //   },
    //   formProps: {
    //     initialValue: 'default',
    //   }
    // }],
    src: ['textarea', {
      isNewline: true,
      title: '头像地址',
    }],
    draggable: ['switch', { title: '是否允许拖动' }],
  },
  renderHTML:() => {
    return <img src={AvatarIcon} />
  },
  render:memo(({icon, ...props}:any) => {
    return (
      <Avatar {...props} 
        icon={(<IconView {...icon} />)}
      />
    )
  }),
  isInline: true,
} as templateProps;