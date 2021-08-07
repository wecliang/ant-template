import React, { useState, useCallback, useRef } from 'react';
import { Table, message } from 'antd';
import type {
  TableProps
} from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.less';
import { getIdList } from '@/utils/array';

const type = 'DragableBodyRow';

const DragableBodyRow = ({ id, index, moverow, className, style, ...restProps }:any) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop(
    () => ({
      accept: type,
      collect: (monitor:any) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        };
      },
      drop: (item:any) => {
        moverow(item.id, id, item.index, index);
      },
    }),
    [index],
  );
  const [, drag] = useDrag(
    () => ({
      type,
      item: { index, id },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index],
  );
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};


export interface DragTableProps extends TableProps<any>{
  /**
   * @param list 当前排序列表集合
   * @param dataSource 修改后的数据集合
   */
  onDragChange:(list:any[],dataSource:any[]) => void;
}


const DragSortingTable = ({
  onDragChange,
  ...props
}:DragTableProps) => {

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = (
    dragId:string, 
    hoverId:string, 
    dragIndex:number, 
    hoverIndex:number
  ) => {
      const { dataSource }:any = props;
      let list = getIdList(dragId, dataSource);
      if(!list[hoverIndex] || list[hoverIndex].id !== hoverId){
        return message.error('不支持跨层级排序');
      }
      let [item] = list.splice(dragIndex, 1);
      list.splice(hoverIndex,0,item);
      onDragChange && onDragChange(list, [...dataSource]);
    }


  return (
    // <DndProvider backend={HTML5Backend}>
      <Table
        { ...props }
        rowKey="id"
        tableLayout="fixed"
        components={components}
        onRow={(record:any,index) => {
          return {
            id: record.id,
            index,
            moverow:moveRow,
            style:{},
          }
        }}
      />
    // </DndProvider>
  );
};


export default DragSortingTable;