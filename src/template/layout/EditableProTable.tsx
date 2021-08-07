import React, { useState, useRef, useCallback } from 'react';
import { paramToStrs, renderChildren, templateProps } from '..';
import { EditableProTable }  from '@ant-design/pro-table';
import { InputNumber, Button, Popover, Form, Space, Checkbox, Input, Menu, Dropdown } from 'antd';
import { PlusOutlined, DeleteTwoTone, DownOutlined } from '@ant-design/icons';
import SortList from '@/component/SortList';
import { MyField } from '@/component/antd';
import { enteringTypes } from '@/enums/field';
import type { ProFieldValueType } from '@ant-design/pro-field';
import { getFieldsValue } from '@/utils/field';
import { jsonTransitionHtml } from '@/utils/json';
import FieldProps from '@/component/compiler/field';


const setFieldProps = (data: any, callBack: any) => {
    const { title, valueType, editable } = data;
    const type = valueType || 'text';

    if(!editable){
        callBack({ fieldProps: undefined })
    }
    let result: any = { autoComplete: undefined }
    switch(type as ProFieldValueType){
        case 'text': result.autoComplete = 'off';
        case 'textarea':
        case 'money':
        case 'digit':
            result.placeholder = `请输入${title}`;
            break;
        case 'date':
        case 'time':
        case 'dateTime':
        case 'dateMonth':
        case 'dateQuarter':
        case 'dateWeek':
        case 'dateYear':
        case 'select':
            result.placeholder = `请选择${title}`;
            break;
        case 'dateRange':
            result.placeholder = ['开始日期','结束日期'];
            break;
        case 'dateTimeRange':
            result.placeholder = ['开始时间','结束时间'];
            break;
        default :
        return callBack({ fieldProps: undefined })
    }
    callBack({ fieldProps: result });
}

