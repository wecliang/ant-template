import React, { memo } from 'react';
import { templateProps, paramToStrs } from '../';
import TimelineIcon from '@/assets/template/Timeline.svg';
import { Collapse, Form, Popover, Radio, Timeline } from 'antd';
import { SelectIconForm, IconView } from '@/component/SelectIcon';
import Text from '../universal/Text';
import { MyField } from '@/component/antd';



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
      <MyField label="颜色" name="color" valueType="color" />
      <MyField 
        label="时间轴点"
        name="dot"
        renderFormItem={() => {
          return <SelectIconForm />
        }}
      />
      <MyField label="标签" name="label" valueType="textarea" />
      <MyField 
        label="节点位置" 
        name="position" 
        renderFormItem={() =>{
          return (
            <Radio.Group>
              <Radio.Button value={undefined}>无</Radio.Button>
              <Radio.Button value="left">left</Radio.Button>
              <Radio.Button value="right">right</Radio.Button>
            </Radio.Group>
          )
        }}
      />
    </Form>
  )
})

const TimelineItemProps = ({ value, onChange }:any) => {


  return (
    <Collapse 
      bordered={false}
      defaultActiveKey="1"
    >
      <Collapse.Panel header="TimelineItemProps" key="1">
      <Popover
        placement="leftTop" 
        title="TimelineItemProps" 
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
};



export default {
  namespace: 'Timeline',
  import: [
    {
      from: 'antd',
      imports: ['Timeline'],
    }
  ],
  renderText: (props:any) => {
    return [`<Timeline`,...paramToStrs(props),`/>`];
  },
  props:{
    mode: ['radioButton', {
      title: '时间轴和内容的相对位置',
      valueEnum: {
        left: 'left',
        alternate: 'alternate',
        right: 'right',
      },
    }],
    pending: ['switch', {
      title: '最后一个幽灵节点是否存在',
    }],
    pendingDot: ['icon', {
      title: '最后一个幽灵节点图点',
    }],
    reverse: ['switch', { title: '节点排序' }],
  },
  renderHTML:() => {
    return <img src={TimelineIcon} />
  },
  render:memo(({ children, childrenProps, pendingDot, ...props}:any) => {
    return (
      <Timeline
        {...props}
        pendingDot={pendingDot && <IconView {...pendingDot} />}
      >
        {React.Children.map(children, (child) =>{
          if(!child) return;
          let timelineItemProps = childrenProps[child.key]  && childrenProps[child.key].timelineItemProps || {};
          return (
            <Timeline.Item 
              key={child.key} 
              {...timelineItemProps}
              dot={timelineItemProps.dot && <IconView {...timelineItemProps.dot} />}
            >
              {child}
            </Timeline.Item>
          )
        })}
      </Timeline>
    )
  }),
  children: [
    { ...Text, defaultProps:{ text: 'Create a services site 2015-09-01' }},
    { ...Text, defaultProps:{ text: 'Solve initial network problems 2015-09-01' }},
  ],
  isContainer: true,
  childrenProps: {
    timelineItemProps: ['any', {
      render: TimelineItemProps
    }]
  }
} as templateProps;