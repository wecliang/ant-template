import React, { memo, useEffect, useMemo, useState } from 'react'
import { Drawer, DrawerProps, message, Space, Radio } from 'antd';
import Field from '@ant-design/pro-field'
import { getDvaApp } from 'umi';
import type { makePageProps, stateListProps } from '@/template/typing';
import { copyText } from '@/utils/str'; 
import { CopyTwoTone } from '@ant-design/icons';
import { generatorHTML } from '../utils/html';

export interface DrawerDataProps extends DrawerProps {
  type: 'tsx' | 'json',
}

const recurvePage = (state: stateListProps): makePageProps => {
  const { namespace, renderProps, isComponent, isNotDrop, renderParentProps, children } = state;
  return {
    namespace,
    isComponent,
    isNotDrop,
    renderProps,
    renderParentProps,
    children: children && children.map(recurvePage),
  }
}

const DrawerData = (props: DrawerDataProps) => {

  const [data, setData] = useState<any>('');
  const [type, setType] = useState(props.type);

  useEffect(() => {
    const { getState, dispatch } = getDvaApp()._store;
    const { list } = getState().moduleList;
    switch(type){
      case 'json': 
        setData(JSON.stringify(list.map(recurvePage),  null, '\t'))
      break;
      case 'tsx':
        setData(generatorHTML({ list }))
      break;
    }
  },[type])

  const element = useMemo(() => {
    return (
      <Field
        mode="read"
        valueType={type === 'json'? "jsonCode" : "code"}
        fieldProps={{
          style: { width: '100%' }
        }}
        value={data}
      />
    )
  },[data])

  return (
    <Drawer
      width="60%"
      title="页面数据结构"
      {...props}
    >
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 10 }}>
        <Radio.Group defaultValue={type} buttonStyle="solid" onChange={(e) => setType(e.target.value)}>
          <Radio.Button value="json">JSON</Radio.Button>
          <Radio.Button value="tsx">tsx</Radio.Button>
        </Radio.Group>
        <Space>
          <CopyTwoTone 
            style={{ fontSize: 18 }} 
            onClick={() => copyText(data).then(() => message.success('文本拷贝成功'))}
          />
        </Space>
      </div>
      {element}
    </Drawer>
  )
}


export default memo(DrawerData);