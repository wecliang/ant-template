import component from '@/locales/zh-CN/component'
import { TemplateRenderProps } from '@/template'
import { Form, Button } from 'antd';
import { getDvaApp } from 'umi';
import { useCallback } from 'react';

export const componentSettingProps: TemplateRenderProps = {
  style: ['any'],
  name: ['text', {
    title: '组件名称',
    formProps: {
      rules: [{
        required: true,
        message: '组件名称不能为空'
      }]
    },
    isNewline: true,
  }],
  from: ['text', {
    title: 'import form引用路径',
    formProps: {
      rules: [{
        required: true,
        message: '请输入form路径',
      }]
    },
    isNewline: true
  }],
  transform: ['any', {
    render: () => {

      const onSubmit = useCallback((validateFields) => {
        const { dispatch } = getDvaApp()._store;
        validateFields().then((value: any) => {
          dispatch({
            type: 'moduleList/page',
          })
        })
      },[])

      return (
        <Form.Item shouldUpdate={() => false}>
          {(form) => {
            const { validateFields } = form;
            return (
              <Button 
                type="primary"
                onClick={() => {
                  onSubmit(validateFields)
                }}
              >保存</Button>
            )
          }}
        </Form.Item>
      )
    }
  }]
}