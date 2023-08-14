import { createStore } from "vuex";

import { signIn } from "../firebase/auth";
import { readData } from "../firebase/database";

export default createStore({
  state: {
    uid: "",
    name: "",
    dialogsID: [],
    dialogs: [],
  },
  actions: {
    auth({ commit, dispatch }, data) {
      signIn(data.email, data.password)
        .then((userCr) => {
          commit("setUID", userCr.user.uid);
          dispatch("getUserData", userCr.user.uid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserData({ commit, dispatch }, uid) {
      readData(`users/${uid}`)
        .then((snapshot) => {
          const userData = snapshot.val();
          commit("setName", userData.name);
          commit("setDialogsID", userData.dialogs);
          dispatch("downloadDialogs", userData.dialogs);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downloadDialogs({ commit }, dialogsID) {
      for (let id of dialogsID) {
        readData(`dialogs/${id}`)
          .then((snapshot) => {
            const dialogData = snapshot.val();
            commit("addDialog", dialogData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mutations: {
    setUID(state, uid) {
      state.uid = uid;
    },
    setName(state, name) {
      state.name = name;
    },
    setDialogsID(state, dialogsID) {
      state.dialogsID = dialogsID;
    },
    addDialog(state, dialog) {
      state.dialogs.push(dialog);
    },
  },
  getters: {
    uid(state) {
      return state.uid;
    },
    name(state) {
      return state.name;
    },
    dialogs(state) {
      return state.dialogs;
    },
  },
});
