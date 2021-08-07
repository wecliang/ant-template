import { LeftOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { memo, useCallback, useMemo, useState } from 'react';
import styles from './index.less';
import { history, connect } from 'umi';
import { Radio, InputNumber , Button, Space, Tag } from 'antd';
import DrawerData from './DrawerData'
// const { getState, dispatch } = getDvaApp()._store;

const Header = memo(({
  dispatch,
  scale,
  type: pageType,
}:any) => {

  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<'tsx' | 'json'>('json');

  const updatePageType = useCallback((val) => {
    switch(val){
      case 'edit':
        dispatch({ type: 'moduleList/save', payload:{ viewList: undefined }})
      break;
      case 'view':
        dispatch({ type: 'moduleList/view', payload:{} })
      break;
      default:
    }
  },[])

  const onUpdateScale = useCallback((val) => {
    dispatch({
      type: 'dropContainer/save',
      payload: {
        scale: val,
      }
    })
  },[])

  const dataView = useMemo(() => {
    if(visible){
      return <DrawerData visible={visible} type={type} onClose={() => setVisible(false)} />
    }
    return null;
  },[visible])

  return (
    <div className={styles.header}>
      <div 
        className={styles.center}
        style={{ cursor:'pointer '}}
        onClick={() => history.goBack()}
      >
        <LeftOutlined />
        <span>&nbsp;返回</span>
      </div>
      <div>
        <span>缩放：</span>
        <MinusCircleOutlined onClick={() => onUpdateScale(Math.max(50, scale - 5))} />
        <InputNumber
          size="small" 
          value={scale} 
          precision={0}
          min={50} 
          max={200} 
          formatter={value => `${value}%`}
          style={{ margin:'0 10px', width:'60px' }}
          onChange={(num) =>onUpdateScale(num)}
        />
        <PlusCircleOutlined onClick={() => onUpdateScale(Math.min(200, scale + 5)) } />
      </div>
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Radio.Group
          defaultValue="edit"
          size="small"
          buttonStyle="solid"
          onChange={(e) => updatePageType(e.target.value)}
        >
          <Radio.Button value="edit">编辑</Radio.Button>
          <Radio.Button value="view">预览</Radio.Button>
        </Radio.Group>
      </div>
      <div>

      </div>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <Space>
          {pageType === 'page'? <Tag color="#f50">Page</Tag>: <Tag color="#108ee9">Component</Tag>}
          <Button size="small" onClick={() => {
            setType('tsx');
            setVisible(true);
          }}>
            TSX
          </Button>
          <Button size="small" onClick={() => {
            setType('json');
            setVisible(true);
          }}>JSON</Button>
        </Space>
      </div>

      {dataView}
      
    </div>
  )
})

export default connect(
  ({ dropContainer, moduleList }:any) => ({
    scale: dropContainer.scale,
    type: moduleList.type,
  }),
)(Header);