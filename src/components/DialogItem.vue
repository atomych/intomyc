<template>
  <div class="wrapper" :class="{ unwatched: unWatched > 0 }">
    <img :src="photoSrc" alt="" class="photo" />
    <div class="name">{{ nameFrom }}</div>
    <div class="you" v-if="userLast">| You</div>
    <div class="dots">:</div>
    <div class="mess">{{ lastMess }}</div>
    <div class="count" v-if="unWatched">{{ unWatched }}</div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;

  background-color: #ffffff8d;

  padding: 5px 10px;

  position: relative;

  border-radius: 10px;

  cursor: pointer;
  margin-bottom: 10px;

  &.unwatched {
    background-color: #fff;
  }
}

.photo {
  margin-right: 5px;
  width: 50px;
}

.name,
.you,
.dots {
  color: #000;
  font-weight: 700;
  font-size: 20px;
}

.dots {
  margin-right: 10px;
}

.name {
  margin-right: 5px;
}

.mess {
  color: #000;
  font-weight: 500;
  font-size: 18px;
}

.count {
  position: absolute;
  width: 35px;
  height: 35px;

  background-color: #ad6cff;
  border-radius: 50%;

  color: #000;
  font-size: 20px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 50%;
  right: 20px;

  transform: translateY(-50%);
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DialogItem",

  props: {
    nameFrom: {
      type: String,
      default: "User",
      required: true,
    },
    unWatched: {
      type: Number,
      default: 0,
      required: true,
    },
    whoLast: {
      type: String,
      default: "User",
      required: true,
    },
    lastMess: {
      type: String,
      default: "",
      required: true,
    },
    photoSrc: {
      type: String,
      default: "",
      required: true,
    },
  },

  computed: {
    ...mapGetters(["name"]),

    userLast() {
      return this.whoLast == this.name;
    },
  },
};
</script>
