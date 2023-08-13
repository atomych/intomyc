<template>
  <div class="container">
    <dialog-item
      :name="'user'"
      :whoLast="'user'"
      :unWatched="1"
      :lastMess="'Hello'"
    />
    <dialog-item
      :name="'user'"
      :whoLast="'atomych'"
      :unWatched="0"
      :lastMess="'Hello2'"
    />
    <dialog-item
      :name="'user'"
      :whoLast="'user'"
      :unWatched="0"
      :lastMess="'Hello3'"
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
};
</script>