// columns 数据列管理
const EditColumn = ({ isAdd, fieldProps, onChange, ...props}:any) =>{
    const butRef:any = useRef(null);
    const inputRef:any = useRef(null);
    const [form] = Form.useForm();

    const [continuous, setContinuous] = useState(isAdd);

    return (
        <Form 
            layout="horizontal"
            form={form}
            labelCol={{ style:{ minWidth:'90px' } }}
            style={{ width:'360px' }}
            onFinish={(options) => {
                let params = { ...props, ...options };
                if(params.editable) delete params.editable;
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
            <Form.Item label="标题" name="title" rules={[{ required: true }]}>
                <Input ref={inputRef} autoComplete="off" placeholder="请输入标题" />
            </Form.Item>
            <MyField label="dataIndex" placeholder="请输入字段值" required name="dataIndex" />
            <MyField 
                label="valueType"
                name="valueType"
                placeholder="请选择录入数据类型（默认text)"
                valueType="select"
                valueEnum={Object.keys(enteringTypes).reduce((objs: any ,key: string) => {
                    const item: any = enteringTypes;
                    return { ...objs, [key]: `${key}(${item[key]})`}
                },{})}
            />
            <MyField label="width" name="width" valueType="digit" placeholder="请输入宽度" />
            <Form.Item noStyle dependencies={['editable', 'title', 'valueType']}>
                {(form) =>{
                    const data = form.getFieldsValue();
                    if(!data.editable) return null;
                    setFieldProps(data, form.setFieldsValue);

                    return (
                        <Form.Item label="fieldProps" name="fieldProps" >
                            <FieldProps />
                        </Form.Item>
                    )
                }}
            </Form.Item>
            {/* <MyField 
                label="align"
                placeholder="请选择对齐方式" 
                renderFormItem={() =>{
                    return <span>1113242</span>
                }}
            /> */}
            {/* <MyField label="不在table中展示" valueType="switch" name="hideInTable"/> */}
            <MyField label="sorter" valueType="switch" name="sorter" />
            <MyField 
                label="align"
                name="align"
                valueType="select"
                valueEnum={{
                    left: 'left',
                    right: 'right',
                    center: 'center',
                }}
            />
            <MyField label="编辑模式下是否可编辑" valueType="switch" name="editable" formProps={{ initialValue: true }}/>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <Space>
                    {isAdd && <Checkbox checked={continuous} onChange={(e) => setContinuous(e.target.checked)}>连续添加</Checkbox>}
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
                            editable: true,
                            order: undefined,
                            fieldProps: undefined,
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
                    dataSource={list}
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
    namespace: 'EditableProTable',
    import:({ rowSelection, columns }: any) => {
        let result: any[] = [
            {
                imports: ['ProTableProps', 'EditableProTable'],
                from: '@ant-design/pro-table',
            }
        ];
        result.push({
            imports: ['useState'],
            from: 'react',
        })
        if(columns && columns.some(({ valueType }: any) => valueType === 'option')){
            result.splice(0,0,{
                imports: ['DownOutlined'],
                from: '@ant-design/icons',
            },{
                imports: ['Menu', 'Dropdown'],
                from: 'antd',
            },{
                imports: [`history`],
                from: 'umi',
            })
        }
        if(columns && columns.some(({ valueType }: any) => valueType && valueType.match(/^(date|time).*/))){
            result.push({
                default: 'moment',
                from: 'moment'
            })
        }
        return result;
    },
    useState: ({ columns, mode, rowSelection }) => {
        let rowSelectionText: string[] = [];
        if(rowSelection){
            rowSelectionText.push(`const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);`);
        }
        if(mode === 'save'){
            rowSelectionText.push(`const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);`);
        }
        rowSelectionText.push(`const [dataSource, setDataSource] = useState<any[]>([]);\n`);
        return rowSelectionText;
    },
    bodyJs: ({ columns, mode, rowSelection }) =>{
        
        return [
            `const columns: ProTableProps<any, any>['columns'] = ${
                jsonTransitionHtml([...(columns || []), {
                    title: '操作',
                    valueType: 'option',
                    width: 160,
                    render: (tab: string) => {
                        if(mode === 'save') return `() => null`;
                        return `(text, record, _, action) => [\n`
                        +`${tab}\t<a\n`
                        +`${tab}\t\tkey="editable"\n`
                        +`${tab}\t\tonClick={() => {\n`
                        +`${tab}\t\t\taction?.startEditable?.(record.id);\n`
                        +`${tab}\t\t}}\n`
                        +`${tab}\t>\n`
                        +`${tab}\t\t编辑\n`
                        +`${tab}\t</a>,\n`
                        +`${tab}\t<a\n`
                        +`${tab}\t\tkey="delete"\n`
                        +`${tab}\t\tonClick={() => {\n`
                        +`${tab}\t\t\tsetDataSource(dataSource.filter((item) => item.id !== record.id));\n`
                        +`${tab}\t\t}}\n`
                        +`${tab}\t>\n`
                        +`${tab}\t\t删除\n`
                        +`${tab}\t</a>,\n`
                        +`${tab}]`
                    },
                }].map((item: any) => {
                    const { sorter, dataIndex } = item;
                    let result = { ...item };
                    let format = '';
                    const valueType = item.valueType || '';
                    if(valueType.indexOf('time') !== -1){
                        format = 'YYYY-MM-DD HH:mm:ss';
                    }else if(valueType.indexOf('date') !== -1){
                        format = "YYYY-MM-DD";
                    }
                    if(format){
                        result.fieldProps={
                            ...result.fieldProps,
                            format,
                        }
                    }
                    if(sorter){
                        result.sorter = () => `(a, b) => a.${dataIndex} - b.${dataIndex}`
                    }
                    return result;
                })).join('')
            };`,
        ];
    },
    renderText: ({ columns, dataSource, rowSelection, toolBarRender, mode, ...props}:any) => {
        let textList: string[] = [];
        if(toolBarRender){
          textList.push(`\ttoolBarRender={() => [`);
          toolBarRender.forEach((vals: string[], i:number) =>{
            textList = [...textList, ...vals.map((str: string) => `\t${str}`)];
            textList[textList.length - 1] = `${textList[textList.length - 1]},`;
          })
          textList.push(`\t]}`)
        }
        let rowSelectionText: string[] = [];
        if(rowSelection){
            rowSelectionText = [
                `\trowSelection = {{`,
                `\t\tselectedRowKeys,`,
                `\t\tonChange: setSelectedRowKeys,`,
                `\t}}`,
            ]
        }
        if(mode == 'save'){
            textList = textList.concat([
                `\trecordCreatorProps={{`,
                `\t\tnewRecordType: 'dataSource',`,
                `\t\trecord: () => ({`,
                `\t\t\tid: Date.now(),`,
                `\t\t}),`,
                `\t}}`,
                `\teditable={{`,
                `\t\ttype: 'multiple',`,
                `\t\teditableKeys,`,
                `\t\tactionRender: (row, config, defaultDoms) => {`,
                `\t\t\treturn [defaultDoms.delete];`,
                `\t\t},`,
                `\t\tonValuesChange: (record, recordList) => {`,
                `\t\t\t// setDataSource(recordList);`,
                `\t\t},`,
                `\t\tonChange: setEditableRowKeys,`,
                `\t}}`,
            ])
        }
        return [
            `<EditableProTable `,
            `\trowKey="id"`,
            `\tvalue={dataSource}`,
            `\tonChange={setDataSource}`,
            ...textList,
            ...paramToStrs(props),
            `\tcolumns={columns}`,
            ...rowSelectionText,
            '/>',
        ];
    },
    render: ({children, mode, columns, rowSelection, ...props}:any) => {


        const [dataSource, setDataSource] = useState<any[]>([{ id: '111' }]);
        const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>['111']);

        const getColumns = () => {
            let item;
            if(mode === 'save'){
                item = {
                    title: '操作',
                    valueType: 'option',
                    width: 160,
                    render: () => null,
                }
            }else{
                item = {
                    title: '操作',
                    valueType: 'option',
                    width: 160,
                    render: (text: any, record: { id: any; }, _: any, action: { startEditable: (arg0: any) => void; }) => [
                      <a
                        key="editable"
                        onClick={() => {
                          action?.startEditable?.(record.id);
                        }}
                      >
                        编辑
                      </a>,
                      <a
                        key="delete"
                        onClick={() => {
                          setDataSource(dataSource.filter((item) => item.id !== record.id));
                        }}
                      >
                        删除
                      </a>,
                    ],
                }
            }
            if(columns){
                return [...columns, item]
            }
            return [item];
        }

        const getProps = () => {
            if(mode == 'save') return {
                recordCreatorProps:{
                    newRecordType: 'dataSource',
                    record: () => ({
                      id: Date.now(),
                    }),
                },
                editable:{
                    type: 'multiple',
                    editableKeys,
                    actionRender: (row: any, config: any, defaultDoms: { delete: any; }) => {
                      return [defaultDoms.delete];
                    },
                    onValuesChange: (record: any, recordList: React.SetStateAction<any[]>) => {
                    //  setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                }
            }

            return {};
        }

        return <EditableProTable
            key={mode}
            rowKey="id"
            value={dataSource}
            onChange={setDataSource}
            {...getProps()}
            rowSelection={rowSelection? {}: false}
            toolBarRender={() => renderChildren(children, 'toolBarRender')}
            columns={getColumns()}
            {...props}
        />
    },
    props:{
        mode: ['radioButton',{
            title: '表格模式',
            formProps:{
                initialValue: 'edit',
            },
            valueEnum: {
                'edit': '可编辑',
                'save': '实时保存',
            }
        }],
        maxLength:['digit', { title: '最大行数' }],
        columns:['any',{
            render: UpdateColumns,
        }],
        rowSelection: ['switch', {
            title: '表格行可选择',
        }],
        toolBarRender: ['ReactNode[]'],
        headerTitle: ['text', { isNewline: true }],
        // dateFormatter: ['text', { isNewline: true }],
        tableLayout: ['select', {
            valueEnum: {
              auto: 'auto',
              fixed: 'fixed',
            }
        }],
    },
    defaultProps: {
        dataScoure: [],
        style: { marginTop: '20px' },
        tableLayout: 'fixed',
    }

} as templateProps;