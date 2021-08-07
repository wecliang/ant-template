import React, { useState, useCallback, useEffect } from 'react';
import Icon, * as Icons from '@ant-design/icons'
import { PlaceHolder } from '@/component/Icon';
import { Input, Radio, Popover } from 'antd';
import { initialToUpper } from '@/utils/str';

interface SelectIconProps {
  // 当前组件Key;
  value?: string;
  // 默认图标类型
  iconType: 'TwoTone' | 'Filled' | 'Outlined';
  onChange?: (key:string | undefined, options?:any) => void;
}
const iconsObj:any = Icons;
let TwoTone:any = {};   //双色风格
let Filled:any = {};    //实底风格
let Outlined:any = {};  //线框风格
let types:any = new Set();     //所有图标
for(let key in Icons){
  let iconKey = key.replace(/TwoTone|Filled|Outlined/g,'');
  let iconType = key.replace(iconKey, '');
  switch(iconType){
    case 'TwoTone':
      TwoTone[iconKey] = iconsObj[key];
      break;
    case 'Filled':
      Filled[iconKey] = iconsObj[key]
      break;
    case 'Outlined':
      Outlined[iconKey] = iconsObj[key];
      break;
  }
  types.add(iconKey);

}


const IconStyle:any = { 
  display:'inline-block', 
  width: '100px',
  textAlign: 'center',
  padding:'10px 0',
}

// 图标展示
export const IconView = ({
  type,
  iconType,
  onClick,
  ...props
}:{
  onClick?: (key:string) => void;
  type: string;   //图标类型
  iconType: 'TwoTone' | 'Filled' | 'Outlined';  //展示图标类型
}) => {
  let IconComponent;
  switch(iconType){
    case 'TwoTone': 
      IconComponent = TwoTone[type];
    break;
    case 'Filled':
      IconComponent = Filled[type];
    break;
    case 'Outlined':
      IconComponent = Outlined[type];
    break;
  }

  if(IconComponent){
    return (
      <IconComponent
        {...props}
        onClick={() =>{
          onClick && onClick(type);
        }} 
      />
    )
  }

  return null;
}


const SelectIcon = ({
  value,
  onChange,
  ...props
}:SelectIconProps) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [iconList, setIconList] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [iconType, setIconType] = useState<'TwoTone' | 'Filled' | 'Outlined'>(props.iconType);
  
  useEffect(() => {
    let elements = types.filter((key:string) =>{
      switch(iconType){
        case 'Outlined': if(!(key in Outlined)) return false; 
        break;
        case 'Filled': if(!(key in Filled)) return false; 
        break;
        case 'TwoTone': if(!(key in TwoTone)) return false; 
        break;
      }
      return !search ||  key.indexOf(search) !== -1;
    })
    setCurrent(1);
    setIconList([...elements]);
  },[search, iconType])


  const renderPopover = useCallback((visible, iconList:string[], current, iconType) =>{
    if(!visible) return null;

    const elements = iconList.filter((key, i) => i < 30 * current);

    return (
      <>
        <div style={{ display:'flex' }}>
          <Radio.Group 
            value={iconType} 
            buttonStyle="solid" 
            onChange={(e) => {
              setIconType(e.target.value);
            }}
            style={{ flexShrink:0, marginRight: 10 }}
          >
            <Radio.Button value="Outlined">线框</Radio.Button>
            <Radio.Button value="Filled">实体</Radio.Button>
            <Radio.Button value="TwoTone">双色</Radio.Button>
          </Radio.Group>
          <Input.Search 
            placeholder="搜索图标"
            onSearch={(str) => {
              setSearch(initialToUpper(str))
            }} 
          />
        </div>
        <div 
          style={{ width:'520px', overflowY:'auto', height:'360px' }}
          onScroll={(e) => {
            const { clientHeight , scrollTop, scrollHeight }:any = e.target;
            if((clientHeight + scrollTop + 50) > scrollHeight){
              setCurrent(current + 1)
            }
          }}
        >
          <span 
            style={IconStyle}
          >
            <Icon component={PlaceHolder}
              onClick={() =>{
                onChange && onChange(undefined);
                setVisible(false);
              }} 
            />
            <br />
            <span>删除图标</span>
          </span>
          {elements.map(key => (
            <span
              key={key}
              style={IconStyle}
            >
              <IconView
                onClick={(key:string) => {
                  onChange && onChange(key, { type: key, iconType, });
                  setVisible(false);
                }}
                type={key}
                iconType={iconType}
              />
              <br />
              <span>{key}</span>
            </span>
          ))}
        </div>
      </>
    )
  },[])

  return (
    <Popover
      visible={visible}
      trigger="click"
      onVisibleChange={(visible) => setVisible(visible)}
      placement="right"
      title="antd 图标"
      content={renderPopover(visible, iconList, current, iconType)}
    >
      <span onClick={() => setVisible(true)}
        style={{ cursor:'pointer', marginRight:'5px' }}
      >
        {
          value? <IconView type={value} iconType={props.iconType} />
          : <Icon component={PlaceHolder} />
        }
      </span>
    </Popover>
  )
}

SelectIcon.defaultProps = {
  iconType: 'Outlined'
}

export default SelectIcon;


export const SelectIconForm = ({ value, onChange }:any) => {
  const { type, iconType } = value || {};
  return <SelectIcon value={type} iconType={iconType} onChange={(_, vals) => onChange(vals)} />
}