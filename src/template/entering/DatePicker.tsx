import React, { useContext } from 'react';
import { DatePicker } from 'antd';
import { paramToStrs, templateProps } from '..';
import { formItemProps, formCreate, createHtml } from './Form/context';
import InputIcon from '@/assets/template/DatePicker.svg';

const { RangePicker } = DatePicker;

export default {
    namespace: 'DatePicker',
    import:[{
        from: 'antd',
        imports: ['DatePicker']
    }],
    props:{
        ...formItemProps,
        isRange: ['switch', { title: '范围选择' }],
        allowClear: ['switch(true)', { title: '显示清除按钮' }],
        autoFocus: ['switch(false)', { title: '获取焦点' }],
        bordered: ['switch(true)', { title: '是否有边框' }],
        picker: [
          'radioButton',
          {
            isNewline: true,
            title: '选择器类型',
            valueEnum:{
              date: '日期',
              week: '周',
              month: '月份',
              quarter: '季度',
              year: '年份',
            }
          }
        ],
        showTime: ['switch(false)', {
          title: '增加时间选择',
          isRender:({ picker }:any) => !picker || picker == 'date'
        }],
        placeholder: ['text', { 
          title: '输入提示',
          isRender: ({ isRange }) => !isRange,
        }],

    },
    defaultProps: {

    },
    renderText: createHtml(({isRange, placeholder, ...props}: any) => {
        const params = { 
          ...props,
          placeholder:isRange? props.showTime? ['开始时间', '结束时间'] : undefined : placeholder,
        }
        return [
          `<DatePicker${isRange? '.RangePicker' : ''}${paramToStrs(params, ' ').join('')} />`,
        ];
    }),
    renderHTML: () => {
        return <img src={InputIcon} />
    },
    render:formCreate(({ isRange, placeholder, ...props }:any) => {
      if(isRange){
        return <RangePicker {...props} placeholder={props.showTime? ['开始时间', '结束时间'] : undefined}/>
      }
      return <DatePicker placeholder={placeholder} { ...props }/>
    })
} as templateProps