<template>
  <div class="container">
    <default-header
      :title="dialogs.filter((el) => el.id == id)[0]?.companionData.name"
      :photoSrc="
        dialogs.filter((el) => el.id == id)[0]?.companionData.photo.src
      "
    />
    <div class="list scroll">
      <dialog-message
        v-for="(mess, index) in dialogs.filter((el) => el.id == id)[0]
          ?.messages"
        :key="index"
        :side="
          mess.from == 'start' ? 'start' : mess.from == uid ? 'right' : 'left'
        "
        :text="mess.text"
        :unwatched="!mess.watched"
        class="mess"
      />
    </div>
    <message-input @send="send()" v-model:message="message" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 10px;
  padding-bottom: 50px;
  overflow: hidden;

  @media (max-width: 830px) {
    padding-bottom: 0;
  }
}

.list {
  width: 100%;
  max-width: 800px;

  flex-grow: 1;

  margin: 10px 0;
  padding: 0 20px;

  position: relative;

  overflow-y: scroll;
}

.mess {
  margin-bottom: 10px;
}
</style>

<script>
import DefaultHeader from "../components/DefaultHeader.vue";
import DialogMessage from "../components/DialogMessage.vue";
import MessageInput from "../components/MessageInput.vue";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "DialogPage",

  components: {
    DefaultHeader,
    DialogMessage,
    MessageInput,
  },

  data() {
    return {
      id: "",
      message: "",
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.openDialog(this.id);
  },

  unmounted() {
    this.setCurrentDialog("");
  },

  computed: {
    ...mapGetters(["dialogs", "name", "uid"]),
  },

  methods: {
    ...mapActions(["sendMessage", "openDialog"]),
    ...mapMutations(["setCurrentDialog"]),

    send() {
      this.sendMessage({ text: this.message, id: this.id });
      this.message = "";
    },
  },
};
</script>
