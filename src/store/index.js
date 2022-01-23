import { createStore } from 'vuex'

export default createStore({
  state: {
    rouleArr: [{type: 'red', limit: 10}, {type: 'yellow', limit: 3}, {type: 'green', limit: 15}],
    screenType: '',
    counter: 0,
    roule: null
  },
  mutations: {
    redirect(state, {to, from}) {
      let toType = to.meta?.type;
      let fromType = from.meta?.type;
      if (toType && toType != '') {
        state.screenType = toType;       
      } else {
        state.screenType = state.rouleArr[0].type;
      }      
      if ((!fromType || fromType == '') || (!state.screenType || state.screenType == '')) {
        let colorInterval = setInterval(() => {
          state.roule = state.rouleArr.find(item => item.type == state.screenType);       
          if (state.roule?.limit <= state.counter) {
            state.counter = 0;
            let rouleIndex = state.rouleArr.indexOf(state.roule) + 1;
            rouleIndex = state.rouleArr.length <= rouleIndex ? 0 : rouleIndex;
            window.location.href = '/' + state.rouleArr[rouleIndex].type;
          } else {
            ++state.counter;
          }
        }, 1000);
      } 
    }
  },
  actions: {
    reload({ commit, dispatch }, data) {
      commit('redirect', data);
    }
  },
  getters: {
    getCounter(state) {
      let result = state.roule?.limit - state.counter;
      return result >= 0 ? result : 0
    }
  },
  modules: {
  }
})
