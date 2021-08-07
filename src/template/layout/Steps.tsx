import { paramToStrs, templateProps } from '..';
import StepsIcon from '@/assets/template/Steps.svg';
import { Button, Form, Popover, Space, Steps } from 'antd';
import SortList from '@/component/SortList';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { MyField } from '@/component/antd';
import { useRef } from 'react';

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
          <MyField label="标题" name="title" />
          <MyField label="子标题" name="subTitle" />
          <MyField label="详细描述" name="description" valueType="textarea" />
          <MyField label="状态" valueType="select" name="status" 
            valueEnum={{
              wait: 'wait',
              process: 'process',
              finish: 'finish',
              error: 'error',
            }}
          />
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

  const list = value? [...value] : [];

  const renderItem = (item:any, index: number) => {
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
                          list[index] = item;
                          onChange(list);
                      }} 
                  />}
              >
                  <span style={{ cursor:'pointer' }}>{item.title}</span>
              </Popover>
              <DeleteTwoTone onClick={() =>{
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
                  renderItem={(item:any, i:number) =>{
                      return renderItem(item, i);
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
              <Button style={{ width:'100%' }}><PlusOutlined />添加步骤</Button>
          </Popover>
      </>
  )
}



export default {
  namespace: 'Steps',
  import:[
    {
      imports: ['Steps'],
      from: 'antd',
    },
    {
      imports: ['useState'],
      from: 'react',
    }
  ],
  useState: () => {
    return [
      `const [current, setCurrent] = useState<any[]>([]);`
    ]
  },
  renderText: ({ options, ...props }) => {
    return [
      `<Steps${paramToStrs(props, ' ').join('')} >`,
      ...(options || []).map((item: any) => `\t<Steps.Step${paramToStrs(item, ' ').join('')} />` ),
      `</Steps>`
    ]
  },
  renderHTML: (props:any) => {
    return <img src={StepsIcon} />
  },
  props: {
    options: ['any', {
      render:UpdateOptions,
    }]
  },
  defaultProps: {
    style: {
      width: '800px',
      margin: '0 auto',
    },
    options:[{ title: '步骤一' },{ title: '步骤二' },{ title: '步骤三' }]
  },
  render: ({ options, ...props }) => {
    return (
      <Steps {...props}>
        {options && options.map((item: any, i: number) => <Steps.Step key={i} {...item} />)}
      </Steps>
    )
  }
} as templateProps;