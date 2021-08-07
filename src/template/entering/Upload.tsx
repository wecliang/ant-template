import React, { memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Upload } from 'antd';
import UploadIcon from '@/assets/template/Upload.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';
import ButtonTem from '../universal/Button';

export default {
  namespace: 'Upload',
  import: [{
    from: 'antd',
    imports: ['Upload']
  }],
  renderText: createHtml((props: any) => {
    return [
      [`<Upload${paramToStrs(props, ' ').join('')} >`],
      [`</Upload>`]
    ]
  }),
  renderHTML: () => {
    return <img src={UploadIcon} />
  },
  props: {
    ...formItemProps,
    accept:['textarea',{
      title: '接受文件类型',
      isNewline: true,
    }],
    action: ['text',{
      title: '文件地址',
      isNewline: true,
    }],
    directory: ['switch(false)',{
      title: '支持上传文件夹'
    }],
    disabled: ['switch(false)', {
      title:'是否禁用',
    }],
    listType: ['select',{
      title: '上传列表的内建样式',
      valueEnum: {
        text: 'text',
        picture: 'picture',
        'picture-card': 'picture-card',
      },
      isNewline: true,
      formProps:{
        initialValue: 'text',
      }
    }],
    maxCount: ['digit',{
      title: '最大上传数量',
      fieldProps:{
        min: 1,
        precision: 0,
      },
      formProps:{
        initialValue: 1, 
      }
    }]
  },
  render: formCreate(({ children, ...props}:any) => {

    return (
      <Upload {...props} >{children}</Upload>
    )
  }),
  children:[
    {
      ...ButtonTem,
      defaultProps:{
        ...ButtonTem.defaultProps,
        text: '上传文件',
        icon: {
          "type": "Upload",
          "iconType": "Outlined"
        }
      }
    }
  ],
  isContainer: true,
} as templateProps;