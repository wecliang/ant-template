import React, { ReactNode } from "react";
import { 
    UniversalIcon, 
    LayoutIcon, 
    EnteringIcon, 
    DataDisplayIcon,
    FeedBockIcon,
    AntdProIcon,
} from './Icon';
import { ProFieldValueType, ProFieldPropsType } from '@ant-design/pro-field';
import type { FormItemProps } from 'antd';
export interface objectProps {
    [key:string]:any
}


export interface reducerProps {
    type: string;
}

/**
 *  当前 PropsTypes 类型
 *  @explain 后续可能会维护其他特殊类型，方便内容快速录入
 */
export type renderPropsTypes = 'any'
| 'icon'
| 'style'
| 'switch(true)'
| 'switch(false)'
| 'ReactNode'
| 'ReactNode[]'
| ProFieldValueType;

/**
 * 当前模板分类
 */
type templateTypes = 'universal' | 'layout' | 'entering' | 'data' | 'feedback' | 'antdPro';


export interface TemplateRenderPropsSetting{
        // 当前props 参数展示名称
        title?: string;
        // field 属性
        fieldProps?: any;
        // formItem 属性
        formProps?: FormItemProps;
        // 通过正则限制当前 props 传入内容
        regEx?: string;
        /**
         * @string  限制最小长度
         * @number  限制最小值
         * @object  限制最小对象数
         * @array   限制最小列表数
         */
        min?: number;
        max?: number;
        // 允许自定义 props 更新方式
        render?:<T>({}:{
            value:T;                        //  当前props值
            onChange:(value:T) => void;     //  用于更新 props内容
            [key:string]: any,              //  其他props参数
        }) => React.ReactElement | null;
        // 当前组件配置是否显示
        isRender?: (props:any) => boolean;
        // ProField 属性
        valueEnum?: any;
        renderFormItem?: ProFieldPropsType['renderFormItem'],
        // 换行展示
        isNewline?: boolean;
}

/**
 * 组件 props 约束
 */
export interface TemplateRenderProps {
    [key:string]:[renderPropsTypes,TemplateRenderPropsSetting?]
}

/**
 * import 导入规则约束
 */
export interface ImportProps {
    // default 和 imports 不能全部为空，default 为默认导出，imports 为导出集合
    default?: string;
    imports?: string[];
    from: string;
}

export type modulesType = 'PageContainer'
| 'Container'
| 'WaterMark'
| 'ProTable'
| 'EditableProTable'
| 'Divider'
| 'Button'
| 'Typography'
| 'Form'
| 'Checkbox'
| 'DatePicker'
| 'InputNumber'
| 'Input'
| 'Mentions'
| 'Rate'
| 'Radio'
| 'Switch'
| 'Slider'
| 'Select'
| 'Steps'
| 'TreeSelect'
| 'Transfer'
| 'TimePicker'
| 'Upload'
| 'Avatar'
| 'Badge'
| 'Calendar'
| 'Card'
| 'Carousel'
| 'Collapse'
| 'Comment'
| 'Descriptions'
| 'Empty'
| 'Image'
| 'List'
| 'Popover'
| 'Statistic'
| 'Table'
| 'Tabs'
| 'Tag'
| 'Timeline'
| 'Tooltip'
| 'Tree'
| 'Text'
| 'Space'
| 'Grid'
| 'Alert'
| 'Result'
| 'P'
| 'Span'
| 'A'
| 'Icon'
| 'Menu'
| 'Div';
export interface templateProps {
    // 组件唯一值， 不可重复
    namespace: modulesType;
    // 依赖项
    import?: ImportProps[] | ((props: any) => ImportProps[]);
    /**
     * import 后面添加的js 内容
     * @warn headerJs 相同内容只会有一个生效
     */
    headerJs?: (props:objectProps) => string[];
    // 需要添加的 useState 变量
    useState?: (props:objectProps) => string[];
    // 需要添加的 useEffect 方法 
    useEffect?: (props:objectProps) => string[];
    // 其他hoc
    useHoc ?: (props:objectProps) => string[];
    // 需要添加的 useCallback
    useCallback ?: (props:objectProps) => string[];
    /**
     * 函数中其他需要执行的 js 内容
     * @warn bodyjs 同一个组件内容只会添加一次，不同组件需要注意命名冲突问题
     */
    bodyJs ?: (props:objectProps) => string[];
    /**
     * 组件jsx 文本展示内容
     * @warn 如果组件为容器，需要以二维数组形式返回内容
     */
    renderText: (props:objectProps) => string[] | Array<string[]>;
    // 组件列表展示元素，默认使用通过render 生成
    renderHTML?: (props:objectProps) => React.ReactElement;
    // 当前组件 必填项
    render: (props:objectProps) => React.ReactElement;
    // 组件接受props 参数，所有允许的同步修改都需要填写
    props?: TemplateRenderProps;
    // 参数默认值
    defaultProps?: objectProps;
    /**
     * 组件类型，默认和所在目录一致
     */
    type?: templateTypes;
    /**
     *  是否为容器（可以嵌套其他组件)
    */
    isContainer?: boolean;
    // 是否禁止拖动
    isNotDrop?: boolean;
    // 内联组件
    isInline?: boolean;
    // 容器组件嵌套存储
    children?: templateProps[];
    // 子类props值，将会和子类 props内容合并
    childrenProps?: TemplateRenderProps;
    // 父类默认 props 内容
    defaultParentProps?: objectProps;
    /**
     * @param parentProps 子类参数
     * @param strs 子类 renderText 返回内容
     */
    renderChildrenText?:(parentProps:objectProps, strs:string[] | Array<string[]>) => string[] | Array<string[]>;
}


