import React, { useContext } from 'react';
import { Input } from 'antd';
import { paramToStrs, templateProps } from '..';
import { formItemProps, formCreate, createHtml } from './Form/context';
import InputIcon from '@/assets/template/Input.svg';

export default {
    namespace: 'Input',
    import:[{
        from: 'antd',
        imports: ['Input']
    }],
    props:{
        ...formItemProps,
        ControlTypes: ['select', {
            title: '组件类型',
            isNewline: true,
            formProps: {
                initialValue: 'text',
            },
            valueEnum: {
                'Input': 'text',
                'Input.TextArea': 'textarea',
                'Input.Search': 'search',
                'Input.Password': 'password',
            }
        }],
        placeholder: ['text', { title: '输入提示' }],
        allowClear: ['switch(false)', { title: '是否可清除' }],
        bordered: ['switch(true)', { title: '是否有边框' }],
        disabled: ['switch(false)', { title: '是否禁用' }],
        maxLength: ['digit', { title: '最大长度' }],
        autoComplete: ['text'],
    },
    defaultProps: {
        placeholder: '请输入',
        autoComplete: 'off',
    },
    renderText: createHtml(({ControlTypes, ...props}: any) => {
        return [
            `<${ControlTypes || 'Input'}${paramToStrs(props, ' ').join('')} />`
        ];
    }),
    renderHTML: () => {
        return <img src={InputIcon} />
    },
    render:formCreate(({ControlTypes, ...props}:any) => {
        switch(ControlTypes){
            case 'Input.TextArea': return <Input.TextArea {...props} />;
            case 'Input.Search': return <Input.Search {...props} />;
            case 'Input.Password': return <Input.Password {...props} />;
            default:    return <Input { ...props } />;
        }
    })
} as templateProps