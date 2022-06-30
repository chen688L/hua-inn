
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
    state: { users: [], selectedUserId: null, isFetching: false },
    mutations: {
        setUsers(state, { users }) { state.users = users; },
        setSelectedUser(state, id) { state.selectedUserId = id; },
        setIsFetching(state, bool) { state.isFetching = bool; }
    },
    getters: { selectedUser: state => state.users.find(user => user.login.uuid === state.selectedUserId) },
    actions: {
        fetchUsers({ commit }) {
            commit("setIsFetching", true);
            return axios.get("").then(res => {
                setTimeout(() => {
                    commit("setIsFetching", false);
                    commit("setUsers", { users: res.data.results });
                }, 2500);
            }).catch(error => {
                commit("setIsFetching", false);
                console.error(error);
            });
        }
    }
});
// export default{
//     setDataMyUser(state,data){
//         state.myUser = data
//     }
// }

