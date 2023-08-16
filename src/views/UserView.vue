<template>
  <div class="container">
    <div class="aside">
      <div>
        <p class="nick">{{ name }}</p>
        <img :src="photo?.src" alt="" class="photo" />
      </div>
      <ul class="menu">
        <li class="menu__item" @click="toSearch()">Search people</li>
        <li class="menu__item" @click="toMess()">Messages</li>
        <li class="menu__item" @click="toSett()">Settings</li>
        <li class="menu__item" @click="exit()">Exit</li>
      </ul>
    </div>
    <router-view class="content-view" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  background-color: #ad6cff;
}

.aside {
  background-color: #ffffff8d;

  padding: 20px 10px;

  flex-grow: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.nick {
  color: #000;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.photo {
  width: 250px;
  height: auto;
}

.menu {
  justify-items: end;
  display: flex;
  flex-direction: column;
  align-items: center;

  list-style: none;

  &__item {
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin-bottom: 20px;

    cursor: pointer;
  }
}

.content-view {
  flex-grow: 1;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserView",

  created() {
    this.toMess();
  },

  methods: {
    ...mapActions(["downloadPersonalKey", "unlogin"]),

    toMess() {
      this.$router.push({ name: "mess" });
    },

    toSett() {
      this.$router.push({ name: "sett" });
    },

    toSearch() {
      this.$router.push({ name: "search" });
    },

    exit() {
      this.unlogin(() => {
        this.$router.push({ name: "start" });
      });
    },
  },

  computed: {
    ...mapGetters(["name", "photo", "uid"]),
  },
};
</script>
