import { getDvaApp } from 'umi';
import { ImportProps } from '@/template';
import { stateListProps } from '@/template/typing';
import { getIdObject } from '@/utils/array';



// 生成html 文本
export const generatorHTML = (moduleList:any) => {
  const { list }:{
    list: stateListProps[];
  } = moduleList;


  let imports:ImportProps[] = [];
  // 获取所有带合并资源
  let resource:{
    [key:string]: any[];
  } = {
    headerJs: [],
    useState: [],
    useHoc: [],
    useCallback: [],
    useEffect: [],
    bodyJs: [],
  }
  let resourceKeys  = Object.keys(resource);
  let returns:any[] = [];


  // 遍历获取生成 html 所需资源
  function recursionList(list:stateListProps[], options:any, renderParentText?: any){
    list.forEach(({
      renderParentProps,
      renderText,
      renderChildrenText,
      isComponent,
      ...o
    }) => {
      const dataKeys: any = new Set();
      const renderProps = { ...o.renderProps }
      // children 子类筛选
      const children = o.children && o.children.filter(({ renderProps: data }) => {
        const dataKey = data['data-children'];
        if(dataKey){
          dataKeys.add(dataKey);
        }
        return !dataKey && !isComponent;
      })
      // 根据data-children 合并 props参数
      dataKeys.forEach((key: string) => {
        const childrenList: any = o.children?.filter(({ renderProps: data }) => data['data-children'] === key).map((item: any) => {
          const { ['data-children']: name, ...chilProps} = item.renderProps;
          return {...item, renderProps: chilProps }
        });
        const returnsHtml: any[] = [];
        recursionList(childrenList, returnsHtml);
        const result = returnsHtml.map((item) => getJsxsHTML([item], ''));
        renderProps[key] = result.map((strs: string) => strs.split('\n').filter(str => str));
      })
      
      if(typeof o.import === 'object'){
        imports = [...imports, ...o.import];
      }else if(typeof o.import === 'function'){
        imports = [...imports, ...o.import(renderProps)];
      }
      resourceKeys.forEach((key:string) =>{
        let item:any = o;
        if(item[key]){
          resource[key] = resource[key].concat(item[key](renderProps))
        }
      })
      if(renderText){
        let returnItem:any, pointer;
        if(renderParentText){
          returnItem = {
            list: renderParentText(renderParentProps),
            children: [{
              list: renderText(renderProps),
              children: [],
            }],
          };
          pointer = returnItem.children[0].children;
        }else{
          returnItem = {
            list: renderText(renderProps),
            children: [],
          };
          pointer = returnItem.children;
        }
        options.push(returnItem);
        if(children){
          recursionList(children, pointer, renderChildrenText);
        }
      }
    })
  }
  recursionList(list, returns);
  let result = '';
  result += getImportHTML(imports);
  result += getResourceHeaderHtml(resource.headerJs);
  result += `\nconst Index = () => {\n`;
  result += getResourceHTML(resource);
  result += `\n\treturn (\n`;
  result += getJsxsHTML(returns, '\t');
  result += `\t)\n`;
  result += `\n}`;
  result += `\n\nexport default Index`;

  return result;
}

/**
 * @name 合并jsx html文本
 * @param jsxs
 * @returns 
 */
const getJsxsHTML = (jsxs:any[], tab:string) => {
  const isElements = jsxs.length > 1;
  if(isElements) tab = `${tab}\t`;
  let html = `${tab}${isElements? '<>\n' : '\t'}`;

  function recursionJsx(jsxList:any[], tab:string, first?: boolean){
    let jsxhtml = '';
    jsxList.forEach(({ list, children }:any) => {
      if(!list.length){
        jsxhtml += recursionJsx(children, tab);
        return jsxhtml;
      }
      if(!first || isElements) jsxhtml += `${tab}`;
      if(Array.isArray(list[0]) && Array.isArray(list[1])){
        jsxhtml += list[0].join(`\n${tab}`);
        if(children.length){
          jsxhtml += `\n`;
          jsxhtml += recursionJsx(children, `${tab}\t`);
          jsxhtml += `${tab}`;
        }
        jsxhtml += list[1].join(`\n${tab}`);
      }else{
        jsxhtml += list.join(`\n${tab}`);
      }
      if(!first || isElements) jsxhtml += `\n`;
    })
    return jsxhtml;
  }
  html += recursionJsx(jsxs,`${tab}\t`, true)
  html += `${tab}${isElements? '</>' : ''}\n`
  return html;
}


/**
 * @name 合并Header资源数据
 */
const getResourceHeaderHtml = (list: any[]) => {
  const result =  [...new Set(list)]
  return result.map((str: string) => `${str}\n`).join('');
}


/**
 * @name 返回资源路由合并的html
 * @param resource
 * @returns 
 */
const getResourceHTML = ({headerJs, ...resource}:any) => {
  let html = '\n';
  Object.keys(resource).forEach((key:string) => {
    html += resource[key].map((str: string) => `\t${str}\n`).join('');
  })
  return html;
}

/**
 * @name 根据import 生成html文本
 * @param list
 */
const getImportHTML = (list:ImportProps[]) => {
  // return;
  let froms:any = {
    react: {
      default: 'React',
    }
  };

  list.forEach((o) =>{
    if(!froms[o.from]){
      froms[o.from] = {};
    }
    if(o.default){
      froms[o.from].default = o.default;
    }
    if(o.imports){
      o.imports.forEach((key:string) =>{
        if(froms[o.from].imports){
          froms[o.from].imports.push(key);
        }else{
          froms[o.from].imports = [key];
        }
      })
    }
  })

  let html = '';
  Object.keys(froms).forEach((key:string) => {
    html += 'import ';
    if(froms[key].default){
      html += froms[key].default;
      if(froms[key].imports){
        html += `, { ${[...new Set(froms[key].imports)].join(', ')} }`
      }
    } else if(froms[key].imports){
      html += `{ ${[...new Set(froms[key].imports)].join(', ')} }`
    }
    html += ` from '${key}'\n`;
  })
  return html;
}
