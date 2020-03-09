import * as types from './mutations-types';

export default {
  [types.SET_USERIFMS] (state, payload) {
    state.userIfms = payload;
  },

  [types.SET_LEFTMENU] (state, payload) {
    state.isLeftFixed = payload;
  },

  [types.SET_TOPNAV] (state, payload) {
    state.isTopShow = payload;
  }
}