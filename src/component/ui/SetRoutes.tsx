import React, { memo, useState } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'umi';
import { routesConfig } from '@/models/routes';

const Index = memo(({ routes, ...props }:any) => {

  const [treeData] = useState<any[]>(() => {
    function recursionList(list:routesConfig[]){
      return list.filter((item:any) => {
        if(!item.path) return false;
        if(item.children) {
          item.children =  recursionList(item.children);
        }
        item.value = item.id;
        item.title = item.path;
        return true;
      })
    }
    return recursionList(JSON.parse(JSON.stringify(routes)));
  })

  return (
    <TreeSelect 
      treeNodeLabelProp="title"
      treeData={treeData}
      placeholder="请选择父级路由"
      {...props}
    />
  )
})

export default connect(
  ({ routes }:any) => ({
    routes
  }),
  () => ({})
)(Index);