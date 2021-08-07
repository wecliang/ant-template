import { CloseOutlined } from '@ant-design/icons';
import { Popover, message } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';
import { templateProps, type } from '@/template';
import { useDrop } from 'react-dnd';
import { connect } from 'umi';
import { Placeholder } from '@/pages/make/create/utils/dropModules';
import { getObject } from '@/utils';


const transformItem = ({ defaultProps, ...props }: templateProps, name: string):templateProps => {

  return {
    defaultProps: {
      'data-children': name,
      ...defaultProps,
    },
    isNotDrop: true,
    ...props,
  }
}

const AddCanvas = ({ 
  updateContainer,
  containerBool,
  addModule,
  domId,
  name,
  list,
  data,
  unique,
}: any) => {
  const ref = useRef(null);

  const isUnique = () => {
    const [index, result] = getObject([...list], data, domId);
    const { children } = result[index];
    if(!children || !children.some(({ renderProps }: any) => renderProps['data-children'] === name )){
      return true;
    }else{
      message.error('已存在子组件，请删除后添加');
    }
    return false;
  }

  const [oItem, drop] = useDrop({
    accept: type,
    hover:(item, monitor) => {
      if(!containerBool){
          updateContainer();
      }
    },
    drop: (item:any, monitor) => {
      if(monitor.didDrop()) return;
      if(containerBool && !item.id){
        if(!unique || isUnique())
          addModule(
            transformItem(item, name),
            domId
        );
      }
    },
    collect:(monitor) => {
      return monitor.getItem();
    },
  });
  const { id }: any = oItem || {};

  const isBool = !id && containerBool;

  drop(ref);

  return (
    <div ref={ref}
      className={
        `${styles.canvas}`
        + ` ${isBool && styles.DropPageHover || ''}`
      }
    >
      {isBool && Placeholder()}
    </div>
  )
}

const id = 'ReactNode[]'
const DropAddCanvas = connect(
  ({ dropContainer, moduleList }:any) => {
    const { isDrop, containerId } = dropContainer;
    return {
      // 当前是否为父 容器
      containerBool: isDrop && containerId === id,
      list: moduleList.list,
      data: moduleList.data,
    };
  },
  (dispatch) => ({
      updateContainer:() => {
          dispatch({
              type: 'dropContainer/save',
              payload:{
                  isDrop: true,
                  containerId: id,
              }
          })
      },
      addModule:(data:templateProps, id: string) => {
          dispatch({
              type: 'moduleList/add',
              payload: data,
              containerId: id,
          })
      }
  })
)(AddCanvas)

export const ReactNodeCanvas = ({ domId, name, unique }: any) => {

  const [visible, setVisible] = useState<boolean>();

  return (
    <Popover
      visible={visible}
      placement="leftTop"
      title={(
        <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
          <span>Canvas</span>
          <CloseOutlined onClick={() => setVisible(false)} />
        </div>
      )}
      content={(
        <DropAddCanvas name={name} domId={domId} unique={unique} />
      )}
      trigger="click"
    >
      <a onClick={() => setVisible(true)}>Canvas</a>
    </Popover>
  )
}