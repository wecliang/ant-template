import React, { memo, useEffect } from 'react';
import { Card, Form, Switch, Space } from 'antd';
import { renderPropsTypes, TemplateRenderPropsSetting } from '@/template';
import { componentSettingProps } from '@/template/component';
import { connect, useIntl } from 'umi';
import { MyField } from '@/component/antd';
import { getObject } from '@/utils';
import styles from './index.less';
import { CopyTwoTone, DeleteOutlined } from '@ant-design/icons';
import { SelectIconForm } from '@/component/SelectIcon';
import StyleCompiler from '@/component/compiler/style';
import { PageSettingProps } from '@/component/setting/pageSetting';
import { ReactNodeCanvas } from '@/component/setting';

const fieldFormProps:any = {
    wrapperCol:{
        style:{
            minWidth: '200px'
        }
    }
}

/**
 * @param Switch 带状态的Switch 选择器
 */
const SwitchStatus = ({ value, onChange, bool }: any) => {
    return <Switch checked={value === undefined? bool : value} 
        onChange={(checked) => {
            if(checked === bool){
                onChange(undefined)
            }else{
                onChange(checked);
            }
        }}
    />
}



interface ItemRenderProps {
    // 组件 props 对象名称
    name: string;
    // 默认组件类型
    type: renderPropsTypes;
    // 额外配置
    option?: TemplateRenderPropsSetting;
    // 当前组件 props 参数
    data?: any
    // 组件id
    domId?: string;
}

const PropsItemRender = memo(({ name, type, option, data, domId }:ItemRenderProps) =>{

    const { title, render, isRender, fieldProps, formProps, valueEnum, isNewline, renderFormItem } = option || {};

    if(isRender && !isRender(data)) return null;
    
    if(render){
        const Element = render;
        return (
            <Form.Item name={name} label={title} {...formProps}>
                <Element
                    data-id={domId}
                    {...data}
                />
            </Form.Item>
        )
    }
    let formItemProps;
    if(isNewline){
        formItemProps = { ...formProps, ...fieldFormProps }
    }else{
        formItemProps = { ...formProps }
    }
    if(formProps && data[name]){
        // 数据已存在
        if(formProps['initialValue'] && name in data){
            delete formItemProps?.initialValue;
        }
    }
    switch(type){
        case 'any': break;
        case 'style': 
            return (
                <Form.Item {...formItemProps} label={title || name} name={name}>
                    <StyleCompiler />
                </Form.Item>
            )
        break;
        case 'ReactNode':
        case 'ReactNode[]':
            return (
                <Form.Item {...formItemProps} label={title || name} name={name}>
                    <ReactNodeCanvas domId={domId} name={name} unique={type === 'ReactNode'} />
                </Form.Item>
            )
        break;
        case 'icon':
            return (
                <Form.Item {...formItemProps} label={title || name} name={name}>
                    <SelectIconForm />
                </Form.Item>
            )
        break;
        case 'switch(false)':
            return (
                <Form.Item {...formItemProps} label={title || name} name={name}>
                    <SwitchStatus bool={false} />
                </Form.Item>
            )
        break;
        case 'switch(true)':
            return (
                <Form.Item {...formItemProps} label={title || name} name={name}>
                    <SwitchStatus bool={true} />
                </Form.Item>
            )
        default:
            return (
                <MyField
                    mode="edit"
                    name={name}
                    label={title || name}
                    fieldProps={fieldProps}
                    valueType={type}
                    formProps={formItemProps}
                    valueEnum={valueEnum}
                    renderFormItem={renderFormItem}
                />
            );
    }
    return null;
})

// 过滤form表单中的值, 删除null 和 undefined对象
const filedFormOnChangeValue = (param: any, props: any) => {
    for(let key in param){
        if(param[key] === null || param[key] === undefined || param[key] === ''){
            delete props[key]
        }else{
            if(typeof param[key] === 'object' && !Array.isArray(param[key])){
                props[key] = filedFormOnChangeValue(param[key], {...param[key]});
                
            }else{
                props[key] = param[key];
            }
        }
    }
    return props;
}

const wrapperCol: any = {
    style:{
        minWidth: '60px'
    }
}

