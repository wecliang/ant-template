import React, { memo, useEffect, useState } from 'react';
import Icon, { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { connect, useIntl } from 'umi';
import templateDatas, { templateDataProps, templateProps } from '@/template';
import { List, Card, Input } from 'antd';

let timer:any;
const CardTitle = memo(({ title, isSearch, setIsSearch, onSearch }:any) => {

    return (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span>{isSearch? '' : title}</span>
            <Input
                bordered={isSearch}
                style={{
                    borderRadius:'20px', 
                    width: isSearch? '100%' : '1.6em',
                }}
                onChange={(e) => {
                    if(timer){
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        onSearch(e.target.value)
                    },300)
                }}
                placeholder="请输入要搜索组件名称" 
                prefix={<SearchOutlined onClick={() => setIsSearch()} />}
            />
        </div>
    )
})

/**
 * 内容区域
 */
const MenuElement = memo(({ menuModule, onSearch, setIsSearch }:any) => {
    const { name, list, loading, isSearch } = menuModule;
    const { formatMessage } = useIntl();
    return (
        <Card 
            title={(
                <CardTitle 
                    isSearch={isSearch}
                    onSearch={onSearch}
                    setIsSearch={setIsSearch}
                    title={formatMessage({ id:'template.' + name })} 
                />
            )}
            loading={loading}
            bordered={false}
            className={styles.cardScrollY}
        >
            <List
                grid={{ gutter: 8, column: 2 }}
                dataSource={list}
                renderItem={({ innerHTML, ...item }:any) => {
                        let moduleName = formatMessage({ 
                            id: `template.${item.namespace}`,
                            defaultMessage: item.namespace,
                        })
                        return (
                            <List.Item className={styles.listItem}>
                                {innerHTML}
                                <div className={styles.listItemName} title={moduleName}>
                                    {moduleName}
                                </div>
                            </List.Item>
                        )
                    }
                }
            />
        </Card>
    )
})

/**
 * 主模块
 */
const Index = memo(({ onModulesChange, menuModule, setIsSearch, onSearch, viewList }:any) => {

    useEffect(() => {
        if(templateDatas){
            onModulesChange(templateDatas[0]);
        }
    },[])

    if(viewList){
        return null;
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menuIcon}>
                {templateDatas.map((item:templateDataProps) => {
                    if(!item.name) return null;
                    return (
                        <Icon 
                            key={item.name}
                            component={item.icon} 
                            onClick={() => {
                                onModulesChange(item)
                            }}
                        />
                    )
                })}
            </div>
            <div style={{ flex: 1 }}>
                <MenuElement 
                    menuModule={menuModule} 
                    onSearch={onSearch}
                    setIsSearch={setIsSearch}
                />
            </div>
        </div>
    )
})

export default connect(
    ({ menuModule, moduleList }:any) => ({ menuModule, viewList: moduleList.viewList }),
    (dispatch) => ({
        onModulesChange:(item: templateDataProps) => {
            dispatch({
                type: 'menuModule/update',
                payload: item,
            })
        },
        onSearch:(str:string) => {
            dispatch({
                type: 'menuModule/search',
                payload: str
            }) 
        },
        setIsSearch:() => {
            dispatch({
                type: 'menuModule/save',
                payload: {
                    isSearch: true,
                }
            })
        }
    }),
)(Index);