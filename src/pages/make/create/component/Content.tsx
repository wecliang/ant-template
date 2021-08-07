import React, { useRef, useCallback, memo } from 'react';
import styles from './index.less';
import { useDrop  } from 'react-dnd';
import { connect } from 'umi';
import { templateProps, type } from '@/template';
import { Placeholder } from '../utils/dropModules';
import { Skeleton } from 'antd';
import Content from '@/component/setting/content';

const DropView = ({ 
    updateContainer,
    updateDidDrop,
    isDidDrop,
    containerBool,
    dropBool,
    addModule,
    loading,
    isEdit,
    children 
}:any) => {
    const ref = useRef(null);
    const [oItem, drop] = useDrop({
      accept: loading? 'noneDrop' : type,
      hover:(item, monitor) => {
        if(!containerBool || !dropBool){
            updateContainer();
        }
      },
      drop: (item:any, monitor) => {
        if(monitor.didDrop()) return;
        if(dropBool && containerBool){
            addModule(item);
        }
      },
      collect:(monitor) => {
        // 当前容器是否接收到元素
        updateDidDrop(monitor.isOver());
        if(!dropBool) return {};
        return monitor.getItem();
      },
    });

    drop(ref);

    const isHover = isDidDrop && containerBool;

    return (
        <div
            ref={ref}
            className={
                `drop-page-content` 
                + ` ${isHover && styles.DropPageHover || ''}`
                + ` ${!isEdit && styles.DropPageNotImage || ''}`
            }
        >
            {loading? <Skeleton active paragraph={{ rows:8 }} /> : children}
            {isHover && dropBool && Placeholder(oItem)}
        </div>
      );
}


const DropViews = connect(
    ({ dropContainer, moduleList }:any) => ({ 
        containerBool: !dropContainer.containerId,
        dropBool: dropContainer.isDrop && !dropContainer.dropId,
        isDidDrop: dropContainer.isDidDrop,
        loading: moduleList.loading,
        isEdit: moduleList.type !== 'view',
    }),
    (dispatch) => ({
        updateDidDrop: (bool:boolean) => {
            dispatch({
                type: 'dropContainer/save',
                payload:{
                    isDidDrop: bool,
                }
            })
        },
        updateContainer:() => {
            dispatch({
                type: 'dropContainer/save',
                payload:{
                    isDrop: true,
                    containerId: undefined,
                    dropId: undefined,
                }
            })
        },
        addModule:(data:templateProps) => {
            dispatch({
                type: 'moduleList/add',
                payload: data,
            })
        }
    })
)(DropView)



const ContentMain = connect(
    ({ moduleList }:any) => {
        const { list, type, viewList } = moduleList;
        return {
            list: viewList || list,
        }
    }
)(Content);



/**
 * 页面内容区域
 * @param width 1280
 * @param height 800
*/
export default memo(() => {

    return (
        <DropViews>
            <ContentMain />
        </DropViews>
    )
})