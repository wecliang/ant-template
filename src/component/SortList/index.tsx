import React, { useCallback } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { List, ListProps} from 'antd';

const SortableContainerView = SortableContainer((props:any) => <List {...props} />)
const SortableElementView = SortableElement((props:any) => {
    return <List.Item {...props} />
})
const SortableHandleView = SortableHandle((props:any) =>  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);


export interface SortListProps extends ListProps<any[]> {
    onSortChange: (list:any[], options?: any) => void;
}

/**
 * 列表排序
 */
export default ({ onSortChange, dataSource, renderItem ,...props}:SortListProps) => {

    const onSortEnd = ({ oldIndex, newIndex }:any) => {
        let list = [...dataSource || []];
        const [item] = list.splice(oldIndex, 1);
        list.splice(newIndex, 0, item);
        onSortChange(list, { oldIndex, newIndex });
    }

    return (
        <SortableContainerView
            useDragHandle
            dataSource={dataSource}
            renderItem={(item:any, index:number) => (
                <SortableElementView index={index}>
                    <SortableHandleView />
                    {renderItem && renderItem(item, index)}
                </SortableElementView>
            )}
            onSortEnd={onSortEnd}
            {...props}
        />
    )
}