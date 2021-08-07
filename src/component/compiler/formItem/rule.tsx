import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Mentions, Popover, Space, Switch, Table, Tooltip } from 'antd';
import Field from '@ant-design/pro-field'
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';


const RULE_DATA: any = {
  d: ['defaultField'],
  e: ['enum'],
  f: ['fields'],
  l: ['len'],
  m: ['max', 'message', 'min'],
  p: ['pattern'],
  r: ['required'],
  t: ['transform', 'type'],
  v: ['validateTrigger', 'validator'],
  w: ['whitespace'],
}

export interface RuleCompilerProps {
  value?: any;
  onChange?: (value: any) => void;
}

const getUuid = () => Date.now().toString(32) + Math.random().toString();



const ValueEdit = memo(({ value, onChange, name }: any) => {

  const inputRef = useRef<any>();

  useEffect(() => {
    switch(name){
      case 'required': break;
      case 'whitespace': break;
      default:
      if(name){
        inputRef.current.focus()
      }
    }
  },[name])

  if(name === 'required' || name === 'whitespace'){
    return <Switch checked={value} onChange={onChange} />
  }

  return (
    <Input
      value={value}
      onChange={onChange}
      ref={inputRef}
      bordered={false}
      placeholder="请输入值" 
    />
  )
})



const RuleCompilerEdit = ({
  value,
  onChange,
  onCancel,
}: any) => {

  const [dataSource, setDataSource] = useState<{ key?:string, value?:any, id?: string }[]>(() => {
    let valueObj = value && value[0] || {};
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
            {(RULE_DATA[prefix] || []).map((value: string) => (
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
            <ValueEdit name={key} />
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
      initialValues={value && value[0]}
      style={{ width: 600 }}
      labelCol={{
        style:{ minWidth:'6em' }
      }}
      onFinish={(param) => {
        let result: any = {};
        Object.keys(param).forEach((key) => {
          if(typeof param[key] === 'string'){
            let num = Number(param[key]);
            if(!isNaN(num)){
              result[key] = num;
              return;
            }
          }
          result[key] = param[key]
        })
        onChange([result])
        onCancel();
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
          <Button onClick={() => onCancel()}>取消</Button>
          <Button htmlType="submit" type="primary">保存</Button>
        </Space>
      </div>
    </Form>
  )

}


const RuleCompiler = ({
  value,
  onChange
}: RuleCompilerProps) => {

  const popRef = useRef<any>();

  return (
    <Popover
      ref={popRef}
      placement="leftTop"
      title="ruleCompiler"
      content={
        <RuleCompilerEdit 
          value={value}
          onCancel={() => {
            popRef.current.onClick();
          }}
          onChange={onChange}
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
            value={JSON.stringify(value || '[]')} 
            fieldProps={{
              style: {
                background: 'none'
              }
            }}
          />    
        )}
      >
        <a>{'Array<ruleCompiler>'}</a>
      </Tooltip>
    </Popover>
  )
}

export default memo(RuleCompiler);