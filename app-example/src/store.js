import Vue from 'vue';
import Vuex from 'vuex';
import VueWatcher from 'vuex-watcher';

Vue.use(Vuex)

let messageWatcher = (val, oldVal) => {
  console.log(`Running state\'s "text" callback \nFrom: "${oldVal}", To: "${val}"`)
}

const myVueWatcher = new VueWatcher({
  environment: 'development',
  watches: [
    {
      state: 'text',
      cb: messageWatcher
    },
    {
      getter: 'getactive',
      cb: (val) => console.log(`Running getters' "getactive" callback \nValue: ${val}`)
    },
    {
      action: 'toggle',
      cb: () => console.log('Running action subscribe callback')
    },
    {
      mutation: 'UPDATE_TEXT',
      cb: () => console.log('Running subscribe callback')
    }
  ]
})

export default new Vuex.Store({
  plugins: [myVueWatcher],
  state: {
    active: false,
    text: 'None'
  },
  getters: {
    getactive: state => state.active,
    gettext: state => state.text
  },
  actions: {
    'updateText': ({ commit }, payload) => commit('UPDATE_TEXT', payload),
    'toggle': ({ commit }, payload) => commit('UPDATE', payload)
  },
  mutations: {
    'UPDATE_TEXT': (state, payload) => state.text = payload,
    'UPDATE': (state, payload) => state.active = !state.active
  }
})