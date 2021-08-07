import React from 'react';
import { paramToStrs, templateProps } from '..';
import { InputNumber } from 'antd';
import InputNumberIcon from '@/assets/template/InputNumber.svg';
import { formItemProps, formCreate, createHtml } from './Form/context'

export default {
    namespace: 'InputNumber',
    import: [
        {
            imports: ['InputNumber'],
            from: 'antd',
        }
    ],
    renderText: createHtml((props: any) => {
        return [
            `<InputNumber${paramToStrs(props,' ').join('')} />`
        ];
    }),
    props:{
        ...formItemProps,
        placeholder: ['text', { title:'输入提示' }],
        bordered: ['switch', { title: '是否有边框' }],
        disabled: ['switch', { title: '是否禁用' }],
        max: ['digit', { title: '最大值' }],
        min: ['digit', { title: '最小值' }],
        precision: ['digit', { title: '数值精度' }],
    },
    defaultProps: {
        placeholder: '请输入'
    },
    renderHTML: () => {
        return <img src={InputNumberIcon} />
    },
    render:formCreate((props:any) => {
        return <InputNumber {...props} />
    }),
} as templateProps;