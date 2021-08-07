import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Input, Mentions, Popover, Select, Space, Table, Tooltip } from 'antd';
import Field from '@ant-design/pro-field'
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { STYLE_DATA, STYLE_ALL_DATA } from './data';

export interface StyleCompilerProps {
  value?: React.CSSProperties;
  onChange?: (value: React.CSSProperties) => void;
}

const getUuid = () => Date.now().toString(32) + Math.random().toString();



const ValueEdit = memo(({ value, onChange, name, options }: any) => {

  const inputRef = useRef<any>();

  useEffect(() => {
    if(name){
      inputRef.current.focus()
    }
  },[name])

  if(options){
    return (
      <Select ref={inputRef} 
        value={value}
        onChange={onChange}
        placeholder="请选择值" bordered={false} showSearch
      >
        {options.map((val: string) => {
          return <Select.Option key={val} value={val}>{val}</Select.Option>
        })}
      </Select>
    )
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



const StyleCompilerEdit = ({
  onCancel,
  value,
  onChange,
}: any) => {

  const [dataSource, setDataSource] = useState<{ key?:string, value?:any, id?: string }[]>(() => {
    if(!value) return [{ id: getUuid() }];
    return [
      ...Object.keys(value).map((key) => {
        return {
          key,
          value: value[key],
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
            {(STYLE_DATA[prefix] || []).map((value: string) => (
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
            <ValueEdit name={key} options={STYLE_ALL_DATA[key]} />
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
            <DeleteTwoTone  onClick={() => {
              const result = [...dataSource];
              result.splice(index, 1);
              setDataSource(result);
            }}/>
          </Space>
        )
      }
    }
  ]

  return (
    <Form
      initialValues={value}
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
          <Button onClick={onCancel} htmlType="reset">取消</Button>
          <Button htmlType="submit" type="primary">保存</Button>
        </Space>
      </div>
    </Form>
  )

}


const StyleCompiler = ({
  value,
  onChange
}: StyleCompilerProps) => {

  const popRef = useRef<any>();

  return (
    <Popover
      ref={popRef}
      placement="leftTop"
      title="CSSProperties"
      content={(
        <StyleCompilerEdit 
          value={value} 
          onChange={onChange} 
          onCancel={() => {
            popRef.current.onClick();
          }}
        />
        )} 
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
        <a>CSSProperties</a>
      </Tooltip>
    </Popover>
  )
}

export default memo(StyleCompiler);