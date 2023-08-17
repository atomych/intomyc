<template>
  <div class="main">
    <div class="aside" :class="{ close: asideShow }">
      <button
        class="btn-aside"
        :class="{ rotate: !asideShow }"
        @click="asideShow = asideShow == false ? true : false"
      >
        <img src="../assets/images/arrow.png" alt="" />
      </button>
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

    <download-display :work="download" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100%;
  background-color: #ad6cff;
  position: relative;
}

.aside {
  background-color: #ffffff8d;

  padding: 20px 10px;

  flex-grow: 0;

  z-index: 60;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  transition: all 0.2s linear;

  &.close {
    margin-left: -270px;
  }
}

.btn-aside {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  z-index: 50;
  cursor: pointer;

  height: 100%;

  background-color: #ffffff8d;
  padding: 10px;
  border: none;
  outline: none;

  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 1px 4px #000;

  &.rotate {
    img {
      transform: rotate(180deg);
    }
  }

  img {
    display: block;
    width: 30px;
    height: 30px;
    transition: all 0.2s linear;
  }
}

.nick {
  color: #000;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.photo {
  object-fit: cover;
  width: 250px;
  height: 250px;

  border: 5px #fff solid;
  box-shadow: 0 0 10px #000;
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
import DownloadDisplay from "../components/DownloadDisplay.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserView",

  components: {
    DownloadDisplay,
  },

  created() {
    this.toMess();
  },

  data() {
    return {
      asideShow: true,
    };
  },

  methods: {
    ...mapActions(["downloadPersonalKey", "unlogin"]),

    toMess() {
      this.$router.push({ name: "mess" });
      this.asideShow = true;
    },

    toSett() {
      this.$router.push({ name: "sett" });
      this.asideShow = true;
    },

    toSearch() {
      this.asideShow = true;
      this.$router.push({ name: "search" });
    },

    exit() {
      this.unlogin(() => {
        this.asideShow = true;
        this.$router.push({ name: "start" });
      });
    },
  },

  computed: {
    ...mapGetters(["name", "photo", "uid", "download"]),
  },
};
</script>