const Index = memo(({
    id, //组件id
    type,
    namespace,
    isComponent,
    props, 
    renderProps,
    updatePageProps,
    updateComponentProps,
    updateModuleProps,
    deleteModule,
    copyModule,
    parentProps,
    renderParentProps,
    updateParentProps,
}:any) => {
    const { formatMessage } = useIntl();

    useEffect(() => {
        if(!id) return;
        function onKeyDown(e:any){
            if(e.keyCode == 46){
                deleteModule(id);
            }
            if(e.ctrlKey){
                if(e.keyCode == 86){
    //                copyModule(id);
                }
            }
        }
        document.addEventListener('keydown',onKeyDown);
        return () =>{
            document.removeEventListener('keydown', onKeyDown)
        }
    },[id])

    if(!props) return null;
    const title = namespace? formatMessage({ id:'template.' + namespace }) : '页面设置';

    return (
        <Card
            style={{ width:'220px' }}
            bordered={false}
            title={(
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span>{ isComponent? `${renderProps.name}.tsx` : title }</span>
                    <Space>
                        {!!namespace && <CopyTwoTone onClick={() =>copyModule(id) }/>}
                        {!!namespace && <DeleteOutlined style={{ color:'#ff2562' }} onClick={() => deleteModule(id)} />}
                    </Space>
                </div>
            )}
            className={styles.cardScrollY}
        >
            { parentProps  &&
            <Form
                key={`parent-${id}`}
                wrapperCol={wrapperCol}
                initialValues={renderParentProps}
                onValuesChange={(val) =>{
                    let formProps = filedFormOnChangeValue(val, { ...renderParentProps });
                    //更新组件数据
                    updateParentProps(formProps,id)
                }}
            >
                {Object.keys(parentProps).map((key:string) =>{
                    return (
                        <PropsItemRender 
                            key={key}
                            name={key}
                            type={parentProps[key][0]} 
                            option={parentProps[key][1]}
                            data={renderParentProps}
                            domId={id}
                        />
                    )
                })}
            </Form>
            }
            <Form
                key={id}
                wrapperCol={wrapperCol}
                initialValues={renderProps}
                onValuesChange={(val) =>{
                    let formProps = filedFormOnChangeValue(val, { ...renderProps });
                    if(!id){
                        if(isComponent){
                            updateComponentProps(formProps)
                        }else{
                            //更新页面数据
                            updatePageProps(formProps)
                        }
                    }else{
                        //更新组件数据
                        updateModuleProps(formProps,id)
                    }
                }}
            >
                {!props.style &&
                    <PropsItemRender 
                        key="style" 
                        name="style"
                        type="style"
                        data={renderProps}
                        domId={id}
                    />
                }
                {Object.keys(props).map((key:string) =>{
                    return (
                        <PropsItemRender 
                            key={key}
                            name={key}
                            type={props[key][0]} 
                            option={props[key][1]}
                            data={renderProps}
                            domId={id}
                        />
                    )
                })}
            </Form>
        </Card>
    )
})

export default connect(
    ({ moduleList, dropContainer }:any) =>{
        const { selected } = dropContainer;
        const { pageProps, componentProps, data, list, loading, type, viewList } = moduleList;
        if(loading || viewList) return {};
        if(!selected){
            const isComponent = type === 'component';
            return {
                type,
                isComponent,
                props: isComponent? componentSettingProps : PageSettingProps,
                renderProps: isComponent?  componentProps : pageProps,
            }
        }
        const [index, result, parentItems] = getObject([...list], data, selected);
        let item = parentItems.pop();
        if(item && item.childrenProps){
            return {
                ...result[index],
                parentProps: item.childrenProps,
            }
        }
        return result[index];
    },
    (dispatch) => ({
        // copy 组件
        copyModule:(id:string) => {
            return dispatch({
                type: 'moduleList/copy',
                payload: id,
            })
        },
        // 更新组件数据
        updateComponentProps: (props: any) => {
            return dispatch({
                type: 'moduleList/save',
                payload:{
                    componentProps:props,
                },
            })
        },
        // 更新页面数据
        updatePageProps:(props:any) => {
            return dispatch({
                type: 'moduleList/save',
                payload:{
                    pageProps:props,
                },
            })
        },
        // 更新组件数据
        updateModuleProps:(props:any, id:string) => {
            return dispatch({
                type: 'moduleList/renderProps',
                payload: props,
                id,
            })
        },
        // 更新组件 parentProps 数据
        updateParentProps:(props:any, id: string) => {
            return dispatch({
                type: 'moduleList/renderParentProps',
                payload:props,
                id,
            })
        },
        // 删除组件
        deleteModule:(id:any) => {
            dispatch({
                type: 'dropContainer/save',
                payload:{ selected:undefined },
            })
            return dispatch({
                type: 'moduleList/delete',
                payload: id,
            })
        },
    })
)(Index) as any;