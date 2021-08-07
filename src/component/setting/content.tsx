import { stateListProps } from "@/template/typing";
import { memo, useCallback } from "react";

const Content = memo(({ list }:any) => {

  if(!list) return null;
  
  const renderItem = useCallback(({ 
      id, 
      children, 
      renderProps, 
      render, 
      childrenProps
  }:stateListProps) => {
      // 组件渲染
      const Element = render;
      let parentProps:any = {};
      const Elements = children && children.map((options) => {
          if(childrenProps && options.renderParentProps){
              parentProps[options.id] = options.renderParentProps
          }
          return renderItem(options)
      })
      return (
          <Element 
              {...renderProps}
              key={id} data-id={id}
              {...(childrenProps? { childrenProps: parentProps } : {})}
          >
              {Elements}
          </Element>
      )
  },[])


  return list.map((item:stateListProps) => {
      return renderItem(item);
  })

})


export default Content;