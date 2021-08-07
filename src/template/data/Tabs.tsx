import React, { memo, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { templateProps, paramToStrs } from '../';
import TabsIcon from '@/assets/template/Tabs.svg';
import { Button, Form, Input, List, Popover, Space, Tabs } from 'antd';
import Container from '@/template/component/Container';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { MyField } from '@/component/antd';
import { getDvaApp } from 'umi';
const { getState, dispatch } = getDvaApp()._store;
import { getObject } from '@/utils';
import SortList from '@/component/SortList';



// columns 数据列管理
const EditTab = ({ data, domId }:any) =>{
  const butRef:any = useRef(null);
  const inputRef:any = useRef(null);
  const [form] = Form.useForm();

  const [continuous, setContinuous] = useState(false);

  return (
      <Form 
          layout="horizontal"
          form={form}
          labelCol={{ style:{ minWidth:'90px' } }}
          style={{ width:'360px' }}
          onFinish={(options) => {
            console.log('domId', options)
            if(data){
              dispatch({
                type: 'moduleList/renderParentProps',
                payload: {
                  tabPaneProps: options,
                },
                id: domId,
              })
            }else{
              dispatch({
                type: 'moduleList/add',
                payload: { 
                  ...Container, 
                  defaultParentProps:{ 
                    ...Container.defaultParentProps,
                    tabPaneProps: options,
                  } 
                },
                containerId: domId,
              })
            }
            butRef.current.click();
          }}
          initialValues={data}
      >
          <MyField label="tab"  name="tab" required />
          <MyField label="key" name="key" required />
          <Space style={{ display:'flex', justifyContent:'flex-end' }}>
              <Button htmlType="reset" ref={butRef} >取消</Button>
              <Button htmlType="submit" type="primary">保存</Button>
          </Space>
      </Form>
  )
}


const UpdateTabs = ({ value, onChange: onChangeForm, ...props }:any) => {

  const [list, setList] = useState<any[]>([])
  const uid = props['data-id'];

  useEffect(() => {
    const { list: lists, data } = getState().moduleList;
    const [index, result] = getObject([...lists], data, uid);
    const { children } = result[index];
    if(children){
      setList(children.map(({ id, renderParentProps }: any) =>{
        return {
          ...renderParentProps.tabPaneProps,
          id,
        };
      }))
    }
  },[])

  const  onChange = useCallback((result)=> {
      onChangeForm(result.map(({ _index, ...item}: any) => item));
  },[])

  const renderItem = ({id, ...item}:any, _: number) => {
      return (
        <Popover 
            placement="left"
            title="添加tabPane页"
            trigger="click"
            destroyTooltipOnHide
            content={
              <EditTab key={item.key} data={item} domId={id}/>
            }
        >
            <span style={{ cursor:'pointer', textAlign:'center', flex: 1}}>{item.key}：{item.tab}</span>
        </Popover>
      )
  }


  return (
      <>
          <h3>
              TabPane页列表
              <SortList
                  dataSource={list}
                  renderItem={(item:any, index) =>{
                      return renderItem(item, index);
                  }}
                  onSortChange={(sortList, { oldIndex, newIndex }) => {
                    const { list: lists, data } = getState().moduleList;
                    const [index, result] = getObject([...lists], data, list[oldIndex].id);
                    dispatch({
                      type: 'moduleList/add',
                      payload: result[index],
                      dropId: list[newIndex].id,
                    })
                    setList(sortList)
                  }}
              />
          </h3>
          <Popover 
              placement="left"
              title="添加TabPane页"
              trigger="click"
              destroyTooltipOnHide
              content={<EditTab domId={uid} onChange={(item:any) =>{
                  onChange([...list, item])
              }} isAdd/>}
          >
              <Button style={{ width:'100%' }}><PlusOutlined />添加TabPane页</Button>
          </Popover>
      </>
  )
}


export default {
  namespace: 'Tabs',
  import: [
    {
      from: 'antd',
      imports: ['Tabs'],
    }
  ],
  renderText: (props:any) => {
    return [
      [`<Tabs${paramToStrs(props,' ').join('')}>`],
      [,`</Tabs>`]
    ];
  },
  renderChildrenText: ({ tabPaneProps }: any, sts) => {
    return [
      [`<Tabs.TabPane${paramToStrs(tabPaneProps, ' ').join('')} >`],
      [`</Tabs.TabPane>`]
    ];
  },
  props:{
    defaultActiveKey: ['text', {
      title: '当前激活面板',
    }],
    tabs:['any',{
      render:UpdateTabs
    }],
    centered: ['switch(false)', { title: '标签居中展示' }],
    hideAdd: ['switch(false)', { title: '是否隐藏+号图标' }],
    tabBarGutter: ['digit', { title: 'tab之间空隙' }],
    tabPosition: ['select', { 
      title: '页签位置',
      valueEnum: {
        top: 'top',
        right: 'right',
        bottom: 'bottom', 
        left: 'left',
      } 
    }],
    type: ['select', {
      title: '类型',
      valueEnum: {
        line: 'line',
        card: 'card',
        'editable-card': 'editable-card',
      }
    }]
  },
  defaultProps: {
  },
  children:[
    { 
      ...Container, 
      defaultParentProps:{ 
        ...Container.defaultParentProps,
        tabPaneProps: {
          tab: 'Tab 1',
          key: '1',
        }
      } 
    }
  ],
  renderHTML:() => {
    return <img src={TabsIcon} />
  },
  render:({children, childrenProps, defaultActiveKey, ...props}:any) => {

    const childrens = React.Children.toArray(children);

    return (
      <Tabs {...props} defaultActiveKey={defaultActiveKey} key={defaultActiveKey}>
        {childrens.map((child: any) =>{
          const childProps = childrenProps[child.props['data-id']].tabPaneProps || {};
          return (
            <Tabs.TabPane {...childProps}>
              {child}
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    )
  },
  childrenProps: {},
} as templateProps;