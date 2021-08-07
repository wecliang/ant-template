import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import TagIcon from '@/assets/template/Tag.svg';
import { Tag } from 'antd';
import { IconView } from '@/component/SelectIcon';

export default {
  namespace: 'Tag',
  import: [
    {
      from: 'antd',
      imports: ['Tag'],
    }
  ],
  renderText: (props:any) => {
    return [`<Tag`,...paramToStrs(props),`/>`];
  },
  props:{
    text: ['textarea', { title:'标签内容' }],
    closable: ['switch', {
      title: '标签是否可关闭',
    }],
    closeIcon: ['icon', {
      title: '关闭按钮',
      isRender:({ closable }) => closable,
    }],
    color: ['text'],
    icon: ['icon'],
  },
  defaultProps: {
    text: '标签'
  },
  renderHTML:() => {
    return <img src={TagIcon} />
  },
  render:memo(({ icon, closeIcon, text, ...props}:any) => {
    return (
      <Tag 
        {...props} 
        closeIcon={closeIcon && <IconView {...closeIcon}/>} 
        icon={icon && <IconView {...icon}/>} 
      >
        {text}
      </Tag>
    )
  }),
} as templateProps;