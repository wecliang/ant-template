import React, { memo, useCallback, useRef, useState } from 'react';
import { templateProps, paramToStrs } from '../';
import TableIcon from '@/assets/template/Table.svg';
import { Button, Checkbox, Form, Input, Popover, Radio, Space, Table } from 'antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import SortList from '@/component/SortList';
import { MyField } from '@/component/antd';
import { jsonTransitionHtml } from '@/utils/json';



// columns 数据列管理
const EditColumn = ({ isAdd, fieldProps, onChange, ...props}:any) =>{
  const butRef:any = useRef(null);
  const inputRef:any = useRef(null);
  const [form] = Form.useForm();

  const [continuous, setContinuous] = useState(false);

  return (
      <Form 
          layout="horizontal"
          form={form}
          labelCol={{ style:{ minWidth:'90px' } }}
          style={{ width:'360px' }}
          onFinish={(options) => {
              let params = { ...props, ...options };
              if(!params.hideInTable) delete params.hideInTable;
              if(!params.hideInSearch) delete params.hideInSearch;
              onChange(params);
              if(continuous){
                  form.resetFields();
                  inputRef.current.focus();
              }else{
                  butRef.current.click();
              }
          }}
          initialValues={props}
      >
          <Form.Item label="标题" name="title">
              <Input ref={inputRef} autoComplete="off" placeholder="请输入标题" />
          </Form.Item>
          <MyField label="dataIndex" placeholder="请输入字段值" required name="dataIndex" />
          <MyField label="width" name="width" placeholder="请输入宽度" />
          <MyField 
            label="align" 
            valueType="select"
            name="align"
            valueEnum={{
              left: 'left',
              right: 'right',
              center: 'center',
            }}
          />
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <Space>
                  {isAdd && <Checkbox onChange={(e) => setContinuous(e.target.checked)}>连续添加</Checkbox>}
                  <Button htmlType="reset" ref={butRef} >取消</Button>
                  <Button htmlType="submit" type="primary">保存</Button>
              </Space>
          </div>
      </Form>
  )
}

// 更新 columns 选项
const UpdateColumns = ({ value, onChange: onChangeForm }:any) => {

  const list = (value || []).map((item: any, index: number) => {
      return { ...item, _index: index}
  })

  const  onChange = useCallback((result)=> {
      onChangeForm(result.map(({ _index, ...item}: any) => item));
  },[])

  const renderItem = (item:any, _: number, isSearch?: boolean) => {
      const index = item._index;
      return (
          <>
              <Popover 
                  placement="left"
                  title="添加数据列"
                  trigger="click"
                  destroyTooltipOnHide
                  content={
                  <EditColumn
                      {...item}
                      onChange={(item:any) =>{
                          list[index] = item;
                          onChange(list);
                      }} 
                  />}
              >
                  <span style={{ cursor:'pointer' }}>{item.title}</span>
              </Popover>
              <DeleteTwoTone onClick={() =>{
                  if(isSearch && !item.hideInTable){
                      list[index] = {
                          ...list[index],
                          hideInSearch: true,
                      }
                      onChange(list);
                  }else{
                      list.splice(index, 1);
                      onChange(list);
                  }
              }} />
          </>
      )
  }


  return (
      <>
          <h3>
              数据列表
              <SortList
                  dataSource={list.filter((item:any) => !item.hideInTable)}
                  renderItem={(item:any, index) =>{
                      return renderItem(item, index);
                  }}
                  onSortChange={(result) =>{
                      onChange(result);
                  }}
              />
          </h3>
          <Popover 
              placement="left"
              title="添加数据列"
              trigger="click"
              destroyTooltipOnHide
              content={<EditColumn onChange={(item:any) =>{
                  onChange([...list, item])
              }} isAdd/>}
          >
              <Button style={{ width:'100%' }}><PlusOutlined />添加数据列</Button>
          </Popover>
      </>
  )
}







export default {
  namespace: 'Table',
  import:({ rowSelection }: any) => {
      let result: any[] = [
          {
              imports: ['Table', 'TableProps'],
              from: 'antd',
          }
      ];
      if(rowSelection){
          result.push({
              imports: ['useState'],
              from: 'react',
          })
      }
      return result;
  },
  bodyJs: ({ columns, rowSelection }) =>{
    let rowSelectionText: string[] = [];
    if(rowSelection){
        rowSelectionText = [`const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);\n`];
    }
    return [
        `const columns: TableProps<any>['columns'] = ${jsonTransitionHtml(columns).join('')};\n`,
        ...rowSelectionText,
    ];
  },
  renderText: ({ columns, rowSelection, ...props}:any) => {
    let rowSelectionText: string[] = [];
    if(rowSelection){
        rowSelectionText = [
            `\trowSelection = {{`,
            `\t\tselectedRowKeys: selectedRowKeys,`,
            `\t\tonChange: setSelectedRowKeys,`,
            `\t}}`,
        ]
    }
      return [
          `<Table`,
          `\trowKey="id"`,
          ...paramToStrs(props),
          `\tcolumns={columns}`,
          ...rowSelectionText,
          '/>',
      ];
  },
  props:{
    bordered: ['switch', {
      title: '是否展示外边框和列边框',
    }],
    columns: ['any', {
      render: UpdateColumns
    }],
    rowSelection: ['switch', {
      title: '表格行可选择',
    }],
    pagination: ['switch', {
      title: '是否显示分页器',
      formProps: {
        initialValue: true,
      }
    }],
    rowKey: ['text'],
    showHeader: ['switch', {
      title: '是否显示表头',
    }],
    size: ['radioButton', {
      valueEnum: {
        default: 'default',
        middle: 'middle',
        small: 'small',
      },
      formProps: {
        initialValue: 'default',
      },
    }],
    tableLayout: ['select', {
      valueEnum: {
        auto: 'auto',
        fixed: 'fixed',
      }
    }],
  },
  renderHTML:() => {
    return <img src={TableIcon} />
  },
  render:memo(({rowSelection, ...props}:any) => {
    return (
      <Table 
        {...props}
        rowSelection={rowSelection? {}: false}
      />
    )
  }),
} as templateProps;