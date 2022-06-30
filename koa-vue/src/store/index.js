
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: { rolelist: [], selectedUserId: null, isFetching: false },
  mutations: {
    init(state,rolelist){
      state.rolelist=rolelist
    }
  },
  getters: {},
  actions: {
    getRolelist(context){
      axios.get('/apis/roles').then(({data})=>{
        console.log("data"+data.data.roles);
        context.commit('init',data.data.roles)
      })
    }
  }
});

