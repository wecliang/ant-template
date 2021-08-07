import { templateProps } from '..';
import { getDvaApp } from 'umi';
import React, { memo, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { ModalForm } from '@ant-design/pro-form';

export default {
  namespace: 'Container',
  import: ({ isComponent, name, from }) => {
    if(isComponent){
      return [{
        default: name,
        from,
      }]
    }
    return [];
  },
  renderText: ({ isComponent, name }) => {
    if(isComponent){
      return [`<${name} />`];
    }
    return [];
  },
  props: {
    style: ['any'],
    transform: ['any', {
      render: memo((props: any) => {

        const onEditComponent = useCallback((params) => {
          const { dispatch } = getDvaApp()._store;
          dispatch({
            type: 'dropContainer/save',
            payload:{
              selected: undefined,
            },
          })
          dispatch({
            type: 'moduleList/component',
            payload:  props['data-id'],
            params: {
              ...params,
              isComponent: true,
            },
          })
        },[props['data-id']])

        return (
          <ModalForm
            title="转换为组件"
            trigger={(
              <Button type="primary">
                转换为组件
              </Button>
            )}
            onFinish={(params) => {
              onEditComponent(params)
              return Promise.resolve(true);
            }}
          >
            <Form.Item label="组件名称" name="name" 
              rules={[{ required:true, whitespace:true, message:'请输入组件名称' }]}
            >
              <Input placeholder="请输入组件名称" autoComplete="off" />
            </Form.Item>
            <Form.Item label="组件引用地址" name="from"
              rules={[{ required:true, whitespace:true, message:'请输入组件引用地址' }]}
            >
              <Input placeholder="请输入组件引用地址" autoComplete="off" />
            </Form.Item>
          </ModalForm>
        )
      }),
      isRender:({ isComponent }) => !isComponent,
    }],
    edit: ['any', {
      render: (props: any) => {

        const onEditComponent = useCallback(() => {
          const { dispatch } = getDvaApp()._store;
          dispatch({
            type: 'dropContainer/save',
            payload:{
              selected: undefined,
            },
          })
          dispatch({
            type: 'moduleList/component',
            payload:  props['data-id'],
            params: {},
          })
        },[props['data-id']])

        return (
          <Button type="primary" onClick={() => onEditComponent()}>编辑组件</Button>
        )
      },
      isRender:({ isComponent }) => isComponent,
    }]
  },
  render: ({ children }: any) => {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  },
  isContainer: true,
} as templateProps;