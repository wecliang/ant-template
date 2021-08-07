import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
import { connect } from 'umi';

const scaleX = [
    -1000,
    -900,
    -800,
    -700,
    -600,
    -500,
    -400,
    -300,
    -200,
    -100,
    0,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    2000,
    2100,
    2200,
    2300,
    2400,
    2500,
    2600,
    2700,
    2800,
    2900,
]


const scaleY = [
  -500,
  -400,
  -300,
  -200,
  -100,
  0,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
  1600,
  1700,
  1800,
  1900,
  2000,
  2100,
  2200,
  2300,
  2400,
]

const Index = ({ children, isDidDrop, scale, updateContainer }:any) => {

  const canvasRef = useRef(null);
  const [top, setTop] = useState(430);
  const [left, setLeft] = useState(930);

  const resetScroll = useCallback(
    (top, left) => {
      let demo:any = canvasRef.current;
      demo.scrollTop = top;
      demo.scrollLeft = left;
    },
    [],
  )

  const scalePct = useMemo(() => {
    return 100 - (10000/scale)
  },[scale])


  useEffect(() => {
    let demo:any = canvasRef.current;
    resetScroll(top, left);
    function onScroll(e:any){
      if(isDidDrop){
        demo.scrollTop = top;
        demo.scrollLeft = left;
      }
      const { scrollTop, scrollLeft } = demo;
      setTop(scrollTop);
      setLeft(scrollLeft)
    }
    demo.addEventListener('scroll',onScroll);

    return () => {
      demo.removeEventListener('scroll',onScroll);
    }
  },[isDidDrop])

  return (
    <div style={{ position:'relative', flex:1 }}>
      <div 
        className={styles.canvas}
        onClick={() => {
          updateContainer({
            selected: undefined
          })
        }}
        style={{
          transform: `scale(${scale/100})`,
          right: `${scalePct}%`,
          bottom: `${scalePct}%`,
        }}
        ref={canvasRef}
      >
        {children}
        {/* 横向坐标尺 */}
        <div className={styles.rulerX} style={{ top:`${top}px`}}>
          {scaleX.map((num:number) => <span key={num}>{num}</span>)}
        </div>
        {/* 竖向坐标 */}
        <div className={styles.rulerY} style={{ left:`${left}px`}}>
          {scaleY.map((num:number) => <span key={num}>{num}</span>)}
        </div>
      </div>
      <Tooltip title="回到开始位置" placement="bottomLeft">
        <div className={styles.canvasScaleMake} onClick={() => resetScroll(430, 930)}></div>
      </Tooltip>
    </div>
  )
}

export default connect(
  ({ dropContainer }:any) =>({
    isDidDrop: dropContainer.isDidDrop,
    scale: dropContainer.scale,
  }),
  (dispatch) => ({
    updateContainer:(props:any) =>{
      dispatch({
        type: 'dropContainer/save',
        payload:props,
      })
    }
  })
)(Index);