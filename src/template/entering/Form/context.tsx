import React, { useState, useContext, useEffect, memo } from 'react';
import { paramToStrs, templateProps } from '../..';
import { Form, Popover, Collapse, FormInstance } from 'antd';
import { getDvaApp } from 'umi';
import { MyField } from '@/component/antd';
import FormItemCompiler from '@/component/compiler/formItem';
const store = getDvaApp()._store;

export interface FormContextProps {
  // 是否在form表单下
  isForm: boolean;
  form?: FormInstance,
}

export const FormContext = React.createContext<FormContextProps>({ isForm: false });


/**
 * form 高阶函数
 */
export function formCreate(Element:any){
  
  const Index = (renderProps:any) => {

    const { isFormItem, formProps, isForm, ...props } = renderProps;

    const context = useContext(FormContext);

    useEffect(() => {
      const params = { ...renderProps, isForm: context.isForm };
      delete params['data-id'];
      delete params['children'];
      store.dispatch({
        type: 'moduleList/renderProps',
        payload: params,
        id: props['data-id'],
      })
    },[context.isForm])

    if(isForm && isFormItem){
      return <Form.Item {...formProps} >
        <Element {...props} />
      </Form.Item>
    }


    return <Element {...props} />
  }

  return memo(Index);
}


/**
 * @name createHtml
 */
export const createHtml = (fun: any) => {

  return ({ isFormItem, isForm, formProps, children, ...props}: any) => {
    const htmlList = fun(props);

    if(!isFormItem){
      return htmlList;
    }

    if(Array.isArray(htmlList[0])){
      return [
        [
          `<Form.Item${paramToStrs(formProps, ' ').join('')} >`,
          ...htmlList[0].map((str: string) => `\t${str}`),
        ],
        [
          ...htmlList[1].map((str: string) => `\t${str}`),
          `</Form.Item>`
        ]
      ]
    }

    return [
      `<Form.Item${paramToStrs(formProps, ' ').join('')} >`,
      ...htmlList.map((str: string) => `\t${str}`),
      `</Form.Item>`
    ]
  }
}

// formItem 操作
export const formItemProps:templateProps['props'] = {
    isFormItem: ['switch', {
        title: '使用FormItem',
        isRender:({ isForm }) => isForm
    }],
    formProps: ['any', {
        render: FormItemCompiler,
        isRender:({ isForm, isFormItem }) => isForm && isFormItem
    }]
}