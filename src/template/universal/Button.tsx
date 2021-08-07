import React, { memo } from 'react';
import { templateProps, paramToStrs } from '..';
import { Button } from 'antd';
import ButtonIcon from '@/assets/template/Button.svg';
import { IconView } from '@/component/SelectIcon';

export default {
  namespace: 'Button',
  import: ({ icon, event }: any) => {
    let result: templateProps['import'] = [
      {
        imports: ['Button'],
        from: 'antd',
      }
    ]
    if(icon){
      result.push({
        imports: [`${icon.type}${icon.iconType}`],
        from: '@ant-design/icons',
      })
    }
    if(event){
      switch(event){
        case 'goBack':
        case 'push':
          result.push({
            imports: [`history`],
            from: 'umi',
          })
        break;
      }
    }
    return result;
  },
  renderText: ({ icon, text, eventPush, event, ...props }) =>{

    const getClick = () => {
      switch(event){
        case 'goBack': return `history.goBack()`;
        case 'push': return `history.push('${eventPush})`;
        case 'submit': return `form.submit()`;
        case 'reset': return `form.resetFields()`;
      }
    }

    return [
      `<Button${icon? ` icon={<${icon.type}${icon.iconType} />}` : ''}${paramToStrs(props, ' ').join('')}`
      +`${event? ` onClick={() =>${getClick()}}` : ''} > ${text || 'button'}</Button>`
    ];
  },
  renderHTML: () => {
    return <img src={ButtonIcon} />
  },
  props:{
    text: [
      'textarea', 
      {
        title: '文本内容',
        isNewline: true,
      } 
    ],
    danger: ['switch', { title: '危险按钮' }],
    disabled: ['switch', { title: '失效状态' }],
    ghost: ['switch', { title: '幽灵属性' }],
    htmlType: ['select', {
      valueEnum: {
        reset: 'reset',
        submit: 'submit',
      }
    }],
    icon: ['icon'],
    loading: ['switch'],
    shape: ['select', {
      title: '按钮形状',
      valueEnum: {
        circle: 'circle',
        round: 'round',
      }
    }],
    type: ['select', {
      title: '按钮类型',
      valueEnum: {
        default: 'default',
        primary: 'primary',
        ghost: 'ghost',
        dashed: 'dashed',
        link: 'link',
        text: 'text',
      }
    }],
    event: ['select', {
      title: '事件类型',
      valueEnum: {
        goBack: '返回上一页',
        push: '页面跳转',
        submit: '表单提交',
        reset: '表单重置',
      }
    }],
    eventPush: ['text', {
      title: '跳转地址',
      isRender: ({ event }) => event === 'push',
    }]
  },
  render:memo(({ text, event, eventPush,  icon, ...props }:any) => {
    return (
      <Button 
        {...props}
        icon={(<IconView {...icon} />)}
      >
        {text || 'button'}
      </Button>
    )
  }),
  isInline: true,
} as templateProps