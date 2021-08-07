import { paramToStrs, templateProps } from '@/template';
import { Menu } from 'antd';
import { memo } from 'react';
import MenuIcon from '@/assets/template/Menu.svg';
const { SubMenu } = Menu;
import MenuCompiler from '@/component/compiler/menu';
import { jsonTransitionHtml } from '@/utils/json';

const UpdateMenu = () => {
  
}


export default {
  namespace: 'Menu',
  renderHTML: () => {
    return <img src={MenuIcon} />
  },
  props:{
    mode: ['select',{
      title: '菜单类型',
      valueEnum: {
        vertical: 'vertical',
        horizontal: 'horizontal',
        inline: 'inline',
      }
    }],
    menus: ['any',{
      title: '菜单列表',
      render: MenuCompiler,
    }],
    multiple: ['switch(false)', { title: '是否允许多选' }],
    selectable: ['switch(true)', { title: '是否允许选中' }],
    theme: ['select', {
      title: '主题',
      valueEnum: {
        light: 'light',
        dark: 'dark',
      }
    }],
    triggerSubMenuAction: ['select', {
      title: '展开收起触发行为',
      isNewline: true,
      valueEnum: {
        hover: 'hover', 
        click: 'click',
      }
    }]
  },
  import: [
    { from: 'antd', imports:['Menu'] },
    { from: 'react', imports:['useState'] },
  ],
  headerJs: () => {
    return [
      `const { SubMenu } = Menu;\n`,
      `const renderMenus = (list: any[]) => {`,
      `\tif(!list) return null;`,
      `\treturn list.map(({ id, children, title }: any) => {`,
      `\t\tif(children && children.length){`,
      `\t\t\treturn (`,
      `\t\t\t\t<SubMenu key={id} title={title}>`,
      `\t\t\t\t\t{renderMenus(children)}`,
      `\t\t\t\t</SubMenu>`,
      `\t\t\t)`,
      `\t\t}`,
      `\t\treturn <Menu.Item key={id}>{title}</Menu.Item>`,
      `\t})`,
      `}`,
    ]
  },
  bodyJs: ({ menus }) => {
    return [
      `const [menus, setMenus]  = useState<any[]>(${jsonTransitionHtml(menus).join('')})`,
    ]
  },
  renderText: ({ menus, ...props }) => {
    return [
      `<Menu${paramToStrs(props,' ').join('')} >`,
      `\t{renderMenus(menus)}`,
      `</Menu>`
    ]
  },
  defaultProps: {
    menus: [
      {
        "id": 1627138985005,
        "title": "菜单一",
        "children": [
          {
            "id": 1627140059583,
            "title": "子菜单一"
          },
          {
            "id": 1627140064936,
            "title": "子菜单二"
          }
        ]
      },
      {
        "id": 1627140007366,
        "title": "菜单二",
        "children": [
          {
            "id": 1627141494818,
            "title": "子菜单三"
          }
        ]
      },
      {
        "id": 1627140012879,
        "title": "菜单三"
      }
    ],
  },
  render:memo(({ menus, ...props }: any) => {

    const renderMenus = (list: any[]) => {
      if(!list) return null;
      return list.map(({ id, children, title }: any) => {
        if(children && children.length){
          return (
            <SubMenu key={id} title={title}>
              {renderMenus(children)}
            </SubMenu>  
          )
        }
        return <Menu.Item key={id}>{title}</Menu.Item>
      })
    }
 
    return (
      <Menu {...props}>
        {renderMenus(menus)}
      </Menu>
    )
  })
} as templateProps;

