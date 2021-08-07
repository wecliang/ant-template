import React, { memo, useRef, useState } from 'react';
import {  Popover, Tooltip, Space, Button } from 'antd';
import Field from '@ant-design/pro-field'
import { EditableProTable } from '@ant-design/pro-table';
import { ProTableProps } from '@ant-design/pro-table';


const MenuCompilerEdit = ({ value, onCancel, onChange }: any) => {

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(
    (value || []).map(({ id }: any) => id)
  );
	const [dataSource, setDataSource] = useState<any[]>(value || []);

	const columns: ProTableProps<any, any>['columns'] = [
		{
			title: '标题',
			dataIndex: 'title',
			fieldProps: {
				autoComplete: 'off',
				placeholder: '请输入标题',
			},
		},
    {
      title: 'children',
      dataIndex: 'children',
      renderFormItem: () => <RuleCompiler />
    },
		{
			title: '操作',
			valueType: 'option',
			width: 100,
			render: () => null,
		},
	];

	return (
    <div style={{ width: 600 }}>
      <EditableProTable 
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys,
        }}
        style={{"marginTop":"20px"}}
        tableLayout="fixed"
        columns={columns}
      />
      <Space style={{ display:'flex', justifyContent:'flex-end' }}>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={() => {
          onChange(dataSource)
          onCancel()
        }} type="primary">确认</Button>
      </Space>
    </div>
	)

}


const RuleCompiler = ({
  value,
  onChange
}: any) => {

  const popRef = useRef<any>();

  return (
    <Popover
      ref={popRef}
      placement="leftTop"
      title="ruleCompiler"
      content={
        <MenuCompilerEdit 
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