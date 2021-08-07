import { Reducer, Effect, Subscription } from 'umi';
import templateList, { templateProps, objectProps  } from '@/template';
import {
  getDataObject, 
  appendChildrens, 
  interSiblings, 
  removeChildrens,
  formatModules,
  generatePage,
  generatePageView,
  copyModules,
  dropModules,
} from '../utils/dropModules';
import { getObject } from '@/utils';
import { getListNamespace, getListModuleObjs } from '../utils';
import { stateListProps } from '@/template/typing';
// 合并所有组件对象
const modules:any = templateList.reduce((result, item) => Object.assign(result,item.modules), {});

export interface stateProps{
  // 当前虚拟 Dom 对象
  list: stateListProps[]; 
  // 根据list集合生成 viewList
  viewList?: stateListProps[];
  // 页面数据集合
  pageList?: stateListProps[][];
  // data 记录所有对象内容父对象，方便快速查找对应元素
  data?: { 
    [key:string]: string | undefined;
  };
  // 当前list数组类型
  type: 'page' | 'component';
  // 页面id
  id?: string;
  // 页面配置
  pageProps: any;
  // 组件配置
  componentProps?: any;
  // 页面准备状态
  loading?: boolean;
}

export interface IndexModelType {
  namespace: 'moduleList';
  state: stateProps;
  effects: {
    // 切换到组件编辑
    component: Effect;
    // 切换到页面
    page: Effect;
    // 查看页面
    view: Effect;
    // 根据JSON数据转换为页面
    reset: Effect;
    // 更新组件 props 数据
    renderProps: Effect;
    // 更新组件 parentProps 数据
    renderParentProps: Effect;
    // 删除组件
    delete: Effect;
    // 添加组件
    add: Effect;
    // 复制组件
    copy: Effect;
  };
  reducers: {
    save: Reducer<stateProps>;
  };
  subscriptions: { onLoad: Subscription };
}

/**
 * 当前菜单展示 模块列表
 */
