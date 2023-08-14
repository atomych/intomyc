import { createStore } from "vuex";

import { signIn } from "../firebase/auth";
import { readData, writeData } from "../firebase/database";
import { downloadImage, uploadImage } from "../firebase/storage";

export default createStore({
  state: {
    uid: "",
    name: "",
    photo: "",
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
          commit("setPhoto", userData.photo);
          dispatch("downloadDialogs", {
            dialogsID: userData.dialogs,
            uid: userData.uid,
          });
          dispatch("downloadUserPhoto", {
            photo: userData.photo,
            uid: userData.uid,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downloadDialogs({ dispatch }, data) {
      for (let id of data.dialogsID) {
        readData(`dialogs/${id}`)
          .then((snapshot) => {
            const dialogData = snapshot.val();
            dispatch("downloadAddingDialogInfo", {
              dialog: dialogData,
              uid: data.uid,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    downloadAddingDialogInfo({ commit }, data) {
      const companionUID = data.dialog.uids.filter((el) => el != data.uid);

      readData(`users/${companionUID}`).then((snapshot) => {
        const companionData = snapshot.val();
        let link;

        if (companionData.photo)
          link = `${companionData.uid}/${companionData.photo}`;
        else link = "default/user.png";

        downloadImage(link)
          .then((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              data.dialog.companionData = {
                name: companionData.name,
                photo: img,
              };
              commit("addDialog", data.dialog);
            };
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    changeUserName({ commit, state }, name) {
      writeData(`users/${state.uid}/name`, name)
        .then(() => {
          commit("setName", name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downloadUserPhoto({ commit }, data) {
      let link;

      if (data.photo) {
        link = `${data.uid}/${data.photo}`;
      } else {
        link = `default/user.png`;
      }

      downloadImage(link)
        .then((url) => {
          const userPhoto = new Image();
          userPhoto.src = url;
          userPhoto.onload = () => {
            commit("setPhoto", userPhoto);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadUserPhoto({ commit, state }, file) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = (data) => {
        const URL = data.currentTarget.result;

        uploadImage(URL, `${state.uid}/${file.name}`).then(() => {
          writeData(`users/${state.uid}/photo`, file.name).then(() => {
            const img = new Image();
            img.src = URL;
            img.onload = () => {
              commit("setPhoto", img);
            };
          });
        });
      };
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
    setPhoto(state, photo) {
      state.photo = photo;
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
    photo(state) {
      return state.photo;
    },
  },
});
