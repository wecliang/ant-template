import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Mentions, Popover, Select, Space, Table, Tooltip } from 'antd';
import Field from '@ant-design/pro-field'
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { ITEM_DATA } from './data';
import RuleCompiler from './rule';
import { getDvaApp } from 'umi';
import { getObject } from '@/utils';

export interface FormItemCompilerProps {
  value?: any;
  onChange?: (value: any) => void;
  [key: string]: any;
}

const getUuid = () => Date.now().toString(32) + Math.random().toString();


const getItem = (demoId: string) => {
  const { dispatch, getState } = getDvaApp()._store;
  const { list, data } = getState().moduleList;
  const [index, result] = getObject([...list], data, demoId);
  return {
    item: result[index],
    dispatch,
  }
}

 const getRules = (type: string, label: string) => {
  switch(type){
    case 'Checkbox':
    case 'Radio':
    case 'Rate':
    case 'Slider':
    case 'Upload':
    case 'Select':
    case 'DatePicker':
    case 'TimePicker':
      return [{
        required: true,
        message: `请选择${label}`,
      }]
    break;
    case 'Input':
      return [{
        required: true,
        whitespace: true,
        message: `请输入${label}`,
      }]
    break;
    default: {
      return [{
        required: true,
        message: `请输入${label}`,
      }]
    }
  }
 }

const ValueEdit = memo(({ demoId, name, form, ...props }: any) => {

  const inputRef = useRef<any>();

  useEffect(() => {
    switch(name){
      case 'rules': break;
      default:
      if(name){
        inputRef.current.focus()
      }
    }
  },[name])

  useEffect(() => {
    if(name === 'rules' && demoId){
      if(props.value) return;
      const { item } = getItem(demoId);
      const label = form.getFieldValue('label') || '';
      props.onChange(getRules(item.namespace, label));
    }else if(name === 'label'){
      const { label, rules } = form.getFieldsValue();
      if(rules){
        const { item } = getItem(demoId);
        form.setFieldsValue({
          rules: getRules(item.namespace, label),
        })
      } 
    }
  },[props.value])

  if(name === 'rules'){
    return (
      <RuleCompiler {...props} />
    )
  }
  useEffect(() => {
    if(name === 'label' && demoId){
      const { item, dispatch } = getItem(demoId);
      const { namespace, renderProps } = item;
      switch(namespace){
        case 'Select':
        case 'DatePicker':
        case 'TimePicker':
        case 'TreeSelect':
          dispatch({
            type: 'moduleList/renderProps',
            payload: { ...renderProps, placeholder:`请选择${props.value || ''}` },
            id: demoId,
          })
        break;
        case 'Input':
        case 'InputNumber':
          dispatch({
            type: 'moduleList/renderProps',
            payload: { ...renderProps, placeholder:`请输入${props.value || ''}` },
            id: demoId,
          })
        break;
      }
    }
  },[props.value])
  

  return (
    <Input
      {...props}
      ref={inputRef}
      bordered={false}
      placeholder="请输入值" 
    />
  )
})



const FormItemCompilerEdit = ({
  value,
  demoId,
  onChange,
  onCancel,
}: any) => {

  const [dataSource, setDataSource] = useState<{ key?:string, value?:any, id?: string }[]>(() => {
    let valueObj = value || { label:undefined, name: undefined };
    return [
      ...Object.keys(valueObj).map((key) => {
        return {
          key,
          value: valueObj[key],
          id: getUuid(),
        }
      }),
      {
        id: getUuid()
      }
    ]
  });
  const [prefix, setPrefix] = useState('a');


  // 判断是否为最后一个列表，如果是则添加一行操作列
  const onFocus = (index: number) => {
    if(index === dataSource.length - 1){
      setDataSource([...dataSource, { id:getUuid() }]);
    }
  }
  const [form] = Form.useForm();


  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      render: (value: string, _: any, index: number) => {
        return (
          <Mentions
            defaultValue={value}
            onBlur={(e) => {
              dataSource[index].key = e.target.value;
              setDataSource([...dataSource]);
            }}
            style={{ border: 'none' }}
            prefix={prefix}
            onChange={str => {
              if(str[0] !== prefix){
                setPrefix(str[0])
              }
            }}
            placeholder="请输入名称"
            onFocus={() => onFocus(index)}
            onSelect={( option ) => {
              dataSource[index].key = option.value;
              dataSource[index].id = getUuid();
              setDataSource([...dataSource]);
            }}
          >
            {(ITEM_DATA[prefix] || []).map((value: string) => (
              <Mentions.Option key={value} value={value}>
                {value}
              </Mentions.Option>
            ))}
          </Mentions>
        )
      }
    },
    {
      title: 'value',
      dataIndex: 'value',
      render: (value: string, { key }: any) => {
        return (
          <Form.Item  name={key} style={{ margin: 0 }}>
            <ValueEdit demoId={demoId} name={key} form={form} />
          </Form.Item>
        )
      }
    },
    {
      title: (
        <span>
          操作&nbsp;
          <PlusCircleTwoTone onClick={() => setDataSource([...dataSource, { id: getUuid() }]) } />
        </span>
      ),
      width: 50,
      render: (_: string, __: any, index: number) => {
        return (
          <Space>
            <PlusCircleTwoTone onClick={() => {
                const result = [...dataSource];
                result.splice(index + 1, 0, { id:getUuid() });
                setDataSource(result);
            }}/>
            {!!index && 
              <DeleteTwoTone  onClick={() => {
                const result = [...dataSource];
                result.splice(index, 1);
                setDataSource(result);
              }}/>
            }
          </Space>
        )
      }
    }
  ]

  return (
    <Form
      initialValues={value}
      form={form}
      style={{ width: 600 }}
      labelCol={{
        style:{ minWidth:'6em' }
      }}
      onFinish={(param) => {
        let result: any = {};
        Object.keys(param).forEach((key) => {
          let num = Number(param[key]);
          if(!isNaN(num)){
            result[key] = num;
            return;
          }
          result[key] = param[key]
        })
        onChange(result)
        onCancel()
      }}
    >
      <Table 
        pagination={false}
        size="small"
        scroll={{
          y: 280,
        }}
        rowKey="id"
        tableLayout="fixed"
        columns={columns}
        dataSource={dataSource}
      />
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop: 20 }}>
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button htmlType="submit" type="primary">保存</Button>
        </Space>
      </div>
    </Form>
  )

}


const FormItemCompiler = ({
  value,
  onChange,
  ...props
}: FormItemCompilerProps) => {

  const popRef = useRef<any>();

  return (
    <Popover
      ref={popRef}
      placement="leftTop"
      title="FormItemProps"
      content={
        <FormItemCompilerEdit 
          value={value}
          demoId={props['data-id']}
          onChange={onChange}
          onCancel={() => {
            popRef.current.onClick();
          }}
        />
      } 
      trigger="click"
    >
      <Tooltip
        placement="left"
        title={(
          <Field 
            mode="read" 
            valueType="jsonCode" 
            value={JSON.stringify(value || '{}')} 
            fieldProps={{
              style: {
                background: 'none'
              }
            }}
          />    
        )}
      >
        <a>FormItemCompiler</a>
      </Tooltip>
    </Popover>
  )
}

export default memo(FormItemCompiler);