export interface templateDataProps {
    name: templateTypes,
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    modules: {
        // key 和 namespace 需一致
        [key in modulesType]?: () => Promise<any>;
    };
}

export const type = 'template';

/**
 * 组件列表
 */
export default [
    {
        name: 'universal',
        icon: UniversalIcon,
        modules:{
            Text: () => import('./universal/Text'),
            Span: () => import('./universal/Span'),
            A: () => import('./universal/A'),
            P: () => import('./universal/P'),
            Icon: () => import('./universal/Icon'),
            Button: () => import('./universal/Button'),
            Typography: () => import('./universal/Typography'),
        }
    },
    {
        name: 'entering',
        icon: EnteringIcon,
        modules:{
            'Form': () => import('./entering/Form'),
            'Input': () => import('./entering/Input'),
            'InputNumber': () => import('./entering/InputNumber'),
            'Checkbox': () => import('./entering/Checkbox'),
            DatePicker: () => import('./entering/DatePicker'),
            Radio: () => import('./entering/Radio'),
            Rate: () => import('./entering/Rate'),
            Select: () => import('./entering/Select'),
            Slider: () => import('./entering/Slider'),
            Switch: () => import('./entering/Switch'),
            TimePicker: () => import('./entering/TimePicker'),
            Transfer: () => import('./entering/Transfer'),
            TreeSelect: () => import('./entering/TreeSelect'),
            Upload: () => import('./entering/Upload'),
        }
    },
    {
        name: 'data',
        icon: DataDisplayIcon,
        modules: {
            Avatar: () => import('./data/Avatar'),
            Badge: () => import('./data/Badge'),
            Calendar: () => import('./data/Calendar'),
            Card: () => import('./data/Card'),
        //    Carousel: () => import('./data/Carousel'),
        //    Collapse: () => import('./data/Collapse'),
            Descriptions: () => import('./data/Descriptions'),
            Empty: () => import('./data/Empty'),
            Image: () => import('./data/Image'),
        //    List: () => import('./data/List'),
            Statistic: () => import('./data/Statistic'),
            Table: () => import('./data/Table'),
            Tabs: () => import('./data/Tabs'),
            Tag: () => import('./data/Tag'),
            Timeline: () => import('./data/Timeline'),
            Tooltip: () => import('./data/Tooltip'),
        }
    },
    {
        name: 'layout',
        icon: LayoutIcon,
        modules:{
            Container: () => import('./component/Container'),
            Div: () => import('./layout/Div'),
            Divider: () => import('./layout/Divider'),
            Steps: () => import('./layout/Steps'),
            Menu: () => import('./layout/Menu'),
            Grid: () => import('./layout/Grid'),
            Space: () => import('./layout/Space'),
        }
    },
    {
        name: 'feedback',
        icon: FeedBockIcon,
        modules: {
            Alert: () => import('./feedback/Alert'),
            Result: () => import('./feedback/Result'),
        },
    },
    {
        name: 'antdPro',
        icon: AntdProIcon,
        modules: {
            PageContainer : () => import('./layout/PageContainer'),
            WaterMark: () => import('./layout/WaterMark'),
            ProTable: () => import('./layout/ProTable'),
            EditableProTable: () => import('./layout/EditableProTable'),
        }
    },
] as templateDataProps[];




// renderText 默认props 转字符串数组方法
export const paramToStrs = ({ ...props }:any, tab: string = '\t' ) => {
    delete props['date-id'];
    return Object.keys(props).map((key:any) => {
        const value = props[key];
        if(typeof value === 'string'){
            return `${tab}${key}="${value}"`;
        }else if(typeof value === 'function'){
            return `${tab}${key}=${value()}`
        }
        else if(typeof value === 'object'){
            if(Array.isArray(value)? value.length : Object.keys(value).length){
                return `${tab}${key}={${JSON.stringify(value)}}`
            }
        }else {
            if(value !== undefined){
                return `${tab}${key}={${value}}`;
            }
        }
    }).filter((item) => item !== undefined);
}


// reactNode[] 筛选当前children
export const renderChildren = (children: React.ReactNode[], name?: string, bool: boolean = false) => {
    const childrens = React.Children.toArray(children);
    const result = childrens.filter(({ props }: any) => {
        return props['data-children'] === name;
    })

    if(result.length) return bool? result[0] : result;
    return null;
}