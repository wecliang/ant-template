import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import DescriptionsIcon from '@/assets/template/Descriptions.svg';
import { Descriptions, Form, Popover, Collapse } from 'antd';
import { MyField } from '@/component/antd';
import Text from '../universal/Text';


// colProps 编辑
const ItemEdit = memo(({ value, onChange }:any) => {

  return (
    <Form
      initialValues={value}
      labelCol={{
        style:{ minWidth:'10em' }
      }}
      onValuesChange={(val, options) => {
        onChange(options)
      }}
    >
      <MyField label="内容的描述" name="label" />
      <MyField 
        label="包含列数量" 
        name="span"
        valueType="digit"
        fieldProps={{
          precision: 0,
          min: 0,
        }}
      />
    </Form>
  )
})



export default {
  namespace: 'Descriptions',
  import: [{
    imports: ['Descriptions'],
    from: 'antd',
  }],
  renderText: (props:any) => {
    return [
      [`<Descriptions${paramToStrs(props, ' ').join('')} >`],
      [`</Descriptions>`],
    ]
  },
  props:{
    title: ['textarea',{
      isNewline: true,
      title: '描述标题',
    }],
    bordered: ['switch', { title: '是否显示边框' }],
    colon: ['switch', {
      title: 'Item 的 colon 的默认值',
      formProps:{
        initialValue: true,
      },
    }],
    column: ['digit',{
      title: '一行的 DescriptionItems 数量',
      fieldProps:{
        min: 1,
        precision: 0,
      },
      formProps:{
        initialValue: 3,
      }
    }],
    layout: ['radioButton',{
      title: '布局',
      valueEnum: {
        horizontal: 'horizontal',
        vertical: 'vertical',
      },
      formProps: {
        initialValue: 'horizontal',
      }
    }],
    size: ['radioButton', {
      title: '大小',
      valueEnum: {
        default: 'default',
        middle: 'middle',
        small: 'small',
      },
      formProps: {
        initialValue: 'default',
      }
    }]
  },
  defaultProps:{
    title: 'User Info',
  },
  renderHTML:() => {
    return <img src={DescriptionsIcon} />
  },
  renderChildrenText: ({ descItemProps }: any, sts) => {
    return [
      [`<Descriptions.Item${paramToStrs(descItemProps, ' ').join('')} >`],
      [`</Descriptions.Item>`]
    ];
  },
  render:({children, childrenProps, ...props}:any) => {
    return (
      <Descriptions {...props}>
        {React.Children.map(children, (child) =>{
          if(!child) return null;
          let descItemProps = childrenProps[child.key]  && childrenProps[child.key].descItemProps || {};
          return (
            <Descriptions.Item key={child.key} {...descItemProps} >
              {child}
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    )
  },
  isContainer: true,
  childrenProps:{
    descItemProps:['any',{
      render: ({ value, onChange }:any) => {


        return (
          <Collapse 
            bordered={false}
            defaultActiveKey="1"
          >
            <Collapse.Panel header="DescriptionsItemProps" key="1">
            <Popover
              placement="leftTop" 
              title="DescriptionsItemProps" 
              content={<ItemEdit value={value} onChange={onChange} />} 
              trigger="click"
            >
              <div>
                <MyField
                  mode="read"
                  valueType="jsonCode"
                  value={JSON.stringify(value || {})}
                  fieldProps={{
                    style:{
                      padding: 0,
                      cursor: 'pointer',
                      width: '100%',
                    }
                  }}
                />
              </div>
            </Popover>
            </Collapse.Panel>
          </Collapse>
        )
      },
    }]
  },
  children:[
    { 
      ...Text,
      defaultParentProps:{
        descItemProps: {
          label: 'UserName',
        },
      },
      defaultProps: {
        text: 'Zhou Maomao'
      }
    },
    { 
      ...Text,
      defaultParentProps:{
        descItemProps: {
          label: 'Telephone',
        },
      },
      defaultProps: {
        text: '1810000000'
      }
    },
    { 
      ...Text,
      defaultParentProps:{
        descItemProps: {
          label: 'Live',
        },
      },
      defaultProps: {
        text: 'Hangzhou, Zhejiang'
      }
    },
    { 
      ...Text,
      defaultParentProps:{
        descItemProps: {
          label: 'Address',
        },
      },
      defaultProps: {
        text: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
      }
    }
  ]
} as templateProps;