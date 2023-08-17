<template>
  <div class="container scroll">
    <dialog-item
      v-for="dialog in dialogs"
      :key="dialog.id"
      :photoSrc="dialog.companionData.photo.src"
      :nameFrom="dialog.companionData.name"
      :whoLast="dialog.messages[dialog.messages.length - 1].from"
      :unWatched="
        dialog.messages.filter((el) => el.watched == false && el.from != uid)
          .length
      "
      :lastMess="dialog.messages[dialog.messages.length - 1].text"
      @click="toDialog(dialog.id)"
    />
    <div class="no-dialogs" v-if="dialogs.length == 0">No dialogues yet</div>
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

.no-dialogs {
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
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
