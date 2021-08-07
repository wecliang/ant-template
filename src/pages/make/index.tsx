import React, { useCallback, useState, memo, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import styles from './index.less';
import Icon from '@ant-design/icons';
import { NoDevIcon } from '@/component/Icon';
import { History, connect } from 'umi';
import { stateProps } from './create/models/moduleList';
import pageDatas from './data';
import templateList from '@/template';
const modules: any = templateList.reduce((result, item) => Object.assign(result,item.modules), {});
import { getListModuleObjs } from './create/utils';
import { generatePageView } from './create/utils/dropModules';
import Content from '@/component/setting/content';

const HtmlCard = memo(({ list, name, onClick, delay }: any) => {
    const [loading, setLoading] = useState(true);
    const [pageList, setPageList] = useState<any []>([]);

    useEffect(() => {
        setTimeout(onReady,delay * 100)
    },[])

    const onReady = useCallback(async () => {
        let moduleObjs: any = await getListModuleObjs(list, modules);
        setLoading(false);
        setPageList(generatePageView(list, moduleObjs));
    },[])

    return (
        <Card
            title={name}
            loading={loading}
            onClick={() => {
                onClick(list)
            }}
        >
            <div className={styles.pageContent}>
                <Content list={pageList} />
            </div>
        </Card>
    )
})

const colProps = {
    xs: 12,
    md: 8,
    xl: 6,
}

interface IndexProps {
    history: History;
    updateModuleList:(payload:stateProps) => void;
}

const Index = ({ history, updateModuleList }:IndexProps) => {
   
    // 选择模板后，更新页面数据
    const onChange = useCallback((payload:stateProps) => {
        updateModuleList(payload);
        history.push('/make/create')
    },[])

    return (
        <Row className={styles.row} gutter={[24,16]}>
            <Col { ...colProps } >
                <Card 
                    loading={false} 
                    title="空白模板" 
                    onClick={() => {
                        onChange({
                            list: [],
                            pageProps: {},
                            type: 'page',
                        })
                    }}
                >
                    <div className={styles.center}>
                        <Icon style={{ width:'50%',}} component={NoDevIcon} />
                    </div>
                </Card>
            </Col>
            {
                pageDatas.map((item, index) => {
                    return (
                        <Col key={index} { ...colProps }>
                            <HtmlCard 
                                {...item}
                                delay={index}
                                onClick={(list: any) => {
                                    onChange({
                                        list,
                                        pageProps: {},
                                        type: 'page',
                                    })
                                }}
                            />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default connect(
    () =>({}),
    (dispatch) => ({
        updateModuleList:(payload:stateProps) =>{
            dispatch({
                type: 'moduleList/reset',
                payload:{
                    id: undefined,
                    ...payload,
                },
            })
        },
    })
)(Index);