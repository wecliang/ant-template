import React, { useState, useRef, useCallback } from 'react';
import { paramToStrs, renderChildren, templateProps } from '..';
import ProTable from '@ant-design/pro-table';
import { InputNumber, Button, Popover, Form, Space, Checkbox, Input, Menu, Dropdown } from 'antd';
import { PlusOutlined, DeleteTwoTone, DownOutlined } from '@ant-design/icons';
import SortList from '@/component/SortList';
import { MyField } from '@/component/antd';
import { enteringTypes } from '@/enums/field';
import type { ProFieldValueType } from '@ant-design/pro-field';
import { getFieldsValue } from '@/utils/field';
import { jsonTransitionHtml } from '@/utils/json';
import FieldProps from '@/component/compiler/field';

const UpdateDataScource = ({ value, onChange, columns }:any) => {

    const [num, setNum] = useState(0);

    return (
        <div>
            <InputNumber 
                placeholder="请输入整数" 
                min={0} 
                max={10} 
                precision={0}
                onChange={(e) => {
                    setNum(e);
                }}
            />
            <Button 
                type="primary"
                onClick={(e) =>{
                    let result:any = [];
                    for(let i=0; i<num; i++){
                        result[i] = { id: getFieldsValue('id') };
                        columns && columns.forEach(({ dataIndex, valueType }:any) => {
                            result[i][dataIndex] = getFieldsValue(valueType);
                        })
                    }
                    onChange(result);
                }}    
            >生成假数据</Button>
        </div>
    )
}

