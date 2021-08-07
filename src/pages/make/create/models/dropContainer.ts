import { Reducer, Effect } from 'umi';

interface stateProps{
  isDrop: Boolean,                // 是否有组件在拖动
  isDidDrop?: boolean,            // 组件是否允许放置
  containerId?: string,           // 当前容器ID 
  dropId?: string;                // 当前所在 dorp组件ID
  scale: number;                 // 当前容器缩放比例
  moveId?: string;                // 当前拖动元素ID
  selected?: string;              // 当前选中的ID
}

export interface IndexModelType {
  namespace: 'dropContainer';
  state: stateProps;
  reducers: {
    save: Reducer<stateProps>;
  };
}

/**
 * @name 拖动容器配置
 */
export default {
  namespace: 'dropContainer',
  state:{
    isDrop: false,
    scale: 100,
    selected: undefined,
  },
  reducers: {
    save: (state, { payload }) => {
      return {...state, ...payload};
    }
  }
} as IndexModelType;