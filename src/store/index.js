import { createStore } from "vuex";

export default createStore({
  state: {
    uid: "",
    name: "",
  },
  actions: {},
  mutations: {
    setUID(state, uid) {
      state.uid = uid;
    },
    setName(state, name) {
      state.name = name;
    },
  },
  getters: {
    uid(state) {
      return state.uid;
    },
    name(state) {
      return state.name;
    },
  },
});
