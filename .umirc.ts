import { defineConfig } from 'umi';
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  externals: isDev? undefined : {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    '@ant-design/icons': 'window.icons',
    'moment': 'window.moment',
    'antd': 'window.Antd',
    '@ant-design/pro-field': 'window.ProField',
  },
  scripts: isDev? undefined : [
    'http://kit.tinvapi.com/umd/index.min.js',
    'http://kit.tinvapi.com/umd/ant.min.js',
  ],
  headScripts: isDev? undefined : [
    'http://kit.tinvapi.com/umd/ant.min.css',
  ],
  antd: {
  //  dark: true, // 开启暗色主题
    compact: true, // 开启紧凑主题
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
          redirect: '/make',
        },
        {
          path: '/make',
          name: 'make',
          icon: 'Layout',
          hideInMenu: true,
          headerRender: false,
          menuRender: false,
          routes: [
            {
              path: '/make/create',
              name: 'create',
              component: './make/create',
            },
            {
              component: './make',
            }
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  dynamicImport: {},

  locale: {
    default: 'zh-CN',
    antd: true,
  },

});
