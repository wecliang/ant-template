import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import CollapseIcon from '@/assets/template/Collapse.svg';
import { Collapse, Form, Popover } from 'antd';
import { MyField } from '@/component/antd';
const { Panel } = Collapse;


// colProps 编辑
const PanelPropsEdit = memo(({ value, onChange }:any) => {

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
      <MyField label="面板头内容" name="header" />
    </Form>
  )
})



export default {
  namespace: 'Collapse',
  import: [
    {
      from: 'antd',
      imports: ['Collapse'],
    }
  ],
  renderText: (props:any) => {
    return [
      [`<Collapse`,...paramToStrs(props),`>`],
      [`</Collapse>`]
    ];
  },
  props:{

  },
  renderHTML:() => {
    return <img src={CollapseIcon} />
  },
  render:({children, childrenProps, ...props}:any) => {
    return (
      <Collapse {...props}>
        {React.Children.map(children, (child) =>{
          if(!child) return null;
          let panelProps = childrenProps[child.key]  && childrenProps[child.key].panelProps || {};
          return (
            <Panel key={child.key} {...panelProps} >
              {child}
            </Panel>
          )
        })}
      </Collapse>
    )
  },
  isContainer: true,
  childrenProps:{
    panelProps:['any',{
      title: 'Collapse.PanelProps',
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
              content={<PanelPropsEdit value={value} onChange={onChange} />} 
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
  }
} as templateProps;