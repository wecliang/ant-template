import React, { useRef, useState, useCallback } from 'react';
import { objectProps, templateProps, type } from '@/template';
import { useDrag, useDrop } from 'react-dnd';
import styles from './index.less';
import { connect } from 'umi';
import { getObject } from '@/utils';
import { PlusOutlined, TrophyFilled } from '@ant-design/icons';
import { makePageProps, stateListProps } from '@/template/typing';
let i = 100;
const getUuid = () => {
  return String(i++);
}

/**
 * @name 拖动添加占位符元素
 */
export const Placeholder = (props?:any) => {
  const { isInline } = props || {};
  return (
    <div 
      className={styles.Placeholder}
      style={isInline && { display:'inline-block' }}
    ><PlusOutlined /></div>
  )
}

// 组件 和 modules 合并类型
interface templateMergeModuleProps extends templateProps, makePageProps {
  children?: templateMergeModuleProps[];
};
/**
 * @name 生成可编辑list数据集合
 * @param list 当前要生成页数数据集合
 * @param modules 所有组件对象
 * @returns 返回真实的页数数据集合。
 */
export const generatePage = (
  list:makePageProps[], 
  modules:{ [key:string]:templateProps }
):stateListProps[] => {
  // 合并 modules 对象
  function recursionMergeModules(item:makePageProps):templateMergeModuleProps{
    const { namespace, children } = item;
    return {
      ...item,
      ...modules[namespace],
      children: children && children.map((option:any) => recursionMergeModules(option))
    }
  }
  let templates:templateMergeModuleProps[] = list.map((item) => recursionMergeModules(item))
  // 递归生成新的数据
  function recursionFormatModules({ children, renderProps, isComponent, renderParentProps, ...item }:templateMergeModuleProps):stateListProps{
    return dropModules({
      renderProps,
      renderParentProps,
      isComponent,
      ...item,
      id: getUuid(),
      children: children && (
        isComponent? generatePageView(children, modules)
        : children.map((option) =>{
          return recursionFormatModules(option);
        })
      )
    })
  }

  return templates.map((item) => recursionFormatModules(item));
}


/**
 * @name 生成真实页面数据集合
 * @param list 当前要生成页数数据集合
 * @param modules 所有组件对象
 * @returns 返回真实的页数数据集合。
 */
export const generatePageView = (
  list:makePageProps[], 
  modules:{ [key:string]:templateProps }
) => {
  // 数据合并
  function recursionMergeModules(item:makePageProps):stateListProps{
    const { namespace, renderProps, renderParentProps, children, isComponent } = item;
    return {
      id: getUuid(),
      ...modules[namespace],
      isComponent,
      renderProps,
      renderParentProps,
      children: children && children.map((option:any) => recursionMergeModules(option))
    }
  }

  return list.map((item) => recursionMergeModules(item))
}

/**
 * @name 递归格式化元素，返回页面实例对象
 */
export const formatModules = (
  item:templateProps,
):stateListProps => {
    const { defaultProps, defaultParentProps, children } = item;
    // 格式化当前元素
    return dropModules({
      id: getUuid(),
      renderProps: { ...defaultProps },
      renderParentProps: { ...defaultParentProps },
      ...item,
      children: children && children.map((option) =>{
        return formatModules(option);
      })
    })
}

/**
 * @name 复制当前对象元素
 */
export const copyModules = (
  item: stateListProps,
  moduleObjs: any,
): stateListProps => {
  const { namespace, renderProps, isComponent, renderParentProps, children} = item;
  
  // 格式化当前元素
  return dropModules({
    ...item,
    render: moduleObjs[namespace].render,
    id: getUuid(),
    renderProps: { ...renderProps },
    renderParentProps: { ...renderParentProps },
    children: children && (
      isComponent? generatePageView(children, moduleObjs)
      : children.map((option) =>{
        return copyModules(option, moduleObjs);
      })
    )
  })
}