const setFieldProps = (data: any, callBack: any) => {
    const { title, valueType, hideInSearch } = data;
    const type = valueType || 'text';

    if(hideInSearch){
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
            <Form.Item noStyle dependencies={['hideInSearch', 'title', 'valueType']}>
                {(form) =>{
                    const data = form.getFieldsValue();
                    if(data.hideInSearch) return null;
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
            <MyField label="不在查询表单中展示" valueType="switch" name="hideInSearch"/>
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
                            hideInSearch: true,
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
                查询列表
                <SortList
                    dataSource={
                        list.filter((item:any) => !item.hideInSearch)
                        .sort((a:any,b:any) =>  b.order - a.order)
                    }
                    renderItem={(item:any, index) =>{
                        return renderItem(item, index, true);
                    }}
                    onSortChange={(result) =>{
                        let len = list.length;
                        result.forEach(({ _index }:any, i:any) =>{
                            list[_index] = { ...list[_index], order: len - i };
                        })
                        onChange(list);
                    }}
                />
            </h3>
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
    namespace: 'ProTable',
    import:({ rowSelection, columns }: any) => {
        let result: any[] = [
            {
                default: 'ProTable',
                imports: ['ProTableProps'],
                from: '@ant-design/pro-table',
            }
        ];
        if(rowSelection){
            result.push({
                imports: ['useState'],
                from: 'react',
            })
        }
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
    bodyJs: ({ columns, search, rowSelection }) =>{
        let rowSelectionText: string[] = [];
        if(rowSelection){
            rowSelectionText = [`const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);\n`];
        }
        
        return [
            `const columns: ProTableProps<any, any>['columns'] = ${
                jsonTransitionHtml(columns && columns.map((item: any) => {
                    const { valueType, sorter, dataIndex, hideInSearch } = item;
                    let result = { ...item };
                    let format = '';
                    switch(valueType){
                        case 'date': format || (format = 'YYYY-MM-DD');
                        case 'time': format || (format = 'HH:mm:ss');
                        case 'dateTime': format || (format = 'YYYY-MM-DD HH:mm:ss');
                            result.search = {
                                transform: (tab: string) => `(val) => ({\n`
                                    + `${tab}\t${dataIndex}: val.format('YYYY-MM-DD HH:mm:ss'),\n`
                                    + `${tab}})`
                            }
                        break;
                        case 'dateRange':
                            format || (format = 'YYYY-MM-DD');
                            result.search = {
                                transform: (tab: string) => `(val) => ({\n`
                                    + `${tab}\t${dataIndex}Form: \`\${val[0].format('YYYY-MM-DD ')}00:00:00\`,\n`
                                    + `${tab}\t${dataIndex}To: \`\${val[1].format('YYYY-MM-DD ')}23:59:59\`,\n`
                                    + `${tab}})`
                            }
                        break;
                        case 'dateTimeRange':
                            format || (format = 'YYYY-MM-DD HH:mm:ss');
                            result.search = {
                                transform: (tab: string) => `(val) => ({\n`
                                    + `${tab}\t${dataIndex}Form: val[0].format('YYYY-MM-DD HH:mm:ss'),\n`
                                    + `${tab}\t${dataIndex}To: val[1].format('YYYY-MM-DD HH:mm:ss'),\n`
                                    + `${tab}})`
                            }
                        break;
                        case 'option': 
                            result.render = (tab: string) => `() => {\n`
                            + `${tab}\tconst menu = (\n`
                            + `${tab}\t\t<Menu>\n`
                            + `${tab}\t\t\t<Menu.Item>编辑</Menu.Item>\n`
                            + `${tab}\t\t\t<Menu.Item>删除</Menu.Item>\n`
                            + `${tab}\t\t</Menu>\n`
                            + `${tab}\t)\n\n`
                            + `${tab}\treturn [\n`
                            + `${tab}\t\t<a>查看</a>,\n`
                            + `${tab}\t\t<Dropdown overlay={menu}>\n`
                            + `${tab}\t\t\t<a onClick={e => e.preventDefault()}>\n`
                            + `${tab}\t\t\t\t更多 <DownOutlined />\n`
                            + `${tab}\t\t\t</a>\n`
                            + `${tab}\t\t</Dropdown>\n`
                            + `${tab}\t]\n`
                            + `${tab}}`
                        break;
                    }
                    if(sorter){
                        result.sorter = () => `(a, b) => a.${dataIndex} - b.${dataIndex}`
                    }
                    if(hideInSearch){
                        result.search = undefined;
                    }
                    if(valueType && valueType.match(/^(date|time).*/)){
                        result.render = (tab: string) => `(_, { ${dataIndex} }) => ${dataIndex} && moment(Number(${dataIndex})).format('${format}')`
                    }
                    if(search === false){
                        const { search, fieldProps, ...options} = result;
                        return options;
                    }
                    return result;
                })).join('')
            };`,
            ...rowSelectionText,
        ];
    },
    renderText: ({ columns, dataSource, rowSelection, toolBarRender, ...props}:any) => {
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
        return [
            `<ProTable`,
            `\trowKey="id"`,
            `\tdateFormatter={false}`,
            ...textList,
            ...paramToStrs(props),
            `\tcolumns={columns}`,
            ...rowSelectionText,
            '/>',
        ];
    },
    render: ({children, rowSelection, columns, ...props}:any) => {
        return <ProTable
            rowKey="id"
            rowSelection={rowSelection? {}: false}
            dateFormatter={false}
            toolBarRender={() => renderChildren(children, 'toolBarRender')}
            columns={columns && columns.map((item: any) => {
                switch(item.valueType){
                    case 'option': 
                    return {
                        ...item,
                        render: () => {
                            const menu = (
                                <Menu>
                                    <Menu.Item>编辑</Menu.Item>
                                    <Menu.Item>删除</Menu.Item>
                                </Menu>
                            )

                            return [
                                <a>查看</a>,
                                <Dropdown overlay={menu}>
                                    <a onClick={e => e.preventDefault()}>
                                    更多 <DownOutlined />
                                    </a>
                                </Dropdown>
                            ]
                        }
                    }
                }
                return item;
            })}
            {...props}
        />
    },
    props:{
        dataSource:['any', {
            render: UpdateDataScource,
        }],
        columns:['any',{
            render: UpdateColumns,
        }],
        rowSelection: ['switch', {
            title: '表格行可选择',
        }],
        search: ['switch(true)'],
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