import React, { useEffect } from 'react';
import Field from '@ant-design/pro-field';
import { ProFieldPropsType } from '@ant-design/pro-field';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import { Form, Input } from 'antd';
const { Item } = Form;
import { initializeFieldProps, initializeFromProps } from './initProps';

/**
 * Field 原子组件封装
 * label 和 isForm 决定是否需要渲染 FormItem
 * MyInput react-input 组件受控 无法输入汉字（暂改为antd Input组件替代使用）
 */

// 用于触发表单 trigger
const ValueTrigger = ({ initialValues, onChange }:any) => {
  useEffect(() => {
    onChange(initialValues);
  },[initialValues])
  return null;
}
export interface MyFieldProps extends Partial<ProFieldPropsType> {
  formProps?: FormItemProps;
  label?: string;
  isForm?: boolean;
  rules?: FormItemProps['rules'];
  required?: Boolean;
  transform?: (
    value: any,
    option?: any,
  ) => Promise<object> | Promise<any[][]> | object | any[][] | void;
}


// text 下input组件 react-input 受控 无法输入汉字
const decideRenderFormItem = ({ valueType, mode }: MyFieldProps): any => {
  if (mode === 'read' || valueType && valueType !== 'text') return undefined;
  return (item: any, props: any) => {
    return <Input {...props} autoComplete="off" />;
  };
}

export default class MyField extends React.Component<MyFieldProps> {

  state = {
    formItemList: [],
  };

  initProps = {
    initFieldProps:{},
    initFormProps:{},
  };

  constructor(props: MyFieldProps) {
    super(props);
    this.initProps = {
      initFieldProps: initializeFieldProps(props),
      initFormProps: initializeFromProps(props),
    }
    this.renderFormItem = props.renderFormItem? this.renderFormItem.bind(this) : decideRenderFormItem(props);
  }

  shouldComponentUpdate(nextProps: MyFieldProps, nextState: any) {
    const { value, fieldProps } = this.props;
    const { formItemList } = this.state;
    function isState() {
      return (
        JSON.stringify(formItemList) != JSON.stringify(nextState.formItemList) ||
        JSON.stringify(fieldProps) != JSON.stringify(nextState.fieldProps)
      );
    }

    return nextProps.value !== value || isState();
  }

  // 替换renderFormItem 方法
  renderFormItem(text: any, props: any, dom: JSX.Element) {
    const { renderFormItem, label, isForm, formProps, rules } = this.props;
    const { initFormProps } = this.initProps;
    const fun = renderFormItem ? renderFormItem : (): any => {};
    if (label || isForm) {
      return (
        <Item
          label={label}
          name={this.getFormItemName()}
          rules={rules}
          {...initFormProps}
          {...formProps}
        >
          {fun(text, props, dom)}
        </Item>
      );
    }
    return fun(text, props, dom);
  }

  renderField() {
    const { 
      transform, 
      label, 
      text, 
      formProps,  
      isForm,
      fieldProps, 
      mode, 
      ...props 
    } = this.props;
    const { initFieldProps } = this.initProps;
    const { onChange } = fieldProps || {};
    const isText = !label && !isForm;

    return (
      <Field
        {...props}
        onChange = {(value: any, option?: any) => {
          if (transform) {
            this.transformFilter(transform(value, option));
          }
          onChange && onChange(value, option);
          props.onChange && props.onChange(value, option);
        }}
        renderFormItem={this.renderFormItem}
        mode={mode || 'edit'}
        text={isText ? text : undefined}
        fieldProps={{
          ...initFieldProps,
          ...fieldProps,
        }}
      ></Field>
    );
  }


  /**
   * 将 transform 值写入到 form 表单中
   */
  async transformFilter(values: any) {
    if (!values) return this.setState({ formItemList: [] });
    if (values.constructor == Promise) {
      values = await values;
    }
    if (!Array.isArray(values)) {
      values = Object.keys(values).map((key: string) => {
        return [key, values[key]];
      });
    }
    this.setState({
      formItemList: values,
    });
  }

  renderDemo() {
    const { mode, label, rules, isForm, formProps, renderFormItem } = this.props;
    const { initFormProps } = this.initProps;
    if (mode !== 'read' && renderFormItem) return this.renderField();
    if (label || isForm) {
      return (
        <Item
          label={label}
          name={this.getFormItemName()}
          rules={rules}
          {...initFormProps}
          {...formProps}
        >
          {this.renderField()}
        </Item>
      );
    }

    return this.renderField();
  }

  /**
   * 渲染 Form.Item 表单时执行，read 模式下优先使用text 作为表单值字段
   */
  getFormItemName() {
    const { mode, name, text } = this.props;
    return mode == 'read' ? text || name : name;
  }

  render() {
    return (
      <>
        {this.renderDemo()}
        {this.renderFormItemValue()}
      </>
    );
  }

  renderFormItemValue() {
    const { formItemList } = this.state;
    return formItemList.map((arr: any, index: number) => {
      return (
        <Item hidden key={index} name={arr[0]}>
          <ValueTrigger initialValues={arr[1]} />
        </Item>
      );
    });
  }
}

