import type { enteringType } from '@/enums/field';
import type { modulesType, objectProps, templateProps } from './';

/**
 * 根据 templateProps 格式化 demo中实际拿到的数据类型
 */
export interface stateListProps extends templateProps {
    id: string;                     // 当前组件 唯一ID
    // parentId?: string;           // 当前组件 父级ID
    isComponent?: boolean;          // 是否为组件
    containerId?: string;           // 所在容器
    renderProps: objectProps;       // 修改后的 props 和 defaultProps 合并值( render 实际接受到的 props参数)
    renderParentProps: objectProps; // 修改后的父类 childrenProps 和 当前defaultParentProps 合并值
    children?: stateListProps[];    // 多级组件
}

// 画布 生成页面假数据基础类型
export interface makePageProps{
    namespace: modulesType;          // 同组件命名
    isNotDrop?: boolean;             // 禁止拖动属性
    renderProps?: any;               // 当前组件props变量
    renderParentProps?: any;         // 在父组件下，父组件childrenProps 值
    isComponent?: boolean;           // 是否为组件
    children?: makePageProps[];      // 子组件
}

/**
 * ProTable column
 */
export interface ProTableColumnProps  {
    // 标题
    title: string;                      
    // 字段
    dataIndex: string;                  
    // 宽度
    width?: string | number;            
    // 数据类型
    valueType?: enteringType;            
    // 对齐方式
    align?: 'left' | 'right' | 'center';
    // 查询列数据
    order?: number;
    // 是否隐藏在 table 列表展示
    hideInTable?: boolean;
    // 是否隐藏在 查询表单中展示
    hideInSearch?: boolean;        
}