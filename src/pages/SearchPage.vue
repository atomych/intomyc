<template>
  <div class="container">
    <default-header :title="'Search people'" class="head" />
    <input type="text" class="input" v-model="searchValue" />
    <ul class="list scroll">
      <li class="list__item" v-for="user in normalizedUsers" :key="user.uid">
        <div class="left">
          <img :src="user.photoObj.src" alt="" class="photo" />
          <div class="name">{{ user.name }}</div>
        </div>
        <button class="btn" @click="createDialog(user.uid)">Write</button>
      </li>
    </ul>
    <div class="no-users" v-if="normalizedUsers.length == 0">
      Failed to find users
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  margin-bottom: 25px;
}

.input {
  border: solid 1px #000;
  outline: none;
  border-radius: 5px;
  background-color: #fff;

  font-weight: 500;
  font-size: 18px;
  color: #000;

  padding: 5px 10px;

  width: 95%;
  max-width: 400px;

  margin-bottom: 30px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 15px;
    background-color: #ffffff8d;
    border-radius: 5px;

    margin-bottom: 10px;
  }
}

.left {
  display: flex;
  align-items: center;
}

.photo {
  width: 50px;
  height: 50px;
  object-fit: cover;

  margin-right: 15px;

  border-radius: 50%;
}

.name {
  font-weight: 700;
  font-size: 20px;
  color: #000;
}

.no-users {
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.btn {
  background: none;
  border: none;
  outline: none;

  color: #000;
  font-weight: 500;
  font-size: 16px;

  cursor: pointer;
}
</style>

<script>
import DefaultHeader from "../components/DefaultHeader.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchPage",

  components: {
    DefaultHeader,
  },

  created() {
    this.downloadUsersList();
  },

  data() {
    return {
      searchValue: "",
    };
  },

  methods: {
    ...mapActions(["downloadUsersList", "createNewDialog"]),

    createDialog(uid) {
      this.createNewDialog({
        userUID: uid,
        cb: (id) => {
          this.$router.push({ name: "dialog", params: { id: id } });
        },
      });
    },
  },

  computed: {
    ...mapGetters(["users"]),

    normalizedUsers() {
      return this.users.filter((el) => el.name.startsWith(this.searchValue));
    },
  },
};
</script>
