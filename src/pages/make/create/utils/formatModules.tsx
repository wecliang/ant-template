import React, { useRef } from 'react';
// import ReactDOMServer from 'react-dom/server';
import { templateProps } from '@/template';
import { useDrag } from 'react-dnd';
import styles from './index.less';
import { connect } from 'umi';



/**
 * 格式化列表
 */
export const formatModules = (data:templateProps) => {
  const Element = data.renderHTML || data.render;
  let innerHTML: React.ReactElement;
  try{
    innerHTML = <Element {...data.defaultProps} />;
  }catch{
    innerHTML = <span style={{ color:'red' }}>error</span>;
  }
  const type = 'template';

  const DragaItem = ({ addElement }:any) => {
    const ref = useRef(null);
    const [, drag] = useDrag({
      type,
      item: data,
      canDrag: monitor => {
        addElement(true);
        return true;
      },
      end: () => {
        addElement(false)
      }

    });
    drag(ref);
  
    return (
      <div
        ref={ref}
        className={`${styles.listContent}`}
      >
        <div style={{ pointerEvents: 'none' }}>{innerHTML}</div>
      </div>
    );
  };


  const ElementHtml = connect(() => ({}),(dispatch) =>{
    return {
      addElement:(bool:boolean) => {
        dispatch({
          type: 'dropContainer/save',
          payload:{
            isDrop: bool,
          }
        })
      }
    }
  })(DragaItem)

  return { 
    innerHTML: <ElementHtml />,
    ...data 
  };
}