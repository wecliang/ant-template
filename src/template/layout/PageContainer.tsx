import { templateProps, paramToStrs, renderChildren } from '..'
import { PageContainer } from '@ant-design/pro-layout';
import Container from '../component/Container';
import React, { useCallback, useRef, useState } from 'react';
import TextObj from '../universal/Text';
import { Button, Form, Popover, Space } from 'antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import SortList from '@/component/SortList';
import { MyField } from '@/component/antd';
import { jsonTransitionHtml } from '@/utils/json';


const EditTab = ({ isAdd, fieldProps, onChange, data}:any) =>{
  const butRef:any = useRef(null);
  const [form] = Form.useForm();

  const [continuous, setContinuous] = useState(false);

  return (
      <Form 
          layout="horizontal"
          form={form}
          labelCol={{ style:{ minWidth:'90px' } }}
          style={{ width:'360px' }}
          onFinish={(options) => {
              let params = { ...data, ...options };
              if(!params.hideInTable) delete params.hideInTable;
              if(!params.hideInSearch) delete params.hideInSearch;
              onChange(params);
              butRef.current.click();
          }}
          initialValues={data}
      >
          <MyField label="tab" name="tab" required />
          <MyField label="key" name="key" required />
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <Space>
                  <Button htmlType="reset" ref={butRef} >取消</Button>
                  <Button htmlType="submit" type="primary">保存</Button>
              </Space>
          </div>
      </Form>
  )
}


const UpdateTabs = ({ value, onChange: onChangeForm }:any) => {

  const list = (value || []).map((item: any, index: number) => {
      return { ...item, _index: index}
  })

  const  onChange = useCallback((result)=> {
      onChangeForm(result.map(({ _index, ...item}: any) => item));
  },[])

  const renderItem = (item:any, _: number, isSearch?: boolean) => {
      const index = item._index;
      return (
          <>
              <Popover 
                  placement="left"
                  title="tabList"
                  trigger="click"
                  destroyTooltipOnHide
                  content={
                  <EditTab
                      data={item}
                      onChange={(item:any) =>{
                          list[index] = item;
                          onChange(list);
                      }} 
                  />}
              >
                  <span style={{ cursor:'pointer' }}>{item.key}：{item.tab}</span>
              </Popover>
              <DeleteTwoTone onClick={() =>{
                  if(isSearch && !item.hideInTable){
                      list[index] = {
                          ...list[index],
                          hideInSearch: true,
                      }
                      onChange(list);
                  }else{
                      list.splice(index, 1);
                      onChange(list);
                  }
              }} />
          </>
      )
  }


  return (
      <>
          <h3>
          tabList
              <SortList
                  dataSource={list}
                  renderItem={(item:any, index) =>{
                      return renderItem(item, index);
                  }}
                  onSortChange={(result) =>{
                      onChange(result);
                  }}
              />
          </h3>
          <Popover 
              placement="left"
              title="添加tabList"
              trigger="click"
              destroyTooltipOnHide
              content={<EditTab onChange={(item:any) =>{
                  onChange([...list, item])
              }} isAdd/>}
          >
              <Button style={{ width:'100%' }}><PlusOutlined />添加tabList</Button>
          </Popover>
      </>
  )
}

export default {
  namespace: 'PageContainer',
  import: ({ tabList }) => {
    const result = [
      {
        from: '@ant-design/pro-layout',
        imports: ['PageContainer'],
      }
    ]
    if(tabList){
      result.push({
        from: 'react',
        imports: ['useState'],
      })
    }

    return result;
  },
  props: {
    content: ['ReactNode', { title: '内容' }],
    ghost: ['switch', { title: '背景颜色设为透明' }],
    fixedHeader:['switch', { title: '固定 pageHeader 的内容到顶部' }],
    footer: ['ReactNode[]', { }],
    extra: ['ReactNode[]'],
    tabList: ['any', {
      render: UpdateTabs,
    }],
    title: ['text'],
  },
  useState:({ tabList }) => {
    if(!tabList) return [];
    return [
      `const [tabActiveKey, setTabActiveKey] = useState('${tabList[0].key}');`
    ]
  },
  bodyJs: ({ tabList }) => {
    if(!tabList) return [];
    return [
      `const tabList = ${jsonTransitionHtml(tabList).join('')}`
    ]
  },
  renderText: ({extra, footer, content, tabList, ...props}: any) => {
    let textList: string[] = [];
    if(extra){
      textList.push(`\textra={[`);
      extra.forEach((vals: string[], i:number) =>{
        textList = [...textList, ...vals.map((str: string) => `\t${str}`)];
        textList[textList.length - 1] = `${textList[textList.length - 1]},`;
      })
      textList.push(`\t]}`)
    }
    if(content){
      let str = content[0][0];
      if(str.indexOf('<') === -1){
        textList.push(`\tcontent="${str.replace('\t','')}"`)
      }else{
        textList.push(`\tcontent={(`);
        textList = [...textList, ...content[0].map((str: string) => `\t${str}`)];
        textList.push(`\t)}`)
      }
    }
    if(footer){
      textList.push(`\tfooter={[`);
      footer.forEach((vals: string[], i:number) =>{
        textList = [...textList, ...vals.map((str: string) => `\t${str}`)];
        textList[textList.length - 1] = `${textList[textList.length - 1]},`;
      })
      textList.push(`\t]}`)
    }
    if(tabList){
      textList = [
        ...textList,
        `\ttabList={tabList}`,
        `\ttabActiveKey={tabActiveKey}`,
        `\tonTabChange={setTabActiveKey}`,
      ]
    }

    return [
      [
        '<PageContainer',
        ...paramToStrs(props),
        ...textList,
        `>`
      ],
      [`</PageContainer>`],
    ];
  },
  render: ({children, ...props}: any) => {

    return (
      <PageContainer 
        { ...props }
        content={renderChildren(children, 'content')}
        footer={renderChildren(children, 'footer')}
        extra={renderChildren(children, 'extra')}
      >
        {renderChildren(children)}
      </PageContainer>
    )
  },
  children: [
    { ...Container,   isNotDrop: true },
    { ...TextObj, isNotDrop: true, defaultProps:{ ['data-children']: 'content', text: '页面内容' }},
  ],
} as templateProps