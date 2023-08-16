import { createStore } from "vuex";

import { signIn, createUser } from "../firebase/auth";
import { readData, writeData, subscribeToUpadate } from "../firebase/database";
import { downloadImage, uploadImage } from "../firebase/storage";
import { getID, getKey } from "../js/generator";

export default createStore({
  state: {
    uid: "",
    name: "",
    photo: "",
    dialogsID: [],
    dialogs: [],
    users: [],
  },
  actions: {
    loginNewUser({ dispatch }, data) {
      createUser(data.email, data.password).then((userData) => {
        dispatch("regNewUserInDatabase", {
          uid: userData.user.uid,
          name: data.name,
          email: data.email,
          password: data.password,
        });
      });
    },
    regNewUserInDatabase({ dispatch }, data) {
      writeData(`users/${data.uid}`, {
        name: data.name,
        dialogs: ["dnone"],
        uid: data.uid,
        photo: false,
      });
      dispatch("regPersonalDataInDatabase", {
        uid: data.uid,
        email: data.email,
        password: data.password,
      });
    },
    regPersonalDataInDatabase({ dispatch }, data) {
      dispatch("empty");
      const key = getKey();
      writeData(`PERSONAL/${data.uid}`, {
        email: data.email,
        password: data.password,
        key: key,
      });
      writeData(`AUTOENTRYKEYS/${key}`, data.uid);
    },
    autoEntry({ dispatch }, data) {
      readData(`AUTOENTRYKEYS/${data.key}`)
        .then((snapshot) => {
          const uid = snapshot.val();

          if (uid) {
            readData(`PERSONAL/${uid}`)
              .then((snapshot) => {
                const personalData = snapshot.val();

                if (personalData.key == data.key) {
                  dispatch("auth", {
                    email: personalData.email,
                    password: personalData.password,
                    auto: true,
                    cb: data.cb,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlogin({ commit }, cb) {
      localStorage.setItem("checkbox", "");
      commit("clearData");
      cb();
    },
    downloadPersonalKey({ dispatch }, uid) {
      readData(`PERSONAL/${uid}/key`).then((snapshot) => {
        localStorage.setItem("AUTOENTRYKEY", snapshot.val());
        dispatch("empty");
      });
    },
    empty() {},
    createNewDialog({ state }, startData) {
      readData(`users/${startData.userUID}`).then((snapshot) => {
        const data = snapshot.val();
        const dialogID = "d" + getID();

        if (data.dialogs) data.dialogs.push(dialogID);
        else data.dialogs = [dialogID];

        writeData(`dialogs/${dialogID}`, {
          uids: [startData.userUID, state.uid],
          id: dialogID,
          messages: [
            {
              from: "start",
              text: "",
            },
          ],
        }).then(() => {
          writeData(
            `users/${state.uid}/dialogs`,
            state.dialogsID.length ? [...state.dialogsID, dialogID] : [dialogID]
          ).then(() => {
            writeData(`users/${startData.userUID}/dialogs`, data.dialogs).then(
              () => {
                console.log("callback started");
                startData.cb(dialogID);
              }
            );
          });
        });
      });
    },
    auth({ commit, dispatch }, data) {
      signIn(data.email, data.password)
        .then((userCr) => {
          commit("setUID", userCr.user.uid);

          if (data.auto) {
            data.cb();
          }

          dispatch("getUserData", userCr.user.uid);
          dispatch("downloadPersonalKey", userCr.user.uid);
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
          commit("setPhoto", userData.photo);
          dispatch("subscribeToUpdateDialogs", uid);
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
    downloadAddingDialogInfo({ commit, dispatch }, data) {
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
              console.log("new dialog was downloaded");
              dispatch("subscribeToUpdateMessages", data.dialog.id);
            };
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    subscribeToUpdateDialogs({ commit, dispatch }, uid) {
      subscribeToUpadate(`users/${uid}/dialogs`, (snapshot) => {
        commit("clearDialogs");
        console.log("new dialog!");
        const data = snapshot.val().filter((el) => el != "dnone");
        commit("setDialogsID", data);
        if (data.length) {
          dispatch("downloadDialogs", {
            dialogsID: data,
            uid: uid,
          });
        }
      });
    },
    subscribeToUpdateMessages({ commit }, id) {
      subscribeToUpadate(`dialogs/${id}/messages`, (snapshot) => {
        commit("changeMessagesOfDialog", { mess: snapshot.val(), id: id });
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
    sendMessage({ state }, data) {
      const messages = state.dialogs.filter((el) => el.id == data.id)[0]
        .messages;
      messages.push({
        from: state.uid,
        text: data.text,
      });

      writeData(`dialogs/${data.id}/messages`, messages);
    },
    downloadUsersList({ commit }) {
      commit("clearUsersList");
      readData(`users`)
        .then((snapshot) => {
          const users = Object.values(snapshot.val());
          for (let item of users) {
            let link;

            if (item.photo) {
              link = `${item.uid}/${item.photo}`;
            } else {
              link = `default/user.png`;
            }

            downloadImage(link).then((URL) => {
              const img = new Image();
              img.src = URL;
              img.onload = () => {
                item.photoObj = img;
                commit("addUserInList", item);
              };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    changeMessagesOfDialog(state, data) {
      state.dialogs.filter((el) => el.id == data.id)[0].messages = data.mess;
    },
    addUserInList(state, user) {
      state.users.push(user);
    },
    clearUsersList(state) {
      state.users = [];
    },
    clearDialogs(state) {
      state.dialogs = [];
      state.dialogsID = [];
    },
    clearData(state) {
      state.uid = "";
      state.name = "";
      state.photo = "";
      state.dialogsID = [];
      state.dialogs = [];
      state.users = [];
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
    users(state) {
      return state.users.filter((el) => el.uid != state.uid);
    },
  },
});
