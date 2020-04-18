import { Effect } from 'dva';
import {  Reducer } from 'redux';
import { joinOrg } from './service';



export interface JoinOrgState {
  user?: any;
  status: 'ok' | 'error' | ''
}



export interface JoinOrgModelType {
  namespace: string;
  state: JoinOrgState;
  effects: {
    joinOrg: Effect;
  };
  reducers: {
    save: Reducer<JoinOrgState>;
  };
}

const CommentModel: JoinOrgModelType = {
  namespace: 'joinOrg',
  state: {
    user: undefined,
    status: ''
  },


  effects: {
    *joinOrg({payload}, { call, put }) {
      const response = yield call(joinOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        user: action.payload.userDetails || {},
        status: action.payload.status
      };
    },
  },
};

export default CommentModel;