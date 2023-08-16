<template>
  <div class="container">
    <default-header
      :title="dialogs.filter((el) => el.id == id)[0]?.companionData.name"
      :photoSrc="
        dialogs.filter((el) => el.id == id)[0]?.companionData.photo.src
      "
    />
    <ul class="list">
      <dialog-message
        v-for="(mess, index) in dialogs.filter((el) => el.id == id)[0]
          ?.messages"
        :key="index"
        :side="
          mess.from == 'start' ? 'start' : mess.from == uid ? 'right' : 'left'
        "
        :text="mess.text"
        class="mess"
      />
    </ul>
    <message-input @send="send()" v-model:message="message" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 50px;
}

.list {
  width: 100%;
  max-width: 800px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;

  padding: 20px 0;

  position: relative;
}

.mess {
  margin-bottom: 10px;
}
</style>

<script>
import DefaultHeader from "../components/DefaultHeader.vue";
import DialogMessage from "../components/DialogMessage.vue";
import MessageInput from "../components/MessageInput.vue";

import { mapGetters, mapActions } from "vuex";

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
  },

  computed: {
    ...mapGetters(["dialogs", "name", "uid"]),
  },

  methods: {
    ...mapActions(["sendMessage"]),

    send() {
      this.sendMessage({ text: this.message, id: this.id });
      this.message = "";
    },
  },
};
</script>
