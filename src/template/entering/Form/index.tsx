import React, { useState, useContext, useEffect, memo } from 'react';
import { paramToStrs, templateProps } from '../..';
import { Form } from 'antd';
import FormIcon from '@/assets/template/Form.svg';
import { FormContext, FormContextProps, formItemProps } from './context';
import ColCompiler from '@/component/compiler/col';

export default {
    namespace: 'Form',
    import:[{
        from: 'antd',
        imports: ['Form'],
    }],
    props:{
        colon: ['switch'],
        labelCol: ['any', { title:'labelCol', render: ColCompiler }],
        wrapperCol: ['any', { title: 'wrapperCol', render: ColCompiler }],
        labelAlign: [
            'radioButton',
            {
                valueEnum: {
                    left: '左对齐',
                    right: '右对齐',
                },
                fieldProps:{
                    buttonStyle:"solid"
                },
            },
        ],
        layout: [
            'radioButton',
            {
                title: '布局',
                valueEnum: {
                    horizontal: 'horizontal',
                    vertical: 'vertical',
                    inline: 'inline',
                },
                fieldProps:{
                    buttonStyle:"solid"
                },
                isNewline: true,
            }
        ],
    },
    useState: (props: any) => {
        return [
            `const [form] = Form.useForm();\n`
        ]
    },
    renderText: (props: any) => {
        return [
            [
                `<Form`,
                `\tform={form}`,
                ...paramToStrs(props),
                `>`,
            ],
            [
                `</Form>`
            ]
        ];
    },
    renderHTML: () =>{
        return <img src={FormIcon} />
    },
    render:memo(({ children, ...props }:any) => {
        const [value] = useState<FormContextProps>(() => {
            return {
                isForm: true,
            }
        })
        return (
            <FormContext.Provider value={value}>
            <Form { ...props } >
                    {children}
            </Form>
            </FormContext.Provider>
        )
    }),
    isContainer: true,
} as templateProps