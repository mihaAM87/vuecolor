import { createStore } from 'vuex'

export default createStore({
  state: {
    ruleArr: [{type: 'red', limit: 10}, {type: 'yellow', limit: 3}, {type: 'green', limit: 15}],
    rule: null,
    colorInterval: null,
    sessionRule: JSON.parse(sessionStorage.getItem('sessionRule')) || {type: '', counter: 0}
  },
  mutations: {
    redirect(state, {to, from}) {
      let toType = to.meta?.type;

      if (!toType || toType == '') {
        toType = state.ruleArr[0].type;       
      }

      state.sessionRule.counter = (!state.sessionRule || state.sessionRule.type !== toType) ? 0 : state.sessionRule.counter;
      state.sessionRule.type = toType         
      
      if (!state.colorInterval) {
        state.colorInterval = setInterval(() => {
          state.rule = state.ruleArr.find(item => item.type == state.sessionRule?.type);     
          if (state.rule?.limit <= state.sessionRule.counter) {
            let ruleIndex = state.ruleArr.indexOf(state.rule) + 1;
            ruleIndex = state.ruleArr.length <= ruleIndex ? 0 : ruleIndex;
            state.rule = state.ruleArr[ruleIndex];
            state.sessionRule.type = state.rule.type;
            state.sessionRule.counter = 0;
            sessionStorage.setItem('sessionRule', JSON.stringify(state.sessionRule));
            window.location.href = '/' + state.sessionRule.type;
          } else {
            ++state.sessionRule.counter;
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
      let result = state.rule?.limit - state.sessionRule.counter;
      return result >= 0 ? result : state.rule?.limits
    },
    getType(state) {
      return state.sessionRule.type;
    }
  },
  modules: {
  }
})
