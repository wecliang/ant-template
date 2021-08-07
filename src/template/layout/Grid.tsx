import React, { useEffect, memo } from 'react';
import { paramToStrs, templateProps } from '..';
import { Row, Col, InputNumber, Popover, Collapse, Form, InputNumberProps } from 'antd';
import GridIcon from '@/assets/template/Grid.svg';
import { MyField } from '@/component/antd';

const fieldProps:InputNumberProps = {
  precision:0,
  min: 0,
  max: 24
}
// colProps 编辑
const ColPropsEdit = memo(({ value, onChange }:any) => {

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
      <MyField label="占位格数" name="span"
        valueType="digit" fieldProps={fieldProps}
        formProps={{ initialValue: 8 }}
      />
      <MyField label="格栅左侧间隔格数" name="offset"  valueType="digit" fieldProps={fieldProps}/>
      <MyField label="左移格数" name="pull" valueType="digit" fieldProps={fieldProps}/>
      <MyField label="右移格数" name="push" valueType="digit" fieldProps={fieldProps}/>
    </Form>
  )
})

// row 间距
const gutterRender = ({ value, onChange }:any) => {


  return (
    <div style={{ display:'flex', alignItems:'center' }}>
      <InputNumber
        placeholder="水平间距"
        value={value && value[0]}
        precision={0} min={0}
        onChange={(val) => {
          onChange(value? [val, value[1]] : [val, 0])
        }}
      />
      <span>—</span>
      <InputNumber
        placeholder="垂直间距"
        value={value && value[1]} 
        precision={0} min={0}
        onChange={(val) => {
          onChange(value? [value[0], val] : [0, val])
        }}
      />
    </div>
  )
}

export default {
  namespace: 'Grid',
  import: [
    {
      imports: ['Row', 'Col'],
      from: 'antd',
    }
  ],
  renderText: (props: any) => {
    return [
      [`<Row${paramToStrs(props, ' ').join('')} >`],
      [`</Row>`]
    ]
  },
  props:{
    align:['radioButton',{
      title: '垂直对齐方式',
      isNewline: true,
      valueEnum:{
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
      }
    }],
    gutter:['any', {
      title: '间距',
      render:gutterRender
    }],
    justify:['select', {
      title: '水平排列方式',
      isNewline: true,
      valueEnum: {
        start: 'start',
        end: 'end',
        center: 'center',
        'space-around': 'space-around',
        'space-between': 'space-between',
      }
    }],
    wrap: ['switch', {
      title: '是否自动换行',
      formProps:{
        initialValue: true,
      }
    }]
  },
  renderChildrenText: ({ colProps }: any, sts) => {
    return [
      [`<Col${paramToStrs({span:8, ...colProps}, ' ').join('')} >`],
      [`</Col>`]
    ];
  },
  childrenProps: {
    colProps: ['any', {
      render: ({ value, onChange }:any) => {


        return (
          <Collapse 
            bordered={false}
            defaultActiveKey="1"
          >
            <Collapse.Panel header="colProps" key="1">
            <Popover 
              placement="leftTop" 
              title="colProps" 
              content={<ColPropsEdit value={value} onChange={onChange} />} 
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
    }],
  },
  renderHTML: () => {
    return <img src={GridIcon} />
  },
  render: ({
    children,
    childrenProps,
    ...props
  }:any) => {
    let list:string[] = [];
    const childrens =  React.Children.map(children, (child) => {
      if(!child) return;
      const colProps = childrenProps[child.key] && childrenProps[child.key].colProps; 
      return (
        <Col span={8} {...colProps}>
          {child}
        </Col>
      )
    })

    useEffect(() => {

    },[list.length])

    return <Row {...props}>{childrens}</Row>
  },
  isContainer: true,
  isParent: true,
} as templateProps