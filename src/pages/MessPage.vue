<template>
  <div class="container">
    <dialog-item
      :nameFrom="'user'"
      :whoLast="'user'"
      :unWatched="1"
      :lastMess="'Hello'"
      @click="toDialog()"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>

<script>
import DialogItem from "../components/DialogItem.vue";

export default {
  name: "MessPage",

  components: {
    DialogItem,
  },

  methods: {
    toDialog() {
      this.$router.push({ name: "dialog" });
    },
  },
};
</script>