export const dropModules = (data:stateListProps) => {
  const { id, render, isComponent, isNotDrop, isInline, namespace } = data;
  const isContainer = !isComponent &&  data['isContainer'];

  // 添加拖动属性
  const DropView = ({
    containerBool, 
    dropBool,
    moveBool,
    selectBool,
    isDrop,
    updateContainer,
    children,
    addModule,
    ...props
  }:any) => {
    const ref = useRef(null);
    // 是否高亮
    const [hover, setHover] = useState<boolean>(false);
    // 插入方式 true作为子集插入
    const [mode, setMode] = useState<boolean>(false);
    const [, drag] = useDrag({
      type,
      item: data,
      options:{
        dropEffect: 'move',
      },
      canDrag: monitor => {
        updateContainer({ moveId:id });
        return true;
      },
      end: () => {
        updateContainer({ moveId:undefined }, false);
      }

    });

    const [oItem, drop]:any = useDrop({
      accept: type,
      drop: (item:any, monitor) => {
        let bool = monitor.didDrop()
        if(bool) return;
        if(item.id === id) return;
        // 添加元素
        addModule(item, mode? { containerId:id }:{ dropId: id });
      },
      collect: (monitor) => {
        if(!dropBool) return {};
        return monitor.getItem();
      } 
    })
    isNotDrop? drop(ref) : drop(drag(ref));

    const Element = render;
    // 是否高亮
    const isHover = hover || (isDrop && containerBool);

    /**
     * @name 通过DrapOver方法，获取当前拖动所属容器
     */
    const onDragOver = useCallback((e:any, bool = false) => {
      if(moveBool) return;
      if(isContainer){
        if(!containerBool){
          updateContainer({ containerId: id });
        }
        if(mode !== bool) setMode(bool);
      }
      if(!dropBool){
        updateContainer({ dropId: id });
      }
      e.preventDefault();
      e.stopPropagation();
    },[dropBool, containerBool, mode, moveBool])

    // 当前组件内容元素
    const renderElement = () => {
      
      if(isContainer){
        return (
          <div
            className={
              `${styles.ContainerView} `+
              ` ${styles.pointerEvents}`+
              ` ${isHover && styles.dropViewHover || ''}`+
              ` ${selectBool && styles.selectBool || ''}`
            }
            onDragOver={(e) => {
              onDragOver(e, true)
            }}
          >
            <div className={styles.containerNamespace}>{!isNotDrop && namespace}</div>
            <Element {...props} >
              {children}
              {dropBool && mode && Placeholder(oItem)}
            </Element>
          </div> 
        )
      }

      return <Element {...props} children={children} />
    }


    return (
      <div 
        ref={ref}
        onDragOver={onDragOver}
        onMouseOver={(e) =>{
          setHover(true);
          e.stopPropagation();
        }}
        onMouseOut={(e) =>{
          setHover(false);
        }}
        onClick={(e) =>{
          updateContainer({ selected:id }, false);
          e.stopPropagation();
        }}
        className={
          `${styles.dropView}`+
          ` ${isContainer ? isNotDrop? '' : styles.parentContainer : styles.pointerEvents}`+
          ` ${!isContainer && isHover && styles.dropViewHover || ''}`+
          ` ${!isContainer && selectBool && styles.selectBool || ''}`+
          ` ${isInline && styles.isInline || ''}`+
          ` ${moveBool && styles.moveContainer || ''}`
        }
      >
        {dropBool && !mode && Placeholder(oItem)}
        {renderElement()}
      </div>
    );


  }

  /**
   * @name 传入DropView 所需状态控制组件
   */
  const JSXElement:any = connect(
    ({ dropContainer }:any) => {
      const { isDrop, containerId, dropId, moveId, selected } = dropContainer;
      return {
        // 只有容器需要获取当前是否为画布状态
        isDrop: isContainer && isDrop, 
        // 当前是否为父 容器
        containerBool: containerId === id,
        // 是否为当前接受容器
        dropBool: isDrop && dropId === id,
        // 当前是否为选中态
        selectBool: selected === id,
        // 是否为当前组件在拖动
        moveBool: moveId === id,
      };
    },
    (dispatch) =>{
    return {
      updateContainer:(props:any, bool:boolean = true) => {
        dispatch({
          type: 'dropContainer/save',
          payload:{
            isDrop: bool,
            ...props,
          }
        })
      },
      // 更新组件
      addModule:(data:any, props:any) => {
        dispatch({
          type: 'moduleList/add',
          payload: data,
          ...props
        })
      }
    }
  })(DropView)

  // 修改render 元素后返回当前组件
  return {
    ...data,
    render: JSXElement,
  }

}


/**
 * @name 根据list集合返回data 对象集合
 * @param Array list 树状数据集合
 * @returns Object
 */
export const getDataObject = (list:any[]) => {
  let objs:{ [key:string]:string|undefined } = {};
  function recursionArray(arr:any, parentId?:string){
    return arr.map(({ id, children }:any) =>{
      objs[id] = parentId;
      if(children){
        return recursionArray(children, id);
      }
    })
  }
  recursionArray(list);

  return objs;
}




/**
 * @name 添加下级对象
 * @param Array   List          树状数据集合
 * @param Object  data  list    对象集
 * @param String  containerId   当前容器ID
 * @param Object  interItem     当前要插入对象
 * @returns Array
 */
export const appendChildrens = (list:any[],data:objectProps,containerId:string, interItem:any) => {
  const [index, result] = getObject(list, data, containerId);
  let item = result[index];
  if(item.children){
    item.children = [...item.children, interItem];
  }else{
    item.children = [interItem];
  }
  return list;
}


/**
 * @name 添加统计对象
 * @param Array   List          树状数据集合
 * @param Object  data  list    对象集
 * @param String  dropId        当前容器ID
 * @param Object  interItem     当前要插入对象
 * @returns Array
 */
 export const interSiblings = (list:any[],data:objectProps,dropId:string, interItem:any) => {
  const [index, result] = getObject(list, data, dropId);
  result.splice(index, 0, interItem);
  return list;
}



/**
 * @name 根据ID删除指定对象
 * @param Array   List          树状数据集合
 * @param Object  data  list    对象集
 * @param String  id            当前元素ID
 * @returns Object
 */
 export const removeChildrens = (list:any[],data:objectProps,id:string) => {
  const [index, result] = getObject(list, data, id);
  const [item] = result.splice(index, 1);
  return item;
}