import React, { useRef } from 'react';
import { paramToStrs, templateProps } from '..';
import { Button, Checkbox, Form, Popover, Space } from 'antd';
import CheckboxIcon from '@/assets/template/CheckBox.svg';
import { formItemProps, formCreate, createHtml } from './Form/context';
import { MyField } from '@/component/antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import SortList from '@/component/SortList';



// Options 数据列管理
const EditOptions = ({ onChange, ...props}:any) =>{
    const butRef:any = useRef(null);
  
    return (
        <Form 
            layout="horizontal" 
            labelCol={{ style:{ minWidth:'120px' } }}
            style={{ width:'360px' }}
            onFinish={(options) => {
                let params = { ...props, ...options };
                onChange(params);
                butRef.current.click();
            }}
            initialValues={props}
        >
            <MyField label="选项值" required name="value" />
            <MyField label="显示文本" placeholder="显示文本" name="text" />
            <MyField label="失效状态" valueType="switch" name="disabled" />
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <Space>
                    <Button htmlType="reset" ref={butRef} >取消</Button>
                    <Button htmlType="submit" type="primary">保存</Button>
                </Space>
            </div>
        </Form>
    )
  }
  
  // 更新 Options 选项
  const UpdateOptions = ({ value, onChange }:any) => {
  
    const list = value? value.map((item:any, index:number) =>{
        return {
            ...item,
            $id: index
        }
    }): [];
  
    const renderItem = (item:any) => {
        return (
            <>
                <Popover 
                    placement="left"
                    title="添加数据列"
                    trigger="click"
                    destroyTooltipOnHide
                    content={
                    <EditOptions
                        {...item}
                        onChange={(item:any) =>{
                            let index = list.findIndex(({ $id }:any) => $id === item.$id);
                            list[index] = item;
                            onChange(list);
                        }} 
                    />}
                >
                    <span style={{ cursor:'pointer' }}>{item.value}：{item.text}</span>
                </Popover>
                <DeleteTwoTone onClick={() =>{
                    let index = list.findIndex(({ $id }:any) => $id === item.$id);
                    list.splice(index, 1);
                    onChange(list);
                }} />
            </>
        )
    }
  
  
    return (
        <>
            <h3>
                选项列表
                <SortList
                    dataSource={list}
                    renderItem={(item:any) =>{
                        return renderItem(item);
                    }}
                    onSortChange={(list) =>{
                        onChange(list);
                    }}
                />
            </h3>
            <Popover 
                placement="left"
                title="添加数据列"
                trigger="click"
                destroyTooltipOnHide
                content={<EditOptions onChange={(item:any) =>{
                    onChange([...list, item])
                }} />}
            >
                <Button style={{ width:'100%' }}><PlusOutlined />添加数据列</Button>
            </Popover>
        </>
    )
  }
  


export default {
    namespace: 'Checkbox',
    import: [{
        from: 'antd',
        imports: ['Checkbox']
    }],
    props:{
        ...formItemProps,
        group: ['switch', { title:'启用多选组' }],
        disabled: ['switch(false)', {
            title: '禁用选择器'
        }],
        options: ['any', {
            render:UpdateOptions,
            isRender: ({ group }) => group,
        }],
        text: ['text', {
            isRender: ({ group }) => !group,
        }]
    },
    defaultProps: {
        group: true,
        options: [{ text:'选项一', value: '1' },{ text:'选项二', value: '2' },{ text:'选项三', value: '3' }]
    },
    renderText: createHtml(({ options, group, text, ...props}: any) => {
        if(!group){
            return [
                `<Checkbox${paramToStrs(props, ' ').join('')}>${text}</Checkbox>`
            ]
        }
        return [
            `<Checkbox.Group${paramToStrs(props, ' ').join('')} >`,
            ...(options.map(({ text, value }: any) => {
                return `\t<Checkbox value="${value}" >${text}</Checkbox>`;
            })),
            `</Checkbox.Group>`,
        ];
    }),
    renderHTML: () => {
        return <img src={CheckboxIcon} />
    },
    render:formCreate(({ options, group, text, ...props }:any) => {
        if(!group){
            return <Checkbox {...props} >{text}</Checkbox>
        }
        return (
            <Checkbox.Group {...props}>
                {
                    options.map(({ text, value, ...item }:any, index: number) =>{
                        return <Checkbox key={index} value={value} {...item}>{text}</Checkbox>
                    })
                }
            </Checkbox.Group>
        )
    })
} as templateProps;