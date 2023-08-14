<template>
  <div class="container">
    <default-header
      :title="
        dialogs
          .filter((el) => el.id == id)[0]
          .names.filter((el) => el != name)[0]
      "
    />
    <ul class="list">
      <dialog-message
        v-for="(mess, index) in dialogs.filter((el) => el.id == id)[0].messages"
        :key="index"
        :side="mess.from == name ? 'right' : 'left'"
        :text="mess.text"
        class="mess"
      />
    </ul>
    <message-input />
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

import { mapGetters } from "vuex";

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
    };
  },

  created() {
    this.id = this.$route.params.id;
    console.log(this.dialogs, this.id);
  },

  computed: {
    ...mapGetters(["dialogs", "name"]),
  },
};
</script>
