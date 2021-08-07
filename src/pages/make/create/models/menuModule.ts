import { Reducer, Effect } from 'umi';
import templateData, { templateProps } from '@/template';
import { formatModules } from '../utils/formatModules';
interface stateProps{
  list: templateProps[];
  name: string,
  loading: boolean;
  isSearch: boolean;
}

export interface IndexModelType {
  namespace: 'menuModule';
  state: stateProps;
  effects: {
    search: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<stateProps>;
  };
}

/**
 * 当前菜单展示 模块列表
 */
export default {
  namespace: 'menuModule',
  state:{
    name:'universal',
    list:[],
    loading: true,
    isSearch: false,
  },
  effects:{
    *search({ payload }, { put }){
      let str = payload.toLowerCase();
      // 根据payload 查找匹配的 modules 组件
      const moduleObjs = templateData.reduce((objs:any,item)=>{
        const { modules }:any = item;
        for(let key in modules){
          if(key.toLowerCase().indexOf(str) !== -1){
            objs[key] = modules[key]
          }
        }
        return objs;
      },{})
      yield put({
        type: 'save',
        payload: {
          loading: true,
        }
      })
      const list = yield Promise.all(Object.keys(moduleObjs).map((key:any) => moduleObjs[key]())).then((result:any) => {
        return result.map(({ default:data }:any) => formatModules(data))
      })
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list,
        }
      })
    },
    *update({ payload }:any,{ put }:any){
      const { modules, name } = payload;
      yield put({
        type: 'save',
        payload: {
          loading: true,
          name,
        }
      })
      const list = yield Promise.all(Object.keys(modules).map((key:any) => modules[key]())).then((result:any) => {
        return result.map(({ default:data }:any) => formatModules(data))
      })

      yield put({
        type: 'save',
        payload: {
          name,
          list:list,
          loading: false,
          isSearch: false,
        },
      })
    }
  },
  reducers: {
    save: (state, { payload }) => {
      return { ...state, ...payload };
    }
  },
} as IndexModelType;