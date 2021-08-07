/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
 import React, { useState, useEffect, useCallback } from 'react';
 import logo from '../assets/logo.png';
 import { useIntl, Link, connect } from 'umi';
 import {
   BasicLayout as ProLayoutComponents,
   BasicLayoutProps as ProLayoutComponentsProps,
   MenuDataItem,
   // Settings,
 } from '@ant-design/pro-layout';
 import { DndProvider } from 'react-dnd';
 import { HTML5Backend } from 'react-dnd-html5-backend';
 
 export interface BasicLayoutProps extends ProLayoutComponentsProps {
   breadcrumbNameMap: {
     [path: string]: MenuDataItem;
   };
   // settings: Settings;
 }
 export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
   breadcrumbNameMap: {
     [path: string]: MenuDataItem;
   };
 };
 

 const layoutConfig = {
  "navTheme": "light",
  "layout": "mix",
  "title": 'React Antd模板开发工具',
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "pwa": false,
  "iconfontUrl": "",
  "menu": {
    "locale": true
  },
  "headerHeight": 48,
  "splitMenus": true
}

 
 
 
 const BasicLayout: React.FC<BasicLayoutProps> = (props: any) => {
   const {
     children,
     dispatch,
     route: { routes },
   } = props;
   const intl = useIntl();
 
 
   return (
     <ProLayoutComponents
        logo={logo}
        formatMessage={intl.formatMessage}
        menuItemRender={(menuItemProps: any, defaultDom:any) => {
          if (menuItemProps && menuItemProps.path == '/ ') {
            return defaultDom;
          } else {
            return (
              <Link to={menuItemProps.path} key={menuItemProps.path}>
                {defaultDom}
              </Link>
            );
          }
        }}
       {...layoutConfig}
       {...props}
     >
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
     </ProLayoutComponents>
   );
 };
 
 export default BasicLayout;
 