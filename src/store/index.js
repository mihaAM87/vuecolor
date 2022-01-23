import { createStore } from 'vuex'

export default createStore({
  state: {
    ruleArr: [{type: 'red', limit: 10}, {type: 'yellow', limit: 3}, {type: 'green', limit: 15}],
    screenType: '',
    counter: 0,
    rule: null,
    sessionRule: JSON.parse(sessionStorage.getItem('sessionRule')) || {}
  },
  mutations: {
    redirect(state, {to, from}) {
      let toType = to.meta?.type;
      let fromType = from.meta?.type;
      if (toType && toType != '') {
        state.screenType = toType;       
      } else {
        state.screenType = state.ruleArr[0].type;
      }      
      state.counter = (!state?.sessionRule || state?.sessionRule?.type !== state.screenType) ? 0 : state?.sessionRule?.counter;
      if ((!fromType || fromType == '') || (!state.screenType || state.screenType == '')) {
        let colorInterval = setInterval(() => {
          state.rule = state.ruleArr.find(item => item.type == state.screenType);     
          if (state.rule?.limit <= state.counter) {
            state.counter = 0;
            let ruleIndex = state.ruleArr.indexOf(state.rule) + 1;
            ruleIndex = state.ruleArr.length <= ruleIndex ? 0 : ruleIndex;
            state.sessionRule.type = state.ruleArr[ruleIndex].type;
            state.sessionRule.counter = state.counter;
            sessionStorage.setItem('sessionRule', JSON.stringify(state.sessionRule));
            window.location.href = '/' + state.sessionRule.type;
          } else {
            ++state.counter;
            state.sessionRule.counter = state.counter;
            sessionStorage.setItem('sessionRule', JSON.stringify(state.sessionRule));
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
      let result = state.rule?.limit - state.counter;
      return result >= 0 ? result : 0
    }
  },
  modules: {
  }
})
