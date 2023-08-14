<template>
  <div class="container">
    <dialog-item
      v-for="dialog in dialogs"
      :key="dialog.id"
      :photoSrc="dialog.companionData.photo.src"
      :nameFrom="dialog.companionData.name"
      :whoLast="dialog.messages[dialog.messages.length - 1].from"
      :unWatched="0"
      :lastMess="dialog.messages[dialog.messages.length - 1].text"
      @click="toDialog(dialog.id)"
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
import { mapGetters } from "vuex";

export default {
  name: "MessPage",

  components: {
    DialogItem,
  },

  methods: {
    toDialog(id) {
      this.$router.push({ name: "dialog", params: { id: id } });
    },
  },

  computed: {
    ...mapGetters(["dialogs", "name", "uid"]),
  },
};
</script>
