import { Reducer, Effect } from 'umi';

interface stateProps{
  eId: string | undefined,          // 当前编辑的ID
}

export interface IndexModelType {
  namespace: 'dropEvent';
  state: stateProps;
  reducers: {
    save: Reducer<stateProps>;
  };
}

/**
 * 当前菜单展示 模块列表
 */
export default {
  namespace: 'dropEvent',
  state:{
    eId: undefined,
  },
  reducers: {
    save: (state, { payload }) => {
      return { ...state, ...payload };
    }
  }
} as IndexModelType;