export default {
  namespace: 'moduleList',
  state:{
    list: [],
    viewList: undefined,
    pageList: [],
    data: {},
    type: 'page',
    pageProps: {},
    loading: false,
  },
  effects:{
    *component({ payload, params }, { put, select }){
      const { data, list, type, pageList } = yield select((_: any) => _.moduleList );
      const lists = [...list];
      const [index, result] = getObject(lists, data, payload);
      const item = result[index];
      if(type === 'page'){
        yield put({
          type: 'save',
          payload: {
            loading: true,
            pageList: [{
              componentId: item.id,
              list,
            }],
          }
        })
      }else{
        yield put({
          type: 'save',
          payload: {
            loading: true,
            pageList: [...pageList, {
              componentId: item.id,
              list,
            }],
          }
        })
      }
      let resultList: any[] = [];
      const { children, renderProps } = item;
      if(Array.isArray(children) && children.length){
        let moduleObjs = yield getListModuleObjs(children, modules);
        resultList = generatePage(children, moduleObjs);
      }
      
      yield put({
        type: 'save',
        payload: {
          type: 'component',
          loading: false,
          list: resultList,
          data: getDataObject(resultList),
          componentProps: { ...renderProps, ...params },
        }
      })
      
    },
    *page({ payload },{ put, select }){
      const { pageList:[...pageList], list, componentProps } = yield select((_: any) => _.moduleList );
      const { componentId, list:[...lists] } = pageList.pop();
      const [index, result] = getObject(lists, getDataObject(lists), componentId);
      let item = result[index];
      let moduleObjs = yield getListModuleObjs([...list, item], modules);
      result[index] = dropModules({
        ...item,
        ...moduleObjs[item.namespace],
        isComponent: true,
        renderProps: { ...componentProps },
        children: generatePageView([...list], moduleObjs),
      })

      yield put({
        type: 'save',
        payload: {
          type: pageList.length? 'component' : 'page',
          list: lists,
          data: getDataObject(lists),
          pageList: pageList,
        }
      })
    },
    *view({ payload },{ put, select }){
      yield put({
        type: 'save',
        payload: {
          loading: true,
        }
      })
      const { data, list } = yield select((_:any) => _.moduleList );
      let lists = [...list];
      let moduleObjs = yield getListModuleObjs(lists, modules);
      const result = generatePageView(lists, moduleObjs);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          viewList: result,
        }
      })
    },
    *reset({ payload },{ put, select }){
      yield put({
        type: 'save',
        payload: {
          loading: true,
        }
      })
      const { list, pageProps, id, ...props } = payload;
      let result = list;
      if(result.length){
        let names = getListNamespace(result);
        let moduleObj:any = {};
        yield Promise.all(names.map((key:any) => modules[key]())).then((result:any) => {
          result.forEach(({ default:data }:any) => {
            moduleObj[data.namespace] = data;
          })
        })
        result = generatePage(result, moduleObj);
      }
      yield put({
        type: 'save',
        payload: {
          ...props,
          loading: false,
          id,
          pageProps,
          list: result,
          data: getDataObject(result),
        }
      })
    },
    *delete({ payload },{ put, select }){
      const { data, list } = yield select((_:any) => _.moduleList );
      const lists = [...list];
      let [index, result] = getObject(lists, data, payload);
      result.splice(index, 1);

      yield put({
        type: 'save',
        payload: {
          list: lists,
          data: getDataObject(lists),
        }
      })
    },
    *copy({ payload },{ put, select }){
      const { data, list } = yield select((_:any) => _.moduleList );
      const lists = [...list];
      // 查找要克隆对象
      let [index, result] = getObject(lists, data, payload);
      let moduleObjs = yield getListModuleObjs([result[index]], modules);
      // 克隆新的对象
      let copyItem = copyModules(result[index], moduleObjs);
      result.splice(index, 0, copyItem);

      yield put({
        type: 'save',
        payload: {
          list: lists,
          data: getDataObject(lists),
        }
      })
    },
    *renderProps({ payload, id },{ put, select }){
      const { data, list } = yield select((_:any) => _.moduleList );
      const lists = [...list];
      let [index, result] = getObject(lists, data, id);
      result[index] = {
        ...result[index],
        renderProps: payload
      }
      yield put({
        type: 'save',
        payload: {
          list: lists,
        }
      })
    },
    *renderParentProps({ payload, id },{ put, select }){
      const { data, list } = yield select((_:any) => _.moduleList );
      const lists = [...list];
      let [index, result] = getObject(lists, data, id);
      result[index] = {
        ...result[index],
        renderParentProps: payload
      }
      yield put({
        type: 'save',
        payload: {
          list: lists,
        }
      })
    },
    *add({ payload, dropId, containerId }:any,{ put, select }:any){
      const { data, list } = yield select((_:any) => _.moduleList );
      let result = [...list];
      let item:stateListProps;
      // 当前元素是否为已注册元素
      if(payload.id){
        item = removeChildrens(result, data, payload.id);
      }else{
        // 格式化当前元素
        item = formatModules(payload);
      }
      if(dropId){
        //作为上级元素插入 
        result = interSiblings(result, data, dropId, item);
      }else if(containerId){
        //作为下级元素插入
        result = appendChildrens(result, data, containerId, item);
      }else{
        result.push(item);
      }

      yield put({
        type: 'save',
        payload: {
          list: result,
          data: getDataObject(result),
        }
      })
    }
  },
  reducers: {
    save: (state, { payload }) => {
      const result = { ...state, ...payload };
      if(result.type === 'page'){
        localStorage.setItem(
          'moduleList-cache',
          JSON.stringify({ list: result.list })
        );
      }
      return result;
    },
  },
  subscriptions: {
    onLoad: ({ dispatch }) => {
      const state = localStorage.getItem('moduleList-cache');
      if(state){
        dispatch({
          type: 'reset',
          payload: JSON.parse(state),
        })
      }
    }
  }
} as IndexModelType;